export class GetUserDto {
  private constructor(
    public id: string,
    public uidFromToken: number,
    public roleFromToken: number
  ) {}

  static getById(
    uid: string,
    object: { [key: string]: any }
  ): [string?, GetUserDto?] {
    const { id, role } = object;

    if (!uid) return ["Missing id"];

    return [undefined, new GetUserDto(uid, id, role)];
  }
}
