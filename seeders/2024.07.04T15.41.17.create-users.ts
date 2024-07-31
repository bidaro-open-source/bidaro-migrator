import { hash } from 'bcrypt'
import type { Seeder } from '../src/seeder'

const now = new Date()

const records = [
  { email: 'test@test.test', username: 'test', password: await hash('password', 1), createdAt: now },
]

export const up: Seeder = async ({ context: queryInterface }) => {
  await queryInterface.bulkInsert('users', records)
}

export const down: Seeder = async ({ context: queryInterface }) => {
  await queryInterface.bulkDelete('users', {
    email: records.map(records => records.email),
  })
}
