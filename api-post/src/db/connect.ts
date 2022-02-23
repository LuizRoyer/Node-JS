import config from 'config'
import mongoose from 'mongoose'
import { log } from "../logger"


function connection() {
    const dbUrl = config.get('dbUrl') as string

    return mongoose.connect(dbUrl)
        .then(() => {
            log.info("Database connected")
        })
        .catch((err) => {
            log.error("db error" + err)
            process.exit(1)
        })
}

export default connection