export enum ErrorsMessage {
  DEFAULT = 'Aconteceu um erro inesperado',
  ACCOUNT_NOT_CREATED = 'Não foi possivel salvar a conta no banco de dados',
  ACCOUNTS_NOT_FOUND = 'Não foi encontrado contas no banco de dados',
  BEARER_NOT_CREATED = 'Não foi possivel salvar o portador no banco de dados',
  BEARER_NOT_DELETED = 'Não foi possivel deletar o portador no banco de dados',
  ACCOUNT_BALANCE_INVALID = 'O saldo da conta não pode ser negativo',
  ACCOUNT_BALANCE_MOVEMENT_FORBIDDEN = 'Movimentação de conta não permitida para o status atual',
  BANK_STATEMENT_NOT_CREATED = 'Não foi possivel salvara transação no banco de dados do extrato',
}
