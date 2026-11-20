import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import type { FinanceiroService, Lancamento } from './financeiro.service';

@Controller('financeiro')
export class FinanceiroController {
  constructor(private readonly service: FinanceiroService) {}

  @Get(':workspace')
  listar(@Param('workspace') _workspace: string) {
    return this.service.listarLancamentos(_workspace as 'pf' | 'pj' | 'igreja');
  }

  @Post()
  adicionar(@Body() _lancamento: Lancamento) {
    return this.service.adicionarLancamento(_lancamento);
  }
}
