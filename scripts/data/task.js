export let tasks

export class Task {
    #id
    #taskName
    #status

    constructor(id, taskName, status) {
        this.#id = id
        this.#taskName = taskName
        this.#status = status
    }

    get id() {
        return this.#id
    }

    get taskName() {
        return this.#taskName
    }

    get status() {
        return this.#status
    }

    set status(newStatus) {
        this.#status = newStatus
    }

    toJSON() {
        return {
            id: this.#id,
            taskName: this.#taskName,
            status: this.#status
        }
    }
}

export function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId)
} 

export function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks))
    console.log(tasks)
}

export function loadFromLocalStorage() {
    const storedTasks = localStorage.getItem("tasks")
    if (storedTasks) {
        tasks = JSON.parse(storedTasks).map((task) => new Task(task.id, task.taskName, task.status))
    } else {
        tasks = []
    }
}