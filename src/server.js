import http from 'node:http'
import {json} from './middlewares/json.js';

const users = [];

const server = http.createServer(async (req, res) => {

  const { method, url } = req;

  await json(req,res)

  if (method === 'GET' && url === '/user') {
    return res
      .end(JSON.stringify(users))
  }
  if (method === 'POST' && url === '/user') {
    const {nome,email} = req.body

    users.push({
      id: 1,
      name: nome,
      email: email
    })

    return res.writeHead(201).end('Usuário criado')
  }

  return res.writeHead(404).end('NOT FOUND')
})

server.listen(3333)