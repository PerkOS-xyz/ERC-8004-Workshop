import chalk from 'chalk';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export class Logger {
  private level: LogLevel;

  constructor(level: LogLevel = LogLevel.INFO) {
    this.level = level;
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.level;
  }

  private formatMessage(level: string, message: string, emoji?: string): string {
    const timestamp = new Date().toISOString();
    const prefix = emoji ? `${emoji} ` : '';
    return `[${timestamp}] ${level}: ${prefix}${message}`;
  }

  debug(message: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(chalk.gray(this.formatMessage('DEBUG', message)));
    }
  }

  info(message: string, emoji?: string): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(chalk.blue(this.formatMessage('INFO', message, emoji)));
    }
  }

  success(message: string, emoji: string = '✅'): void {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(chalk.green(this.formatMessage('SUCCESS', message, emoji)));
    }
  }

  warn(message: string, emoji: string = '⚠️'): void {
    if (this.shouldLog(LogLevel.WARN)) {
      console.log(chalk.yellow(this.formatMessage('WARN', message, emoji)));
    }
  }

  error(message: string, error?: Error, emoji: string = '❌'): void {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.log(chalk.red(this.formatMessage('ERROR', message, emoji)));
      if (error && this.level === LogLevel.DEBUG) {
        console.log(chalk.red(error.stack));
      }
    }
  }

  // Special formatting methods for demo
  title(message: string): void {
    console.log('\n' + chalk.bold.blue('='.repeat(60)));
    console.log(chalk.bold.blue(`🚀 ${message}`));
    console.log(chalk.bold.blue('='.repeat(60)));
  }

  section(message: string, emoji: string = '📋'): void {
    console.log('\n' + chalk.bold.cyan(`${emoji} ${message}`));
    console.log(chalk.cyan('-'.repeat(40)));
  }

  step(step: number, total: number, message: string): void {
    console.log(chalk.magenta(`\n[${step}/${total}] ${message}`));
  }

  result(message: string, value: any): void {
    console.log(chalk.green(`   └─ ${message}: ${chalk.white(value)}`));
  }

  agent(name: string, message: string): void {
    const colors = {
      Alice: chalk.cyan,
      Bob: chalk.yellow,
      Charlie: chalk.magenta
    };
    
    const color = colors[name as keyof typeof colors] || chalk.white;
    console.log(color(`   ${name}: "${message}"`));
  }

  transaction(hash: string): void {
    console.log(chalk.gray(`   └─ Tx: ${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`));
  }

  gasUsed(amount: string): void {
    console.log(chalk.gray(`   └─ Gas: ${amount}`));
  }

  divider(): void {
    console.log(chalk.gray('─'.repeat(60)));
  }

  newLine(): void {
    console.log('');
  }

  // Progress indicators
  loading(message: string): () => void {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    
    const interval = setInterval(() => {
      process.stdout.write(`\r${chalk.blue(frames[i])} ${message}`);
      i = (i + 1) % frames.length;
    }, 100);

    return () => {
      clearInterval(interval);
      process.stdout.write('\r' + ' '.repeat(message.length + 10) + '\r');
    };
  }

  // Demo-specific methods
  demoHeader(): void {
    console.clear();
    console.log(chalk.blue(`
╔══════════════════════════════════════════════════════════╗
║                  ERC-8004 Multi-Agent Demo               ║
║                                                          ║
║  🎭 Alice (Market Analyst) + Bob (Validator) + Charlie  ║
║  📊 Real blockchain transactions + Smart contracts      ║
║  🔗 Complete trustless agent interaction workflow       ║
╚══════════════════════════════════════════════════════════╝
    `));
  }

  demoSummary(data: {
    aliceReputation: number;
    bobValidationRate: number;
    totalInteractions: number;
    systemTrust: string;
  }): void {
    this.section('📊 Final Results', '🎉');
    this.result("Alice's reputation", `${data.aliceReputation}/100 (1 review)`);
    this.result("Bob's validation success rate", `${data.bobValidationRate}%`);
    this.result("Total interactions", data.totalInteractions);
    this.result("System trust score", data.systemTrust);
    this.newLine();
    this.success("Demo completed successfully!", '🎉');
  }
}