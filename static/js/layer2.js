document.addEventListener("DOMContentLoaded", function () {
    // Function to handle addition of new rule
    function addRule() {
        const rulesContainer = document.getElementById("rulesContainer");

        // Create elements for the new rule
        const ruleCount = rulesContainer.children.length + 1;
        const newRule = document.createElement("div");
        newRule.classList.add("rulesbox", "d-flex", "align-items-center", "justify-content-between", "w-100", "mb-3");
        newRule.innerHTML = `
    <div class="col-md-4 leftrule d-flex align-items-center justify-content-between ps-0">
        <button class="minus-widget">-</button>
        <h5 style="margin-bottom: 0 !important;">Rule <span id="rulecount">${ruleCount}</span> :</h5>
        <select id="column-select" class="inputbox me-2">
            <option selected>Select Table Name</option>
            <option value="1">Table Name 1</option>
            <option value="2">Table Name 2</option>
            <option value="3">Table Name 3</option>
            <option value="4">Table Name 4</option>
        </select>
    </div>
    <div class="col d-flex flex-column mb-0">
        <div class="rightrule d-flex align-items-center justify-content-evenly mb-2" id="inputBoxContainer" style="margin-right: 15rem;">
            <button class="plus-widget" id="inputbkey">+</button>
            <input type="text" class="inputbox" placeholder="key" style="width: 30%;">
            <input type="text" class="inputbox" placeholder="value" style="width: 30%;">
        </div>
    </div>
`;

        // Append the new rule to the rules container
        rulesContainer.appendChild(newRule);
    }

    // Event listener for add button ("+")
    const addRuleButton = document.getElementById("addRuleBtn");
    addRuleButton.addEventListener("click", addRule);

    // Function to handle deletion of rules
    function deleteRule(event) {
        const ruleBox = event.target.closest(".rulesbox");
        if (ruleBox) {
            if (ruleBox.parentElement.children.length === 1) {
                // alert("At least one rule must be present!");
                console.log("At least one rule must be present..!")
            } else {
                ruleBox.remove(); // Remove the rule box
                updateRuleCount(); // Update the rule count
                sortRules(); // Sort the rules after deletion
            }
        }
    }

    // Function to update the rule count
    function updateRuleCount() {
        const rules = document.querySelectorAll(".rulesbox");
        const ruleCountElement = document.getElementById("rulecount");
        if (rules.length > 0) {
            ruleCountElement.textContent = rules.length;
        } else {
            ruleCountElement.textContent = "0";
        }
    }

    // Function to sort rules based on rule number
    function sortRules() {
        const rulesContainer = document.getElementById("rulesContainer");
        const rules = Array.from(rulesContainer.querySelectorAll(".rulesbox"));
        rules.forEach((rule, index) => {
            rule.querySelector("#rulecount").textContent = index + 1;
        });
    }

    // Event listener for delete button ("-")
    document.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("minus-widget")) {
            deleteRule(event);
        }
    });
});






document.addEventListener("DOMContentLoaded", function () {
    // Function to clone input box container and append it just below
    function cloneInputBoxContainer(container) {
        const clonedContainer = container.cloneNode(true); // Clone the container element

        // Find and remove the plus button from the cloned container
        const plusButton = clonedContainer.querySelector(".plus-widget");
        if (plusButton) {
            plusButton.remove();
        }

        // Find the input boxes in the cloned container
        const inputBoxes = clonedContainer.querySelectorAll(".inputbox");

        // Update placeholder values for input boxes in the cloned container
        inputBoxes.forEach((inputBox, index) => {
            inputBox.placeholder = ""; // Clear existing placeholder values
            if (index % 2 === 0) {
                // If index is even, it's a key input box, so set placeholder for key input box
                inputBox.placeholder = "key";
            } else {
                // If index is odd, it's a value input box, so set placeholder for value input box
                inputBox.placeholder = "value";
            }
        });

        // Create a minus button for each cloned input box container
        const minusButton = document.createElement("button");
        minusButton.textContent = "-";
        minusButton.classList.add("minus-widget");

        // Event listener for minus button to remove the cloned input box container
        minusButton.addEventListener("click", function () {
            clonedContainer.remove(); // Remove the cloned container when the minus button is clicked
        });

        // Insert the minus button just before the first input box (key input box)
        const firstInputBox = clonedContainer.querySelector(".inputbox");
        clonedContainer.insertBefore(minusButton, firstInputBox);

        container.parentNode.insertBefore(clonedContainer, container.nextSibling); // Append the cloned container just below the original one
    }

    // Event listener for plus button to clone input box container
    document.addEventListener("click", function (event) {
        if (event.target && event.target.classList.contains("plus-widget")) {
            const plusButton = event.target; // Retrieves the clicked element (plus button).
            const inputBoxContainer = plusButton.parentNode; // Finds the parent container of the plus button, which contains the input boxes.
            cloneInputBoxContainer(inputBoxContainer); // Calls the cloneInputBoxContainer function, passing the input box container as an argument to clone and append it.
        }
    });
});