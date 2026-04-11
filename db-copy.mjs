import { copyFile } from 'node:fs/promises'

await copyFile('db.json', '.db-new.json')
