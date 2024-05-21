import express from 'express'
import body_parser from 'body-parser'
import cors from 'cors'
import userRouter from './src/routes/users.routes.js'
import authRoutes from './src/routes/auth.routes.js'
import petsRoutes from './src/routes/pets.routes.js'
import categoriesRoutes from './src/routes/categories.routes.js'
import gendersRoutes from './src/routes/genders.routes.js'
import racesRoutes from './src/routes/races.routes.js'
const server = express()

server.use(cors())
server.use(body_parser.json())
server.use(body_parser.urlencoded({ extended: false }))

server.use(userRouter)
server.use(authRoutes)
server.use(petsRoutes)
server.use(categoriesRoutes)
server.use(gendersRoutes)
server.use(racesRoutes)

server.listen(3000, () => {
    console.log('Server is running on port 3000')
})


