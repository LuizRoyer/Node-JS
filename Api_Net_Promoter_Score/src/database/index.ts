import { Connection, createConnection, getConnection, getConnectionOptions } from 'typeorm'

export default async (): Promise<Connection> => {

    const defaultOptions = await getConnectionOptions()
    const testBanco = './src/database/database.test.sqlite'

    return createConnection(
        Object.assign(defaultOptions, {
            database: process.env.NODE_ENV === 'test' ? testBanco: defaultOptions.database 
        })
    )
}
