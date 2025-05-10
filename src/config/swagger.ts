import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

import { Express } from 'express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Advocate Backend',
      version: '1.0.0',
      description: 'API for Advocate',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
}

const swaggerDocs = swaggerJSDoc(options)

export default (app: Express) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))
  console.log(`Docs available at http://localhost:4000/api-docs`)
}