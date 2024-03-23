// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
    // Find the message alert element
    var messageAlert = document.getElementById("message-alert");

    // Check if the element exists
    if (messageAlert) {
        // Set a timeout to hide the message after 5 seconds (5000 milliseconds)
        setTimeout(function () {
            messageAlert.style.display = "none";  // or use messageAlert.remove() to remove the element
        }, 5000);
    }
});

// Wait for the DOM to be ready
document.addEventListener("DOMContentLoaded", function () {
    // Get reference to the contact list and contact details div
    var contactList = document.getElementById("contact-list");
    var contactDetails = document.getElementById("contact-details");
    var contactAvatar = document.getElementById("user-avatar");

    // Add click event listener to each contact list item
    contactList.addEventListener("click", function (event) {
        var target = event.target;

        // Check if clicked element is a contact list item
        if (target.classList.contains("contact-item")) {
            // Get the username of the clicked contact
            var username = target.dataset.username;
            var fullname = target.dataset.fullname;
            var email = target.dataset.email;
            var avatar = fullname.split(' ').map(word => word.charAt(0)).join('');

            // Update contact details div with the selected contact's information
            contactDetails.innerHTML = `
                <div class="col mb-3">
                    <h3>Username: <span style="color:#ffff;">${username}</span></h3>
                </div>
                <div class="col mb-2">
                        <h6>Full Name: <span style="color:#ffff;">${fullname}</span></h6>
                </div>
                <div class="col mb-2">
                        <h6>Email: <span style="color:#ffff;">${email}</span></h6>
                </div>
                <!-- Add other contact information fields as needed -->
            `;
            contactAvatar.innerHTML = `
                <div class="userpic"  style="background-color: cadetblue;border-radius: 50%;width: 100%;height: 18vh;display: flex;align-items: center;justify-content:center;">
                    <h1 class="avatarletter" style="font-family: 'Beau Rivage', cursive;font-size: 55px;color:white;margin-bottom: 0;">${avatar}</h1>
                </div>
            `;
        }
    });
});
