// Sélection des éléments
const openFormBtn = document.getElementById('addNoteButton');
const noteForm = document.getElementById('formContainer');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const notesContainer = document.getElementById('notesContainer');

// Ouvrir le formulaire lorsque le bouton "Ajouter une note" est cliqué
openFormBtn.addEventListener('click', () => {
    noteForm.style.display = 'flex';  // Affiche le formulaire
});

// Fonction pour enregistrer une note avec prévention de la soumission de formulaire
saveNoteBtn.addEventListener('click', (e) => {
    e.preventDefault();  // Empêche la soumission du formulaire (évite le rechargement de la page)

    const title = document.getElementById('noteTitle').value;
    const text = document.getElementById('noteText').value;

    if (title.trim() !== '' && text.trim() !== '') {
        postNote(title, text);  // Envoie la note au serveur
        noteForm.style.display = 'none';  // Cache le formulaire après ajout
        clearForm();  // Réinitialise le formulaire
    } else {
        alert('Veuillez remplir le titre et le texte de la note.');  // Alerte si le titre ou le texte sont vides
    }
});

// Ajouter une note au conteneur
function addNoteToContainer(note) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `<h3>${note.title}</h3><p>${note.content}</p><p><small>${note.created_datetime}</small></p>`;
    notesContainer.appendChild(noteDiv);
}

// Réinitialiser le formulaire
function clearForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteText').value = '';
}

// Fermer le formulaire en cliquant en dehors de celui-ci
window.addEventListener('click', (e) => {
    if (e.target === noteForm) {
        noteForm.style.display = 'none';  // Cache le formulaire
        clearForm();  // Réinitialise le formulaire
    }
});

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
        .then(response => {
            return response.text();
        })
        .then(text => {
            console.log('Raw response text:', text);
            const jsonMatch = text.match(/\{.*\}/);
            if (!jsonMatch) {
                throw new Error('Invalid JSON format');
            }
            return JSON.parse(jsonMatch[0]);
        })
        .then(data => {
            console.log('Note saved:', data);
            addNoteToContainer(data);
        })
        .catch(error => {
            console.error('Error saving note:', error);
        });
}