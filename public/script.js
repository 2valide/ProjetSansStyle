// Sélection des éléments
const openFormBtn = document.getElementById('addNoteButton');
const noteForm = document.getElementById('formContainer');
const saveNoteBtn = document.getElementById('saveNoteBtn');
const notesContainer = document.getElementById('notesContainer');

// Ouvrir le formulaire lorsque le bouton "Ajouter une note" est cliqué
openFormBtn.addEventListener('click', () => {
    noteForm.style.display = 'flex';
});

// Fonction pour enregistrer une note
saveNoteBtn.addEventListener('click', () => {
    const title = document.getElementById('noteTitle').value;
    const text = document.getElementById('noteText').value;

    if (title.trim() !== '' && text.trim() !== '') {
        addNote(title, text);
        noteForm.style.display = 'none';
        clearForm();
    } else {
        alert('Veuillez remplir le titre et le texte de la note.');
    }
});

// Ajouter une note au conteneur
function addNote(title, text) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `
        <h3>${title}</h3>
        <p>${text}</p>
        <button class="edit-btn">Modifier</button>
        <button class="delete-btn">Supprimer</button>
    `;

    // Ajout des écouteurs d'événements pour les boutons
    noteDiv.querySelector('.delete-btn').addEventListener('click', () => noteDiv.remove());
    noteDiv.querySelector('.edit-btn').addEventListener('click', () => editNote(noteDiv, title, text));

    notesContainer.appendChild(noteDiv);
}

// Fonction pour éditer une note
function editNote(noteDiv, oldTitle, oldText) {
    document.getElementById('noteTitle').value = oldTitle;
    document.getElementById('noteText').value = oldText;
    noteForm.style.display = 'flex';

    // Supprimer la note actuelle après l'édition
    noteDiv.remove();
}

// Réinitialiser le formulaire
function clearForm() {
    document.getElementById('noteTitle').value = '';
    document.getElementById('noteText').value = '';
}

// Fermer le formulaire en cliquant en dehors de celui-ci
window.addEventListener('click', (e) => {
    if (e.target === noteForm) {
        noteForm.style.display = 'none';
        clearForm();
    }
});
