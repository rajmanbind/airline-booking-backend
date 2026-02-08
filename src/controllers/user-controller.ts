import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user-service";
import { StatusCodes } from "http-status-codes";
import { SuccessResponse } from "../utils/common";

export const UserController = {
  async create(req: Request, res: Response, next: NextFunction) {
    const userData = {
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phone: req.body.phone,
      dateOfBirth: req.body.dateOfBirth,
      passportNumber: req.body.passportNumber,
      nationality: req.body.nationality,
      role: req.body.role,
    };
    const user = await UserService.createUser(userData);
    SuccessResponse.data = user;
    SuccessResponse.message = "User created successfully";
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    const user = await UserService.getUserById(Number(req.params.id));
    SuccessResponse.data = user;
    SuccessResponse.message = "User fetched successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getAll(req: Request, res: Response, next: NextFunction) {
    const result = await UserService.getAllUsers(req.query);
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Users fetched successfully",
      ...result,
    });
  },

  async update(req: Request, res: Response, next: NextFunction) {
    const updateData = req.body;
    const updated = await UserService.updateUser(
      Number(req.params.id),
      updateData,
    );
    SuccessResponse.data = updated;
    SuccessResponse.message = "User updated successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async delete(req: Request, res: Response, next: NextFunction) {
    const result = await UserService.deleteUser(Number(req.params.id));
    SuccessResponse.data = { deleted: result };
    SuccessResponse.message = "User deleted successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },

  async getByEmail(req: Request, res: Response, next: NextFunction) {
    const email = String(req.params.email);
    const user = await UserService.getUserByEmail(email);
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }
    SuccessResponse.data = user;
    SuccessResponse.message = "User fetched successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  },
};
