const openFormBtn = document.getElementById('addNoteButton');
const noteForm = document.getElementById('formContainer');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const notesContainer = document.getElementById('notesContainer');

openFormBtn.addEventListener('click', () => {
    noteForm.style.display = 'flex';
});

saveNoteBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const title = document.getElementById('noteTitle').value;
    const text = document.getElementById('noteText').value;

    if (title.trim() !== '' && text.trim() !== '') {
        addNote(title, text);
        noteForm.style.display = 'none';
    } else {
        alert('Veuillez remplir le titre et le texte de la note.');
    }
});

function addNoteToContainer(note) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `
        <h3>${title}</h3>
        <p>${text}</p>
        <button class="edit-btn">Modifier</button>
        <button class="delete-btn">Supprimer</button>
    `;

    noteDiv.querySelector('.delete-btn').addEventListener('click', () => noteDiv.remove());
    noteDiv.querySelector('.edit-btn').addEventListener('click', () => editNote(noteDiv, title, text));

    notesContainer.appendChild(noteDiv);
}

function editNote(noteDiv, oldTitle, oldText) {
    document.getElementById('noteTitle').value = oldTitle;
    document.getElementById('noteText').value = oldText;
    noteForm.style.display = 'flex';

    // Supprimer la note actuelle après l'édition
    noteDiv.remove();
}

document.addEventListener('DOMContentLoaded', () => {
    fetchNotes().then(notes => {
        displayNotes(notes);
    });
});

function fetchNotes() {
    return fetch('../api/notes.php')
        .then(response => {
            return response.text();
        })
        .then(text => {
            const jsonMatch = text.match(/\[.*]/);
            return JSON.parse(jsonMatch[0]);
        });
}

function displayNotes(notes) {
    notes.forEach(note => {
        addNoteToContainer(note);
    });
}

function postNote(title, content) {
    const note = {
        title: title,
        content: content,
        created_datetime: new Date().toISOString()
    };

    fetch('../api/notes.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
        .then(data => {
            addNoteToContainer(data);
        })
        .then(() => {
            location.reload();
        });
}

module.exports = { addNoteToContainer , fetchNotes, postNote };
