export abstract class AccountsGateway {
  abstract createAccount(bearerDocument: string): Promise<{ number: number }>;
}
