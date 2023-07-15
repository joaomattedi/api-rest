import http from 'node:http'
import { randomUUID } from 'node:crypto'
import {json} from './middlewares/json.js';
import { Database } from './database.js';

const database = new Database();

const server = http.createServer(async (req, res) => {

  const { method, url } = req;

  await json(req,res)

  if (method === 'GET' && url === '/user') {
    const users = database.select('users');

    return res
      .end(JSON.stringify(users))
  }
  if (method === 'POST' && url === '/user') {
    const {nome,email} = req.body

    const user = {
      id: randomUUID(),
      name: nome,
      email: email
    }

    database.insert('users', user)

    return res.writeHead(201).end('Usuário criado')
  }

  return res.writeHead(404).end('NOT FOUND')
})

server.listen(3333)