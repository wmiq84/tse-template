import createHttpError from "http-errors";
import TaskModel from "src/models/task";

import type { RequestHandler } from "express";

export const getAllTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await TaskModel.find().sort({ dateCreated: -1 });

    if (tasks === null) {
      throw createHttpError(404, "Task not found.");
    }

    // tasks.sort({ dateCreated})

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};
