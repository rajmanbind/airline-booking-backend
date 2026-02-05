"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRepository = CrudRepository;
const config_1 = require("../config");
function CrudRepository(model) {
    const create = async (data) => {
        try {
            const resposne = await model.create(data);
            return resposne;
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in the crud Repo: create");
            throw error;
        }
    };
    const destroy = async (data) => {
        try {
            const resposne = await model.destroy({
                where: {
                    id: data,
                },
            });
            return resposne;
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in the crud Repo: destroy");
            throw error;
        }
    };
    const getById = async (id) => {
        try {
            const resposne = await model.findByPk(id);
            return resposne;
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in the crud Repo: getById");
            throw error;
        }
    };
    const getAll = async (id) => {
        try {
            const resposne = await model.findAll(id);
            return resposne;
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in the crud Repo: getAll");
            throw error;
        }
    };
    const update = async (id, data) => {
        // data: {}
        try {
            const record = await model.findByPk(id);
            if (!record)
                return null;
            return await record.update(data);
            // const response = await model.update(data,{
            //     where:{
            //         id:id,
            //     }
            // })
            // return response;
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in the crud Repo: update");
            throw error;
        }
    };
    const deleteById = async (id) => {
        try {
            const record = await model.findByPk(id);
            if (!record)
                return null;
            await record.destroy();
            return true;
        }
        catch (error) {
            config_1.Logger.error("Something went wrong in the crud Repo: deleteById");
            throw error;
        }
    };
    return {
        create,
        getById,
        getAll,
        update,
        destroy,
        deleteById,
    };
}
