import { copyFile } from 'node:fs/promises'

const sourceFile = 'db.json'
const targetFile = '.db-new.json'

await copyFile(sourceFile, targetFile)
