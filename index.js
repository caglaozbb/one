document.addEventListener('DOMContentLoaded', function() {
    const nextWeight = Math.floor(Math.random() * 10) + 1;
    
    const nextWeightElement = document.getElementById('next-weight');
    
    if (nextWeightElement) {
        nextWeightElement.textContent = nextWeight + ' kg';
    }
});
