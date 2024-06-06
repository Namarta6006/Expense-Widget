let expenses = [];
let totalAmount = 0;

function updateTotalAmount() {
    totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    localStorage.setItem('totalAmount', totalAmount);
}

function loadExpenses() {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
        expenses = JSON.parse(storedExpenses);
        totalAmount = parseFloat(localStorage.getItem('totalAmount'));
        renderExpenses();
    }
}

function addExpense() {
    const category = document.getElementById('category-select').value;
    const amount = parseFloat(document.getElementById('amount-input').value);
    const date = document.getElementById('date-input').value;

    if (!category || isNaN(amount) || amount <= 0 || !date) {
        alert('Please fill in all fields correctly.');
        return;
    }

    expenses.push({ category, amount, date });

    updateTotalAmount();
    saveExpenses();
    renderExpenses();
}

function deleteExpense(index) {
    const deletedAmount = expenses[index].amount;
    expenses.splice(index, 1);

    totalAmount -= deletedAmount;
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);

    saveExpenses();
    renderExpenses();
}

function editExpense(index) {
    const expense = expenses[index];

    const newCategory = prompt('Enter new category:', expense.category);
    if (newCategory === null) return; // User clicked cancel
    const newAmount = parseFloat(prompt('Enter new amount:', expense.amount));
    if (isNaN(newAmount) || newAmount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }
    const newDate = prompt('Enter new date:', expense.date);

    totalAmount -= expense.amount;
    totalAmount += newAmount;
    document.getElementById('total-amount').textContent = totalAmount.toFixed(2);

    expense.category = newCategory;
    expense.amount = newAmount;
    expense.date = newDate;

    saveExpenses();
    renderExpenses();
}

function renderExpenses() {
    const tableBody = document.getElementById('expense-table-body');
    tableBody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount.toFixed(2)}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;
    });
}

document.getElementById('add-btn').addEventListener('click', addExpense);

function logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('expenses');
    localStorage.removeItem('totalAmount');
    window.location.href = 'login.html';
}

if (!localStorage.getItem('loggedInUser')) {
    window.location.href = 'login.html';
} else {
    loadExpenses();
}
