const taskInput = document.getElementById('inputTask');
const taskList = document.getElementById('taskList');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => addTaskToDOM(task.text, task.completed));

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskObj = { text: taskText, completed: false }; 
    tasks.push(taskObj);
    localStorage.setItem('tasks', JSON.stringify(tasks)); 

    addTaskToDOM(taskText, false); 
    taskInput.value = ""; 
}

function addTaskToDOM(taskText, completed) {
    const newTask = document.createElement('li');
    newTask.textContent = taskText;
    if (completed) newTask.classList.add('completed');

    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.classList.add('buttons-container');

    
    const completeBtn = document.createElement('button');
    completeBtn.textContent = completed ? "Undo" : "Complete";
    completeBtn.onclick = () => toggleComplete(newTask, taskText, completeBtn);
    buttonsContainer.appendChild(completeBtn);

    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => deleteTask(newTask, taskText);
    buttonsContainer.appendChild(deleteBtn);

    newTask.appendChild(buttonsContainer);
    taskList.appendChild(newTask);

    
    setTimeout(() => {
        newTask.classList.add('show');
    }, 10);
}


function deleteTask(taskItem, taskText) {
    taskItem.style.opacity = "0";
    taskItem.style.transform = "translateY(-10px)";
    setTimeout(() => {
        taskItem.remove();
    }, 300); 

    
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function toggleComplete(taskItem, taskText, btn) {
    taskItem.classList.toggle('completed');

    
    tasks = tasks.map(task => {
        if (task.text === taskText) task.completed = !task.completed;
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));

  
    btn.textContent = taskItem.classList.contains('completed') ? "Undo" : "Complete";
}


taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
