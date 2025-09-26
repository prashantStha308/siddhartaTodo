let tasks = [];
let count = 0;

function handleAddTask(e) {
    e.preventDefault();

    const taskName = e.target.taskName.value;
    const newTask = {
        id: ++count,
        name: taskName,
        completed: false
    };

    tasks.push(newTask);
    updateList();

    e.target.reset();
}

function updateList() {
    const list = document.getElementById("list");
    list.textContent = "";

    tasks.forEach(task => {
        const ele = createListElement(task);
        list.appendChild(ele);
    })

    saveTasks();
}

function createListElement(newTask) {

    const list = document.createElement('li');
    list.classList.add("task", "text-md");
    
    const span = document.createElement('span');
    span.textContent = newTask.name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    deleteButton.addEventListener("click", (e) => {
        e.stopPropagation();
        deleteTask(newTask.id)
    });

    if (newTask.completed) {
        list.classList.add("completed");
    } else {
        list.classList.remove("completed");
    }

    list.addEventListener('click', () => toggleCompleteStatus(newTask.id));

    list.appendChild(span);
    list.appendChild(deleteButton);

    return list;
}

function toggleCompleteStatus(id) {
    const targetTask = tasks.find(task => task.id == id);
    targetTask.completed = !targetTask.completed;

    updateList();
}

function deleteTask(id) {

    tasks = tasks.filter(task => task.id !== id);
    console.log(tasks);
    
    updateList();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const data = localStorage.getItem("tasks");
    if (data) {
        tasks = JSON.parse(data);
        updateList();
    }
}

window.onload = loadTasks;