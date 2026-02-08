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
    const safeOptions = { ...options } as any;
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
          safeOptions.order = safeOptions.order.map((entry: any) => {
            if (Array.isArray(entry) && entry.length >= 2) {
              const dir = String(entry[1]).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
              return [entry[0], dir];
            }
            return entry;
          });
        }
      } catch (e) {
        // fallback: remove order if malformed
        delete safeOptions.order;
      }
    }

    const response = await model.findAll(safeOptions);
    return response;
  };

  const findAndCountAll = async (options: FindOptions<T> = {}): Promise<{ rows: T[]; count: number }> => {
    const safeOptions = { ...options } as any;
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
          safeOptions.order = safeOptions.order.map((entry: any) => {
            if (Array.isArray(entry) && entry.length >= 2) {
              const dir = String(entry[1]).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
              return [entry[0], dir];
            }
            return entry;
          });
        }
      } catch (e) {
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
