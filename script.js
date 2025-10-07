const addBtn = document.getElementById("addBtn");
const taskTitle = document.getElementById("taskTitle");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 🌙 Theme toggle
document.body.classList.toggle("dark-mode", localStorage.getItem("theme") === "dark");
updateThemeIcon();
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "🌞" : "🌙";
}

// 🪶 Auto-resize textarea
taskInput.addEventListener("input", () => {
    taskInput.style.height = "auto";
    taskInput.style.height = taskInput.scrollHeight + "px";
});

// 📤 Add task
addBtn.addEventListener("click", () => {
    const title = taskTitle.value.trim();
    const text = taskInput.value.trim();
    if (!title && !text) return alert("Please enter something!");

    const newTask = {
        id: Date.now(),
        title: title || "(No Title)",
        text,
        time: new Date().toLocaleString(),
        pinned: false,
        completed: false,
        highlighted: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();

    taskTitle.value = "";
    taskInput.value = "";
    taskInput.style.height = "60px";
});

// 💾 Save to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// 🧾 Render all tasks
function renderTasks() {
    taskList.innerHTML = "";
    const sorted = [...tasks].sort((a, b) => b.pinned - a.pinned);
    sorted.forEach(task => {
        const li = document.createElement("li");
        if (task.pinned) li.classList.add("pinned");
        if (task.completed) li.classList.add("completed");
        if (task.highlighted) li.classList.add("highlighted");

        const time = document.createElement("div");
        time.className = "time";
        time.textContent = task.time;

        const header = document.createElement("div");
        header.className = "task-header";

        const title = document.createElement("div");
        title.className = "title";
        title.textContent = task.title;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        header.append(title, checkbox);

        const text = document.createElement("div");
        text.className = "task-text";
        text.textContent = task.text;

        const btns = document.createElement("div");
        btns.className = "button-group";

        const pinBtn = document.createElement("button");
        pinBtn.className = "pin";
        pinBtn.textContent = task.pinned ? "📍 Unpin" : "📌 Pin";
        pinBtn.addEventListener("click", () => {
            task.pinned = !task.pinned;
            saveTasks();
            renderTasks();
        });

        const highlightBtn = document.createElement("button");
        highlightBtn.className = "highlight";
        highlightBtn.textContent = task.highlighted ? "Remove Highlight" : "Highlight";
        highlightBtn.addEventListener("click", () => {
            task.highlighted = !task.highlighted;
            saveTasks();
            renderTasks();
        });

        const editBtn = document.createElement("button");
        editBtn.className = "edit";
        editBtn.textContent = "Edit";
        const saveBtn = document.createElement("button");
        saveBtn.className = "save";
        saveBtn.textContent = "Save";
        saveBtn.style.display = "none";

        const delBtn = document.createElement("button");
        delBtn.className = "delete";
        delBtn.textContent = "Delete";
        delBtn.addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);
            saveTasks();
            renderTasks();
        });

        editBtn.addEventListener("click", () => {
            const editTitle = document.createElement("input");
            editTitle.value = task.title;
            const editText = document.createElement("textarea");
            editText.value = task.text;

            header.replaceChild(editTitle, title);
            li.replaceChild(editText, text);

            editBtn.style.display = "none";
            saveBtn.style.display = "inline-block";

            saveBtn.addEventListener("click", () => {
                task.title = editTitle.value.trim() || "(No Title)";
                task.text = editText.value.trim();
                saveTasks();
                renderTasks();
            });
        });

        btns.append(pinBtn, highlightBtn, editBtn, saveBtn, delBtn);
        li.append(time, header, text, btns);
        taskList.append(li);
    });
}

// 🔁 Initial render
renderTasks();
