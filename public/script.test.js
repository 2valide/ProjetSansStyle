const { JSDOM } = require("jsdom");

describe("Note Application", () => {
    let document;

    beforeEach(() => {
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>Test</title>
            </head>
            <body>
                <button id="addNoteButton">Add Note</button>
                <div id="formContainer" style="display: none;">
                    <input id="noteTitle" type="text" />
                    <textarea id="noteText"></textarea>
                    <button id="saveNoteBtn">Save</button>
                </div>
                <div id="notesContainer"></div>
            </body>
            </html>
        `);

        document = dom.window.document;

        global.document = document;
        global.window = dom.window;
    });

    it("should add a note to the container", () => {
        const { addNoteToContainer } = require("../public/script");

        const notesContainer = document.getElementById("notesContainer");

        const note = {
            title: "Test Note",
            content: "This is a test note.",
            created_datetime: "2024-12-20T12:00:00Z"
        };

        addNoteToContainer(note);

        expect(notesContainer.innerHTML).toContain("<h3>Test Note</h3>");
        expect(notesContainer.innerHTML).toContain("<p>This is a test note.</p>");
    });
});
