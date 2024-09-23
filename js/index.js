const template = `                
<tr class="item">
    <td>
        <input type="text" class="item-name" placeholder="Item Name Here">
    </td>
    <td>
        <input type="text" class="item-qty" placeholder="Quantity Here" maxlength="3">
    </td>
    <td>
        <input type="text" class="item-price" placeholder="Item Price Here" maxlength="4">
    </td>
    <td class="item-total-cell">
        <span>₹</span>
        <span class="item-total">0</span>
    </td>
    <td class="no-print del-cell">
        <button class="delete-btn">Delete</button>
    </td>
</tr>
`

document.querySelector('#add-item').addEventListener('click', () => {
    // Instead of replacing the entire tbody, append the new row.
    document.querySelector('tbody').insertAdjacentHTML('beforeend', template);
    updateOverallTotal()
});

// Event delegation: add a single event listener to the <tbody>
document.querySelector('tbody').addEventListener('input', (event) => {
    if (event.target.classList.contains('item-qty') || event.target.classList.contains('item-price')) {
        const row = event.target.closest('tr'); // Find the closest <tr> element
        const qty = parseInt(row.querySelector('.item-qty').value) || 0; // Get quantity
        const price = parseInt(row.querySelector('.item-price').value) || 0; // Get price
        const total = qty * price;
        row.querySelector('.item-total').innerText = total; // Update the total
    }
    updateOverallTotal()
});

document.querySelector('tbody').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
        const row = event.target.closest('tr'); // Find the closest <tr> element
        row.remove(); // Remove the row from the table
    }
    updateOverallTotal()
});

window.addEventListener('beforeprint', () => {
    document.querySelectorAll('tr.item').forEach(row => {
        row.querySelectorAll('input').forEach(input => {
            const td = input.closest('td');
            td.setAttribute('data-value', input.value); // Set data-value to input's value
        });
    });
});

function updateOverallTotal() {
    let overallTotal = 0;
    document.querySelectorAll('.item-total').forEach(totalCell => {
        overallTotal += parseInt(totalCell.innerText) || 0; // Sum all item totals
    });
    document.querySelector('#gtotal').innerText = overallTotal; // Update the overall total display
}