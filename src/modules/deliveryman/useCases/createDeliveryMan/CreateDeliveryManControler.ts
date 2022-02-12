import { Request, Response } from "express";
import { CreateDeliveryManUseCase } from "./CreateDeliveryManUseCase";

export class CreateDeliveryManController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;
    const createDeliveryManUseCase = new CreateDeliveryManUseCase();

    const result = await createDeliveryManUseCase.execute({
      username,
      password,
    });

    return res.json(result);
  }
}
