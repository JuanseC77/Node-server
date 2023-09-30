const express = require('express');
const app = express.Router()

const tasks = [
    { id: 1, title: 'Tarea 1', completed: true },
    { id: 2, title: 'Tarea 2', completed: false },
];

Router.get('./completed',(req, res) =>{
    const completedTask=task.filter(task => task.Completed);
    res.json(completedTask);
});

Router.get('./incomplete',(req, res)=>{
    const incompletedTask = task.filter(task => task.incomplete);
    res.json(incompletedTask);
});
module.export = Router;