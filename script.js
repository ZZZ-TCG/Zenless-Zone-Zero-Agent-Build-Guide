// Load and display characters on main page
async function loadCharacters() {
    try {
        const response = await fetch('https://raw.githubusercontent.com/ZZZ-TCG/Zenless-Zone-Zero-Agent-Build-Guide/main/characters.json');
        const data = await response.json();
        displayCharacters(data.characters);
    } catch (error) {
        console.error('Error loading characters:', error);
        document.getElementById('character-list').innerHTML = '<p>Error loading agents. Please try again.</p>';
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
        
        // Placeholder image - using Sigrid's image for all
        const imageUrl = 'https://raw.githubusercontent.com/ZZZ-TCG/Zenless-Zone-Zero-Agent-Build-Guide/main/assets/sigrid.png';
        
        card.innerHTML = `
            <img src="${imageUrl}" alt="${character.name}" class="card-image" onerror="this.src='https://via.placeholder.com/180x280?text=${character.name}'">
            <div class="card-badges">
                <span class="rank-badge">S-Rank</span>
                <div class="specialty-icon">⚔️</div>
            </div>
            <div class="card-overlay">
                <h3>${character.name}</h3>
            </div>
        `;
        characterList.appendChild(card);
    });
}

// Load characters when page loads
document.addEventListener('DOMContentLoaded', loadCharacters);
