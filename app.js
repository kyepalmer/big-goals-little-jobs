const app = document.getElementById('app');
let tasks = JSON.parse(localStorage.getItem('littleJobs')) || [];

function saveTasks() {
  localStorage.setItem('littleJobs', JSON.stringify(tasks));
}

function renderHome() {
  let taskList = tasks.map((task, index) => 
    `<li>
      <input type="checkbox" ${task.done ? "checked" : ""} onclick="toggleTask(${index})" />
      <span contenteditable="true" onblur="editTask(${index}, this.innerText)">${task.text}</span>
      <button onclick="deleteTask(${index})">🗑</button>
    </li>`
  ).join("");

  app.innerHTML = `
    <h1>Let’s do this, King 👑</h1>
    <div class="section">
      <h2>Little Jobs</h2>
      <ul>${taskList}</ul>
      <input type="text" id="newTask" placeholder="Add a task" />
      <input type="submit" value="Add" onclick="addTask()" />
    </div>
    <button onclick="renderToday()">Go to Today View</button>
  `;
}

function addTask() {
  const input = document.getElementById('newTask');
  if (input.value.trim() !== "") {
    tasks.push({ text: input.value.trim(), done: false });
    saveTasks();
    renderHome();
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  saveTasks();
  renderHome();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderHome();
}

function editTask(index, newText) {
  tasks[index].text = newText.trim();
  saveTasks();
}

function renderToday() {
  app.innerHTML = `
    <h1>To-do Today</h1>
    <div class="section">
      <ul>
        ${tasks.map(t => `<li><input type="checkbox" ${t.done ? "checked" : ""}/> ${t.text}</li>`).join("")}
      </ul>
    </div>
    <button onclick="renderHome()">Back to Home</button>
  `;
}

renderHome();
