const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const readFiler = ()=>{
    return new Promise((resolve, reject)=>{
        fs.readFile('todos.json',"utf8",(err, data)=>{
            if(err){
                reject(err)
            }else{
                resolve(JSON.parse(data))
            }
        })
    })
}

const writeTodos = (todos)=>{
    return new Promise((resolve, reject)=>{
        fs.writeFile('todos.json',JSON.stringify(todos),'utf8',(err)=>{
            if(err){
                reject(err)
            }else{
                resolve()
            }
        })
    
    })
    
}


let todos = [];

(async()=>{
    todos = await readFiler()
})()


app.post("/add", async(req, res) => {
  const body = req.body;
  todos.push(body);
  await writeTodos(todos)
  res.send({});
});

app.get("/get", async(req, res) => {
    todos = await readFiler()
    res.send(todos);
});

app.put("/update", async(req, res) => {
  const id = req.body.id;
  const updated_task = req.body.updated_task;
  todos.map((todo) => {
    if (todo.id === id) {
      todo.Task = updated_task;
    }
  });
  await writeTodos(todos)
  res.send({});
});

app.delete("/delete", async(req, res) => {
  const id = req.body.id;

  todos = todos.filter((todo) => todo.id !== id);
  await writeTodos(todos)
  res.send({ msg: "Deleted item" });
});



app.listen(3000, () => {
  console.log("app is running on port 3000");
});
