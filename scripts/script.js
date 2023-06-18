function getComputerChoice() {
    const choices = ["Rock", "Paper", "Scissor"];
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    return computerChoice;
}