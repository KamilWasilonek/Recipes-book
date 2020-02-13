export class User {
  constructor(
    public _id: string,
    public token: string,
    public email: string,
    public name: string,
    public surname: string
  ) {}
}
