// Function to set the theme based on the stored preference
function setThemeFromStorage() {
    const storedTheme = localStorage.getItem('themePreference');
    if (storedTheme) {
        changeTheme(storedTheme);
    }
}

// Function to change the theme based on the selected color
function changeTheme(color) {
    // Update the primary color variable
    document.documentElement.style.setProperty('--primary-color', color);

    // Update the color of the color picker to match the selected color
    const colorPicker = document.getElementById('primary-color-picker');
    if (colorPicker) {
        colorPicker.value = color;
    }

    // Determine the theme class based on the selected color
    let themeClass;

    switch (color) {
        case '#242424':
            themeClass = 'dark-theme';
            break;
        case '#6c5ce7':
            themeClass = 'purple-theme';
            break;
        case '#00b894':
            themeClass = 'green-theme';
            break;
        case '#ff6347':
            themeClass = 'red-theme';
            break;
        case '#ff9800':
            themeClass = 'orange-theme';
            break;
        case '#20c997':
            themeClass = 'teal-theme';
            break;
        case '#e83e8c':
            themeClass = 'pink-theme';
            break;
        case '#3498db':
        default:
            themeClass = 'blue-theme'; // Default to blue theme if color is unknown or undefined
            break;
    }

    // Store the selected theme preference in local storage
    localStorage.setItem('themePreference', color);

    // Apply the new theme class to the body element
    applyThemeClass(themeClass);
}

// Function to apply the specified theme class to the body element
function applyThemeClass(themeClass) {
    const bodyElement = document.body;

    // Remove existing theme classes and add the new theme class
    bodyElement.classList.remove('dark-theme', 'purple-theme', 'green-theme', 'red-theme', 'orange-theme', 'teal-theme', 'pink-theme', 'blue-theme');
    bodyElement.classList.add(themeClass);
}

// Event listener to apply the stored theme preference when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    setThemeFromStorage();
});

// Event listener for color picker change to update the theme
document.getElementById('primary-color-picker').addEventListener('change', (event) => {
    changeTheme(event.target.value);
});
