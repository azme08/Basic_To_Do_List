const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return alert("Please enter a task!");

    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.className = "delete";
    delBtn.addEventListener("click", () => li.remove());

    li.appendChild(delBtn);
    taskList.appendChild(li);

    taskInput.value = "";
}