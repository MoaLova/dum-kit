// Funktion för att skapa fyrverkeriet
// Funktion för att skapa fyrverkeriet
function createFirework(event) {
    console.log('Fyrverkeri triggas!'); // Lägg till denna rad för att testa om funktionen körs
    const firework = document.createElement('div');
    firework.className = 'firework';

    const rect = event.target.getBoundingClientRect();
    firework.style.left = '50%';
firework.style.top = '50%';
 

    document.body.appendChild(firework);

    setTimeout(() => {
        firework.remove();
    }, 1000);
}


// Lägg till eventlyssnare på checkboxarna
// Lägg till eventlyssnare på checkboxarna
document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', createFirework);
});

