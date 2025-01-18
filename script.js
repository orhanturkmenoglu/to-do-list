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
  newTask.style.opacity = "0";

  // Görevi listeye ekle
  listContainer.appendChild(newTask);

  // Görsel efekt için opacity değişimi
  setTimeout(() => {
    newTask.style.opacity = "1";
  }, 100);

  // Silme butonu ekle
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "\u00d7";
  newTask.appendChild(deleteBtn);

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
  localStorage.setItem("data", listContainer.innerHTML);
}

// Veriyi tarayıcıdan yükleme
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}

// Hata mesajını gösterme
function showAlert(message) {
  let alertBox = document.querySelector(".alert");

  // Eğer hata mesajı yoksa oluştur
  if (!alertBox) {
    alertBox = document.createElement("div");
    alertBox.className = "alert";
    document.body.appendChild(alertBox);
  }

  // Mesajı ayarla ve göster
  alertBox.textContent = message;
  alertBox.style.display = "block";

  // Mesajı belirli bir süre sonra gizle
  setTimeout(() => {
    alertBox.style.display = "none";
  }, 4000);
}

// Olay dinleyicileri ekle
addTaskBtn.addEventListener("click", addTask);
listContainer.addEventListener("click", handleListClick);

// Görevleri yükle
showTask();
