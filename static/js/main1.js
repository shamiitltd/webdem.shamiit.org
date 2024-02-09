document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('add');
  let counter = 1; // Initialize counter

  addButton.addEventListener('click', function () {
      // Create a completely fresh div without any input values
      const newDiv = document.createElement('div');
      newDiv.classList.add('catNames', 'd-flex', 'align-items-center', 'mb-4');
    //  responsive minus button 
      const minusButton = document.createElement('button');
      minusButton.classList.add('minus');
      minusButton.innerHTML = '<b>-</b>';
      minusButton.id = 'minus_' + counter;

      const langDiv = document.createElement('div');
      langDiv.classList.add('lang', 'inputcontainer', 'd-flex', 'align-items-center'); // Added 'd-flex' and 'align-items-center' here

      const formGroup = document.createElement('div');
      formGroup.classList.add('form-group', 'ms-3', 'me-2');
    // responsive label
      const label = document.createElement('label');
      label.setAttribute('for', 'input1');
      label.classList.add('tableInput');
      label.textContent = 'Category_name';
    // input
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', 'Input');
      input.classList.add('catSearch');
      input.id = 'idcat';

      const pipe = document.createElement('span');
      pipe.classList.add('pipe', 'me-2');
      pipe.textContent = '|';

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
  });

  function applyFunctionalityForNewDiv(newDiv) {
      const minusButton = newDiv.querySelector('.minus');

      minusButton.addEventListener('click', function () {
          // Check if it's not the first category name, then remove the parent div
          const catNamesDivs = document.querySelectorAll('.catNames');
          if (catNamesDivs.length > 1) {
              newDiv.remove();
          }
      });

      const inputCat = newDiv.querySelector('.catSearch');
      const inputContainer = newDiv.querySelector('.inputcontainer');

      inputCat.addEventListener('keyup', function (event) {
          if (event.key === 'Enter') {
              const categoryName = inputCat.value.trim();

              if (categoryName !== '') {
                  const newElement = createCategoryElement(categoryName);
                  inputContainer.appendChild(newElement);
                  inputCat.value = ''; // Clear the input field
              }
          }
      });

      // Function to create category element (same as in the initial code)
      function createCategoryElement(categoryName) {
          const containerEle = document.createElement('div');
          containerEle.classList.add('containerEle', 'd-flex');

          const inputItems = document.createElement('div');
          inputItems.classList.add('input-items', 'd-flex', 'align-items-center', 'bordered-box');

          const categoryText = document.createElement('span');
          categoryText.classList.add('html-text');
          categoryText.textContent = categoryName;

          const deleteIcon = document.createElement('i');
          deleteIcon.classList.add('fas', 'fa-times', 'delete-icon', 'bg-primary', 'cross');
          deleteIcon.addEventListener('click', function () {
              inputContainer.removeChild(containerEle);
          });

          inputItems.appendChild(categoryText);
          inputItems.appendChild(deleteIcon);

          containerEle.appendChild(inputItems);

          return containerEle;
      }
  }
});


  
  
//===============================================================================
//Seprate code for adding element in Input
// document.addEventListener("DOMContentLoaded", function () {
//   const inputCat = document.getElementById("idcat");
//   const inputContainer = document.querySelector(".inputcontainer");
  
//   inputCat.addEventListener("keyup", function (event) {
//       if (event.key === "Enter") {
//           const categoryName = inputCat.value.trim();
  
//           if (categoryName !== "") {
//               const newElement = createCategoryElement(categoryName);
//               inputContainer.appendChild(newElement);
//               inputCat.value = ""; // Clear the input field
//           }
//       }
//   });
  
//   function createCategoryElement(categoryName) {
//       const containerEle = document.createElement("div");
//       containerEle.classList.add("containerEle", "d-flex");
  
//       const inputItems = document.createElement("div");
//       inputItems.classList.add("input-items", "d-flex", "align-items-center", "bordered-box");
  
//       const categoryText = document.createElement("span");
//       categoryText.classList.add("html-text");
//       categoryText.textContent = categoryName;
  
//       const deleteIcon = document.createElement("i");
//       deleteIcon.classList.add("fas", "fa-times", "delete-icon", "bg-primary", "cross");
//       deleteIcon.addEventListener("click", function () {
//           inputContainer.removeChild(containerEle);
//       });
  
//       inputItems.appendChild(categoryText);
//       inputItems.appendChild(deleteIcon);
  
//       containerEle.appendChild(inputItems);
  
//       return containerEle;
//   }
//   });