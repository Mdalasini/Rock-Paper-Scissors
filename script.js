// @ts-check
const playAgainElement = document.getElementById('playAgain')
const gameChoiceAssets = {
    'paper': {
        'background': 'linear-gradient(to right, hsl(230, 89%, 62%), hsl(230, 89%, 65%))',
        'image': '/images/icon-paper.svg'
    },
    'scissors': {
        'background': 'linear-gradient(to right, hsl(39, 89%, 49%), hsl(40, 84%, 53%))',
        'image': '/images/icon-scissors.svg'
    },
    'rock': {
        'background': 'linear-gradient(to right, hsl(349, 71%, 52%), hsl(349, 70%, 56%))',
        'image': '/images/icon-rock.svg'
    }
}

/**
 * Plays houses choice
 * @returns {('rock' | 'paper' | 'scissors')}
 */
function housesPlay(){
    var choices = ['rock', 'paper', 'scissors']
    var randomIndex = Math.floor(Math.random() * choices.length)
    var choice = choices[randomIndex]
    // @ts-ignore
    return choice
}

/**
 * Gets game result
 * @param {('rock' | 'paper' | 'scissors')} playerChoice
 * @param {('rock' | 'paper' | 'scissors')} houseChoice
 * @returns {('win' | 'draw' | 'loss')}
 */
function getGameResult(playerChoice, houseChoice) {
    // Check for a draw
    if (playerChoice === houseChoice) {
        return 'draw';
    }

    // Check for win conditions
    if (
        (playerChoice === 'rock' && houseChoice === 'scissors') ||
        (playerChoice === 'paper' && houseChoice === 'rock') ||
        (playerChoice === 'scissors' && houseChoice === 'paper')
    ) {
        return 'win';
    }

    // If not a draw or win, it's a loss
    return 'loss';
}

/**
 * Updates the game score based on the result.
 *
 * @param {('win' | 'draw' | 'loss')} gameResult
 */
function updateScore(gameResult) {
    // Get the element with ID 'scoreValue'
    var scoreElement = document.getElementById('scoreValue');

    // Get the current score value
    // @ts-ignore
    var currentScore = parseInt(scoreElement.textContent);

    // Update the score based on the game result
    if (gameResult === 'win') {
        // Increment score if it's a win
        currentScore++;
    } else if (gameResult === 'loss') {
        // Decrement score if it's a loss
        currentScore--;
    }

    // Update the text content of the score element
    // @ts-ignore
    scoreElement.textContent = currentScore.toString();
}


/**
 * Toggles the visibility of two elements
 * 
 * @param {string} hideId - The ID of the element to hide 
 * @param {string} showID - The ID of the element to show 
 */
function toggleVisibility(hideId, showID) {
    // Hide the element with hideId
    document.getElementById(hideId)?.classList.add('hidden')
    document.getElementById(hideId)?.classList.remove('block')

    // Show the element with showId
    document.getElementById(showID)?.classList.add('block')
    document.getElementById(showID)?.classList.remove('hidden')
}

/**
 * 
 * @param {('rock' | 'paper' | 'scissors')} playerChoice
 * @param {('rock' | 'paper' | 'scissors')} houseChoice
 * @param {('win' | 'draw' | 'loss')} gameResult
 */
function populateResultArea(playerChoice, houseChoice, gameResult) {
    const playerChoiceElement = document.getElementById('playerChoice')
    const houseChoiceElement = document.getElementById('houseChoice')
    const gameResultElement = document.getElementById('gameResult')
    const resultMessage = getResultMessage(gameResult);

    const playerBackground = gameChoiceAssets[playerChoice].background;
    const playerImage = gameChoiceAssets[playerChoice].image;
    const houseBackground = gameChoiceAssets[houseChoice].background;
    const houseImage = gameChoiceAssets[houseChoice].image;

    // @ts-ignore
    playerChoiceElement.setBackgroundImage(playerBackground)
    // @ts-ignore
    houseChoiceElement.setBackgroundImage(houseBackground)

    const playerImageElement = playerChoiceElement?.querySelector('img')
    const houseImageElement = houseChoiceElement?.querySelector('img')

    // @ts-ignore
    playerImageElement.src = playerImage
    // @ts-ignore
    houseImageElement.src = houseImage

    // @ts-ignore
    gameResultElement.innerText = resultMessage.toUpperCase()
}

/**
 * Returns a human-readable message based on the game result.
 *
 * @param {('win' | 'draw' | 'loss')} gameResult - The result of the game.
 * @returns {string} - A human-readable message.
 */
function getResultMessage(gameResult) {
    switch (gameResult) {
        case 'win':
            return "You Win!";
        case 'draw':
            return "It's a Draw.";
        case 'loss':
            return "You Lose.";
        default:
            return "Invalid Result.";
    }
}

playAgainElement?.addEventListener('click', ()=> {
    toggleVisibility('resultArea', 'playArea')
})


class gameChoice extends HTMLElement {
    

    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this)
    }

    connectedCallback() {
        this.render();
        this.addEventListener('click', this.handleClick)
    }

    disconnectCallback() {
        this.removeEventListener('click', this.handleClick)
    }

    setBackgroundImage(url) {
        const outterContainer = this.shadowRoot?.querySelector('.outter-container');
        if (outterContainer) {
            // @ts-ignore
            outterContainer.style.backgroundImage = url
        }
    }

    render() {
        const isActive = this.hasAttribute('active');
        const boxShadowStyle = isActive
      ? 'box-shadow: rgba(200, 200, 200, 0.1) 0px 0px 0px 20px, rgba(200, 200, 200, 0.05) 0px 0px 0px 40px, rgba(200, 200, 200, 0.025) 0px 0px 0px 60px, rgba(200, 200, 200, 0.0125) 0px 0px 0px 80px;'
      : '';
        const template = `
        <style>
            .outter-container{
                width: fit-content;
                border-radius: 9999px;
                padding: 1rem;
                box-shadow: inset 0px -5px rgba(12, 10, 9, 0.3);
                ${boxShadowStyle}
            }

            .inner-container{
                --tw-bg-opacity: 1;
                background-color: rgb(255 255 255 / var(--tw-bg-opacity));
                width: 110px;
                height: 110px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 9999px;
                box-shadow: inset 0px 5px rgba(12, 10, 9, 0.2);
            }
        </style>
        <div class='outter-container'>
            <div class="inner-container">
                <slot name='image'></slot>
            </div>
        </div>
        <slot name='text'></slot>
        `;

        const shadowRoot = this.attachShadow({ mode: 'open' })
        shadowRoot.innerHTML = template
    }

    handleClick(event){
        var playerChoice = event.target.id
        var houseChoice = housesPlay()
        var gameResult = getGameResult(playerChoice, houseChoice)
        populateResultArea(playerChoice, houseChoice, gameResult)
        updateScore(gameResult)
        toggleVisibility('playArea', 'resultArea')
    }
}

customElements.define('game-choice', gameChoice)

const choices = ['paper', 'scissors', 'rock']

// Get the playContainer element
const playContainer = document.getElementById('playContainer');

// Loop through each choice
choices.forEach(choice => {
  // Create a new 'game-choice' element
  const gameChoiceElement = document.getElementById(choice);

  // Get the background and image from gameChoiceAssets
  const { background, image } = gameChoiceAssets[choice];

  // @ts-ignore
  gameChoiceElement.setBackgroundImage(background)
});

const rulesOpen = document.getElementById('rulesOpen')
const rulesClose = document.getElementById('rulesClose')
const rules = document.getElementById('rules')
const overlay = document.getElementById('overlay')

rulesOpen?.addEventListener('click', () => {
    rules?.classList.remove('hidden');
    rules?.classList.add('flex');
    overlay?.classList.remove('hidden')
    overlay?.classList.add('block')
});

rulesClose?.addEventListener('click', () => {
    rules?.classList.remove('flex');
    rules?.classList.add('hidden');
    overlay?.classList.remove('block')
    overlay?.classList.add('hidden')
});