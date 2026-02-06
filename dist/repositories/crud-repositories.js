"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CrudRepository = CrudRepository;
function CrudRepository(model) {
    const create = async (data) => {
        return await model.create(data);
    };
    const destroy = async (data) => {
        const resposne = await model.destroy({
            where: {
                id: data,
            },
        });
        return resposne;
    };
    const getById = async (id) => {
        const resposne = await model.findByPk(id);
        return resposne;
    };
    const update = async (id, data) => {
        const record = await model.findByPk(id);
        if (!record)
            return null;
        return await record.update(data);
    };
    const deleteById = async (id) => {
        const record = await model.findByPk(id);
        if (!record)
            return null;
        await record.destroy();
        return true;
    };
    return {
        create,
        getById,
        update,
        destroy,
        deleteById,
    };
}
