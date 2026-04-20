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

            editBtn.dataset.index = i
            delBtn.dataset.index = i

            li.appendChild(editBtn)
            li.appendChild(delBtn)

            this.list.appendChild(li)
        }
    }

    onSubmit(e) {
        e.preventDefault()

        if (this.input.value === "") return

        this.tasks.push(this.input.value)
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
        let li = e.target.parentElement

        let editInput = document.createElement("input")
        editInput.value = this.tasks[index]

        let saveBtn = document.createElement("button")
        saveBtn.textContent = "Save"
        saveBtn.type = "button"

        li.innerHTML = ""
        li.appendChild(editInput)
        li.appendChild(saveBtn)

        saveBtn.addEventListener("click", () => {
            this.tasks[index] = editInput.value
            this.save()
            this.render()
        })
    }
}

new TodoApp()
