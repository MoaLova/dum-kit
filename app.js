/// Get elements from the DOM
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const pendingList = document.getElementById('pending-list');
const completedCountElement = document.getElementById('completed-count');

let completedCount = 0; // Keep track of completed tasks

// Load pending tasks and completed count from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadPendingTasks();
    loadCompletedCount(); // Load the completed task count
});

// Add event listener for form submission
todoForm.addEventListener('submit', function (event) {
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
    checkbox.addEventListener('change', function (event) {
        if (checkbox.checked) {
            showMessage(); // Show message when task is marked as completed
            setTimeout(() => {
                moveToCompleted(taskText); // Move task to completed after 3 seconds
                li.remove(); // Remove the task from the pending list
            }, 3000); // 3 seconds
        }
    });

    // Add event listener for removing the task
    removeBtn.addEventListener('click', function (event) {
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

    // Increase completed count
    completedCount++;
    updateCompletedCount(); // Update count in UI
    saveCompletedCount(); // Save count to localStorage

    let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    pendingTasks = pendingTasks.filter(task => task !== taskText);
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
}

// Function to save pending tasks to localStorage
function savePendingTasks() {
    const tasks = [];
    document.querySelectorAll('#pending-list .todo-item span').forEach(task => {
        tasks.push(task.textContent);
    });
    localStorage.setItem('pendingTasks', JSON.stringify(tasks));
}

// Function to load pending tasks from localStorage
function loadPendingTasks() {
    const tasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    tasks.forEach(task => addTask(task));
}

// Function to update the completed task count in the UI
function updateCompletedCount() {
    completedCountElement.textContent = `Completed tasks: ${completedCount}`;
}

// Save completed task count to localStorage
function saveCompletedCount() {
    localStorage.setItem('completedCount', completedCount);
}

// Load completed task count from localStorage
function loadCompletedCount() {
    const savedCount = localStorage.getItem('completedCount');
    if (savedCount) {
        completedCount = parseInt(savedCount, 10);
        updateCompletedCount();
    }
}

// Array with messages to show when a task is completed
const messages = [
    "Great job!",
    "Well done!",
    "You did it!",
    "Keep up the good work!",
    "Awesome!"
];

// Function to show a random message when a task is completed
function showMessage() {
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    const messageElement = document.createElement('div');
    messageElement.textContent = randomMessage;
    messageElement.className = 'complete-msg';

    messageElement.style.position = 'absolute';
    messageElement.style.left = '50%';
    messageElement.style.top = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.fontSize = '40px';

    document.body.appendChild(messageElement);

    setTimeout(() => {
        messageElement.remove();
    }, 2000);
}
