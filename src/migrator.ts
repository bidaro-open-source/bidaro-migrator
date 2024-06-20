import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { createUmzug } from './helpers/umzug'

export const migrator = createUmzug({
  directory: 'migrations',
  modelName: 'migrations',
  templateName: 'migration.ts',
})

export type Migration = typeof migrator._types.migration

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await migrator.runAsCLI()
  process.exit(0)
}
