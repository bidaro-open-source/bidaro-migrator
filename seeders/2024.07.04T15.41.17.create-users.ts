import type { Seeder } from '../src/seeder'

const records = [
  { email: 'test@test.test', username: 'test', password: 'test' },
]

export const up: Seeder = async ({ context: queryInterface }) => {
  queryInterface.bulkInsert('users', records)
}

export const down: Seeder = async ({ context: queryInterface }) => {
  queryInterface.bulkDelete('users', {
    email: records.map(records => records.email),
  })
}
