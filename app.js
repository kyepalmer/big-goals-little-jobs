const app = document.getElementById('app');
let littleJobs = JSON.parse(localStorage.getItem('littleJobs')) || [];
let todayTasks = JSON.parse(localStorage.getItem('todayTasks')) || [];
let bigGoals = JSON.parse(localStorage.getItem('bigGoals')) || [];

function saveData() {
  localStorage.setItem('littleJobs', JSON.stringify(littleJobs));
  localStorage.setItem('todayTasks', JSON.stringify(todayTasks));
  localStorage.setItem('bigGoals', JSON.stringify(bigGoals));
}

function renderHome() {
  const jobsList = littleJobs.map((job, i) =>
    `<li>
      <input type="checkbox" ${job.done ? "checked" : ""} onclick="toggleLittleJob(${i})" />
      <span contenteditable="true" onblur="editLittleJob(${i}, this.innerText)">${job.text}</span>
      <button onclick="assignToToday(${i})">Today +</button>
      <button onclick="deleteLittleJob(${i})">🗑</button>
    </li>`
  ).join("");

  const bigGoalsList = bigGoals.map((goal, i) =>
    `<li>
      <strong contenteditable="true" onblur="editBigGoal(${i}, this.innerText)">${goal.title}</strong>
      <ul>
        ${goal.subGoals.map((sg, j) => `
          <li>
            <input type="checkbox" ${sg.done ? "checked" : ""} onclick="toggleSubGoal(${i}, ${j})" />
            <span contenteditable="true" onblur="editSubGoal(${i}, ${j}, this.innerText)">${sg.text}</span>
            <button onclick="deleteSubGoal(${i}, ${j})">🗑</button>
          </li>`).join("")}
      </ul>
      <input type="text" id="subGoal-${i}" placeholder="New sub goal" />
      <input type="submit" value="Add" onclick="addSubGoal(${i})" />
    </li>`
  ).join("");

  app.innerHTML = `
    <h1>Let’s do this, King 👑</h1>

    <div class="section">
      <h2>Little Jobs</h2>
      <ul>${jobsList}</ul>
      <input type="text" id="newJob" placeholder="Add a task" />
      <input type="submit" value="Add" onclick="addLittleJob()" />
    </div>

    <div class="section">
      <h2>Big Goals</h2>
      <ul>${bigGoalsList}</ul>
      <input type="text" id="newGoal" placeholder="New big goal" />
      <input type="submit" value="Add Goal" onclick="addBigGoal()" />
    </div>

    <button onclick="renderToday()">Go to Today View</button>
  `;
}

function addLittleJob() {
  const input = document.getElementById('newJob');
  if (input.value.trim() !== "") {
    littleJobs.push({ text: input.value.trim(), done: false });
    saveData();
    renderHome();
  }
}

function toggleLittleJob(index) {
  littleJobs[index].done = !littleJobs[index].done;
  saveData();
  renderHome();
}

function editLittleJob(index, newText) {
  littleJobs[index].text = newText.trim();
  saveData();
}

function deleteLittleJob(index) {
  littleJobs.splice(index, 1);
  saveData();
  renderHome();
}

function assignToToday(index) {
  todayTasks.push({ text: littleJobs[index].text, done: false });
  saveData();
  renderHome();
}

function renderToday() {
  const list = todayTasks.map((t, i) =>
    `<li>
      <input type="checkbox" ${t.done ? "checked" : ""} onclick="toggleToday(${i})" />
      ${t.text}
    </li>`
  ).join("");

  app.innerHTML = `
    <h1>Today’s To-Do</h1>
    <div class="section">
      <ul>${list}</ul>
    </div>
    <button onclick="renderHome()">Back to Home</button>
  `;
}

function toggleToday(index) {
  todayTasks[index].done = !todayTasks[index].done;
  saveData();
  renderToday();
}

function addBigGoal() {
  const input = document.getElementById('newGoal');
  if (input.value.trim() !== "") {
    bigGoals.push({ title: input.value.trim(), subGoals: [] });
    saveData();
    renderHome();
  }
}

function editBigGoal(index, newText) {
  bigGoals[index].title = newText.trim();
  saveData();
}

function addSubGoal(goalIndex) {
  const input = document.getElementById(`subGoal-${goalIndex}`);
  if (input.value.trim() !== "") {
    bigGoals[goalIndex].subGoals.push({ text: input.value.trim(), done: false });
    saveData();
    renderHome();
  }
}

function toggleSubGoal(goalIndex, subIndex) {
  bigGoals[goalIndex].subGoals[subIndex].done = !bigGoals[goalIndex].subGoals[subIndex].done;
  saveData();
  renderHome();
}

function editSubGoal(goalIndex, subIndex, newText) {
  bigGoals[goalIndex].subGoals[subIndex].text = newText.trim();
  saveData();
}

function deleteSubGoal(goalIndex, subIndex) {
  bigGoals[goalIndex].subGoals.splice(subIndex, 1);
  saveData();
  renderHome();
}

renderHome();
