import { MovementType } from '../enums/movement-type.enum';

export class AccountBalanceMovementDTO {
  type: MovementType;
  amount: number;
  accountNumber: number;
}
