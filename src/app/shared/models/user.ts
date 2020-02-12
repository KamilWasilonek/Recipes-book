export class User {
  constructor(
    public id: string,
    public token: string,
    public email: string,
    public name: string,
    public surname: string
  ) {}
}
