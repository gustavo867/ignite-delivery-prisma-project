import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../../database/prismaClient";

interface IAuthenticateDeliveryMan {
  username: string;
  password: string;
}

export class AuthenticateDeliveryManUseCase {
  async execute({ username, password }: IAuthenticateDeliveryMan) {
    if (!password) {
      throw new Error(`Missing password`);
    }

    if (!username) {
      throw new Error(`Missing username`);
    }

    // Verificar se username cadastrado
    const deliveryMan = await prisma.deliveryMan.findFirst({
      where: { username },
    });

    if (!deliveryMan) {
      throw new Error("Username or password invalid!");
    }

    // Verificar se senha corresponde ao username
    const passwordMatch = await compare(password, deliveryMan.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    // Gerar o token
    const token = sign(
      { username },
      "c545e1d76f03d382328fac7185483436456109a6",
      {
        subject: deliveryMan.id,
        expiresIn: "1d",
      }
    );

    delete (deliveryMan as unknown as any).password;

    return {
      token,
      deliveryMan,
    };
  }
}
