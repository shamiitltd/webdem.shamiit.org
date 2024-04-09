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


function replicateDropdown() {
    var dropdownContainer = document.querySelector('.d-flex.mb-2'); // Get the container of the dropdown elements
    var clonedDropdown = dropdownContainer.cloneNode(true); // Clone the dropdown container
    var plusButton = clonedDropdown.querySelector('.btn-primary'); // Get the plus button
    plusButton.innerHTML = '<img src="/static/images/minus-15.png">'; // Change the image source to minus
    plusButton.removeEventListener('click', replicateDropdown); // Remove the event listener from the plus button
    plusButton.addEventListener('click', removeReplicatedDropdown); // Add event listener to the minus button
    plusButton.setAttribute('onclick', 'removeReplicatedDropdown()'); // Add onclick attribute to the minus button
    dropdownContainer.parentNode.insertBefore(clonedDropdown, dropdownContainer.nextSibling); // Insert the cloned dropdown after the original dropdown
}

function removeReplicatedDropdown() {
    this.parentNode.remove(); // Remove the replicated dropdown when the minus button is clicked
}

// Initial event listener to replicate the dropdown when the plus button is clicked
document.querySelector('.btn-primary').addEventListener('click', replicateDropdown);







