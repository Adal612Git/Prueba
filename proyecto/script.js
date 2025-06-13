let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let idCounter = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

function addTask(text) {
    if (!text.trim()) return;
    const task = { id: idCounter++, text, completed: false };
    tasks.push(task);
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const list = document.getElementById('task-list');
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="delete-btn" data-id="${task.id}">&times;</button>
            </div>`;
        li.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-btn')) {
                li.classList.add('fade-out');
                setTimeout(() => deleteTask(task.id), 300);
            } else {
                toggleComplete(task.id);
            }
        });
        list.appendChild(li);
    });
}

document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('task-input');
    addTask(input.value);
    input.value = '';
});

window.addEventListener('DOMContentLoaded', renderTasks);
