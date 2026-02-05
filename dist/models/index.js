"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sequelize = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
// Import model initializers
const Airlplane_1 = require("./Airlplane");
// Initialize all models
const models = {
    Airplane: (0, Airlplane_1.initAirplaneModel)(database_1.default),
};
// Setup all associations
const setupAssociations = () => {
    (0, Airlplane_1.associateAirplane)(models);
    // Add more associations as you create more models
    // associateUser(models);
    // associateOrder(models);
};
// Run associations
setupAssociations();
exports.default = models;
