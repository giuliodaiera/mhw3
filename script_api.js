const formCampionati = document.getElementById('form-campionati');
formCampionati.addEventListener('submit', selectCampionato);
const selectCampionatoElement = document.querySelector('#tipo');
selectCampionatoElement.addEventListener('change', onChangeSelectCampionato);

function onResponse(response){
	if(!response.ok){
		console.log(response);
		return null;
	}

	return response.json();
}

function onError(error){
	console.log('Error: ' + error);
}

function onCampionatoSelected(json){
	if(!json){
		console.log("Nessun elemento nel campionato");
		return;
	}

	const leagues = document.querySelector("#leagues-view");
	leagues.innerHTML = '';

	for(let i of json.countrys){

		const leagueContainer = document.createElement('div');
		leagueContainer.className = "league";

		const headerContainer = document.createElement('div');
		headerContainer.className = "headerContainer"
		leagueContainer.appendChild(headerContainer);

		const nameLeague = document.createElement('h3');
		nameLeague.textContent = i.strLeagueAlternate;
		headerContainer.appendChild(nameLeague);

		const imageLeague = document.createElement('img');
		imageLeague.src = i.strBadge;
		headerContainer.appendChild(imageLeague);

		const dataLeague = document.createElement('label');
		dataLeague.textContent = "Data inizio: " + i.intFormedYear;
		leagueContainer.appendChild(dataLeague);

		const infoLeague = document.createElement('label');
		infoLeague.textContent = i.strDescriptionEN;
		leagueContainer.appendChild(infoLeague);

		leagues.appendChild(leagueContainer);

	}
}

function onChangeSelectCampionato(){
	const valueSelected = selectCampionatoElement.value;

	switch(valueSelected.toLowerCase()){
		case 'italia':
			rest_url = 'https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=Italy';
			break;
		case 'inghilterra':
			rest_url = 'https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=England';
			break;
		case 'germania':
			rest_url = 'https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=Germany';
			break;
		case 'spagna':
			rest_url = 'https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=Spain';
			break;
		case 'francia':
			rest_url = 'https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=France';
			break;
		default:
			rest_url = 'https://www.thesportsdb.com/api/v1/json/1/search_all_leagues.php?c=Italy';
	}
}

function selectCampionato(event){
	event.preventDefault();

	fetch(rest_url).then(onResponse, onError).then(onCampionatoSelected);
}


const APIkey = '101853ede470b45a015d907720aa9e8dd9021e24799bb6c90682732704551215';

const formGiocatori = document.getElementById('form-giocatori');
formGiocatori.addEventListener('submit', searchGiocatore);

function onGiocatoreResponse(json){

	console.log('JSON ricevuto');

	const players = document.querySelector("#players-view");
	players.innerHTML = '';

	for(let i of json){

		const playerContainer = document.createElement('div');
		playerContainer.className = "player";

		const namePlayer = document.createElement('h3');
		namePlayer.textContent = i.player_name;
		playerContainer.appendChild(namePlayer);

		const numberPlayer = document.createElement('label');
		numberPlayer.textContent = 'Number: ' + i.player_number;
		playerContainer.appendChild(numberPlayer);

		const countryPlayer = document.createElement('label');
		countryPlayer.textContent = 'Country: ' + i.player_country;
		playerContainer.appendChild(countryPlayer);

		const agePlayer = document.createElement('label');
		agePlayer.textContent = 'Age: ' + i.player_age;
		playerContainer.appendChild(agePlayer);

		const teamNamePlayer = document.createElement('label');
		teamNamePlayer.textContent = 'team: ' + i.team_name;
		playerContainer.appendChild(teamNamePlayer);

		const matchPlayed = document.createElement('label');
		matchPlayed.textContent = 'match played: ' + i.player_match_played;
		playerContainer.appendChild(matchPlayed);

		const goalsDone = document.createElement('label');
		goalsDone.textContent = 'goals: ' + i.player_goals;
		playerContainer.appendChild(goalsDone);

		players.appendChild(playerContainer);
	}
}

function searchGiocatore(event){
	event.preventDefault();

	const player_input = document.querySelector('#namePlayer')
	const player_value = encodeURIComponent(player_input.value);
	console.log('Eseguo ricerca: ' + player_value);

	rest_url = 'https://apiv2.apifootball.com/?action=get_players&player_name=' + player_value + '&APIkey=' + APIkey;
	console.log('URL: ' + rest_url);

	fetch(rest_url).then(onResponse, onError).then(onGiocatoreResponse);
}
