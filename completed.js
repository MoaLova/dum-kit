const completedList = document.getElementById('completed-list');
const clearCompletedButton = document.getElementById('clear-completed');

// Load completed tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', loadCompletedTasks);

// Function to load completed tasks
function loadCompletedTasks() {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    completedTasks.forEach(task => addCompletedTask(task));
}

// Function to add a task to the completed list
function addCompletedTask(taskText) {
    const li = document.createElement('li');
    li.className = 'todo-item completed';

    // Create the task text
    const task = document.createElement('span');
    task.textContent = taskText;
    li.appendChild(task);

    // Add the task to the completed list
    completedList.appendChild(li);
}

// Clear all completed tasks
clearCompletedButton.addEventListener('click', function () {
    completedList.innerHTML = ''; // Clear the displayed list
    localStorage.removeItem('completedTasks'); // Clear completed tasks from localStorage

    // Reset completed count to 0
    localStorage.setItem('completedCount', 0);
    completedCount = 0;
    updateCompletedCount(); // Update count in UI
});
