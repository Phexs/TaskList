// DEFINE UL VARIABLES 

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event Listeners 
function loadEventListeners(){
    // DOM Load Event from storage 
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task event 
    form.addEventListener('submit', addTask);

    // remove Task Event 
    taskList.addEventListener('click', deleteaTask);

    //Claer Task Event 
    clearBtn.addEventListener('click', clearTasks);

    // Filter Task Event 
    filter.addEventListener('keyup', filterTasks);
}

// Get Task from storage 
function getTasks(e){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
         //Create li elements
    const li = document.createElement('li'); 
    // create class
    li.className = 'collection-item';
    // create a text node and append the li 
    li.appendChild(document.createTextNode(task));
    // Create the new Link element 
    const link = document.createElement('a');
    // Add a class 
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // Append the li to the Ul
    taskList.appendChild(li);
    });
}
// Add Task
function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a Task');
    }

    //Create li elements
    const li = document.createElement('li'); 
    // create class
    li.className = 'collection-item';
    // create a text node and append the li 
    li.appendChild(document.createTextNode(taskInput.value));
    // Create the new Link element 
    const link = document.createElement('a');
    // Add a class 
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append the link to li
    li.appendChild(link);

    // Append the li to the Ul
    taskList.appendChild(li);

    // Store values in Local storage 
    storeTaskInLocalStorage(taskInput.value);

    // Clear input
    taskInput.value = '';


    // console.log(li);
    e.preventDefault();
}

// Store Task 
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Remove A Task 
function deleteaTask(e) {
    if(e.target.parentElement.classList.contains
        ('delete-item')) {
            if(confirm('Are you sure')){
                e.target.parentElement.parentElement.remove();

                //Remove from Local Storage 
                removeFromLocalStorage(e.target.parentElement.parentElement);
            }
        }
    }

// Remove from Local Storage 
function removeFromLocalStorage(taskItem){
    // Again check first if the storage is empty 
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // Then confilm a sp[ecific  task we watn to delete
    tasks.forEach(function(task, index){
        //check if the text matches the conted of the task selected 
        if(taskItem.textContent === task){ 
            tasks.splice(index, 1);
        }
    });
    // Add back the rest of the remaining tasks 
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks 
function clearTasks(){
    // taskList.innerHTML = ''; one way to do it
    //faster
    while(taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }

    // Clear the tasks from Local storage 
    clearTasksFromLocalStorage();

}

// Clear the Task from Local Storage 
function clearTasksFromLocalStorage(){
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    //use queryselector to allow us to use forEach without converting to Array 
    document.querySelectorAll('.collection-item').forEach(
        function(task){
            const item = task.firstChild.textContent;
            if(item.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
    });
    
}