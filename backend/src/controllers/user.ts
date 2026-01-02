import { validationResult } from "express-validator";
import UserModel from "src/models/user";
import validationErrorParser from "src/util/validationErrorParser";

import type { RequestHandler } from "express";

type CreateUserBody = {
  name: string;
  profilePictureURL?: string;
};

export const createUser: RequestHandler = async (req, res, next) => {
  const errors = validationResult(req);
  const { name, profilePictureURL } = req.body as CreateUserBody;

  try {
    validationErrorParser(errors);

    const task = await UserModel.create({
      name,
      profilePictureURL,
    });
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
