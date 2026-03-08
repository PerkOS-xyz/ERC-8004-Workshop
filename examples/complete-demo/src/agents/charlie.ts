import { BaseAgent } from './base';
import { AgentMetadata, MarketAnalysisRequest, FeedbackData } from '../types';

export class CharlieClient extends BaseAgent {
  getMetadata(): AgentMetadata {
    return {
      name: 'Charlie Client',
      description: 'Client agent that requests services, manages interactions, and provides feedback',
      type: 'client',
      capabilities: [
        'service-discovery',
        'feedback-management',
        'reputation-tracking',
        'agent-interaction',
        'payment-processing',
        'quality-assurance'
      ],
      endpoint: 'https://charlie.client/a2a',
      version: '1.0.0',
      trustModels: ['reputation', 'validation']
    };
  }

  async discoverMarketAnalysts(): Promise<Array<{ agentId: number; reputation: number; feedbackCount: number }>> {
    this.logger.agent('Charlie', 'Looking for market analysis agents...');
    
    await this.simulateWork('Querying Identity Registry for market analysts', 800);
    await this.simulateWork('Checking reputation scores and capabilities', 600);
    
    // Simulate discovered agents (in production, this would query the actual registry)
    const discoveredAgents = [
      { agentId: 1, reputation: 0, feedbackCount: 0 }, // Alice (new agent)
      { agentId: 5, reputation: 87, feedbackCount: 23 }, // Some other agent
      { agentId: 12, reputation: 92, feedbackCount: 45 } // Another agent
    ];

    this.logger.success(`Found ${discoveredAgents.length} market analysis agents`);
    
    for (const agent of discoveredAgents) {
      if (agent.feedbackCount === 0) {
        this.logger.result(`Agent ${agent.agentId}`, `${agent.reputation}/100 (new agent)`);
      } else {
        this.logger.result(`Agent ${agent.agentId}`, `${agent.reputation}/100 (${agent.feedbackCount} reviews)`);
      }
    }

    return discoveredAgents;
  }

  async selectBestAgent(agents: Array<{ agentId: number; reputation: number; feedbackCount: number }>): Promise<number> {
    this.logger.info('Selecting best agent based on reputation and experience...');
    
    // Selection algorithm: prioritize reputation, but also consider new agents for diversity
    let selectedAgent = agents[0];
    
    for (const agent of agents) {
      // Prefer agents with good reputation and some experience
      if (agent.reputation >= 80 && agent.feedbackCount >= 10) {
        selectedAgent = agent;
        break;
      }
      // But also give new agents a chance if no experienced ones are available
      if (agent.reputation === 0 && agent.feedbackCount === 0) {
        selectedAgent = agent; // Give new agents a chance
      }
    }

    this.logger.result('Selected Agent', `Agent ${selectedAgent.agentId}`);
    this.logger.info(selectedAgent.feedbackCount === 0 ? 
      'Giving new agent a chance to build reputation' : 
      `Selected based on ${selectedAgent.reputation}/100 reputation`
    );

    return selectedAgent.agentId;
  }

  async createMarketAnalysisRequest(pair: string = 'ETH/USDC'): Promise<MarketAnalysisRequest> {
    this.logger.agent('Charlie', `I need ${pair} analysis for the next 24h`);
    
    const request: MarketAnalysisRequest = {
      pair,
      timeframe: '24h',
      analysisType: 'technical',
      timestamp: Math.floor(Date.now() / 1000)
    };

    this.logger.result('Request Details', JSON.stringify(request, null, 2));
    
    return request;
  }

  async evaluateAnalysisQuality(
    analysis: any,
    validation?: any
  ): Promise<{ score: number; tags: string[]; reasoning: string }> {
    this.logger.info('Evaluating analysis quality...');
    
    await this.simulateWork('Assessing analysis completeness and clarity', 500);
    await this.simulateWork('Checking prediction reasonableness', 400);
    await this.simulateWork('Comparing with validation results', 300);

    let score = 75; // Base score
    const tags: string[] = [];
    const factors: string[] = [];

    // Evaluate prediction confidence
    if (analysis.prediction?.confidence) {
      if (analysis.prediction.confidence >= 70 && analysis.prediction.confidence <= 90) {
        score += 10;
        tags.push('confident');
        factors.push('well-calibrated confidence');
      } else if (analysis.prediction.confidence > 95) {
        score -= 5;
        tags.push('overconfident');
        factors.push('potentially overconfident');
      }
    }

    // Evaluate reasoning quality
    if (analysis.reasoning?.length > 50) {
      score += 8;
      tags.push('detailed');
      factors.push('comprehensive reasoning');
    }

    // Evaluate speed (timestamp-based)
    const analysisTime = Date.now() - analysis.analysisTimestamp;
    if (analysisTime < 10000) { // Less than 10 seconds
      score += 5;
      tags.push('fast');
      factors.push('quick response time');
    }

    // Consider validation results if available
    if (validation?.confidence) {
      if (validation.confidence >= 85) {
        score += 12;
        tags.push('validated');
        factors.push('high validation confidence');
      } else if (validation.confidence >= 70) {
        score += 6;
        factors.push('moderate validation confidence');
      } else {
        score -= 8;
        tags.push('questionable');
        factors.push('low validation confidence');
      }
    }

    // Evaluate target price reasonableness
    if (analysis.prediction?.targetPrice && analysis.currentPrice) {
      const priceChange = Math.abs(analysis.prediction.targetPrice - analysis.currentPrice) / analysis.currentPrice;
      if (priceChange <= 0.05) {
        tags.push('conservative');
        factors.push('realistic price target');
      } else if (priceChange > 0.2) {
        score -= 5;
        tags.push('aggressive');
        factors.push('very aggressive price target');
      }
    }

    // Add subjective quality tags
    if (score >= 85) {
      tags.push('excellent');
    } else if (score >= 75) {
      tags.push('good');
    } else if (score >= 60) {
      tags.push('adequate');
    }

    // Ensure score is within bounds
    score = Math.max(0, Math.min(100, score));

    const reasoning = `Analysis evaluated based on: ${factors.join(', ')}. ${
      score >= 80 ? 'High quality analysis with strong methodology.' :
      score >= 60 ? 'Good analysis with minor areas for improvement.' :
      'Analysis has some concerns that should be addressed.'
    }`;

    this.logger.result('Quality Score', `${score}/100`);
    this.logger.result('Tags', tags.join(', '));
    this.logger.result('Reasoning', reasoning);

    return { score, tags, reasoning };
  }

  async submitDetailedFeedback(
    agentId: number,
    evaluation: { score: number; tags: string[]; reasoning: string },
    authorization: string
  ): Promise<void> {
    this.logger.agent('Charlie', `Rating Agent ${agentId}: ${evaluation.score}/100`);
    
    const feedbackData: FeedbackData = {
      agentId,
      score: evaluation.score,
      tags: evaluation.tags,
      reportUri: '', // Will be generated
      client: this.blockchain.getAddress(),
      timestamp: Date.now()
    };

    // Create detailed feedback report
    const feedbackReport = {
      ...feedbackData,
      reasoning: evaluation.reasoning,
      clientAgent: this.agentInfo?.metadata.name || 'Charlie Client',
      interaction: {
        serviceType: 'market-analysis',
        requestTimestamp: feedbackData.timestamp - 30000, // 30 seconds ago
        responseTime: 8.5, // seconds
        satisfactionLevel: this.getDescriptiveSatisfaction(evaluation.score)
      },
      recommendations: this.generateRecommendations(evaluation.score, evaluation.tags)
    };

    try {
      // Submit feedback using the base class method
      await this.submitFeedbackAsClient(agentId, evaluation.score, evaluation.tags, authorization);
      
      this.logger.success('Detailed feedback submitted successfully');
      
    } catch (error) {
      this.logger.warn('Feedback submission simulated due to contract limitations');
      this.logger.info('In production, this would update the agent\'s on-chain reputation');
    }
  }

  private getDescriptiveSatisfaction(score: number): string {
    if (score >= 90) return 'Extremely satisfied';
    if (score >= 80) return 'Very satisfied';
    if (score >= 70) return 'Satisfied';
    if (score >= 60) return 'Somewhat satisfied';
    if (score >= 50) return 'Neutral';
    if (score >= 40) return 'Somewhat dissatisfied';
    if (score >= 30) return 'Dissatisfied';
    return 'Very dissatisfied';
  }

  private generateRecommendations(score: number, tags: string[]): string[] {
    const recommendations: string[] = [];

    if (score >= 85) {
      recommendations.push('Excellent service, would use again');
      recommendations.push('Recommend to other clients');
    } else if (score >= 70) {
      recommendations.push('Good service with room for improvement');
      if (tags.includes('fast')) {
        recommendations.push('Maintain fast response times');
      }
    } else {
      recommendations.push('Needs improvement in analysis quality');
      if (tags.includes('overconfident')) {
        recommendations.push('Work on confidence calibration');
      }
      if (!tags.includes('detailed')) {
        recommendations.push('Provide more detailed reasoning');
      }
    }

    return recommendations;
  }

  async trackInteractionHistory(): Promise<Array<{
    agentId: number;
    serviceType: string;
    timestamp: number;
    rating: number;
    outcome: string;
  }>> {
    this.logger.info('Retrieving interaction history...');
    
    // Simulate interaction history
    const history = [
      {
        agentId: 3,
        serviceType: 'portfolio-analysis',
        timestamp: Date.now() - 604800000, // 1 week ago
        rating: 88,
        outcome: 'satisfied'
      },
      {
        agentId: 7,
        serviceType: 'risk-assessment',
        timestamp: Date.now() - 1209600000, // 2 weeks ago
        rating: 72,
        outcome: 'adequate'
      },
      {
        agentId: 1,
        serviceType: 'market-analysis',
        timestamp: Date.now() - 1800000, // 30 minutes ago
        rating: 92,
        outcome: 'excellent'
      }
    ];

    this.logger.success(`Found ${history.length} previous interactions`);
    
    for (const interaction of history) {
      this.logger.result(
        `Agent ${interaction.agentId}`,
        `${interaction.serviceType} - ${interaction.rating}/100 (${interaction.outcome})`
      );
    }

    return history;
  }

  async calculateAgentAffinity(agentId: number): Promise<number> {
    // Calculate how well this client works with a specific agent
    const history = await this.trackInteractionHistory();
    const agentInteractions = history.filter(h => h.agentId === agentId);
    
    if (agentInteractions.length === 0) return 0; // No history
    
    const avgRating = agentInteractions.reduce((sum, i) => sum + i.rating, 0) / agentInteractions.length;
    const interactionCount = agentInteractions.length;
    
    // Bonus for multiple successful interactions
    const affinityBonus = Math.min(10, interactionCount * 2);
    
    return Math.min(100, avgRating + affinityBonus);
  }

  async generateInteractionSummary(): Promise<{
    totalInteractions: number;
    averageRating: number;
    preferredAgents: number[];
    topServiceTypes: string[];
  }> {
    const history = await this.trackInteractionHistory();
    
    const totalInteractions = history.length;
    const averageRating = history.reduce((sum, h) => sum + h.rating, 0) / totalInteractions;
    
    // Find agents with ratings > 80
    const preferredAgents = [...new Set(
      history.filter(h => h.rating > 80).map(h => h.agentId)
    )];
    
    // Count service types
    const serviceTypeCounts = history.reduce((counts, h) => {
      counts[h.serviceType] = (counts[h.serviceType] || 0) + 1;
      return counts;
    }, {} as Record<string, number>);
    
    const topServiceTypes = Object.entries(serviceTypeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([service]) => service);

    return {
      totalInteractions,
      averageRating: Math.round(averageRating * 100) / 100,
      preferredAgents,
      topServiceTypes
    };
  }
}