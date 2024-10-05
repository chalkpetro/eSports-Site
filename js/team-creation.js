// Sample player data (in a real application, this would come from a backend API)
const players = {
    cod: ['Scump', 'Crimsix', 'Clayster', 'FormaL', 'Karma'],
    csgo: ['s1mple', 'ZywOo', 'device', 'NiKo', 'electronic'],
    valorant: ['TenZ', 'ScreaM', 'ShahZaM', 'sinatraa', 'Hiko']
};

document.addEventListener('DOMContentLoaded', function() {
    const gameSelect = document.getElementById('game');
    const playerSelect = document.getElementById('players');

    gameSelect.addEventListener('change', function() {
        const selectedGame = this.value;
        populatePlayers(selectedGame);
    });

    function populatePlayers(game) {
        // Clear existing options
        playerSelect.innerHTML = '';

        if (game && players[game]) {
            players[game].forEach(player => {
                const option = document.createElement('option');
                option.value = player;
                option.textContent = player;
                playerSelect.appendChild(option);
            });
        }
    }

    const newTeamForm = document.getElementById('new-team-form');
    newTeamForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const teamName = document.getElementById('team-name').value;
        const game = document.getElementById('game').value;
        const selectedPlayers = Array.from(document.getElementById('players').selectedOptions).map(option => option.value);

        // For now, we'll just log the team info. In a real app, you'd send this to a server.
        console.log('New Team Created:', {
            name: teamName,
            game: game,
            players: selectedPlayers
        });

        // Clear the form
        newTeamForm.reset();
        document.getElementById('players').innerHTML = '';

        // Show a success message
        alert('Team created successfully!');

        // Call displayTeam function
        displayTeam({
            name: teamName,
            game: game,
            players: selectedPlayers
        });

        // Save the team to local storage
        saveTeam({
            name: teamName,
            game: game,
            players: selectedPlayers
        });
    });
});

function displayTeam(team) {
    const teamsContainer = document.getElementById('teams-container');
    const teamElement = document.createElement('div');
    teamElement.classList.add('team-card');
    teamElement.innerHTML = `
        <h3>${team.name}</h3>
        <p>Game: ${team.game}</p>
        <p>Players: ${team.players.join(', ')}</p>
    `;
    teamsContainer.appendChild(teamElement);
}

// Add these functions to your team-creation.js file

function saveTeam(team) {
    let teams = JSON.parse(localStorage.getItem('teams')) || [];
    teams.push(team);
    localStorage.setItem('teams', JSON.stringify(teams));
}

function loadTeams() {
    const teams = JSON.parse(localStorage.getItem('teams')) || [];
    teams.forEach(displayTeam);
}

// Call loadTeams when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    loadTeams();
});