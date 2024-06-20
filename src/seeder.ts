import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createUmzug } from './helpers/umzug'

export const seeder = createUmzug({
  directory: 'seeders',
  modelName: 'seeders',
  templateName: 'seed.ts',
})

export type Seeder = typeof seeder._types.migration

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await seeder.runAsCLI()
  process.exit(0)
}
