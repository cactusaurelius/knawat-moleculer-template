import { Errors } from 'moleculer';

const { MoleculerError } = Errors;

export class AppError extends MoleculerError {
  public constructor(message: string, code: number, type?: string, data?: any) {
    super(message, code, type, data);
    this.name = 'KnawatAppError';
  }
}
