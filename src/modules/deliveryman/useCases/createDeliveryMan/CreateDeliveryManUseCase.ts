import { hash } from "bcrypt";
import { prisma } from "../../../../database/prismaClient";

interface ICreateDeliveryMan {
  username: string;
  password: string;
}

export class CreateDeliveryManUseCase {
  async execute({ password, username }: ICreateDeliveryMan) {
    if (!password) {
      throw new Error(`Missing password`);
    }

    if (!username) {
      throw new Error(`Missing username`);
    }

    const deliveryManExists = await prisma.deliveryMan.findFirst({
      where: {
        username: {
          mode: "insensitive",
          equals: username,
        },
      },
    });

    if (deliveryManExists) {
      throw new Error(`DeliveryMan ${username} already exists`);
    }

    // Criptografar a senha
    const hasPassword = await hash(password, 10);

    // Salvar o deliveryman
    const deliveryMan = await prisma.deliveryMan.create({
      data: {
        username,
        password: hasPassword,
      },
    });

    return deliveryMan;
  }
}
