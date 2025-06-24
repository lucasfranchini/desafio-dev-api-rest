import { SaveMovementService } from '@application/bank-statement/v1/save-movement.service';
import { BankStatementCreateDTO } from '@domain/bank-statements/bank-statement.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BankStatementConsumer {
  constructor(private readonly saveMovementService: SaveMovementService) {}

  async handleBankStatementMessage(message: BankStatementCreateDTO) {
    await this.saveMovementService.execute(message);
  }
}
