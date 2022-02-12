import { Request, Response } from "express";
import { AuthenticateDeliveryManUseCase } from "./AuthenticateDeliveryManUseCase";

export class AuthenticateDeliveryManController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;
    const authenticateDeliveryManUseCase = new AuthenticateDeliveryManUseCase();

    const result = await authenticateDeliveryManUseCase.execute({
      username,
      password,
    });

    return res.json(result);
  }
}
