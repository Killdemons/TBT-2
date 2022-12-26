require('dotenv').config()
import app from './app'
import {sequelize} from './database.js'
import { swaggerDocs } from './routes/swagger.js'

async function main() {
    try {
        //await sequelize.authenticate()
        //console.log('Database connection established successfully.')
        await sequelize.sync()
        app.listen(process.env.PORT, () => {
            console.log(`Server listening on port ${process.env.PORT}`)
            swaggerDocs(app, process.env.PORT)
            console.log('Press Ctrl+C to exit.')
        })
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

main()