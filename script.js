let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = -1;

const form = document.getElementById("expense-form");
const titleInput = document.getElementById("title");
const amountInput = document.getElementById("amount");
const list = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");


function renderExpenses() {
    list.innerHTML = "";
    let total = 0;

    expenses.forEach((exp, index) => {
        total += Number(exp.amount);

        const li = document.createElement("li");

        li.innerHTML = `
            ${exp.title} - ₹${exp.amount}
            <div class="actions">
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </div>
        `;

        list.appendChild(li);
    });

    totalDisplay.textContent = total;
    localStorage.setItem("expenses", JSON.stringify(expenses));
}


form.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = titleInput.value;
    const amount = amountInput.value;

    if (editIndex === -1) {
        expenses.push({ title, amount });
    } else {
        expenses[editIndex] = { title, amount };
        editIndex = -1;
    }

    form.reset();
    renderExpenses();
});


function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}


function editExpense(index) {
    titleInput.value = expenses[index].title;
    amountInput.value = expenses[index].amount;
    editIndex = index;
}


renderExpenses();
