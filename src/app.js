import express from 'express'
import morgan from 'morgan'
import personsRoutes from './routes/persons.routes.js'
import activesRoutes from './routes/actives.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

// middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/persons", personsRoutes)
app.use("/actives", activesRoutes)
app.use("/auth", authRoutes)


export default app