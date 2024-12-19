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
        addNote(title, text);  // Ajoute la note au conteneur
        noteForm.style.display = 'none';  // Cache le formulaire après ajout
        clearForm();  // Réinitialise le formulaire

        // Vous pouvez aussi envoyer la note à un serveur ici via AJAX si nécessaire.
    } else {
        alert('Veuillez remplir le titre et le texte de la note.');  // Alerte si le titre ou le texte sont vides
    }
});

// Ajouter une note au conteneur
function addNote(title, text) {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `<h3>${title}</h3><p>${text}</p>`;
    notesContainer.appendChild(noteDiv);  // Ajoute la note à la page
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
