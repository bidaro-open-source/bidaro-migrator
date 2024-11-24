import type { Seeder } from '../src/seeder'
import { hashSync } from 'bcrypt'

const now = new Date()

const records = [
  { email: 'test@test.test', username: 'test', password: hashSync('password', 1), createdAt: now, roleId: 1 },
]

export const up: Seeder = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('users', records)
}

export const down: Seeder = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('users', {
    email: records.map(records => records.email),
  })
}
