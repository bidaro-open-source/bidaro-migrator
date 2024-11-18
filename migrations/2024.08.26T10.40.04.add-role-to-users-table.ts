import type { QueryInterface } from 'sequelize'
import type { Migration } from '../src/migrator.js'
import { DataTypes } from 'sequelize'
import { roles } from '../src/constants.js'

async function getUserRoleId(queryInterface: QueryInterface) {
  const _roles: any = await queryInterface.select(null, 'roles', { where: { name: roles.USER } })

  if (_roles.length !== 1) {
    throw new Error('Default role for user not found.')
  }

  return _roles[0].id
}

export const up: Migration = async ({ context: queryInterface }) => {
  const transaction = await queryInterface.sequelize.transaction()

  try {
    const roleId = await getUserRoleId(queryInterface)

    await queryInterface.addColumn('users', 'roleId', {
      type: DataTypes.INTEGER,
      defaultValue: null,
      allowNull: true,
      onUpdate: 'CASCADE',
      references: {
        model: 'roles',
        key: 'id',
      },
    }, { transaction })

    await queryInterface.sequelize.query(`UPDATE users SET "roleId" = :roleId WHERE "roleId" IS NULL`, {
      replacements: { roleId },
      transaction,
    })

    await queryInterface.changeColumn('users', 'roleId', {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      references: {
        model: 'roles',
        key: 'id',
      },
    }, { transaction })

    await transaction.commit()
  }
  catch (error) {
    await transaction.rollback()
    throw new Error(error)
  }
}

export const down: Migration = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn('users', 'roleId')
}
