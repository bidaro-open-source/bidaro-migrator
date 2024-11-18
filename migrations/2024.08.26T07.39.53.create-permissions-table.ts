import type { Migration } from '../src/migrator'
import { DataTypes } from 'sequelize'
import { permissions, roles } from '../src/constants.js'

export const up: Migration = async ({ context: queryInterface }) => {
  const now = new Date()
  const transaction = await queryInterface.sequelize.transaction()

  try {
    await queryInterface.createTable('roles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, { transaction })

    await queryInterface.createTable('permissions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(64),
        unique: true,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    }, { transaction })

    await queryInterface.createTable('roles_has_permissions', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      permissionId: {
        type: DataTypes.INTEGER,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'permissions',
          key: 'id',
        },
      },
    }, { transaction })

    const _roles = await queryInterface.bulkInsert('roles', [
      { name: roles.USER, createdAt: now },
      { name: roles.SUPERUSER, createdAt: now },
      // @ts-expect-error options typing is wrong
    ], { returning: true, transaction })

    const _permissions = await queryInterface.bulkInsert('permissions', [
      { name: permissions.VIEW_ALL_ROLES, createdAt: now },
      { name: permissions.VIEW_ALL_PERMISSIONS, createdAt: now },
      { name: permissions.VIEW_ALL_SESSIONS, createdAt: now },
      { name: permissions.VIEW_OWN_SESSIONS, createdAt: now },
      { name: permissions.DELETE_ALL_SESSIONS, createdAt: now },
      { name: permissions.DELETE_OWN_SESSIONS, createdAt: now },
      // @ts-expect-error options typing is wrong
    ], { returning: true, transaction })

    await queryInterface.bulkInsert('roles_has_permissions', [
      { roleId: _roles[0].id, permissionId: _permissions[3].id },
      { roleId: _roles[0].id, permissionId: _permissions[5].id },
      { roleId: _roles[1].id, permissionId: _permissions[0].id },
      { roleId: _roles[1].id, permissionId: _permissions[1].id },
      { roleId: _roles[1].id, permissionId: _permissions[2].id },
      { roleId: _roles[1].id, permissionId: _permissions[3].id },
      { roleId: _roles[1].id, permissionId: _permissions[4].id },
      { roleId: _roles[1].id, permissionId: _permissions[5].id },
    ], { transaction })

    await transaction.commit()
  }
  catch (error) {
    await transaction.rollback()
    throw new Error(error)
  }
}

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('roles_has_permissions')
  await queryInterface.dropTable('permissions')
  await queryInterface.dropTable('roles')
}
