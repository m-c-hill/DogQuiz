let userScore = 0;
let livesLeft = 3;
let dogBreeds = [];
let breed = "";
let dogURL = "";
let breedArray = [];

generateDog();

function resetGame() {
    userScore = 0;
    livesLeft = 3;
    location.reload();
}

function testClick(value) {
    if (value === breed) {
        result("win");
        console.log("Correct!");
        updateScore();
        generateDog();
    } else {
        result("lose");
        console.log("Incorrect!");
        loseLife();
    }
    checkEndGame();
}

async function run() {
    await generateDogBreeds();
    await generateDog();
}

function updateScore() {
    userScore += 1;
    const score = document.querySelector('#scoreNum');
    score.innerText = userScore;
}

function loseLife() {
    livesLeft -= 1;
    const lives = document.querySelector('#lives');
    console.log(livesLeft);
    lives.innerText = '🐶'.repeat(livesLeft);
}

function checkEndGame() {
    if (userScore >= 5) {
        alert("You Win!");
    } else if (livesLeft <= 0) {
        alert("Game over");
        resetGame();
    }
}

function gameover() {
    console.log("GAME OVER!");
}

function updateImage() {
    const dog = document.querySelector('#dog')
    dog.src = dogURL;
}

function updateButtons() {
    buttons = document.querySelectorAll(".breed");
    let i = 0;
    for (let button of buttons) {
        button.value = breedArray[i];
        button.innerText = breedArray[i].capitalize();
        i += 1;
    }
}

// Add event listeners for all four buttons. When button is clicked, the data (breed name) is passed into checkGuess
function checkGuess(guess) {
    // Checks if guess is in breedArray
}

async function generateDogBreeds() {
    try {
        const response = await fetch("https://dog.ceo/api/breeds/list/all")
        const breeds = await response.json();
        for (var b in breeds.message) {
            dogBreeds.push(b);
        }
    } catch (e) {
        console.log("Error", e);
    }
}

async function generateDog() {
    try {
        await generateDogBreeds();
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const data = await response.json();
        dogURL = data["message"];
        breed = getBreed(dogURL);
        generateRandomBreeds();
        updateImage();
        updateButtons();
    } catch (e) {
        console.log("Error", e);
    }
}

async function interim() {
    await generateDogBreeds();
    generateRandomBreeds();
    updateButtons();
}

function generateRandomBreeds() {
    breedArray = [breed];
    let j = 0;
    while (j < 3) {
        let randomBreed = dogBreeds[Math.floor(Math.random() * dogBreeds.length)];
        if (!breedArray.includes(randomBreed)) {
            breedArray.push(randomBreed);
            j += 1;
        }
    }
    breedArray = shuffle(breedArray);
    console.log(breedArray);
}

function getBreed(url) {
    const regex = "(?<=breeds\/)(.*)(?=\/)";
    return url.match(regex)[0].split('-')[0]
}

function result(res) {
    const elem = document.querySelector("#result");
    switch (res) {
        case "win":
            elem.innerText = "Correct!"
            elem.setAttribute("style", "background-color: darkgreen");
            break;
        case "lose":
            elem.innerText = "Not quite, try again"
            elem.setAttribute("style", "background-color: darkred;");
            break;
    }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}