let userScore = 0;
let livesLeft = 3;
let dogBreeds = [];
let breed = "";
let dogURL = "";
let breedArray = [];

generateDog();

/**
 * Function to reset the game
 */
function resetGame() {
    userScore = 0;
    livesLeft = 3;
    location.reload();
}

/**
 * User selects a dog, updates game according to if user was correct or not
 * @param {string} value player's choice of breed 
 */
function chooseDog(value) {
    if (value === breed) {
        result("win");
        console.log("Correct!");
        updateScore();
        toggleNext("on");
        toggleClick("off");
    } else {
        result("lose");
        console.log("Incorrect!");
        loseLife();
    }
    checkEndGame();
}

/**
 * Increment the user score by 1 when the player chooses a dog breed correctly
 */
function updateScore() {
    userScore += 1;
    const score = document.querySelector('#scoreNum');
    score.innerText = userScore;
}

/**
 * Lose a life if the player chooses the incorrect breed
 */
function loseLife() {
    livesLeft -= 1;
    const lives = document.querySelector('#lives');
    lives.textContent = '🐶'.repeat(livesLeft);
}

/**
 * Check if the game has been won (five points scored) or lost (all lives gone)
 */
function checkEndGame() {
    if (userScore >= 5) {
        alert("You Win!");
        resetGame();
    } else if (livesLeft <= 0) {
        alert("Game over");
        resetGame();
    }
}

/**
 * Function to update the image of the new dog
 */
function updateImage() {
    const dog = document.querySelector('#dog')
    dog.src = dogURL;
}

/**
 * Function to update the buttons with the new selection of dog breeds
 */
function updateButtons() {
    buttons = document.querySelectorAll(".breed");
    let i = 0;
    for (let button of buttons) {
        button.value = breedArray[i];
        button.innerText = breedArray[i].capitalize();
        i += 1;
    }
}

/**
 * Fetch list of all dog breeds using dog API and append to array
 */
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

/**
 * Generate a random dog breed and photo using the dog API
 */
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

/**
 * Generate a random array of four dogs (including correct dog) to be used as options in the game
 */
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
}

/**
 * Function to retrieve the breed of the dog from dog url returned by the API
 * @param {string} url Dog url 
 * @returns Dog breed
 */
function getBreed(url) {
    const regex = "(?<=breeds\/)(.*)(?=\/)";
    return url.match(regex)[0].split('-')[0]
}

/**
 * Function to display the result of a player's choice
 * @param {string} res Result 
 */
function result(res) {
    toggleResult("on");
    const elem = document.querySelector("#result");
    switch (res) {
        case "win":
            elem.innerText = "Correct!"
            elem.setAttribute("style", "background-color: darkgreen");
            break;
        case "lose":
            elem.innerText = "Not quite, try again"
            elem.setAttribute("style", "background-color: darkred");
            break;
    }
}

/**
 * Function to toggle displaying the next button on or off
 */
function toggleNext(option) {
    const button = document.querySelector("#next");
    switch (option) {
        case "on":
            button.setAttribute("style", "display: inline-block");
            break;
        case "off":
            button.setAttribute("style", "display: none");
            break;
    }
}

/**
 * Function to toggle displaying the result banner on or off
 */
function toggleResult(option) {
    const result = document.querySelector("#result");
    switch (option) {
        case "on":
            result.setAttribute("style", "display: inline-block");
            break;
        case "off":
            result.setAttribute("style", "display: none");
            break;
    }
}

/**
 * Function to toggle if a button is clickable.
 * Used after a player has completed their turn but not selected "Next Dog" yet.
 */
function toggleClick(option) {
    const buttons = document.querySelectorAll(".breed");
    switch (option) {
        case "on":
            for (let button of buttons) {
                button.disabled = false;
            }
            break;
        case "off":
            console.log("click toggle")
            for (let button of buttons) {
                button.disabled = true;
            }
            break;
    }
}

/**
 * Tasks to execute when user selects the "Next Dog" button
 */
function next() {
    generateDog();
    toggleNext("off");
    toggleResult("off");
    toggleClick("on");

}

/**
 * Method to capitalise the first character of a string
 * @returns Capitalised string
 */
String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

/**
 * Method to shuffle the positions of elements in an array
 * @param {Array} a array to shuffle 
 * @returns Array with randomised positions
 */
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
