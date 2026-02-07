import { StatusCodes } from "http-status-codes";
import { AppError } from "../utils/errors/app-error";
import { Model, ModelStatic, FindOptions, DestroyOptions } from "sequelize";

/**
 * Generic CRUD Repository
 * @template T - The model instance type (e.g., Airplane, City)
 * @template TCreationAttributes - The attributes needed to create the model
 */
export function CrudRepository<T extends Model, TCreationAttributes = Partial<T>>(
  model: ModelStatic<T>
) {
  const create = async (data: TCreationAttributes): Promise<T> => {
    return await model.create(data as any);
  };

  const destroy = async (id: number): Promise<number> => {
    const response = await model.destroy({
      where: {
        id,
      } as DestroyOptions['where'],
    });
    return response;
  };

  const getById = async (id: number): Promise<T> => {
    const response = await model.findByPk(id);
    if (!response) {
      throw new AppError(
        "The resource you requested is not present",
        StatusCodes.NOT_FOUND,
      );
    }
    return response;
  };

  const update = async (id: number, data: Partial<TCreationAttributes>): Promise<T> => {
    const response = await model.findByPk(id);
    if (!response) {
      throw new AppError(
        "Not able to found the resource",
        StatusCodes.NOT_FOUND,
      );
    }
    return await response.update(data as any);
  };

  const deleteById = async (id: number): Promise<boolean> => {
    const response = await model.findByPk(id);
    if (!response) {
      throw new AppError(
        "The resource you requested is not present",
        StatusCodes.NOT_FOUND,
      );
    }
    await response.destroy();
    return true;
  };

  const findAll = async (options: FindOptions<T> = {}): Promise<T[]> => {
    const response = await model.findAll(options);
    return response;
  };

  const findAndCountAll = async (options: FindOptions<T> = {}): Promise<{ rows: T[]; count: number }> => {
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
