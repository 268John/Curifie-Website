const cloudContainer = document.getElementById('cloud-container');
const offsetXFactor = 0.1; // Verschiebungsfaktor für X-Richtung
const offsetYFactor = 0.3; // Verschiebungsfaktor für Y-Richtung

// Funktion zum Hinzufügen von Platzhaltern mit Bildern und Texten
function addPlaceholderWithImageAndText(x, y, pageName, imageUrl, text) {
  const placeholder = document.createElement('div');
  placeholder.className = 'placeholder';
  placeholder.style.left = `${x}px`;
  placeholder.style.top = `${y}px`;
  
  const image = document.createElement('div');
  image.className = 'placeholder-image';
  image.style.backgroundImage = `url('${imageUrl}')`; // Hintergrundbild setzen
  placeholder.appendChild(image);

  const nameText = document.createElement('div');
  nameText.className = 'placeholder-text';
  nameText.innerText = text;
  placeholder.appendChild(nameText);

  // Füge einen Event Listener für den Klick hinzu
  placeholder.addEventListener('click', () => {
    window.location.href = `${pageName}.html`; // Jeder Platzhalter führt zu einer eigenen Seite
  });

  cloudContainer.appendChild(placeholder);

  return placeholder; // Gibt das erstellte Placeholder-Element zurück
}

// Beispiel: Erzeuge 30 zufällige Platzhalter mit eindeutigen Seiten, Bildern und Texten
const placeholdersWithImagesAndTexts = [
  { x: 100, y: 100, pageName: 'seite_1', imageUrl: 'https://aerotelegraph.imgix.net/production/uploads/2023/12/lilium-jet.png?auto=compress%2Cenhance%2Cformat&ch=Save-Data&crop=edges&dpr=2&fit=crop&h=326&w=653&s=248b91930e3923b364756ba668fb05db', text: 'Text für Seite 1' },
  { x: 400, y: 200, pageName: 'Master', imageUrl: 'https://cdn.prod.www.spiegel.de/images/2e23ebdd-47c6-4be1-92cc-4708cfa7269d_w872_r1.778_fpx55.99_fpy50.webp', text: 'Toller Text' },
  { x: 300, y: 100, pageName: 'seite_1', imageUrl: 'https://aerotelegraph.imgix.net/production/uploads/2023/12/lilium-jet.png?auto=compress%2Cenhance%2Cformat&ch=Save-Data&crop=edges&dpr=2&fit=crop&h=326&w=653&s=248b91930e3923b364756ba668fb05db', text: 'Text für Seite 1' },
  { x: 600, y: 800, pageName: 'Master', imageUrl: 'https://cdn.prod.www.spiegel.de/images/2e23ebdd-47c6-4be1-92cc-4708cfa7269d_w872_r1.778_fpx55.99_fpy50.webp', text: 'Toller Text' },
  // Fügen Sie hier weitere Platzhalter mit Bildern und Texten hinzu...
];

const placeholders = [];
placeholdersWithImagesAndTexts.forEach(({ x, y, pageName, imageUrl, text }) => {
  const placeholder = addPlaceholderWithImageAndText(x, y, pageName, imageUrl, text);
  placeholders.push(placeholder);
});

function animatePlaceholders() {
  // Passe die Positionen der Placeholder für die Animation an
  placeholders.forEach((placeholder, index) => {
    let newX = parseFloat(placeholder.style.left) + offsetXFactor;
    let newY = parseFloat(placeholder.style.top) + offsetYFactor;

    // Überprüfe, ob der Platzhalter den Bildschirmrand erreicht hat
    if (newX > window.innerWidth) {
      newX = 0 - placeholder.offsetWidth; // Setze den Platzhalter auf die linke Seite zurück
    }
    if (newX < 0 - placeholder.offsetWidth) {
      newX = window.innerWidth; // Setze den Platzhalter auf die rechte Seite zurück
    }
    if (newY > window.innerHeight) {
      newY = 0 - placeholder.offsetHeight; // Setze den Platzhalter auf die obere Seite zurück
    }
    if (newY < 0 - placeholder.offsetHeight) {
      newY = window.innerHeight; // Setze den Platzhalter auf die untere Seite zurück
    }

    placeholder.style.left = `${newX}px`;
    placeholder.style.top = `${newY}px`;
  });

  requestAnimationFrame(animatePlaceholders);
}

// Starte die Animation
animatePlaceholders();
