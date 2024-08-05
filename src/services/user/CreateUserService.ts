import prismaClient from "../../prisma";
import { hash } from "bcrypt";

interface UserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!name || !email || !password) {
      throw new Error("All fields are mandatory");
    }

    const userAlredyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlredyExists) {
      throw new Error("User alredy exists");
    }

    const passwordHashed = await hash(password, 10);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHashed,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}

export { CreateUserService };
