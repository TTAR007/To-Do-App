export let tasks = []

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
}

export function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId)
} 