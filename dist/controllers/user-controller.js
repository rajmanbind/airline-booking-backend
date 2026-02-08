"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../services/user-service");
const http_status_codes_1 = require("http-status-codes");
const common_1 = require("../utils/common");
exports.UserController = {
    async create(req, res, next) {
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
        const user = await user_service_1.UserService.createUser(userData);
        common_1.SuccessResponse.data = user;
        common_1.SuccessResponse.message = "User created successfully";
        return res.status(http_status_codes_1.StatusCodes.CREATED).json(common_1.SuccessResponse);
    },
    async getById(req, res, next) {
        const user = await user_service_1.UserService.getUserById(Number(req.params.id));
        common_1.SuccessResponse.data = user;
        common_1.SuccessResponse.message = "User fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getAll(req, res, next) {
        const result = await user_service_1.UserService.getAllUsers(req.query);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Users fetched successfully",
            ...result,
        });
    },
    async update(req, res, next) {
        const updateData = req.body;
        const updated = await user_service_1.UserService.updateUser(Number(req.params.id), updateData);
        common_1.SuccessResponse.data = updated;
        common_1.SuccessResponse.message = "User updated successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async delete(req, res, next) {
        const result = await user_service_1.UserService.deleteUser(Number(req.params.id));
        common_1.SuccessResponse.data = { deleted: result };
        common_1.SuccessResponse.message = "User deleted successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
    async getByEmail(req, res, next) {
        const email = String(req.params.email);
        const user = await user_service_1.UserService.getUserByEmail(email);
        if (!user) {
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                success: false,
                message: "User not found",
            });
        }
        common_1.SuccessResponse.data = user;
        common_1.SuccessResponse.message = "User fetched successfully";
        return res.status(http_status_codes_1.StatusCodes.OK).json(common_1.SuccessResponse);
    },
};
