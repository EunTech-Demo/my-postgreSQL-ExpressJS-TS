import { executeSQLQuery } from "@/database/operations";
import { Request, Response } from "express";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const response = await executeSQLQuery("SELECT * FROM crud_system.users");

    const { rows } = response as {
      rows: {
        id: number | string;
        username: string;
        password: string;
        created_at: string;
        updated_at: string | null;
      }[];
    };

    res.json({
      success: true,
      error: null,
      data: rows,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error?.message || error,
      data: null,
    });
  }
};

export default getAllUsers;
