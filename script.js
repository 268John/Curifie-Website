function changeColor(clickedButton) {
    // Überprüfen, ob der Button bereits ausgewählt ist
    var isSelected = clickedButton.classList.contains('selected');
    
    // Wenn der Button bereits ausgewählt ist, entfernen Sie die Klasse
    if (isSelected) {
        clickedButton.classList.remove('selected');
    } else {
        // Alle Buttons zurücksetzen
        var buttons = document.querySelectorAll('.material-icon-button');
        buttons.forEach(function(button) {
            button.classList.remove('selected');
        });

        // Aktuellen Button auswählen
        clickedButton.classList.add('selected');
    }
} 

function toggleChat() {
    var chatInputContainer = document.getElementById('chat-input-container');
    chatInputContainer.style.display = chatInputContainer.style.display === 'none' ? 'block' : 'none';
}

function sendMessage() {
    var message = document.getElementById('user-message').value;
    // Hier kann der Code für den Nachrichtenversand implementiert werden
    console.log('Nachricht gesendet:', message);
    // Beispiel: Nachricht per Ajax senden oder an eine Chatbot-API übermitteln
}