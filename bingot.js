let inventory = [];

function openModal() {
    document.getElementById("createItemModal").style.display = "block";
}

function closeModal() {
    document.getElementById("createItemModal").style.display = "none";
}

function addItem() {
    const name = document.getElementById("item-name").value;
    const details = document.getElementById("item-details").value;
    const quantity = document.getElementById("item-quantity").value;
    const price = document.getElementById("item-price").value;
    const date = document.getElementById("item-date").value;
    const image = document.getElementById("item-image").files[0];

    if (name && details && quantity && price && date && image) {
        const imageURL = URL.createObjectURL(image);
        const total = quantity * price;
        const item = {
            name,
            details,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            date,
            total,
            imageURL
        };

        inventory.push(item);

        document.getElementById("item-name").value = '';
        document.getElementById("item-details").value = '';
        document.getElementById("item-quantity").value = '';
        document.getElementById("item-price").value = '';
        document.getElementById("item-date").value = '';
        document.getElementById("item-image").value = '';

        closeModal();
        updateTable();

        document.getElementById("successModal").style.display = "block";
    } else {
        alert("Please fill out all fields and upload an image.");
    }
}

function closeSuccessModal() {
    document.getElementById("successModal").style.display = "none";
}

function updateTable() {
    const tableBody = document.querySelector("#inventory-table tbody");
    tableBody.innerHTML = "";

    inventory.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${item.imageURL}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>${item.details}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.date}</td>
            <td>${item.total}</td>
            <td>
                <button class="edit-btn" onclick="editItem(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function editItem(index) {
    const item = inventory[index];

    document.getElementById("item-name").value = item.name;
    document.getElementById("item-details").value = item.details;
    document.getElementById("item-quantity").value = item.quantity;
    document.getElementById("item-price").value = item.price;
    document.getElementById("item-date").value = item.date;

    openModal();

    const addButton = document.querySelector("button[onclick='addItem()']");
    addButton.onclick = function () {
        updateItem(index);
    };
}

function updateItem(index) {
    const name = document.getElementById("item-name").value;
    const details = document.getElementById("item-details").value;
    const quantity = document.getElementById("item-quantity").value;
    const price = document.getElementById("item-price").value;
    const date = document.getElementById("item-date").value;
    const image = document.getElementById("item-image").files[0];

    if (name && details && quantity && price && date) {
        const imageURL = image ? URL.createObjectURL(image) : inventory[index].imageURL;
        const total = quantity * price;

        inventory[index] = {
            name,
            details,
            quantity: parseInt(quantity),
            price: parseFloat(price),
            date,
            total,
            imageURL
        };

        closeModal();
        updateTable();
    } else {
        alert("Please fill out all fields.");
    }
}

function deleteItem(index) {
    inventory.splice(index, 1);
    updateTable();
}

function searchItems() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filteredInventory = inventory.filter(item =>
        item.name.toLowerCase().includes(query)
    );

    const tableBody = document.querySelector("#inventory-table tbody");
    tableBody.innerHTML = "";

    filteredInventory.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><img src="${item.imageURL}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>${item.details}</td>
            <td>${item.quantity}</td>
            <td>${item.price}</td>
            <td>${item.date}</td>
            <td>${item.total}</td>
            <td>
                <button class="edit-btn" onclick="editItem(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}
