//===================New Code merge =======================
document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add');
    const newRadioButton = document.getElementById('newRadioButton');
    const existingRadioButton = document.getElementById('existingRadioButton');
    let counter = 1; // Initialize counter
    let tableCounter = 2; // Initialize table counter
    let columnCounter = 2; // Initialize column counter
  
    addButton.addEventListener('click', function () {
      if (newRadioButton.checked) {
        addNewCategory();
      } else if (existingRadioButton.checked) {
        addExistingCategory();
      }
    });
  
    function addNewCategory() {
      // Create a completely fresh div without any input values
      const newDiv = document.createElement('div');
      newDiv.classList.add('catNames', 'd-flex', 'align-items-center', 'mb-4');
  
      const minusButton = document.createElement('button');
      minusButton.classList.add('minus');
      minusButton.innerHTML = '<b>-</b>';
      minusButton.id = 'minus_' + counter;
  
      const langDiv = document.createElement('div');
      langDiv.classList.add('lang', 'inputcontainer', 'd-flex', 'align-items-center'); // Added 'd-flex' and 'align-items-center' here
  
  
      const formGroup = document.createElement('div');
      formGroup.classList.add('form-group', 'ms-3', 'me-2');
  
      const label = document.createElement('label');
      label.setAttribute('for', 'input1');
      label.classList.add('tableInput');
      label.textContent = 'Category_name';
  
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', 'Input');
      input.classList.add('catSearch');
      input.id = 'idcat';
  
      const pipe = document.createElement('span');
      pipe.classList.add('pipe', 'me-2');
      pipe.textContent = '|';
  
      // ... existing code ...
      const inputSkills = document.createElement('input');
      inputSkills.setAttribute('type', 'text');
      inputSkills.setAttribute('placeholder', 'Enter Skills');
      inputSkills.classList.add('enter');
      input.id = 'inputCategory';
      langDiv.appendChild(inputSkills);
      // ... existing code ...
  
      formGroup.appendChild(label);
      formGroup.appendChild(input);
  
  
  
      langDiv.appendChild(formGroup);
      langDiv.appendChild(pipe);
  
  
      newDiv.appendChild(minusButton);
      newDiv.appendChild(langDiv);
  
      // Increment the counter
      counter++;
  
      // Find the last dynamically added div and insert the new div after it
      const catNamesDivs = document.querySelectorAll('.catNames');
      const lastCatNamesDiv = catNamesDivs[catNamesDivs.length - 1];
  
      if (lastCatNamesDiv) {
        lastCatNamesDiv.parentNode.insertBefore(newDiv, lastCatNamesDiv.nextSibling);
      } else {
        // If no dynamically added divs found, insert after the template div
        const templateDiv = document.querySelector('.catNames');
        templateDiv.parentNode.insertBefore(newDiv, templateDiv.nextSibling);
      }
  
      // Apply the functionality for the new div
      applyFunctionalityForNewDiv(newDiv);
    }
  
    function addExistingCategory() {
      const existingCategoryDiv = document.createElement('div');
      existingCategoryDiv.classList.add('catNames', 'align-items-center', 'mb-4', 'Existing');
      existingCategoryDiv.style.display = 'flex'; // Ensure it's visible for 'Existing' category
  
      // Construct the inner HTML for the existing category
      existingCategoryDiv.innerHTML = `
            <button class="minus"><b>-</b></button>
            <div class="lang">
                <div class="inputcontainer" style="display: flex; align-items: center">
                    <div class="categoryForms" id="existingCategoryForm">
                    <div class="form-group ms-3 me-2">
                    <label for="input1" class="tableInput">
                      <strong>Select Table Name</strong>
                    </label>
                    <select
                      class="form-select"
                      id="category_input"
                      aria-label="Example select with button addon"
                    >
                      <option selected>Select Table Name</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <span class="pipe">|</span>
                  <div class="form-group ms-2 me-2">
                    <label for="input1" class="tableInput">
                      <strong>Select Column Name</strong>
                    </label>
                    <select
                      class="form-select"
                      id="category_input"
                      aria-label="Example select with button addon"
                    >
                      <option selected>Select Column Name</option>
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
                    </select>
                  </div>
                  <span class="isEqual"><strong>=</strong></span>
                  <div class="cat_tables ms-2">
                    <p id="tableColumn">Table<span>${tableCounter}</span>_Column<span>${columnCounter}</span></p>
                  </div>
                    </div>
                </div>
            </div>
        `;
  
      // Increment table and column counters
      tableCounter++;
      columnCounter++;
  
      // Add the new category after the last one
      const lastCatNamesDiv = document.querySelector('.catNames:last-of-type');
      lastCatNamesDiv.parentNode.insertBefore(existingCategoryDiv, lastCatNamesDiv.nextSibling);
  
      // Apply functionality for the new existing category
      applyFunctionalityForExistingDiv(existingCategoryDiv);
    }
  
    function applyFunctionalityForNewDiv(newDiv) {
      const minusButton = newDiv.querySelector('.minus');
  
      minusButton.addEventListener('click', function () {
        // Check if it's not the first category name, then remove the parent div
        const catNamesDivs = document.querySelectorAll('.catNames');
        if (catNamesDivs.length > 1) {
          newDiv.remove();
        }
      });
  
    }
  
    function applyFunctionalityForExistingDiv(existingDiv) {
      const minusButton = existingDiv.querySelector('.minus');
  
      minusButton.addEventListener('click', function () {
        existingDiv.remove();
      });
    }
  });
  
  
  
  
  
  //===============================================================================
  //Seprate code for adding element in Input
  document.addEventListener("DOMContentLoaded", function () {
    const inputCat = document.getElementById("inputCategory");
    const inputContainer = document.querySelector(".inputcontainer");
  
    inputCat.addEventListener("keyup", function (event) {
      if (event.key === "Enter") {
        const categoryName = inputCat.value.trim();
  
        if (categoryName !== "") {
          const newElement = createCategoryElement(categoryName);
          const pipeElement = document.querySelector(".pipe"); // Selecting the pipe element
          inputContainer.insertBefore(newElement, pipeElement.nextSibling); // Inserting newElement after the pipe
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
      categoryText.id = "skillsText";
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
  
  
  
  
  
  
