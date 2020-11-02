import { Errors } from 'moleculer';

const { MoleculerError } = Errors;

export class MpError extends MoleculerError {
  constructor(
    name: string,
    message: string,
    code: number,
    type?: string,
    data?: any
  ) {
    super(message, code, type, data);
    this.name = name;
  }
}
