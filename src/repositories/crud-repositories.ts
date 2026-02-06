import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/errors/app-error";

export function CrudRepository(model: any) {
  const create = async (data: any) => {
    return await model.create(data);
  };
  const destroy = async (id: number) => {
    const response = await model.destroy({
      where: {
        id,
      },
    });
    return response;
  };
  const getById = async (id: number) => {
    const response = await model.findByPk(id);
    if (!response) {
      throw new AppError(
        "The airplane you requested is not present",
        StatusCodes.NOT_FOUND,
      );
    }
    return response;
  };

  const update = async (id: number, data: any) => {
    const record = await model.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  };

  const deleteById = async (id: number) => {
    const record = await model.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
  };

  const findAll = async (options: any = {}) => {
    const response = await model.findAll(options);
    return response;
  };

  const findAndCountAll = async (options: any = {}) => {
    const response = await model.findAndCountAll(options);
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
