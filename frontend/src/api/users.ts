import { get, handleAPIError, post } from "src/api/requests";

import type { APIResult } from "src/api/requests";

export type User = {
  _id: string;
  name: string;
  profilePictureURL?: string;
};

export type createUserRequest = {
  name: string;
  profilePictureURL?: string;
};

export type UpdateUserRequest = {
  name: string;
  profilePictureURL?: string;
};

export async function createUser(user: createUserRequest): Promise<APIResult<User>> {
  try {
    const response = await post("/api/user", user);
    const data = (await response.json()) as User;
    return { success: true, data };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function getUser(id: string): Promise<APIResult<User>> {
  try {
    const response = await get(`/api/user/${id}`);
    const json = (await response.json()) as User;
    return { success: true, data: json };
  } catch (error) {
    return handleAPIError(error);
  }
}

// export async function getAllTasks(): Promise<APIResult<Task[]>> {
//   try {
//     const response = await get(`/api/tasks`);
//     const tasks = (await response.json()) as TaskJSON[];

//     const res = [];

//     for (const task of tasks) {
//       res.push(parseTask(task));
//     }

//     return { success: true, data: res };
//   } catch (error) {
//     return handleAPIError(error);
//   }
// }

// export async function updateTask(task: UpdateTaskRequest): Promise<APIResult<Task>> {
//   try {
//     const response = await put(`/api/task/${task._id}`, task);
//     const json = (await response.json()) as TaskJSON;
//     return { success: true, data: parseTask(json) };
//   } catch (error) {
//     return handleAPIError(error);
//   }
// }
