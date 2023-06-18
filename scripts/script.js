function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissor"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    return computerChoice;
}

function getPlayerChoice() {
    let playerInput;
    do {
        console.log("1. Rock\n2. Paper\n3. Scissor")
        playerInput = prompt("1. Rock\n2. Paper\n3. Scissor");
        
        if (playerInput === null) {
            return null;
        }
        
        playerInput = capitalize(playerInput);
        
        if (isValidChoice(playerInput)) {
            return playerInput;
        } else {
            console.log("Invalid Input");
        }
        
    } while (!isValidChoice(playerInput))
}

function capitalize(playerInput) {
    if (playerInput.length > 1) {
        return (
            playerInput.charAt(0).toUpperCase() +
            playerInput.slice(1).toLowerCase()
            );
        }
        
        return playerInput.toUpperCase();
    }
    
function isValidChoice(playerInput) {
    return (
        playerInput === "Rock" ||
        playerInput === "Paper" ||
        playerInput === "Scissor"
    )
}

function playRound(playerSelection, computerSelection) {
    const selectionWinChart = {
        "Rock": "Paper",
        "Paper": "Scissor",
        "Scissor": "Rock",
    }
    
    const winningChoice = selectionWinChart[computerSelection];
    if (playerSelection === winningChoice) {
        console.log(`You Won!!! ${winningChoice} beats ${computerSelection}`);
        return "player";
        
    } else if (playerSelection === computerSelection) {
        console.log("It's a tie!");
        return null;

    } else {
        console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
        return "computer";
    }
}

function game() {
    let score = {
        "player": 0,
        "computer": 0,
    };

    while (score["player"] !== 5 && score["computer"] !== 5) {
        const computerSelection = getComputerChoice();
        const playerSelection = getPlayerChoice();

        if (playerSelection === null) {
            return;
        }

        const roundWinner = playRound(playerSelection, computerSelection);
        if (roundWinner) score[roundWinner]++;

        console.log("Score");
        console.table(score);
    }

    (score["player"] === 5)? 
    console.log("YOU WON!!!"): 
    console.log("YOU LOSE!!");
}

game()