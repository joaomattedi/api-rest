import http from 'node:http'

const users = [];

const server = http.createServer(async (req, res) => {

  const { method, url } = req;

  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch (e) {
    req.body = null
  }

  if (method === 'GET' && url === '/user') {
    return res
      .setHeader('Content-type','application/json')
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