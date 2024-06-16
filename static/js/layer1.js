// *************** Layer1 *******************

document.addEventListener("DOMContentLoaded", function () {
    // Get radio buttons
    const newCategoryRadio = document.getElementById('newCategory');
    const existingCategoryRadio = document.getElementById('existingCategory');

    // Get content rows
    const newCategoryContent = document.getElementById('newCategoryContent');
    const existingCategoryContent = document.getElementById('existingCategoryContent');

    // Add event listeners to radio buttons
    newCategoryRadio.addEventListener('change', function () {
        if (this.checked) {
            newCategoryContent.style.display = 'block';
            existingCategoryContent.style.display = 'none';
        }
    });

    existingCategoryRadio.addEventListener('change', function () {
        if (this.checked) {
            newCategoryContent.style.display = 'none';
            existingCategoryContent.style.display = 'block';
        }
    });
});


// Function to add a new category content
function addNewCategory() {
    // Clone the template content
    const newCategory = document.querySelector('.newcategoryContent').cloneNode(true);
    // Find the '-' button in the cloned category content and add the onclick attribute
    newCategory.querySelector('.minus').setAttribute('onclick', 'removeNewCategory(this)');
    // Append the cloned content after the last category content
    document.querySelector('.newcategoryContent:last-of-type').insertAdjacentElement('afterend', newCategory);
}

// Function to remove a category content
function removeNewCategory(button) {
    // Get the parent element of the category content to be removed
    const categoryContent = button.closest('.newcategoryContent');
    // Remove the category content
    categoryContent.remove();
}
// Function to add a new category content
function addExistCategory() {
    // Clone the template content
    const newCategory = document.querySelector('.existcategoryContent').cloneNode(true);
    // Find the '-' button in the cloned category content and add the onclick attribute
    newCategory.querySelector('.minus').setAttribute('onclick', 'removeExistCategory(this)');
    // Append the cloned content after the last category content
    document.querySelector('.existcategoryContent:last-of-type').insertAdjacentElement('afterend', newCategory);
}

// Function to remove a category content
function removeExistCategory(button) {
    // Get the parent element of the category content to be removed
    const categoryContent = button.closest('.existcategoryContent');
    // Remove the category content
    categoryContent.remove();
}

document.addEventListener("DOMContentLoaded", function () {
    const inputContainer = document.querySelector(".inputcontainer");
    const inputCat = document.getElementById("inputCategory");

    inputCat.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            const categoryName = inputCat.value.trim();

            if (categoryName !== "") {
                const newElement = createCategoryElement(categoryName);
                const pipeElement = document.querySelector(".pipe"); // Selecting the pipe element
                inputContainer.insertBefore(newElement, pipeElement.nextSibling); // Inserting newElement after the pip
                inputCat.value = ""; // Clear the input field
            }
        }
    });

    function createCategoryElement(categoryName) {
        const containerEle = document.createElement("div");
        containerEle.classList.add("containerEle", "d-flex");

        const inputItems = document.createElement("div");
        inputItems.classList.add("input-items", "d-flex", "align-items-center", "bordered-box");

        const categoryText = document.createElement("span");
        categoryText.classList.add("html-text");
        categoryText.textContent = categoryName;

        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fas", "fa-times", "delete-icon", "bg-primary", "cross");
        deleteIcon.addEventListener("click", function () {
            inputContainer.removeChild(containerEle);
        });

        inputItems.appendChild(categoryText);
        inputItems.appendChild(deleteIcon);

        containerEle.appendChild(inputItems);

        return containerEle;
    }
});



// *************** Layer1 End *******************