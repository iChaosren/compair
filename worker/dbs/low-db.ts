import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'
import { fileURLToPath } from 'url'
import DefaultDb, { DbStructure } from '../../types/db-structure';

let db;

const initializeDB = async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    // Use JSON file for storage
    const file = join(__dirname, `db/db.json`)
    const adapter = new JSONFile<DbStructure>(file)
    db = new Low(adapter)

    await db.read();

    db.data ||= DefaultDb;
}

initializeDB()
    .then(() => {

    })

//Functions

//Keep all DB providers on a generic interface
