class TodoApp {
    constructor() {
        this.form = document.querySelector("#form")
        this.input = document.querySelector("#task")
        this.list = document.querySelector("#list")

        this.tasks = JSON.parse(localStorage.getItem("tasks")) || []

        this.bindEvents()
        this.render()
    }

    bindEvents() {
        this.form.addEventListener("submit", (e) => this.onSubmit(e))
        this.list.addEventListener("click", (e) => this.onClick(e))
    }

    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks))
    }

    render() {
        this.list.innerHTML = ""

        for (let i = 0; i < this.tasks.length; i++) {
            let li = document.createElement("li")
            li.textContent = this.tasks[i] + " "

            let editBtn = document.createElement("button")
            editBtn.textContent = "Edit"
            editBtn.className = "edit"

            let delBtn = document.createElement("button")
            delBtn.textContent = "Delete"
            delBtn.className = "delete"

            // store index instead of id
            editBtn.dataset.index = i
            delBtn.dataset.index = i

            li.appendChild(editBtn)
            li.appendChild(delBtn)

            this.list.appendChild(li)
        }
    }

    onSubmit(e) {
        e.preventDefault()

        let value = this.input.value.trim()
        if (value === "") return

        this.tasks.push(value)
        this.save()
        this.render()

        this.input.value = ""
    }

    onClick(e) {
        if (e.target.classList.contains("delete")) {
            this.deleteTodo(e)
        }

        if (e.target.classList.contains("edit")) {
            this.editTodo(e)
        }
    }

    deleteTodo(e) {
        let index = e.target.dataset.index

        this.tasks.splice(index, 1)
        this.save()
        this.render()
    }

    editTodo(e) {
        let index = e.target.dataset.index

        let newText = prompt("Edit task:", this.tasks[index])
        if (newText === null || newText.trim() === "") return

        this.tasks[index] = newText
        this.save()
        this.render()
    }
}

new TodoApp()
