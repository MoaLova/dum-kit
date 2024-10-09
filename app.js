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
    checkbox.addEventListener('change', function(event) {
        if (checkbox.checked) {
            showImage(); // Show image when task is marked as completed
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

    let pendingTasks = JSON.parse(localStorage.getItem('pendingTasks')) || [];
    pendingTasks = pendingTasks.filter(task => task !== taskText);
    localStorage.setItem('pendingTasks', JSON.stringify(pendingTasks));
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

// Function to show the image when a task is completed
function showImage() {
    const image = document.createElement('img');
    image.src = 'https://i2.wp.com/winkgo.com/wp-content/uploads/2018/12/23-Great-Job-Memes-18.jpg?resize=768%2C878&ssl=1'; // Lägg till din bilds URL eller filväg
    image.className = 'complete-img';

    // Center the image on the screen
    image.style.left = '50%';
    image.style.top = '50%';
    image.style.transform = 'translate(-50%, -50%)';

    // Append the image to the body
    document.body.appendChild(image);

    // Remove the image after the animation completes
    setTimeout(() => {
        image.remove();
    }, 2000); // Bilden försvinner efter 2 sekunder
}

// Add event listeners to checkboxes after loading tasks
document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', showImage);
});




