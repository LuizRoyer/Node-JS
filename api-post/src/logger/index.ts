import logger from 'pino'
import dayjs from 'dayjs'

export const log = logger({
    prettifier:true,
    base:{ pid:false},
    timestamp:() => `,"time":"${dayjs().format()}`
})
 