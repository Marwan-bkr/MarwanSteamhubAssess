const express = require('express')
const userRouter = require('./routes/user')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

const redoc = require('redoc-express');

const db = require('./dbClient')
db.on("error", (err) => {
  console.error(err)
})

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Marwan and Hubert say "Hello World!"'))

app.use('/user', userRouter)

app.get('/docs/openapi.json', (req, res) => {
  res.json({
    openapi: '3.1.0',
    info: { 
      title: 'ECE Redis API', 
      version: '1.0.0',
      description: 'API for managing users stored in Redis'
    },
    paths: {
      '/user': {
        get: {
          summary: 'Get a user by username',
          description: 'Retrieves user details based on the username provided in the request body.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string', example: 'yannlecun' }
                  },
                  required: ['username']
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'User retrieved successfully',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SuccessResponse' }
                }
              }
            },
            '400': {
              description: 'Error retrieving user',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        },
        post: {
          summary: 'Create a new user',
          description: 'Creates a user in the Redis database.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string', example: 'yannlecun' },
                    firstname: { type: 'string', example: 'Yann' },
                    lastname: { type: 'string', example: 'LeCun' }
                  },
                  required: ['username', 'firstname', 'lastname']
                }
              }
            }
          },
          responses: {
            '201': {
              description: 'User created successfully',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/SuccessResponse' }
                }
              }
            },
            '400': {
              description: 'Invalid input or creation failed',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        SuccessResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'success' },
            msg: { 
              type: 'string', 
              description: 'The result message or user data',
              example: 'OK' 
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: { type: 'string', example: 'error' },
            msg: { 
              type: 'string', 
              description: 'The error message',
              example: 'Username already exists' 
            }
          }
        }
      }
    }
  });
});

app.get(
  '/reference',
  redoc({
    title: 'API Docs',
    specUrl: '/docs/openapi.json'
  })
);

const server = app.listen(port, (err) => {
  if (err) throw err
  console.log("Server listening the port " + port)
})

module.exports = server
