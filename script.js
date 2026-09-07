// Load and display characters on main page
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
    if (!characterList) return;
    
    characterList.innerHTML = '';

    characters.forEach(character => {
        const card = document.createElement('a');
        card.href = `agent-detail.html?id=${character.id}`;
        card.className = 'character-card';
        card.innerHTML = `
            <div class="card-header">
                <h3>${character.name}</h3>
                <span class="rarity rarity-${character.rarity.toLowerCase()}">${character.rarity}</span>
            </div>
            <p class="role">${character.role}</p>
            <p class="element">Element: ${character.element}</p>
            <p class="description">${character.description}</p>
            <div class="card-footer">
                <span class="view-link">View Build →</span>
            </div>
        `;
        characterList.appendChild(card);
    });
}

// Load characters when page loads
document.addEventListener('DOMContentLoaded', loadCharacters);