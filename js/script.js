const todoInput = document.getElementById('todo-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const filterBtn = document.getElementById('filter-btn');
const deleteAllBtn = document.getElementById('delete-all-btn');
const noTaskRow = document.getElementById('no-task-row');

let currentFilter = 'all';

const addTodo = () => {
  const taskValue = todoInput.value.trim();
  const dateValue = dateInput.value;

  if (taskValue === "" || dateValue === "") {
    alert("Peringatan: Isi tugas dan pilih tanggal terlebih dahulu!");
    return;
  }

  if (noTaskRow) noTaskRow.style.display = 'none';

  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td class="task-text">${taskValue}</td>
    <td>${dateValue}</td>
    <td><span class="status-badge" style="cursor:pointer; color:#888; font-weight:bold;">PENDING</span></td>
    <td>
      <button class="delete-btn" style="background:none; border:none; color:#FF4444; cursor:pointer; font-weight:bold;">DELETE</button>
    </td>
  `;

  todoList.appendChild(tr);
  todoInput.value = "";
  dateInput.value = "";
};

todoList.addEventListener('click', (e) => {
  if (e.target.classList.contains('status-badge')) {
    const badge = e.target;
    const isPending = badge.textContent === "PENDING";

    badge.textContent = isPending ? "DONE" : "PENDING";
    badge.style.color = isPending ? "#CCFF00" : "#888";
    badge.closest('tr').style.opacity = isPending ? "0.6" : "1";
  }

  if (e.target.classList.contains('delete-btn')) {
    e.target.closest('tr').remove();
    if (todoList.querySelectorAll('tr:not(#no-task-row)').length === 0) {
      noTaskRow.style.display = 'table-row';
    }
  }
});

filterBtn.addEventListener('click', () => {
  const rows = todoList.querySelectorAll('tr:not(#no-task-row)');

  if (currentFilter === 'all') currentFilter = 'pending';
  else if (currentFilter === 'pending') currentFilter = 'done';
  else currentFilter = 'all';

  filterBtn.textContent = `FILTER: ${currentFilter.toUpperCase()}`;

  rows.forEach(row => {
    const status = row.querySelector('.status-badge').textContent.toLowerCase();
    if (currentFilter === 'all') {
      row.style.display = "";
    } else {
      row.style.display = (status === currentFilter) ? "" : "none";
    }
  });
});

deleteAllBtn.addEventListener('click', () => {
  if (confirm("Hapus semua tugas?")) {
    const rows = todoList.querySelectorAll('tr:not(#no-task-row)');
    rows.forEach(row => row.remove());
    noTaskRow.style.display = 'table-row';
    currentFilter = 'all';
    filterBtn.textContent = "FILTER";
  }
});

addBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTodo();
});