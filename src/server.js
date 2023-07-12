import http from 'node:http'

const users = [];

const server = http.createServer((req,res) => {

  const { method, url } = req

  if (method === 'GET' && url === '/user') {
    return res
      .setHeader('Content-type','application/json')
      .end(JSON.stringify(users))
  }
  if (method === 'POST' && url === '/user') {
    users.push({
      id: 1,
      name: 'Johnzera',
      email: 'john@john.com'
    })

    return res.writeHead(201).end('Usuário criado')
  }

  return res.writeHead(404).end('NOT FOUND')
})

server.listen(3333)