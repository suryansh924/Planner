function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");

  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    mainContent.classList.remove("fullscreen");
  } else {
    sidebar.classList.add("collapsed");
    mainContent.classList.add("fullscreen");
  }
}

document.addEventListener("mousemove", (event) => {
  const sidebar = document.getElementById("sidebar");
  const collapseButton = document.getElementById("collapseButton");

  if (event.clientX < 10) {
    sidebar.classList.remove("collapsed");
  } else if (!sidebar.classList.contains("collapsed") && event.clientX > 300) {
    sidebar.classList.add("collapsed");
  }
});

let draggedItem = null;

function drag(event) {
  draggedItem = event.target;
  event.target.classList.add("dragging");
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  if (draggedItem) {
    const targetList = event.target
      .closest(".kanban-column")
      .querySelector(".kanban-item-list");
    if (targetList && !draggedItem.contains(targetList)) {
      targetList.appendChild(draggedItem);
      draggedItem.classList.remove("dragging");
      draggedItem = null;
    }
  }
}

document.addEventListener("dragend", () => {
  if (draggedItem) {
    draggedItem.classList.remove("dragging");
    draggedItem = null;
  }
});

function createProject() {
  const sidebar = document.getElementById("sidebar");
  const newproject = document.createElement("li");
  newproject.classList.add("kanban-item");

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Enter project name...";
  inputField.classList.add("kanban-item-input");

  const inputSpan = document.createElement("span");
  inputSpan.classList.add("kanban-item-text");

  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      finalizeInput(
        inputField,
        inputSpan,
        newproject,
        editButton,
        deleteButton
      );
    }
  });

  const editButton = document.createElement("button");
  editButton.textContent = "✎";
  editButton.classList.add("edit-button");
  editButton.style.display = "none"; // Initially hidden

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("delete-button");
  deleteButton.style.display = "none"; // Initially hidden

  // Finalize input on blur
  inputField.addEventListener(
    "blur",
    finalizeInput(inputField, inputSpan, newproject, editButton, deleteButton)
  );

  editButton.onclick = () => {
    editItem(inputField, inputSpan, newproject);
  };

  deleteButton.onclick = () => {
    deleteItem(newproject);
  };

  newproject.addEventListener("mouseenter", () => {
    editButton.style.display = "block";
    deleteButton.style.display = "block";
  });
  newproject.addEventListener("mouseleave", () => {
    editButton.style.display = "none";
    deleteButton.style.display = "none";
  });

  newproject.appendChild(inputField);
  sidebar.querySelector(".project-list").appendChild(newproject);
  inputField.focus();

  newproject.onclick = () => {
    const mainContent = document.getElementById("mainContent");
    const emptyText = document.getElementById("empty-text");
    if (mainContent.classList.contains("hidden")) {
      mainContent.classList.remove("hidden");
      emptyText.classList.add("hidden");
    }
    loadTodos(inputField.value);
  };
}

function finalizeInput(
  inputField,
  inputSpan,
  newItem,
  editButton,
  deleteButton
) {
  if (inputField.value.trim() !== "") {
    inputSpan.textContent = inputField.value;
    newItem.innerHTML = "";
    newItem.appendChild(inputSpan);
    newItem.appendChild(editButton);
    newItem.appendChild(deleteButton);
    // postProject(inputField.value);
  } else {
    newItem.remove();
  }
}

function createKanbanItem(columnId) {
  const column = document.getElementById(columnId);
  const ul = column.querySelector(".kanban-item-list");

  // Create a new Kanban item
  const newItem = document.createElement("li");
  newItem.classList.add("kanban-item");
  newItem.setAttribute("draggable", "true");
  newItem.addEventListener("dragstart", drag);

  // Create span to hold finalized task text
  const inputSpan = document.createElement("span");
  inputSpan.classList.add("kanban-item-text");

  // Create input field for task description
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.placeholder = "Enter task description...";
  inputField.classList.add("kanban-item-input");

  const editButton = document.createElement("button");
  editButton.textContent = "✎";
  editButton.classList.add("edit-button");
  editButton.style.display = "none"; // Initially hidden

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("delete-button");
  deleteButton.style.display = "none"; // Initially hidden

  // Handle Enter or Escape key to finalize input
  inputField.addEventListener("keypress", (event) => {
    if (event.key === "Enter" || event.key === "Escape") {
      finalizeInput(inputField, inputSpan, newItem, editButton, deleteButton);
    }
  });

  // Finalize input on blur
  inputField.addEventListener(
    "blur",
    finalizeInput(inputField, inputSpan, newItem, editButton, deleteButton)
  );

  editButton.onclick = () => {
    editItem(inputField, inputSpan, newItem);
  };

  deleteButton.onclick = () => {
    deleteItem(newItem);
  };

  newItem.addEventListener("mouseenter", () => {
    editButton.style.display = "block";
    deleteButton.style.display = "block";
  });
  newItem.addEventListener("mouseleave", () => {
    editButton.style.display = "none";
    deleteButton.style.display = "none";
  });

  // Append input field to the new item initially
  newItem.appendChild(inputField);
  ul.appendChild(newItem);
  inputField.focus(); // Focus on creation
}

// Edit item & delete item
const editButton = document.createElement("button");
editButton.textContent = "✎";
editButton.classList.add("edit-button");
editButton.style.display = "none"; // Initially hidden

const deleteButton = document.createElement("button");
deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
deleteButton.classList.add("delete-button");
deleteButton.style.display = "none"; // Initially hidden

function editItem(inputField, inputSpan, newItem) {
  inputField.value = inputSpan.textContent;
  newItem.innerHTML = ""; // Clear the list item content
  newItem.appendChild(inputField);
  inputField.focus();
}

// delete button to remove task

function deleteItem(newItem) {
  newItem.remove();
}

// backend requests

// async function loadProjects() {}

async function postProject(params) {
  const response = await axios.post(
    "http://localhost:3000/api/todo/createProject",
    {
      title: params,
    }
  );
  console.log(response);
}

// async function loadTodos() {}

// async function createKanbanItem(columnId) {}
