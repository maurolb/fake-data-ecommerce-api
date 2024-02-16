export class DeleteUserDto {
  private constructor(
    public id: string,
    public uidFromToken: number,
    public roleFromToken: number
  ) {}

  static delete(
    uid: string,
    object: { [key: string]: any }
  ): [string?, DeleteUserDto?] {
    const { id, role } = object;

    if (!uid) return ["Missing id"];

    return [undefined, new DeleteUserDto(uid, id, role)];
  }
}
