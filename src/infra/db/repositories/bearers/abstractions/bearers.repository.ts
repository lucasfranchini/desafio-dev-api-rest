import { NewBearer } from '@infra/db/schemas/bearer.schema';

export abstract class BearerRepository {
  abstract create(
    bearer: NewBearer,
  ): Promise<{ document: string; accountNumber: number }>;
  abstract deleteByDocument(document: string): Promise<void>;
}
