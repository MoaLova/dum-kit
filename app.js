// Get elements from the DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const pendingList = document.getElementById('pending-list');

// Load pending tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadPendingTasks);

// Add event listener for form submission
todoForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting

    const taskText = todoInput.value.trim();

    if (taskText !== "") {
        addTask(taskText); // Add task to pending list
        todoInput.value = ""; // Clear input field
    }
});

// Function to add task to the pending list
function addTask(taskText) {
    const li = document.createElement('li');
    li.className = 'todo-item';

    // Create the task text
    const task = document.createElement('span');
    task.textContent = taskText;
    li.appendChild(task);

    // Create a checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    li.appendChild(checkbox);

    // Create the remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';
    li.appendChild(removeBtn);

    // Add task to the pending list
    pendingList.appendChild(li);

    // Add event listener for checkbox
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            setTimeout(() => {
                moveToCompleted(taskText); // Move task to completed after 3 seconds
                li.remove(); // Remove the task from the pending list
            }, 3000); // 3 seconds
        }
    });

    // Add event listener for removing the task
    removeBtn.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent triggering the complete task event
        li.remove();
        savePendingTasks(); // Update pending tasks in localStorage
    });

    savePendingTasks(); // Save pending tasks in localStorage
}

// Function to move the task to the completed list
function moveToCompleted(taskText) {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    completedTasks.push(taskText);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
}

// Save pending tasks to localStorage
function savePendingTasks() {
    const tasks = [];
    document.querySelectorAll('#pending-list .todo-item span').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('pendingTasks', JSON.stringify(tasks));
}

// Load pending tasks from localStorage
function loadPendingTasks() {
    const tasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    tasks.forEach(task => addTask(task));
}



