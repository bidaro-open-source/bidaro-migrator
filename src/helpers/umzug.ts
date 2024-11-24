import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { Sequelize } from 'sequelize'
import { SequelizeStorage, Umzug } from 'umzug'

interface UmzugOptions {
  directory: string
  templateName: string
  modelName: string
}

export const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 0),
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: process.env.DB_CONNECTION as any,
  logging: false,
})

export function createUmzug(options: UmzugOptions) {
  const ROOT_DIR = path.join(__dirname, '..', '..')
  const SOURCE_DIR = path.join(ROOT_DIR, 'src')
  const TARGET_DIR = path.join(ROOT_DIR, options.directory)
  const TEMPLATE_FILE = path.join(SOURCE_DIR, 'templates', options.templateName)
  const GLOB = path.join(TARGET_DIR, '*.ts')

  return new Umzug({
    migrations: { glob: GLOB },
    create: {
      folder: TARGET_DIR,
      template: filepath => [[filepath, fs.readFileSync(TEMPLATE_FILE).toString()]],
    },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({
      sequelize,
      modelName: `${options.modelName}_meta`,
    }),
    logger: console,
  })
}
