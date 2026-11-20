import { Module } from '@nestjs/common';
import { FinanceiroModule } from './financeiro/financeiro.module';

@Module({
  imports: [FinanceiroModule],
})
export class AppModule {}
