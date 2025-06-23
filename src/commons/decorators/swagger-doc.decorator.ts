import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ErrorsMessage } from '../errors/enums';

export function SwaggerDocDecorator(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiResponse({
      status: 500,
      description: 'Erro inesperado ao buscar transações no banco de dados',
      example: {
        message: ErrorsMessage.DEFAULT,
      },
    }),
  );
}
