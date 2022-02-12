import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./UpdateDeliverymanUseCase";

export class UpdateDeliverymanController {
  async handle(req: Request, res: Response) {
    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();

    const delivery = await updateDeliverymanUseCase.execute({
      id_delivery: req.params.id,
      id_deliveryman: req.id_deliveryman,
    });

    return res.json(delivery);
  }
}
