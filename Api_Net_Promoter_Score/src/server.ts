import { app } from "./app"

const port = 3333

app.listen(port, () => console.info(`Servidor is running at http://localhost:${port}/`))
