$(document).ready(function () {
    // Set default value
    var defaultEntries = 10;
    $('#selectedEntries').text(defaultEntries);

    // Handle dropdown selection change
    $('.dropdown-item').on('click', function (e) {
        e.preventDefault();
        var entries = parseInt($(this).data('entries'));
        // Update button text
        $('#selectedEntries').text(entries);
        // Call function to update table entries based on selected value
        updateTableEntries(entries);
    });

    // Function to update table entries
    function updateTableEntries(entries) {
        // Your code to update table entries goes here
        console.log("Showing " + entries + " entries");
    }
});

function toggleDropdown(dropdownId, event) {
    event.stopPropagation();
    var dropdownMenu = document.getElementById(dropdownId);
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
}


// Replica script


function replicateDropdown() {
    // Get the mainfilter element
    var mainfilter = document.querySelector('.mainfilter');

    // Get the HTML content of the section to clone
    var cloneHTML = mainfilter.innerHTML;

    // Create a new div element to hold the cloned section
    var cloneDiv = document.createElement('div');

    // Set the class of the cloneDiv to match the original div
    cloneDiv.className = 'col d-flex mb-2 mainfilter';

    // Set the HTML content of the cloneDiv
    cloneDiv.innerHTML = cloneHTML;

    // Change the image source to "/static/images/minus-15.png"
    var cloneButton = cloneDiv.querySelector('button.btn-primary img');
    var minusButton = cloneDiv.querySelector('button.btn');
    cloneButton.src = '/static/images/minus-15.png';
    minusButton.classList.remove('btn-primary'); // Remove btn-primary class
    minusButton.style.backgroundColor = '#E5E5E5'; // Set background color directly



    // Add event listener to the cloned button to remove the clone
    cloneButton.parentNode.onclick = function () {
        cloneDiv.remove();
    };

    // Insert the cloned div after the mainfilter element
    mainfilter.insertAdjacentElement('afterend', cloneDiv);
}

// Prevent dropdown from closing when clicking inside it
document.getElementById('filterDropdown').addEventListener('click', function (event) {
    event.stopPropagation();
});


// filterTable

function filterTable() {
    console.log("Filtering...");
    var input, filter, table, tr, td, i, columnIndex, operatorIndex;
    input = document.getElementById("filter-input");
    filter = input.value.trim().toUpperCase(); // Trim whitespace and convert to uppercase
    console.log("Filter value: " + filter);
    table = document.getElementById("data-table");
    tr = table.getElementsByTagName("tr");
    columnIndex = parseInt(document.getElementById("column-select").value);
    operatorIndex = parseInt(document.getElementById("operator-select").value);
    console.log("Column index: " + columnIndex);
    console.log("Operator index: " + operatorIndex);

    // Start the loop from index 1 to skip the header row
    for (i = 1; i < tr.length; i++) {
        // Use "td" for normal rows and "th" for header row
        var cells = tr[i].querySelectorAll("td, th");
        td = cells[columnIndex];
        if (td) {
            var cellContent = td.textContent || td.innerText; // Get cell content
            cellContent = cellContent.trim().toUpperCase(); // Trim whitespace and convert to uppercase
            console.log("Cell content: " + cellContent);
            if (operatorIndex === 0) { // Like %
                if (cellContent.indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    console.log("Row " + i + " displayed");
                } else {
                    tr[i].style.display = "none";
                    console.log("Row " + i + " hidden");
                }
            } else if (operatorIndex === 1) { // Not equal !=
                if (cellContent !== filter) {
                    tr[i].style.display = "";
                    console.log("Row " + i + " displayed");
                } else {
                    tr[i].style.display = "none";
                    console.log("Row " + i + " hidden");
                }
            } else if (operatorIndex === 2) { // Equal =
                if (cellContent === filter) {
                    tr[i].style.display = "";
                    console.log("Row " + i + " displayed");
                } else {
                    tr[i].style.display = "none";
                    console.log("Row " + i + " hidden");
                }
            }
        }
    }
}



function clearFilters() {
    console.log("Clearing filters...");
    var tableRows = document.querySelectorAll("#data-table tbody tr");

    tableRows.forEach(row => {
        row.style.display = ""; // Display all rows
    });

    // Reset input fields and dropdowns
    document.getElementById("filter-input").value = "";
    document.getElementById("column-select").selectedIndex = 0;
    document.getElementById("operator-select").selectedIndex = 0;

    console.log("Filters cleared.");
}






