export class InvalidCredentialsError extends Error {
  property: string;
  constructor(property: string) {
    super();
    this.property = property;
  }
}
