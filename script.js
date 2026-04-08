class TodoApp {
    constructor() {
        this.form = document.querySelector("#form");
        this.input = document.querySelector("#task");
        this.list = document.querySelector("#list");
        this.tasks = [];
        this.editingId = null;

        this.loadInitialData();
        this.bindEvents();
        this.render();
    }

    loadInitialData() {
        let tasks = localStorage.getItem("tasks");

        if (tasks) {
            tasks = JSON.parse(tasks);

            this.tasks = tasks.map((task, index) => {
                if (typeof task === "string") {
                    return {
                        id: index + 1,
                        text: task
                    };
                }

                return task;
            });
        } else {
            this.tasks = [];
        }
    }

    bindEvents() {
        this.form.addEventListener("submit", this.onSubmit.bind(this));
        this.list.addEventListener("click", this.onClick.bind(this));
    }

    createTodoElement(id, text) {
        let li = document.createElement("li");
        li.dataset.id = id;

        let span = document.createElement("span");
        span.textContent = text;

        let editInput = document.createElement("input");
        editInput.type = "text";
        editInput.value = text;
        editInput.style.display = "none";

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "edit-btn";
        editBtn.dataset.id = id;

        let saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.className = "save-btn";
        saveBtn.dataset.id = id;
        saveBtn.style.display = "none";

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.className = "delete-btn";
        delBtn.dataset.id = id;

        if (this.editingId === id) {
            span.style.display = "none";
            editBtn.style.display = "none";
            editInput.style.display = "inline-block";
            saveBtn.style.display = "inline-block";
        }

        li.appendChild(span);
        li.appendChild(editInput);
        li.appendChild(editBtn);
        li.appendChild(saveBtn);
        li.appendChild(delBtn);

        return li;
    }

    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }

    render() {
        this.list.innerHTML = "";

        for (let i = 0; i < this.tasks.length; i++) {
            let li = this.createTodoElement(this.tasks[i].id, this.tasks[i].text);
            this.list.appendChild(li);
        }
    }

    onSubmit(e) {
        e.preventDefault();

        let value = this.input.value.trim();
        if (value === "") return;

        this.tasks.push({
            id: Date.now(),
            text: value
        });

        this.save();
        this.render();

        this.input.value = "";
    }

    onClick(e) {
        if (e.target.classList.contains("delete-btn")) {
            this.deleteTodo(e);
        }

        if (e.target.classList.contains("edit-btn")) {
            this.editTodo(e);
        }

        if (e.target.classList.contains("save-btn")) {
            this.saveTodo(e);
        }
    }

    deleteTodo(e) {
        let id = Number(e.target.dataset.id);

        this.tasks = this.tasks.filter(task => task.id !== id);
        this.save();
        this.render();
    }

    editTodo(e) {
        let id = Number(e.target.dataset.id);
        this.editingId = id;
        this.render();
    }

    saveTodo(e) {
        let id = Number(e.target.dataset.id);
        let li = e.target.parentElement;
        let editInput = li.querySelector("input");

        let newText = editInput.value.trim();
        if (newText === "") return;

        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id === id) {
                this.tasks[i].text = newText;
                break;
            }
        }

        this.editingId = null;
        this.save();
        this.render();
    }
}

new TodoApp();