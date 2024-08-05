import prismaClient from "../../prisma";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    if (!email || !password) {
      throw new Error("All fields are mandatory");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("User/password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("User/password incorrect");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      process.env.JWT_PASS,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { id: user.id, name: user.name, email: user.email, token: token };
  }
}

export { AuthUserService };
