	const myDivs = document.getElementsByClassName('play-ground');
	const gameState = document.querySelector('.game-state');
	const resetButton = document.querySelector('.reset');
	const singleButton = document.querySelector('.single');
	const doubleButton = document.querySelector('.double');
	let player1State = [];
	let player2State = [];
	let botState = [];

	let selectDiv = "";
	let playerTurn = 1;
	let gameOver = false;
	let gameMode = "single";

	let botRemainState = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
	let botChoice = "";

	console.log(singleButton);
	console.log(doubleButton);

	singleButton.onclick = function(){
		gameMode = "single";
		pickMode();
	}
	doubleButton.onclick = function(){
		gameMode = "double";
		pickMode();
	}


	resetButton.onclick = reset;

	function pickMode(){
		if (gameMode == "single"){
			reset();
			console.log(gameMode);
			for(i=0; i<myDivs.length; i++){
				singleButton.style.border = "5px solid white";
				doubleButton.style.border = "";
				myDivs[i].onclick = singleSetUp; 
			}
		}else if(gameMode == "double"){
			reset();
			console.log(gameMode);
			for(i=0; i<myDivs.length; i++){
				myDivs[i].onclick = doubleSetUp; 
				doubleButton.style.border = "5px solid white";
				singleButton.style.border = "";
			}
		}
	}

	function botMove(){
		botChoice = botRemainState[Math.floor(Math.random() * (botRemainState.length))];
		selectDiv = botChoice;	

		updateBotRemain();
		// console.log(botChoice);
		// console.log(botRemainState);

		botState.push(selectDiv);
		myDivs[botChoice-1].style.backgroundImage = "url(images/x.png)";	
		gameState.innerHTML = "Player 1's Turn";						

		if(checkWin(botState) == true){
			gameOver = true;
			alert("player 2 wins");
			return;
		}	

		if(checkTie(player1State, botState) == true){
					alert("Tie Game!!");
					gameOver = true;
					return;
		}	
	}

	function singleSetUp(event){
		selectDiv = event.target.id[5];

		if(gameOver == true){
			return;
		}

		if(checkEmpty(selectDiv, player1State, botState) == true){
			return;
		}

		player1State.push(selectDiv);
		updateBotRemain();
		// console.log(selectDiv);
		// console.log(botRemainState);

		event.target.style.backgroundImage = "url(images/circle.png)";
		gameState.innerHTML = "Player 2's Turn";

		if(checkWin(player1State) == true){
			gameOver = true;
			alert("player 1 wins");
			return;
		}
		if(checkTie(player1State, botState) == true){
			alert("Tie Game!!");
			gameOver = true;
			return;
		}	

		botMove();
	}

	function doubleSetUp(event){
		selectDiv = event.target.id[5];

		if(gameOver == true){
			return;
		}

		if(checkEmpty(selectDiv, player1State, player2State) == true){
			return;
		}

		if(playerTurn == 1){
			player1State.push(selectDiv);
			event.target.style.backgroundImage = "url(images/circle.png)";
			gameState.innerHTML = "Player 2's Turn";
			playerTurn = 2;
			if(checkWin(player1State) == true){
				gameOver = true;
				alert("player 1 wins");
				return;
			}
		}else {
			player2State.push(selectDiv);			
			event.target.style.backgroundImage = "url(images/x.png)";		
			gameState.innerHTML = "Player 1's Turn";						
			playerTurn = 1;
			if(checkWin(player2State) == true){
				gameOver = true;
				alert("player 2 wins");
				return;
			}
		}

		if(checkTie(player1State, player2State) == true){
			alert("Tie Game!!");
			gameOver = true;
			return;
		}
	}

	function checkEmpty(div, player1, player2){

		if(player1.includes(div) || player2.includes(div)){
			return true;	
		}
		return false;
	}

	function checkWin(player){
		if(player.includes('1') && player.includes('2') && player.includes('3')){
			return true;
		}else if(player.includes('4') && player.includes('5') && player.includes('6')){
			return true;
		}else if(player.includes('7') && player.includes('8') && player.includes('9')){
			return true;
		}else if(player.includes('1') && player.includes('4') && player.includes('7')){
			return true;
		}else if(player.includes('2') && player.includes('5') && player.includes('8')){
			return true;
		}else if(player.includes('3') && player.includes('6') && player.includes('9')){
			return true;
		}else if(player.includes('1') && player.includes('5') && player.includes('9')){
			return true;
		}else if(player.includes('3') && player.includes('5') && player.includes('7')){
			return true;
		}
		return false;
	}

	function checkTie(player1, player2){
		allState = player1.concat(player2);
		if(allState.length == 9){
			return true;
		}		
		return false;
	}

	function reset(event){
		gameOver = false;
		player1State = [];
		player2State = [];
		selectDiv = "";
		playerTurn = 1;

		botState = [];
		botRemainState = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		botChoice = "";

		for (i=0; i<myDivs.length; i++){
			myDivs[i].style.backgroundImage = "";
		}
	}

	function updateBotRemain(){
		botRemainState = botRemainState.filter(function(num){
			if(selectDiv != num){
				return num;
			}
		});
	}
