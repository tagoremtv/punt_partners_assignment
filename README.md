# Simple Text Editor

## Description

This is a simple web-based text editor that allows users to type and format text using various font families, weights, and italic styles. The editor also provides functionality to save, reset, and display previously saved content.

## Features

- **Font Family Selection**: Choose from a variety of fonts.
- **Font Weight Selection**: Select different font weights based on the chosen font family.
- **Italic Toggle**: Apply italic styling to the text.
- **Content Editable Area**: Type and format your text within the editor.
- **Save Content**: Save the current content along with the applied styles.
- **Reset Editor**: Clear the editor content and reset styles.
- **Display Saved Content**: View and manage previously saved content.
- **Clear All Saved Content**: Remove all saved content from local storage.

## Setup and Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/text-editor.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd text-editor
    ```
3. **Open `index.html` in your web browser to start using the editor.**

## Files

- `index.html`: The main HTML file containing the structure of the text editor.
- `styles.css`: The CSS file for styling the text editor.
- `main.js`: The JavaScript file that contains the logic for the text editor functionality.
- `fonts.json`: A JSON file containing the available fonts and their respective weights.

## Usage

1. **Select a Font Family**: Choose a font family from the dropdown.
2. **Select a Font Weight**: Choose a font weight from the dropdown (options are dynamically populated based on the selected font family).
3. **Toggle Italic**: Check or uncheck the italic checkbox to apply or remove italic styling.
4. **Start Typing**: Type your content in the editable area.
5. **Save Content**: Click the "Save" button to save the current content and styles.
6. **Reset Content**: Click the "Reset" button to clear the editor and reset styles.
7. **View Saved Content**: Previously saved content will be displayed below the editor.
8. **Clear All Saved Content**: Click the "Delete Saved" button to remove all saved content.

## Local Storage

The text editor uses local storage to save the content and styles, so your changes will persist even after refreshing the page.

## License

This project is licensed under the MIT License.