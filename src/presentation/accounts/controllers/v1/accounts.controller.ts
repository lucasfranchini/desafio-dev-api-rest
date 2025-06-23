import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('accounts')
@Controller({ version: '1', path: 'accounts' })
export class AccountsV1Controller {
  constructor() {}
}
