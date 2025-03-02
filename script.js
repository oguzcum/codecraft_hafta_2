document.getElementById("taskform").addEventListener("submit", function (event) {
  event.preventDefault();
  let title = document.getElementById("title").value.trim();
  let description = document.getElementById("description").value.trim();
  let priority = document.querySelector("input[name='priority']:checked");
  let errorElement = document.getElementById("error");

  if (!title || !priority) {
    errorElement.textContent = !title ? "Başlık zorunludur!" : "Lütfen bir öncelik seçin!";
    return;
  }

  errorElement.textContent = "";
  let task = document.createElement("div");
  task.classList.add("task");
  task.setAttribute("data-priority", priority.value);
  task.innerHTML = `<strong>${title}</strong> - ${description} (${priority.value})
                    <button class="complete">Tamamlandı</button>
                    <button class="delete">Sil</button>`;
  document.getElementById("taskList").appendChild(task);
  document.getElementById("taskform").reset();
});

document.getElementById("taskList").addEventListener("click", function (event) {
    try {
      event.stopPropagation(); 
  
      if (event.target.classList.contains("complete")) {
        event.target.parentElement.classList.toggle("completed");
      } else if (event.target.classList.contains("delete")) {
        event.target.parentElement.remove();
      }
    } catch (error) {
      console.error("Hata oluştu: ", error.message);
    }
  });

document.getElementById("filterCompleted").addEventListener("click", function (event) {
  event.stopPropagation(); 
  document.querySelectorAll(".task").forEach(task => {
    if (!task.classList.contains("completed")) {
      task.style.display = task.style.display === "none" ? "" : "none";
    }
  });
});

document.getElementById("sortPriority").addEventListener("click", function (event) {
  event.stopPropagation(); 
  let taskList = document.getElementById("taskList");
  Array.from(taskList.children)
    .sort((a, b) => a.getAttribute("data-priority").localeCompare(b.getAttribute("data-priority")))
    .forEach(task => taskList.appendChild(task));
});