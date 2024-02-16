import { Validators } from "../../config/validators";

export class UpdateUserDto {
  private constructor(
    public id: string,
    public uidFromToken: number,
    public roleFromToken: number,
    public emailFromToken: string,
    public name: string,
    public lastname: string,
    public email: string,
    public address: string,
    public phone: string,
    public image: string
  ) {}

  static update(
    uid: string,
    object: { [key: string]: any }
  ): [string?, UpdateUserDto?] {
    const { name, lastname, email, address, phone, image, user } = object;
    const { id, role, email: emailFromToken } = user;

    if (!uid) return ["Missing id"];
    if (!name) return ["Missing name"];
    if (!Validators.email.test(email)) return ["Email is not valid"];

    return [
      undefined,
      new UpdateUserDto(
        uid,
        id,
        role,
        emailFromToken,
        name,
        lastname,
        email,
        address,
        phone,
        image
      ),
    ];
  }
}
