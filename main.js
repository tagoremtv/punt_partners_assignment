let fontData;

// Function to load fonts from the JSON file
function loadFonts() {
    fetch('fonts.json')
        .then(response => response.json())
        .then(data => {
            fontData = data;
            populateFontFamilyDropdown();
        })
        .catch(error => console.error('Error fetching fonts:', error));
}

// Populate the font family dropdown
function populateFontFamilyDropdown() {
    const fontSelect = document.getElementById('font-family');
    for (const font in fontData) {
        const option = document.createElement('option');
        option.textContent = font;
        option.value = font;
        fontSelect.appendChild(option);
    }
    // Trigger font weight selection based on default font family
    const savedFontFamily = localStorage.getItem('fontFamily');
    if (savedFontFamily) {
        document.getElementById('font-family').value = savedFontFamily;
        updateFontWeights();
    }
}

// Function to update font weight dropdown based on selected font family
function updateFontWeights() {
    const selectedFont = document.getElementById('font-family').value;
    const weightSelect = document.getElementById('font-weight');
    weightSelect.innerHTML = ''; // Clear previous options

    if (fontData[selectedFont]) {
        const variants = fontData[selectedFont];
        for (const weight in variants) {
            const option = document.createElement('option');
            option.textContent = weight;
            option.value = weight;
            weightSelect.appendChild(option);
        }

        // Apply the saved font weight if available
        const savedFontWeight = localStorage.getItem('fontWeight') || '400';
        const savedItalic = localStorage.getItem('italic') === 'true';

        // Ensure the weight and italic values are valid
        if (fontData[selectedFont][savedFontWeight] !== undefined) {
            weightSelect.value = savedFontWeight;
        } else {
            weightSelect.value = '400'; // Default to 400 if the saved weight is not available
        }
        loadFont(selectedFont, weightSelect.value);
        applyFontStyles();
    }
}

// Function to load the font via URL
function loadFont(fontFamily, fontWeight) {
    const existingLink = document.querySelector(`link[href*="${fontFamily}"]`);
    if (existingLink) {
        existingLink.remove();
    }

    if (fontData[fontFamily] && fontData[fontFamily][fontWeight]) {
        const fontUrl = fontData[fontFamily][fontWeight];
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css?family=${fontFamily.replace(/ /g, '+')}:${fontWeight}${fontWeight.includes('italic') ? ',italic' : ''}&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }
}

// Function to apply selected font family, weight, and italic style to content
function applyFontStyles() {
    const fontFamily = document.getElementById('font-family').value;
    const fontWeight = document.getElementById('font-weight').value;
    const italic = document.getElementById('italic').checked;

    const content = document.getElementById('editor-content');
    content.style.fontFamily = fontFamily;
    content.style.fontWeight = fontWeight;
    content.style.fontStyle = italic ? 'italic' : 'normal';
}

// Function to save content and font settings locally
function saveContent() {
    const content = document.getElementById('editor-content').innerHTML;
    const fontFamily = document.getElementById('font-family').value;
    const fontWeight = document.getElementById('font-weight').value;
    const italic = document.getElementById('italic').checked;

    localStorage.setItem('editorContent', content);
    localStorage.setItem('fontFamily', fontFamily);
    localStorage.setItem('fontWeight', fontWeight);
    localStorage.setItem('italic', italic);
}

// Function to load saved content and font settings
function loadSavedContent() {
    const savedContents = JSON.parse(localStorage.getItem('savedContents')) || [];
    const savedFontFamily = localStorage.getItem('fontFamily');
    const savedFontWeight = localStorage.getItem('fontWeight');
    const savedItalic = localStorage.getItem('italic') === 'true';

    // Load saved contents
    displaySavedContents(savedContents);

    // Apply saved font settings
    if (savedFontFamily) {
        document.getElementById('font-family').value = savedFontFamily;
        updateFontWeights();
    }
}

// Function to display saved contents
function displaySavedContents(savedContents) {
    const savedContentList = document.getElementById('saved-content-list');
    savedContentList.innerHTML = ''; // Clear existing items
    savedContents.forEach(item => {
        const newItem = document.createElement('div');
        newItem.classList.add('saved-content-item');
        newItem.style.fontFamily = item.fontFamily;
        newItem.style.fontWeight = item.fontWeight;
        newItem.style.fontStyle = item.italic ? 'italic' : 'normal';
        newItem.innerHTML = `<span>${item.index}. ${item.content}</span>`;
        savedContentList.appendChild(newItem);
    });

    const clearAllButton = document.getElementById('clear-all-button');
    if (savedContents.length > 0) {
        clearAllButton.style.display = 'block';
    } else {
        clearAllButton.style.display = 'none';
    }
}

// Function to clear all saved contents
function clearAllSavedContents() {
    localStorage.removeItem('savedContents');
    displaySavedContents([]);
}

// Function to handle font family change event
function onFontFamilyChange() {
    updateFontWeights();
    applyFontStyles();
}

// Function to handle font weight change event
function onFontWeightChange() {
    applyFontStyles();
}

// Function to handle italic change event
function onItalicChange() {
    applyFontStyles();
}

// Function to handle editor content change event
function onEditorContentChange() {
    applyFontStyles();
}

// Function to handle reset button click
function resetContent() {
    localStorage.removeItem('editorContent');
    localStorage.removeItem('fontFamily');
    localStorage.removeItem('fontWeight');
    localStorage.removeItem('italic');
    localStorage.removeItem('savedContents');
    document.getElementById('editor-content').innerHTML = '';
    document.getElementById('font-family').value = '';
    document.getElementById('font-weight').innerHTML = ''; // Clear font weights
    document.getElementById('italic').checked = false;
    applyFontStyles(); // Reset styles

    // Clear saved content list
    displaySavedContents([]);
}

function appendSavedContent() {
    const content = document.getElementById('editor-content').innerHTML;
    const fontFamily = document.getElementById('font-family').value;
    const fontWeight = document.getElementById('font-weight').value;
    const italic = document.getElementById('italic').checked;

    // Retrieve existing saved contents
    let savedContents = JSON.parse(localStorage.getItem('savedContents')) || [];
    const newIndex = savedContents.length ? savedContents[savedContents.length - 1].index + 1 : 1;

    savedContents.push({ 
        index: newIndex, 
        content: content,
        fontFamily: fontFamily,
        fontWeight: fontWeight,
        italic: italic
    });
    localStorage.setItem('savedContents', JSON.stringify(savedContents));

    // Update the displayed saved contents
    displaySavedContents(savedContents);
}

document.getElementById('font-family').addEventListener('change', onFontFamilyChange);
document.getElementById('font-weight').addEventListener('change', onFontWeightChange);
document.getElementById('italic').addEventListener('change', onItalicChange);
document.getElementById('editor-content').addEventListener('input', onEditorContentChange);
document.getElementById('save-button').addEventListener('click', () => {
    saveContent();
    appendSavedContent(); 
});
document.getElementById('reset-button').addEventListener('click', resetContent);
document.getElementById('clear-all-button').addEventListener('click', clearAllSavedContents); 

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    loadFonts();
    loadSavedContent();
});
