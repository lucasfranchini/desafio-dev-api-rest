import { CreateBearerService } from '@application/bearers/v1/create-bearer.service';
import { DeleteBearerService } from '@application/bearers/v1/delete-bearer.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Param,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateBearerValidator } from '@presentation/bearers/validators/create-bearer.validator';
import validateDocument from '@presentation/bearers/validators/document.validator';
import { SwaggerDocDecorator } from 'src/commons/decorators/swagger-doc.decorator';
import { ErrorsSource } from 'src/commons/errors/enums';
import { handleError } from 'src/commons/errors/functions';

@ApiTags('bearers')
@Controller({ version: '1', path: 'bearers' })
export class BearersV1Controller {
  constructor(
    private readonly createBearerService: CreateBearerService,
    private readonly deleteBearerService: DeleteBearerService,
  ) {}

  @Post()
  @SwaggerDocDecorator('criação de um portador no banco de dados')
  @ApiResponse({
    status: 201,
    description: 'Criado com sucesso',
    example: {
      document: '12345678909',
      accountNumber: 1,
    },
  })
  @ApiResponse({ status: 400, description: 'Erro ao tentar criar um portador' })
  async createBearer(@Body() body: CreateBearerValidator) {
    try {
      const isValidDocument = validateDocument(body.document);
      if (!isValidDocument) {
        throw new BadRequestException('numero do documento é invalido');
      }
      return await this.createBearerService.execute(body);
    } catch (error) {
      handleError(ErrorsSource.CREATE_ACCOUNT, error);
    }
  }

  @Delete('/:document')
  @SwaggerDocDecorator(
    'deleção de um portador no banco de dados e de suas contas associadas',
  )
  @ApiResponse({
    status: 200,
    description: 'deletado com sucesso',
  })
  @ApiResponse({ status: 400, description: 'Erro ao tentar criar um portador' })
  async deleteBearer(@Param('document') document: string) {
    try {
      const isValidDocument = validateDocument(document);
      if (!isValidDocument) {
        throw new BadRequestException('numero do documento é invalido');
      }
      return await this.deleteBearerService.execute(document);
    } catch (error) {
      handleError(ErrorsSource.CREATE_ACCOUNT, error);
    }
  }
}
