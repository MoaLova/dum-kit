// Funktion för att skapa fyrverkeriet
function createFirework(event) {
    const firework = document.createElement('div');
    firework.className = 'firework';
    
    // Placerar fyrverkeriet på positionen av checkboxen
    const rect = event.target.getBoundingClientRect();
    firework.style.left = `${rect.left + rect.width / 2}px`;
    firework.style.top = `${rect.top + rect.height / 2}px`;

    // Lägger till fyrverkeriet i body
    document.body.appendChild(firework);

    // Ta bort fyrverkeriet efter animationen är klar
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

// Lägg till eventlyssnare på checkboxarna
document.querySelectorAll('.check-btn').forEach(checkbox => {
    checkbox.addEventListener('change', createFirework);
});
