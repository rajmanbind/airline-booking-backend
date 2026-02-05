import { Sequelize } from 'sequelize';
import sequelize from '../config/database';

// Import model initializers
import { initAirplaneModel, associateAirplane } from './Airlplane';

// Initialize all models
const models = {
  Airplane: initAirplaneModel(sequelize),
};

// Setup all associations
const setupAssociations = () => {
  associateAirplane(models);
  // Add more associations as you create more models
  // associateUser(models);
  // associateOrder(models);
};

// Run associations
setupAssociations();

// Export everything
export { sequelize, Sequelize };
export default models;