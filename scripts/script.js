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
            console.log("PlayerChoice:", playerInput);
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
        
    } else if (playerSelection === computerSelection) {
        console.log("It's a tie!");

    } else {
        console.log(`You Lose! ${computerSelection} beats ${playerSelection}`);
    }
}