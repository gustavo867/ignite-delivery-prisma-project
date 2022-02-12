import { prisma } from "../../../../database/prismaClient";

interface IUpdateDeliverymanUseCase {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateDeliverymanUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateDeliverymanUseCase) {
    console.log("a", id_deliveryman);

    const result = await prisma.deliveries.update({
      where: {
        id: id_delivery,
      },
      data: {
        id_deliveryman,
      },
    });

    console.log("result", result);

    return result;
  }
}
