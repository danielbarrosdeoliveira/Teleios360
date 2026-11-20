import { Injectable } from '@nestjs/common';

export interface Lancamento {
  id: string;
  tipo: 'fixo' | 'parcelado' | 'variavel';
  descricao: string;
  valor: number;
  status: 'Pendente' | 'Pago' | 'Atrasado';
  workspace: 'pf' | 'pj' | 'igreja';
}

@Injectable()
export class FinanceiroService {
  private lancamentos: Lancamento[] = [
    { 
      id: '1', 
      tipo: 'fixo', 
      descricao: 'Pró-labore mensal', 
      valor: 5000, 
      status: 'Pago', 
      workspace: 'pf' 
    },
    { 
      id: '2', 
      tipo: 'parcelado', 
      descricao: 'Financiamento imóvel 48x', 
      valor: 2500, 
      status: 'Pendente', 
      workspace: 'pf' 
    },
    { 
      id: '3', 
      tipo: 'variavel', 
      descricao: 'Supermercado', 
      valor: 800, 
      status: 'Pago', 
      workspace: 'pf' 
    }
  ];

  listarLancamentos(workspace: 'pf' | 'pj' | 'igreja') {
    return this.lancamentos.filter(l => l.workspace === workspace);
  }

  adicionarLancamento(lancamento: Lancamento) {
    this.lancamentos.push(lancamento);
  }
}
