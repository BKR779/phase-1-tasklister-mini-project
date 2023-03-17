document.addEventListener("DOMContentLoaded", () => {
  // your code here
  const form = document.getElementById("create-task-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handleSubmit(e.target[`new-task-description`].value);
    form.reset();
  });

  const deleteButton = document.querySelector("#delete-tasks");
  deleteButton.addEventListener("click", deleteAllTasks);
});

function handleSubmit(value) {
  if (value !== "") {
    const p = document.createElement(`p`);
    const btn = document.createElement("button");
    btn.addEventListener("click", removeTask);
    btn.innerHTML = `X`;
    p.textContent = value + " ";
    p.appendChild(btn);
    document.querySelector(`#tasks`).appendChild(p);
  }
}

function removeTask(e) {
  e.target.parentNode.remove();
}

function deleteAllTasks() {
  document.querySelector(`#tasks`).innerHTML = "";
}
