import { Database } from "./database.js";
import {randomUUID} from "node:crypto"
import { buildRoutePath } from "./utils/build-route-path.js";

const database = new Database();

export const routes = [
  {
    method: 'GET',
    path:buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select('users');

      return res
        .end(JSON.stringify(users))
    }
  },
  {
    method: 'POST',
    path:buildRoutePath('/users'),
    handler: (req, res) => {
      const {nome,email} = req.body

      const user = {
        id: randomUUID(),
        name: nome,
        email: email
      }
  
      database.insert('users', user)
  
      return res.writeHead(201).end('Usuário criado')
    }
  },
  {
    method:'PUT',
    path:buildRoutePath('/users/:id'),
    handler: (req,res) => {
      const {id} = req.params
      const {nome,email} = req.body

      database.update('users',id,{
        nome,
        email
      })

      return res.writeHead(204).end()
    }
  },
  {
    method:'DELETE',
    path:buildRoutePath('/users/:id'),
    handler: (req,res) => {
      const {id} = req.params

      database.delete('users',id)

      return res.writeHead(204).end()
    }
  }
]