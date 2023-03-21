
const initialTasks = [
  { id: 1, text: "Task 1", priority: "high", date: "2023-03-23", duration: "1 hour", user: "John" },
  { id: 2, text: "Task 2", priority: "medium", date: "2023-03-24", duration: "2 hours", user: "Jane" },
  { id: 3, text: "Task 3", priority: "low", date: "2023-03-25", duration: "3 hours", user: "Bob" }
];

let tasks = initialTasks;

document.addEventListener("DOMContentLoaded", () => {
  renderTodoList();

  const createTaskForm = document.getElementById("create-task-form");
  createTaskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newTaskDescription = document.getElementById("new-task-description");
    const prioritySelect = document.getElementById("priority-select");
    const datePicker = document.getElementById("date-picker");
    const newTask = {
      id: tasks.length + 1,
      text: newTaskDescription.value,
      priority: prioritySelect.value,
      date: datePicker.value,
      duration: "",
      user: ""
    };
    tasks.push(newTask);
    newTaskDescription.value = "";
    prioritySelect.value = "high";
    datePicker.value = "";
    renderTodoList();
  });

  const deleteAllButton = document.getElementById("delete-tasks");
  deleteAllButton.addEventListener("click", () => {
    tasks = [];
    renderTodoList();
  });
});

function renderTodoList() {
  const todoList = document.getElementById("tasks");
  todoList.innerHTML = "";

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.priority === "high" && b.priority !== "high") {
      return -1;
    }
    if (b.priority === "high" && a.priority !== "high") {
      return 1;
    }
    if (a.priority === "medium" && b.priority === "low") {
      return -1;
    }
    if (b.priority === "medium" && a.priority === "low") {
      return 1;
    }
    return 0;
  });

  for (let task of sortedTasks) {
    const taskItem = document.createElement("li");
    const taskText = document.createTextNode(`Task: ${task.text} - Priority: ${task.priority} - Date: ${task.date} - Duration: ${task.duration} - User: ${task.user}`);
    taskItem.appendChild(taskText);

    // Add class to task item based on priority
    if (task.priority === "high") {
      taskItem.classList.add("priority-high");
    } else if (task.priority === "medium") {
      taskItem.classList.add("priority-medium");
    } else if (task.priority === "low") {
      taskItem.classList.add("priority-low");
    }

    todoList.appendChild(taskItem);

    const deleteButton = document.createElement("button");
    const deleteButtonText = document.createTextNode("Delete");
    deleteButton.appendChild(deleteButtonText);
    taskItem.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      const taskIndex = tasks.findIndex(item => item.id === task.id);
      tasks.splice(taskIndex, 1);
      renderTodoList();
    });

    const editButton = document.createElement("button");
    const editButtonText = document.createTextNode("Edit");
    editButton.appendChild(editButtonText);
    taskItem.appendChild(editButton);

    editButton.addEventListener("click", () => {
      const taskIndex = tasks.findIndex(item => item.id === task.id);
      const editedTask = prompt("Edit Task", task.text);
      if (editedTask) {
        tasks[taskIndex].text = editedTask;
        renderTodoList();
      }
    });
  }
}
