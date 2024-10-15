
// Lägg till eventlyssnare på checkboxarna
// Lägg till eventlyssnare på checkboxarna
document.querySelectorAll('.checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', createFirework);
});

