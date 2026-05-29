import { tasks, Task } from "./data/task.js"


tasks.push(new Task("qweas21", "Task 1", "pending"))
tasks.push(new Task("qweas22", "Task 2", "completed"))
tasks.push(new Task("qweas23", "Task 3", "completed"))
tasks.push(new Task("qweas24", "Task 4", "pending"))

//********----------start program--------------******
renderTasks()

// generate tasks
function renderTasks() {
    let taskHTML = ``

    tasks.forEach((task) => {
        
        taskHTML += `
            <label class="task-item" for="${task.id}">
                <input type="checkbox" name="${task.id}" id="${task.id}" ${task.status === "completed" ? "checked" : ""}>
                <span class="custom-checkbox"></span>
                ${task.taskName}
                <button class="delete-btn">Delete</button>
            </label>
        `;
    });
    document.querySelector(".task-container").innerHTML = taskHTML;

    initTaskStatus()
}

function initTaskStatus() {
    const inputs = document.querySelectorAll(".task-item input")

    inputs.forEach((input) => {
        if (input.checked) {
            input.parentElement.querySelector(".custom-checkbox").classList.add("custom-checkbox-checked")
            input.parentElement.classList.add("task-item-checked")
        }
    })
}

//check task (wait for change event on checkbox input)
document.querySelector(".task-container").addEventListener("change", (e) => {
    const inputEl = e.target

    if (inputEl.tagName === "INPUT") {
        //change in tasks array
        if (inputEl.checked) {
            changeTaskStatus(inputEl, "completed")
        } else {
            changeTaskStatus(inputEl, "pending")
        }

        // change in UI
        inputEl.parentElement.querySelector(".custom-checkbox").classList.toggle("custom-checkbox-checked")
        inputEl.parentElement.classList.toggle("task-item-checked")
        console.log(tasks)
    }
})

function changeTaskStatus(inputEl, newStatus) {
    tasks.forEach((task) => {
        const taskId = inputEl.id
        if (task.id === taskId) {
            task.status = newStatus
        }
    })
}

//add task
const addTaskForm = document.querySelector(".add-task-form")

addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault()
    
    const value = addTaskForm.task.value.trim()
    if (value === "") {
        alert("Task name cannot be empty")
        return // return to callback function
    }

    tasks.unshift(new Task(generateUniqueId(), value, "pending"))
    renderTasks()
    addTaskForm.reset()
})

function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

//delete task
document.querySelector(".task-container").addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const taskId = e.target.parentElement.querySelector("input").id

        deleteTask(taskId)
        renderTasks()
        console.log(tasks)
    }
})

document.querySelector(".clear-complete-btn").addEventListener("click", () => {
    console.log("tasks before clear: ", tasks)
})