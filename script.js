const inputBox = document.querySelector("#inputBox");
const listContainer = document.querySelector("#list-container");
const addTaskBtn = document.querySelector(".addTaskBtn");

// Yeni görev ekleme fonksiyonu
function addTask() {
  const taskText = inputBox.value.trim();

  if (taskText === "") {
    showAlert("Please enter a task!");
    return;
  }

  // Yeni liste öğesi oluştur
  const newTask = document.createElement("li");
  newTask.textContent = taskText;

  // Silme butonu ekle
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "\u00d7";
  newTask.appendChild(deleteBtn);

  // Görevi listeye ekle
  listContainer.appendChild(newTask);

  // Giriş kutusunu temizle
  inputBox.value = "";

  // Veriyi kaydet
  saveData();
}

// Liste tıklama olaylarını yönetme
function handleListClick(event) {
  const target = event.target;

  if (target.tagName === "LI") {
    target.classList.toggle("checked");
    saveData();
  } else if (target.tagName === "SPAN") {
    target.parentElement.remove();
    saveData();
  }
}

// Veriyi tarayıcıya kaydetme
function saveData() {
  const tasks = Array.from(listContainer.children).map((task) => ({
    text: task.firstChild.textContent,
    checked: task.classList.contains("checked"),
  }));

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Veriyi tarayıcıdan yükleme
function showTask() {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  listContainer.innerHTML = "";

  savedTasks.forEach(({ text, checked }) => {
    const newTask = document.createElement("li");
    newTask.textContent = text;

    if (checked) {
      newTask.classList.add("checked");
    }

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "\u00d7";
    newTask.appendChild(deleteBtn);

    listContainer.appendChild(newTask);
  });
}

// Hata mesajını gösterme
function showAlert(message) {
  let alertBox = document.querySelector(".alert");

  if (!alertBox) {
    alertBox = document.createElement("div");
    alertBox.className = "alert";
    document.body.appendChild(alertBox);
  }

  alertBox.textContent = message;
  alertBox.style.display = "block";

  setTimeout(() => {
    alertBox.style.display = "none";
  }, 4000);
}

// Olay dinleyicileri ekle
addTaskBtn.addEventListener("click", addTask);
listContainer.addEventListener("click", handleListClick);

// Görevleri yükle
showTask();
