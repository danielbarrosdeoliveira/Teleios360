import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { Lancamento } from './financeiro.service';

@Controller('financeiro')
export class FinanceiroController {
  constructor(private readonly service: FinanceiroService) {}

  @Get(':workspace')
  listar(@Param('workspace') workspace: string) {
    return this.service.listarLancamentos(workspace as 'pf' | 'pj' | 'igreja');
  }

  @Post()
  adicionar(@Body() lancamento: Lancamento) {
    return this.service.adicionarLancamento(lancamento);
  }
}
