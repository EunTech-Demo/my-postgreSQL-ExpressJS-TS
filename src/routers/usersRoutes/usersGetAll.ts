import { getAllUsers } from "@/handlers/users";
import { IRouteGetAllUsersQuery } from "@/interfaces/users.interface";
import { Request, Response } from "express";

const usersGetAll = async (req: Request, res: Response) => {
  try {
    const { username } = req.query as IRouteGetAllUsersQuery;
    const usersList = await getAllUsers({ username });

    res.json({
      success: true,
      error: null,
      data: usersList,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error?.message || error,
      data: null,
    });
  }
};

export default usersGetAll;
