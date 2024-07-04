import { DataTypes } from 'sequelize'
import type { Migration } from '../src/migrator.js'

export const up: Migration = async ({ context: queryInterface }) => {
  queryInterface.createTable('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
  })
}

export const down: Migration = async ({ context: queryInterface }) => {
  queryInterface.dropTable('users')
}
