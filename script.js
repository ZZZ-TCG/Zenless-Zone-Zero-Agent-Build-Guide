// Load and display characters
async function loadCharacters() {
    try {
        const response = await fetch('characters.json');
        const data = await response.json();
        displayCharacters(data.characters);
    } catch (error) {
        console.error('Error loading characters:', error);
        document.getElementById('character-list').innerHTML = '<p>Error loading agents. Please refresh the page.</p>';
    }
}

function displayCharacters(characters) {
    const characterList = document.getElementById('character-list');
    characterList.innerHTML = '';

    characters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.innerHTML = `
            <h3>${character.name}</h3>
            <span class="role">${character.role}</span>
            <p><strong>Rarity:</strong> ${character.rarity}</p>
            <p><strong>Element:</strong> ${character.element}</p>
            <p>${character.description}</p>
            <p><strong>Best Weapons:</strong> ${character.bestWeapons.join(', ')}</p>
            <p><strong>Drive:</strong> ${character.bestDrive}</p>
            <p><strong>Team Comp:</strong> ${character.recommendedTeam}</p>
            <p><strong>Notes:</strong> ${character.notes}</p>
        `;
        characterList.appendChild(card);
    });
}

// Load characters when page loads
document.addEventListener('DOMContentLoaded', loadCharacters);
