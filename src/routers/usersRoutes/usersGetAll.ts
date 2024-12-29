import { getAllUsers } from "@/handlers/users";
import { Request, Response } from "express";

const usersGetAll = async (req: Request, res: Response) => {
  try {
    const usersList = await getAllUsers();

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
