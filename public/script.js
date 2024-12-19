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
        postNote(title, text);
        noteForm.style.display = 'none';
    } else {
        alert('Veuillez remplir le titre et le texte de la note.');
    }
});

function addNoteToContainer(note) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p><p><small>${note.created_datetime}</small></p>`;
    notesContainer.appendChild(noteDiv);
}

document.addEventListener('DOMContentLoaded', () => {
    fetchNotes().then(notes => {
        displayNotes(notes);
    });
});

function fetchNotes() {
    return fetch('../api/submit_note.php')
        .then(response => {
            return response.text();
        })
        .then(text => {
            const jsonMatch = text.match(/\[.*\]/);
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

    fetch('../api/submit_note.php', {
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