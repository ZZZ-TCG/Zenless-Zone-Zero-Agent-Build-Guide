// Load agent details from URL parameter
async function loadAgentDetail() {
    const params = new URLSearchParams(window.location.search);
    const agentId = params.get('id');

    if (!agentId) {
        document.getElementById('agent-detail').innerHTML = '<p>No agent selected. <a href="index.html">Go back</a></p>';
        return;
    }

    try {
        const response = await fetch('characters.json');
        const data = await response.json();
        const agent = data.characters.find(c => c.id == agentId);

        if (!agent) {
            document.getElementById('agent-detail').innerHTML = '<p>Agent not found. <a href="index.html">Go back</a></p>';
            return;
        }

        displayAgentDetail(agent);
    } catch (error) {
        console.error('Error loading agent:', error);
        document.getElementById('agent-detail').innerHTML = '<p>Error loading agent details. <a href="index.html">Go back</a></p>';
    }
}

function displayAgentDetail(agent) {
    const detailSection = document.getElementById('agent-detail');
    document.title = `${agent.name} - Build Guide`;

    detailSection.innerHTML = `
        <div class="agent-header">
            <h1>${agent.name}</h1>
            <div class="agent-meta">
                <span class="badge rarity rarity-${agent.rarity.toLowerCase()}">Rarity: ${agent.rarity}</span>
                <span class="badge element">Element: ${agent.element}</span>
                <span class="badge role">Role: ${agent.role}</span>
            </div>
        </div>

        <div class="agent-description">
            <p>${agent.description}</p>
        </div>

        <div class="build-section">
            <h2>Recommended Build</h2>
            <div class="build-info">
                <div class="build-item">
                    <h3>Best Weapons</h3>
                    <ul>
                        ${agent.bestWeapons.map(w => `<li>${w}</li>`).join('')}
                    </ul>
                </div>
                <div class="build-item">
                    <h3>Drive Type</h3>
                    <p>${agent.bestDrive}</p>
                </div>
                <div class="build-item">
                    <h3>Team Composition</h3>
                    <p>${agent.recommendedTeam}</p>
                </div>
            </div>
        </div>

        <div class="notes-section">
            <h2>Build Tips</h2>
            <p>${agent.notes}</p>
        </div>
    `;
}

// Load agent details when page loads
document.addEventListener('DOMContentLoaded', loadAgentDetail);