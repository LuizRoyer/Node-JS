import { Pool } from "pg";


const connectionString ='postgres://zgkfmebz:sgvB5CSgHckJ6F0jaHJF6nMMABa8zuH8@castor.db.elephantsql.com/zgkfmebz'

const db = new Pool({ connectionString })
export default db