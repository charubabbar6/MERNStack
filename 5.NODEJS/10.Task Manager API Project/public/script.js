const apiBaseURL = "http://localhost:3000";

let authToken = "";
let editingTaskId = null;

// Switch between login and register forms
document.getElementById("goToRegister").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "block";
});

document.getElementById("goToLogin").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "block";
});

// Register event listener
document
  .getElementById("registerForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;
    try {
      await fetch(`${apiBaseURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      alert("Registration successful");
    } catch (error) {
      console.error("Error registering:", error);
    }
  });
// Login event listener
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  try {
    const response = await fetch(`${apiBaseURL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    authToken = data.token;
    document.getElementById("register").style.display = "none";
    document.getElementById("login").style.display = "none";
    document.getElementById("tasks").style.display = "block";
    loadTasks();
  } catch (error) {
    console.error("Error logging in:", error);
  }
});
// Create Task event listener
document.getElementById("taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("taskTitle").value;
  const description = document.getElementById("taskDescription").value;
  const status = document.getElementById("taskStatus").value;
  try {
    await fetch(`${apiBaseURL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ title, description, status }),
    });
    loadTasks();
    document.getElementById("taskForm").reset();
  } catch (error) {
    console.error("Error creating task:", error);
  }
});
// Update Task event listener
document.getElementById("updateForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("updateTitle").value;
  const description = document.getElementById("updateDescription").value;
  const status = document.getElementById("updateStatus").value;

  if (editingTaskId === null) {
    console.error("No task ID to update");
    return;
  }

  try {
    const response = await fetch(`${apiBaseURL}/tasks/${editingTaskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ title, description, status }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error updating task:", error);
    } else {
      loadTasks();
      document.getElementById("updateForm").reset();
      document.getElementById("taskUpdate").style.display = "none";
      document.getElementById("tasks").style.display = "block";
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
});
// Cancel update event listener
document.getElementById("cancelUpdate").addEventListener("click", () => {
  document.getElementById("updateForm").reset();
  document.getElementById("taskUpdate").style.display = "none";
  document.getElementById("tasks").style.display = "block";
});
// Load tasks from API
async function loadTasks() {
  try {
    const response = await fetch(`${apiBaseURL}/tasks`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    const tasks = await response.json();
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = `${task.title}: ${task.description} (${task.status}) `;
      const updateButton = document.createElement("button");
      updateButton.textContent = "Update";
      updateButton.onclick = () => loadTaskForUpdate(task);
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.onclick = () => deleteTask(task.id);
      li.appendChild(updateButton);
      li.appendChild(deleteButton);
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}
// Load task for update
function loadTaskForUpdate(task) {
  document.getElementById("taskUpdate").style.display = "block";
  document.getElementById("tasks").style.display = "none";
  document.getElementById("updateTaskId").value = task.id;
  document.getElementById("updateTitle").value = task.title;
  document.getElementById("updateDescription").value = task.description;
  document.getElementById("updateStatus").value = task.status;
  editingTaskId = task.id; // Ensure editingTaskId is updated
}
// Delete task
async function deleteTask(id) {
  try {
    await fetch(`${apiBaseURL}/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    loadTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}
// Logout event listener
document.getElementById("logoutButton").addEventListener("click", () => {
  // Clear authentication token
  authToken = "";

  // Hide task management section and show login/register sections
  document.getElementById("tasks").style.display = "none";
  document.getElementById("taskUpdate").style.display = "none";
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "block";

  // Clear tasks from task list
  document.getElementById("taskList").innerHTML = "";
});
