function openModal() {
    document.getElementById("createItemModal").style.display = "block";
}


function closeModal() {
    document.getElementById("createItemModal").style.display = "none";
}


function addItem() {
    let name = document.getElementById("item-name").value;
    let details = document.getElementById("item-details").value;
    let quantity = document.getElementById("item-quantity").value;
    let price = document.getElementById("item-price").value;
    let date = document.getElementById("item-date").value;

    if (name && details && quantity && price && date) {
        let total = quantity * price;
        let table = document.getElementById("inventory-table").getElementsByTagName('tbody')[0];

        
        let newRow = table.insertRow(table.rows.length);

        
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);
        let cell6 = newRow.insertCell(5);
        let cell7 = newRow.insertCell(6);

        cell1.innerHTML = name;
        cell2.innerHTML = details;
        cell3.innerHTML = quantity;
        cell4.innerHTML = "$" + price;
        cell5.innerHTML = date;
        cell6.innerHTML = "$" + total.toFixed(2);
        cell7.innerHTML = `
            <button class="edit-btn" onclick="editItem(this)">Edit</button>
            <button class="delete-btn" onclick="deleteItem(this)">Delete</button>
        `;

        
        document.getElementById("item-name").value = '';
        document.getElementById("item-details").value = '';
        document.getElementById("item-quantity").value = '';
        document.getElementById("item-price").value = '';
        document.getElementById("item-date").value = '';

        closeModal();
    } else {
        alert("Please fill in all fields!");
    }
}


function deleteItem(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}


function editItem(button) {
    let row = button.parentNode.parentNode;
    let cells = row.getElementsByTagName("td");

    document.getElementById("item-name").value = cells[0].innerText;
    document.getElementById("item-details").value = cells[1].innerText;
    document.getElementById("item-quantity").value = cells[2].innerText;
    document.getElementById("item-price").value = cells[3].innerText.slice(1);  
    document.getElementById("item-date").value = cells[4].innerText;

    row.parentNode.removeChild(row);

    openModal();
}


function searchItems() {
    let input = document.getElementById("search-bar");
    let filter = input.value.toLowerCase();
    let table = document.getElementById("inventory-table");
    let rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++) {
        let row = rows[i];
        let cells = row.getElementsByTagName("td");
        let found = false;

        for (let j = 0; j < cells.length; j++) {
            let cell = cells[j];
            if (cell) {
                if (cell.innerText.toLowerCase().indexOf(filter) > -1) {
                    found = true;
                    break;
                }
            }
        }

        if (found) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}