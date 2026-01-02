import { body } from "express-validator";

const makeIDValidator = () =>
  body("_id")
    .exists()
    .withMessage("_id is required")
    .bail()
    .isMongoId()
    .withMessage("_id must be a MongoDB object ID");
const makeTitleValidator = () =>
  body("name")
    .exists()
    .withMessage("name is required")
    .bail()
    .isString()
    .withMessage("name must be a string")
    .bail()
    .notEmpty()
    .withMessage("name cannot be empty");
const makeProfileValidator = () =>
  body("profilePictureURL").optional().isString().withMessage("profilePictureURL must be a string");

export const createUser = [makeTitleValidator(), makeProfileValidator()];

export const updateUser = [makeIDValidator(), makeTitleValidator(), makeProfileValidator()];
