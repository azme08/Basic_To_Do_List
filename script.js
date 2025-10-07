const addBtn = document.getElementById("addBtn");
const taskTitle = document.getElementById("taskTitle");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

// 🌓 Theme setup
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

// 🪶 Auto resize textarea
taskInput.addEventListener("input", () => {
    taskInput.style.height = "auto";
    taskInput.style.height = taskInput.scrollHeight + "px";
});

addBtn.addEventListener("click", addTask);

function addTask() {
    const titleText = taskTitle.value.trim();
    const descText = taskInput.value.trim();

    if (titleText === "" && descText === "") {
        return alert("Please enter a title or description!");
    }

    const li = document.createElement("li");

    // Timestamp
    const time = document.createElement("div");
    time.className = "time";
    time.textContent = new Date().toLocaleString();

    // Header
    const header = document.createElement("div");
    header.className = "task-header";

    const title = document.createElement("div");
    title.className = "title";
    title.textContent = titleText || "(No Title)";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.addEventListener("change", () => {
        li.classList.toggle("completed", checkbox.checked);
    });

    header.append(title, checkbox);

    // Description
    const text = document.createElement("div");
    text.className = "task-text";
    text.innerText = descText || "";

    // Buttons
    const buttonGroup = document.createElement("div");
    buttonGroup.className = "button-group";

    const pinBtn = document.createElement("button");
    pinBtn.className = "pin";
    pinBtn.textContent = "📌 Pin";

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

    // Delete
    delBtn.addEventListener("click", () => li.remove());

    // Edit
    editBtn.addEventListener("click", () => {
        const editTitle = document.createElement("input");
        editTitle.type = "text";
        editTitle.value = title.textContent;
        editTitle.className = "edit-title";

        const editText = document.createElement("textarea");
        editText.value = text.textContent;
        editText.className = "edit-text";
        editText.style.width = "100%";
        editText.style.height = "60px";

        header.replaceChild(editTitle, title);
        li.replaceChild(editText, text);

        editBtn.style.display = "none";
        saveBtn.style.display = "inline-block";
    });

    // Save
    saveBtn.addEventListener("click", () => {
        const editTitle = li.querySelector(".edit-title");
        const editText = li.querySelector(".edit-text");

        title.textContent = editTitle.value.trim() || "(No Title)";
        text.textContent = editText.value.trim();

        header.replaceChild(title, editTitle);
        li.replaceChild(text, editText);

        saveBtn.style.display = "none";
        editBtn.style.display = "inline-block";
    });

    // Pin / Unpin
    pinBtn.addEventListener("click", () => {
        if (li.classList.toggle("pinned")) {
            pinBtn.textContent = "📍 Unpin";
            taskList.insertBefore(li, taskList.firstChild);
        } else {
            pinBtn.textContent = "📌 Pin";
            taskList.appendChild(li);
        }
    });

    buttonGroup.append(pinBtn, editBtn, saveBtn, delBtn);

    li.append(time, header, text, buttonGroup);
    taskList.appendChild(li);

    // Reset input
    taskTitle.value = "";
    taskInput.value = "";
    taskInput.style.height = "60px";
}
const firebaseConfig = {
    apiKey: "AIzaSyBRHhf3biYnUZGlzom8q6swx2KGcZDrCW4",
    authDomain: "basic-to-do-list-2426f.firebaseapp.com",
    projectId: "basic-to-do-list-2426f",
    storageBucket: "basic-to-do-list-2426f.firebasestorage.app",
    messagingSenderId: "1094126323201",
    appId: "1:1094126323201:web:9cd7fe2a7911291b74e200",
    measurementId: "G-FWZXBX6G20"
};

