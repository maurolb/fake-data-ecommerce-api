export class UserEntity {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public name: string,
    public role: number,
    public lastname?: string,
    public address?: string,
    public phone?: string,
    public image?: string
  ) {}
}
