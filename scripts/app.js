import { tasks, Task, deleteTask, saveToLocalStorage, loadFromLocalStorage } from "./data/task.js"

loadFromLocalStorage()
// console.log(tasks)

//********----------start program--------------******
renderTasks()
updateDate()

// generate tasks
function renderTasks(tasksToRender = tasks) {
    let taskHTML = ``

    tasksToRender.forEach((task) => {
        
        taskHTML += `
            <label class="task-item" for="${task.id}">
                <input type="checkbox" name="${task.id}" id="${task.id}" ${task.status === "completed" ? "checked" : ""}>
                <span class="custom-checkbox"></span>
                <div class="task-name">${task.taskName}</div>
                <button class="delete-btn">Delete</button>
            </label>
        `;
    });
    document.querySelector(".task-container").innerHTML = taskHTML;

    initTaskStatus()
    updateInfo()
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

function updateInfo() {
    const totalTasks = tasks.length
    const doneTasks = tasks.filter((task) => task.status === "completed").length
    const activeTasks = totalTasks - doneTasks

    document.querySelector(".task-count").textContent = totalTasks
    document.querySelector(".active-count").textContent = activeTasks
    document.querySelector(".done-count").textContent = doneTasks
}

function updateDate() {
    const date = new Date().toLocaleDateString("en-GB", { weekday: "long", month: "long", day: "numeric" })
    document.querySelector(".date").textContent = date
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
        updateInfo()
        saveToLocalStorage()
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
    backToAllTasks()
    saveToLocalStorage()
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
        backToAllTasks()
        saveToLocalStorage()
    }
})

// clear completed tasks
document.querySelector(".clear-complete-btn").addEventListener("click", () => {
    window.confirm("Are you sure you want to clear all completed tasks?") && clearCompletedTasks()
})

function clearCompletedTasks() {
    tasks.forEach((task) => {
        if (task.status === "completed") {
            deleteTask(task.id)
        }
    })
    renderTasks()
    backToAllTasks()
    saveToLocalStorage()
}

//filter tasks
document.querySelector(".filter-container").addEventListener("click", (e) => {
    const selectedFilter = e.target.dataset.filter

    console.log(selectedFilter)
    document.querySelector(`.${selectedFilter}-filter`).classList.add("selected")

    document.querySelectorAll(".filter-container button").forEach((btn) => {
        if (btn.dataset.filter !== selectedFilter) {
            btn.classList.remove("selected")
        }
    })

    filterTasks(selectedFilter)
})

function filterTasks(selectedFilter) {
    if (selectedFilter === "all") {
        renderTasks()
    } else {
        const filteredTasks = tasks.filter((task) => task.status === selectedFilter)

        renderTasks(filteredTasks)
    }
}

function backToAllTasks() {
    document.querySelector(".all-filter").classList.add("selected")

    document.querySelectorAll(".filter-container button").forEach((btn) => {
        if (btn.dataset.filter !== "all") {
            btn.classList.remove("selected")
        }
    })
}
