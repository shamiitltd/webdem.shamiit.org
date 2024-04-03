$(document).ready(function() {
    // Set default value
    var defaultEntries = 10;
    $('#selectedEntries').text(defaultEntries);
    
    // Handle dropdown selection change
    $('.dropdown-item').on('click', function(e) {
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
    cloneButton.parentNode.onclick = function() {
        cloneDiv.remove();
    };

    // Insert the cloned div after the mainfilter element
    mainfilter.insertAdjacentElement('afterend', cloneDiv);
}

// Prevent dropdown from closing when clicking inside it
document.getElementById('filterDropdown').addEventListener('click', function(event) {
    event.stopPropagation();
});