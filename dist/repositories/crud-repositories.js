"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRepository = CrudRepository;
const http_status_codes_1 = require("http-status-codes");
const app_error_1 = require("../utils/errors/app-error");
/**
 * Generic CRUD Repository
 * @template T - The model instance type (e.g., Airplane, City)
 * @template TCreationAttributes - The attributes needed to create the model
 */
function CrudRepository(model) {
    const create = async (data) => {
        return await model.create(data);
    };
    const destroy = async (id) => {
        const response = await model.destroy({
            where: {
                id,
            },
        });
        return response;
    };
    const getById = async (id) => {
        const response = await model.findByPk(id);
        if (!response) {
            throw new app_error_1.AppError("The resource you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return response;
    };
    const update = async (id, data) => {
        const response = await model.findByPk(id);
        if (!response) {
            throw new app_error_1.AppError("Not able to found the resource", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return await response.update(data);
    };
    const deleteById = async (id) => {
        const response = await model.findByPk(id);
        if (!response) {
            throw new app_error_1.AppError("The resource you requested is not present", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        await response.destroy();
        return true;
    };
    const findAll = async (options = {}) => {
        const safeOptions = { ...options };
        if (safeOptions.limit !== undefined) {
            const l = Number(safeOptions.limit);
            safeOptions.limit = Number.isFinite(l) ? Math.max(1, Math.floor(l)) : undefined;
        }
        if (safeOptions.offset !== undefined) {
            const o = Number(safeOptions.offset);
            safeOptions.offset = Number.isFinite(o) ? Math.max(0, Math.floor(o)) : undefined;
        }
        if (safeOptions.order) {
            try {
                if (Array.isArray(safeOptions.order)) {
                    safeOptions.order = safeOptions.order.map((entry) => {
                        if (Array.isArray(entry) && entry.length >= 2) {
                            const dir = String(entry[1]).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                            return [entry[0], dir];
                        }
                        return entry;
                    });
                }
            }
            catch (e) {
                // fallback: remove order if malformed
                delete safeOptions.order;
            }
        }
        const response = await model.findAll(safeOptions);
        return response;
    };
    const findAndCountAll = async (options = {}) => {
        const safeOptions = { ...options };
        if (safeOptions.limit !== undefined) {
            const l = Number(safeOptions.limit);
            safeOptions.limit = Number.isFinite(l) ? Math.max(1, Math.floor(l)) : undefined;
        }
        if (safeOptions.offset !== undefined) {
            const o = Number(safeOptions.offset);
            safeOptions.offset = Number.isFinite(o) ? Math.max(0, Math.floor(o)) : undefined;
        }
        if (safeOptions.order) {
            try {
                if (Array.isArray(safeOptions.order)) {
                    safeOptions.order = safeOptions.order.map((entry) => {
                        if (Array.isArray(entry) && entry.length >= 2) {
                            const dir = String(entry[1]).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
                            return [entry[0], dir];
                        }
                        return entry;
                    });
                }
            }
            catch (e) {
                delete safeOptions.order;
            }
        }
        const response = await model.findAndCountAll(safeOptions);
        return response;
    };
    return {
        create,
        getById,
        update,
        destroy,
        deleteById,
        findAll,
        findAndCountAll,
    };
}
