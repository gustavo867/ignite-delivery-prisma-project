import { prisma } from "../../../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    if (!password) {
      throw new Error(`Missing password`);
    }

    if (!username) {
      throw new Error(`Missing username`);
    }

    // Verificar se username cadastrado
    const client = await prisma.clients.findFirst({
      where: { username },
    });

    if (!client) {
      throw new Error("Username or password invalid!");
    }

    // Verificar se senha corresponde ao username
    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    // Gerar o token
    const token = sign(
      { username },
      "c545e1d76f03d382328fac7185483436456109a5",
      {
        subject: client.id,
        expiresIn: "1d",
      }
    );

    delete (client as unknown as any).password;

    return {
      token,
      client,
    };
  }
}
