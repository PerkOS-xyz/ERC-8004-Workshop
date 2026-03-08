import { BaseAgent } from './base';
import { AgentMetadata, MarketAnalysisRequest, MarketAnalysisResult, ValidationResult } from '../types';

export class BobValidator extends BaseAgent {
  getMetadata(): AgentMetadata {
    return {
      name: 'Bob Validator',
      description: 'Independent validation agent for market analysis verification and quality assessment',
      type: 'validator',
      capabilities: [
        're-execution',
        'quality-assessment',
        'data-verification',
        'methodology-review',
        'bias-detection',
        'consensus-building'
      ],
      endpoint: 'https://bob.validator/a2a',
      version: '1.1.0',
      trustModels: ['stake-based', 'reputation']
    };
  }

  async validateMarketAnalysis(
    request: MarketAnalysisRequest,
    analysis: MarketAnalysisResult
  ): Promise<ValidationResult> {
    this.logger.agent('Bob', `Re-executing Alice's analysis for verification...`);

    // Simulate comprehensive validation process
    await this.simulateWork('Re-executing market analysis with independent data sources', 1500);
    const reExecutionScore = await this.performReExecution(request);
    
    await this.simulateWork('Assessing methodology and approach quality', 1000);
    const methodologyScore = await this.assessMethodology(analysis);
    
    await this.simulateWork('Verifying data sources and accuracy', 800);
    const dataAccuracyScore = await this.verifyDataAccuracy(request, analysis);
    
    await this.simulateWork('Evaluating reasoning and logic quality', 600);
    const reasoningScore = await this.evaluateReasoning(analysis);
    
    await this.simulateWork('Checking for potential biases and errors', 500);
    const biasScore = await this.detectBias(analysis);

    // Calculate overall confidence score
    const scores = [reExecutionScore, methodologyScore, dataAccuracyScore, reasoningScore, biasScore];
    const weights = [0.25, 0.20, 0.25, 0.20, 0.10]; // Weight different aspects
    const weightedScore = scores.reduce((sum, score, index) => sum + (score * weights[index]), 0);
    const confidence = Math.round(weightedScore);

    // Generate validation report
    const report = this.generateValidationReport({
      reExecutionScore,
      methodologyScore,
      dataAccuracyScore,
      reasoningScore,
      biasScore,
      confidence,
      analysis
    });

    const validationResult: ValidationResult = {
      confidence,
      methodologyScore,
      dataAccuracy: dataAccuracyScore,
      reasoningQuality: reasoningScore,
      report,
      validator: this.agentInfo?.metadata.name || 'Bob Validator',
      timestamp: Date.now()
    };

    this.logger.success('Validation completed');
    this.logger.result('Re-execution Score', `${reExecutionScore}/100`);
    this.logger.result('Methodology Score', `${methodologyScore}/100`);
    this.logger.result('Data Accuracy', `${dataAccuracyScore}/100`);
    this.logger.result('Reasoning Quality', `${reasoningScore}/100`);
    this.logger.result('Bias Score', `${biasScore}/100`);
    this.logger.result('Overall Confidence', `${confidence}/100`);

    return validationResult;
  }

  private async performReExecution(request: MarketAnalysisRequest): Promise<number> {
    // Simulate re-executing the analysis with independent algorithms
    this.logger.debug('Running independent market analysis algorithms...');
    
    // Simulate various factors that affect re-execution score
    let score = 85; // Base score for methodology alignment
    
    // Market volatility affects reproducibility
    if (request.timeframe === '1h') score -= 5; // Short timeframes are less reliable
    if (request.timeframe === '24h') score += 3; // Better timeframe for analysis
    
    // Analysis type affects score
    if (request.analysisType === 'technical') score += 5; // Technical analysis is more reproducible
    
    // Add some randomness to simulate real-world variations
    score += Math.random() * 10 - 5;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private async assessMethodology(analysis: MarketAnalysisResult): Promise<number> {
    this.logger.debug('Assessing analysis methodology...');
    
    let score = 88; // Base methodology score
    
    // Check if confidence level is reasonable
    if (analysis.prediction.confidence > 95) score -= 10; // Overconfidence penalty
    if (analysis.prediction.confidence < 50) score -= 5; // Low confidence penalty
    if (analysis.prediction.confidence >= 70 && analysis.prediction.confidence <= 90) score += 5; // Good confidence range
    
    // Check if target price is reasonable relative to current price
    const priceChange = Math.abs(analysis.prediction.targetPrice - analysis.currentPrice) / analysis.currentPrice;
    if (priceChange > 0.2) score -= 8; // Unrealistic price targets
    if (priceChange > 0.1 && priceChange <= 0.2) score -= 3; // Aggressive but possible
    
    // Risk assessment alignment
    if (analysis.riskLevel === 'HIGH' && analysis.prediction.confidence > 80) score -= 5; // Inconsistent risk/confidence
    if (analysis.riskLevel === 'LOW' && analysis.prediction.confidence < 60) score -= 5; // Inconsistent risk/confidence
    
    score += Math.random() * 6 - 3; // Methodology assessment variance
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private async verifyDataAccuracy(request: MarketAnalysisRequest, analysis: MarketAnalysisResult): Promise<number> {
    this.logger.debug('Verifying data sources and accuracy...');
    
    let score = 92; // Base data accuracy score
    
    // Check timestamp freshness
    const analysisAge = Date.now() - analysis.analysisTimestamp;
    if (analysisAge > 300000) score -= 5; // Older than 5 minutes
    
    // Check if price is within reasonable market range for the pair
    const expectedRanges: Record<string, [number, number]> = {
      'ETH/USDC': [2000, 3000],
      'BTC/USDC': [35000, 55000],
      'SOL/USDC': [50, 120],
      'MATIC/USDC': [0.8, 2.0]
    };
    
    const expectedRange = expectedRanges[request.pair];
    if (expectedRange) {
      const [min, max] = expectedRange;
      if (analysis.currentPrice < min || analysis.currentPrice > max) {
        score -= 15; // Price outside expected range
      }
    }
    
    // Simulate data source verification
    score += Math.random() * 6 - 3;
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private async evaluateReasoning(analysis: MarketAnalysisResult): Promise<number> {
    this.logger.debug('Evaluating reasoning quality...');
    
    let score = 82; // Base reasoning score
    
    // Check reasoning length and detail
    if (analysis.reasoning.length < 50) score -= 10; // Too brief
    if (analysis.reasoning.length > 200) score += 5; // Good detail level
    
    // Check for specific technical terms (indicates detailed analysis)
    const technicalTerms = ['RSI', 'MACD', 'support', 'resistance', 'volume', 'momentum', 'divergence'];
    const termsFound = technicalTerms.filter(term => 
      analysis.reasoning.toLowerCase().includes(term.toLowerCase())
    ).length;
    
    score += termsFound * 2; // Bonus for technical depth
    
    // Check consistency between reasoning and prediction
    const reasoningDirection = this.extractDirectionFromReasoning(analysis.reasoning);
    if (reasoningDirection !== analysis.prediction.direction.toLowerCase()) {
      score -= 15; // Reasoning doesn't match prediction
    }
    
    score += Math.random() * 8 - 4; // Reasoning assessment variance
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private async detectBias(analysis: MarketAnalysisResult): Promise<number> {
    this.logger.debug('Checking for potential biases...');
    
    let score = 95; // Base bias score (higher is better = less bias)
    
    // Check for extreme predictions (potential optimism/pessimism bias)
    if (analysis.prediction.confidence > 90) score -= 8; // Potential overconfidence bias
    
    // Check for unrealistic target prices
    const priceChange = (analysis.prediction.targetPrice - analysis.currentPrice) / analysis.currentPrice;
    if (Math.abs(priceChange) > 0.15) score -= 5; // Potential extremism bias
    
    // Check for direction bias (too many bullish or bearish predictions)
    // In a real implementation, this would check historical predictions
    if (analysis.prediction.direction === 'BULLISH' && Math.random() < 0.3) {
      score -= 3; // Simulated bullish bias detection
    }
    
    score += Math.random() * 4 - 2; // Bias detection variance
    
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private extractDirectionFromReasoning(reasoning: string): string {
    const bullishTerms = ['bullish', 'support', 'buy', 'long', 'positive', 'up', 'rise', 'increase'];
    const bearishTerms = ['bearish', 'resistance', 'sell', 'short', 'negative', 'down', 'fall', 'decrease'];
    
    const lowerReasoning = reasoning.toLowerCase();
    
    const bullishCount = bullishTerms.filter(term => lowerReasoning.includes(term)).length;
    const bearishCount = bearishTerms.filter(term => lowerReasoning.includes(term)).length;
    
    if (bullishCount > bearishCount) return 'bullish';
    if (bearishCount > bullishCount) return 'bearish';
    return 'neutral';
  }

  private generateValidationReport(data: {
    reExecutionScore: number;
    methodologyScore: number;
    dataAccuracyScore: number;
    reasoningScore: number;
    biasScore: number;
    confidence: number;
    analysis: MarketAnalysisResult;
  }): string {
    const { reExecutionScore, methodologyScore, dataAccuracyScore, reasoningScore, biasScore, confidence, analysis } = data;
    
    let summary = '';
    if (confidence >= 85) {
      summary = 'Excellent analysis with strong methodology and data accuracy. High confidence in results.';
    } else if (confidence >= 70) {
      summary = 'Good analysis with solid methodology. Minor areas for improvement identified.';
    } else if (confidence >= 50) {
      summary = 'Adequate analysis but with notable concerns. Moderate confidence in results.';
    } else {
      summary = 'Analysis has significant issues. Low confidence in reliability.';
    }

    const concerns: string[] = [];
    if (methodologyScore < 70) concerns.push('Methodology concerns detected');
    if (dataAccuracyScore < 80) concerns.push('Data accuracy issues identified');
    if (reasoningScore < 70) concerns.push('Reasoning quality below standards');
    if (biasScore < 85) concerns.push('Potential bias detected');

    const strengths: string[] = [];
    if (reExecutionScore >= 85) strengths.push('Results highly reproducible');
    if (methodologyScore >= 85) strengths.push('Solid analytical methodology');
    if (dataAccuracyScore >= 90) strengths.push('High data accuracy');
    if (reasoningScore >= 80) strengths.push('Clear and logical reasoning');

    return `
VALIDATION REPORT - ${analysis.pair} Analysis
Generated by: ${this.agentInfo?.metadata.name || 'Bob Validator'}
Timestamp: ${new Date().toISOString()}

SUMMARY: ${summary}

DETAILED SCORES:
- Re-execution: ${reExecutionScore}/100
- Methodology: ${methodologyScore}/100  
- Data Accuracy: ${dataAccuracyScore}/100
- Reasoning: ${reasoningScore}/100
- Bias Detection: ${biasScore}/100

OVERALL CONFIDENCE: ${confidence}/100

STRENGTHS:
${strengths.map(s => `- ${s}`).join('\n') || '- None identified'}

CONCERNS:
${concerns.map(c => `- ${c}`).join('\n') || '- None identified'}

RECOMMENDATION: ${confidence >= 70 ? 'APPROVED' : confidence >= 50 ? 'CONDITIONAL' : 'REJECTED'}
    `.trim();
  }

  async stakeForValidation(amount: string): Promise<void> {
    this.logger.info(`Staking ${amount} ETH for validation services...`);
    
    // In a real implementation, this would interact with the ValidationRegistry's stake function
    await this.simulateWork('Processing stake transaction', 800);
    
    this.logger.success(`Staked ${amount} ETH successfully`);
    this.logger.info('Can now participate in stake-based validation');
  }

  async getValidationHistory(): Promise<Array<{ requestHash: string; confidence: number; timestamp: number }>> {
    this.logger.info('Retrieving validation history...');
    
    // Simulate validation history
    return [
      { requestHash: 'hash1', confidence: 89, timestamp: Date.now() - 86400000 },
      { requestHash: 'hash2', confidence: 92, timestamp: Date.now() - 172800000 },
      { requestHash: 'hash3', confidence: 78, timestamp: Date.now() - 259200000 }
    ];
  }
}