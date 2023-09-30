const express = require('express');
const router = express.router();
router.use(bodyParser.json());
const tasks = [
    { id: 1, title: 'Tarea 1', completed: true },
    { id: 2, title: 'Tarea 2', completed: false },
];

router.post('/create', (req, res) => {
    const { title, completed } = req.body;
    const newTask = { id: tasks.length + 1, title, completed };
    tasks.push(newTask);
    res.json(newTask);
});

router.delete('/delete/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasks.splice(index, 1);
        res.sendStatus(204); 
    } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});
router.put('/update/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTask = req.body;
    const index = tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
        tasks[index] = { ...tasks[index], ...updatedTask };
        res.json(tasks[index]);
    } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});
module.export = router;