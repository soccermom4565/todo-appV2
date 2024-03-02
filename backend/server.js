// server.js
import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors'

const prisma = new PrismaClient();
const app = express();
const port = 3001;

app.use(cors())
app.use(express.json());

app.use(async (req, res, next)=> {
  //check if the path is equal to /login or /users
  if (req.path === '/login' || req.path === '/users') {
    return next();
  }
  try {
    const { username, password } = req.headers;
    // const username="pratik"
    // const password="password"
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user || user.password !== password) {
      throw new Error("Invalid username or password");
    }
    res.locals.userId=user.id
    next();
  } catch (error) {
    // throw error
    res.status(400).json({ error: 'Bad Request' }); 
    console.log("u are a bad boy")
  }
  console.log(req.headers)
  console.log("pass mid")
  // return next();
})

app.post('/lists', async (req, res) => {
  try {
    const userId=res.locals.userId
    const { name } = req.body;
    const newList = await prisma.list.create({
      data: { name,userId },
    });
    res.json(newList);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.get('/lists', async (req, res) => {
  const {userId}=res.locals
  try {
    const lists = await prisma.list.findMany({where:{userId:userId}});
    // console.log(lists)
    // console.log("pass list") 
    return res.json(lists);
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Internal Server Error' });
  }
}); 

app.get('/lists/:listId/todos', async (req, res) => {
  try {
    const { listId } = req.params;
    const todos = await prisma.todo.findMany({
      where: { 
        listId: listId, 
      },
    });
    res.json(todos);
  } catch (error) {
    // throw error
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.post('/lists/:listId/todos', async (req, res) => {
  try {
    const { listId } = req.params;
    let { name,status } = req.body;
    if(!status)status="TODO";
    const newTodo = await prisma.todo.create({
      data: {
        name, listId ,status
      },
    });
    res.json(newTodo);
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.patch('/todos/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    const { status } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id: todoId },
      data: { status },
    });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.delete('/lists/:listId', async (req, res) => {
  try {
    const { listId } = req.params;
    await prisma.todo.deleteMany({
      where: { listId: listId },
    });
    await prisma.list.delete({
      where: { id: listId },
    });
    res.json({ message: 'Success' });
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.delete('/todos/:todoId', async (req, res) => {
  try {
    const { todoId } = req.params;
    await prisma.todo.delete({
      where: { id: todoId },
    });
    res.json({ message: 'Success' });
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});


app.delete('/everything', async (req, res) => {
  try {
    if(res.locals.userId!=="pratik-the-admins-id"){
      throw new Error("Unauthorized");
    }
    // await prisma.$queryRaw(`TRUNCATE TABLE "Todo","List" RESTART IDENTITY;`)
    await prisma.todo.deleteMany({
      where: {},
    });
    await prisma.list.deleteMany({
      where: {},
    });
    res.json({ message: 'Success' });
  } catch (error) {
    // send unauthorized response message
    res.status(401).json({ error: 'Unauthorized' });
  }
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.post('/users', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = await prisma.user.create({
      data: { username, password },
    });
    console.log(JSON.stringify(newUser))
    return res.json(newUser);
  } catch (error) {
    // console.log(error)
    res.status(400).json({ error: 'Bad Request' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user || user.password !== password) {
      throw new Error("Invalid username or password");
    }
    res.json({ username, password });
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

