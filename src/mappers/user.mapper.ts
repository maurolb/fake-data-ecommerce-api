import { UserEntity } from "../entities/user.entity";
import { CustomError } from "../errors/custom.error";

export class UserMapper {
  static userEntityFromObject(object: { [key: string]: any }) {
    const { id, email, password, name, role, lastname, address, phone, image } =
      object;

    if (!id) {
      throw CustomError.badRequest("Missing id");
    }

    if (!email) throw CustomError.badRequest("Missing email");
    if (!password) throw CustomError.badRequest("Missing password");
    if (!name) throw CustomError.badRequest("Missing name");

    if (!role) throw CustomError.badRequest("Missing role");

    return new UserEntity(
      id,
      email,
      password,
      name,
      role,
      lastname,
      address,
      phone,
      image
    );
  }
}
