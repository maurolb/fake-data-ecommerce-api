import { DeleteUserDto } from "../dtos/user/delete.user.dto";
import { GetUserDto } from "../dtos/user/get.user.dto";
import { UpdateUserDto } from "../dtos/user/update.user.dto";
import { UserEntity } from "../entities/user.entity";
import { CustomError } from "../errors/custom.error";
import { UserMapper } from "../mappers/user.mapper";
import User from "../models/user.model";

export class UserDatasource {
  async getAll(): Promise<UserEntity[]> {
    try {
      const usersDb = await User.findAll();

      const users: UserEntity[] = [];

      usersDb.forEach((user: User) => {
        users.push(UserMapper.userEntityFromObject(user));
      });

      return users;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async getById(getUserDto: GetUserDto): Promise<UserEntity> {
    const { id, uidFromToken, roleFromToken } = getUserDto;

    try {
      if (id !== String(uidFromToken) && roleFromToken < 2)
        throw CustomError.unauthorize("Insufficient permissions");

      const user = await User.findByPk(id);
      if (!user) throw CustomError.notFound("User not found");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }

  async deleteById(deleteUserDto: DeleteUserDto): Promise<Object> {
    const { id, uidFromToken, roleFromToken } = deleteUserDto;

    try {
      if (id !== String(uidFromToken) && roleFromToken < 2)
        throw CustomError.unauthorize("Insufficient permissions");

      const user = await User.findByPk(id);
      if (!user) throw CustomError.notFound("User not found");

      await user.destroy();

      return { message: "User deleted" };
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      console.log(error);
      throw CustomError.internalServer();
    }
  }

  async updateById(updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const {
      id,
      uidFromToken,
      roleFromToken,
      emailFromToken,
      name,
      lastname,
      email,
      address,
      phone,
      image,
    } = updateUserDto;

    try {
      // Busca el usuario a editar
      const userToUpdate: User | null = await User.findByPk(id);
      if (!userToUpdate) throw CustomError.notFound("User not found");

      // Comprueba que el id del token sea el mismo que el id del usuario a editar
      // Rol 2 (admin) se pasa por los huevos
      if (String(uidFromToken) !== id && roleFromToken < 2) {
        throw CustomError.unauthorize("Insufficient permissions");
      }

      if (email !== emailFromToken) {
        // Comprueba que el nuevo email no se encuentra en uso
        const userExists: User | null = await User.findOne({
          where: { email },
        });

        if (userExists) throw CustomError.badRequest("Email is already in use");
      }

      // edita el usuario
      userToUpdate.name = name;
      userToUpdate.lastname = lastname;
      userToUpdate.email = email;
      userToUpdate.password = userToUpdate.password;
      userToUpdate.phone = phone;
      userToUpdate.address = address;
      userToUpdate.image = image;

      // guarda en base de datos
      await User.update(userToUpdate.dataValues, {
        where: { id },
      });

      return UserMapper.userEntityFromObject(userToUpdate);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer();
    }
  }
}
