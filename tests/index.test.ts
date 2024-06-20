import { describe, expect, test } from 'bun:test'
import { migrator } from '../src/migrator'
import { seeder } from '../src/seeder'

describe('Migrator and seeder works', () => {
  test('migrator should not throw', () => {
    expect(async () => {
      await migrator.up()
      await migrator.down({ to: 0 })
    }).not.toThrow()
  })

  test('seeder should not throw', () => {
    expect(async () => {
      await migrator.up()

      await seeder.up()
      await seeder.down({ to: 0 })

      await migrator.down({ to: 0 })
    }).not.toThrow()
  })
})
