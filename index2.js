const fs = require("fs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const fileName = "tareas.json";

const readTasks = () => {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    const tasks = JSON.parse(data);
    return tasks;
  } catch (error) {
    return {};
  }
};

const writeTasks = (tasks) => {
  try {
    const data = JSON.stringify(tasks);
    fs.writeFileSync(fileName, data, "utf8");
  } catch (error) {
    console.error(error);
  }
};

const showTasks = (tasks) => {
  for (let id in tasks) {
    let task = tasks[id];
    console.log(
      `${id}. ${task.description} - ${
        task.done ? "Completada" : "Pendiente"
      }`
    );
  }
};

const addTask = (tasks, description) => {
  let id = Date.now().toString(); // Generamos un identificador único
  let task = {
    description: description,
    done: false,
  };
  tasks[id] = task;
};

const deleteTask = (tasks, id) => {
  if (tasks.hasOwnProperty(id)) {
    delete tasks[id];
  } else {
    console.error("No existe una tarea con ese identificador");
  }
};

const completeTask = (tasks, id) => {
  if (tasks.hasOwnProperty(id)) {
    tasks[id].done = true;
  } else {
    console.error("No existe una tarea con ese identificador");
  }
};

const showMenu = () => {
  console.log(`
    Elige una opción:
    1. Ver todas las tareas
    2. Añadir una tarea
    3. Eliminar una tarea
    4. Completar una tarea
    5. Salir
  `);
};

const processOption = (option) => {
  let tasks = readTasks();
  switch (option) {
    case "1":
      showTasks(tasks);
      break;
    case "2":
      rl.question("Escribe la descripción de la tarea: ", (description) => {
        addTask(tasks, description);
        writeTasks(tasks);
        console.log("Tarea añadida correctamente");
      });
      break;
    case "3":
      rl.question("Escribe el identificador de la tarea a eliminar: ", (id) => {
        deleteTask(tasks, id);
        writeTasks(tasks);
        console.log("Tarea eliminada correctamente");
      });
      break;
    case "4":
      rl.question("Escribe el identificador de la tarea a completar: ", (id) => {
        completeTask(tasks, id);
        writeTasks(tasks);
        console.log("Tarea completada correctamente");
      });
      break;
    case "5":
      rl.close();
      return;
    default:
      console.error("Opción inválida");
  }

  setTimeout(showMenu, 1000);
};

showMenu();

rl.on("line", (input) => {
  processOption(input.trim());
});
