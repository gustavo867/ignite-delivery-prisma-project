import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export async function ensureAuthenticateClient(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Token is not provided",
    });
  }

  const [_, token] = authHeader?.split(" ");

  try {
    const { sub } = verify(token, "c545e1d76f03d382328fac7185483436456109a5");

    if (!sub) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    if (typeof sub !== "string") {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }

    req.id_client = sub;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}
