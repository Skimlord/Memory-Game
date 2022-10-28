const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
let cards;
let interval;
let firstCard = false;
let secondCard = false;

//Items array
const items = [
  { name: "bat", image: "assets/bat.png" },
  { name: "beaver", image: "assets/beaver.png" },
  { name: "bee", image: "assets/bee.png" },
  { name: "beetle", image: "assets/beetle.png" },
  { name: "bulldog", image: "assets/bulldog.png" },
  { name: "camel", image: "assets/camel.png" },
  { name: "canary", image: "assets/canary.png" },
  { name: "cat", image: "assets/cat.png" },
  { name: "chameleon", image: "assets/chameleon.png" },
  { name: "chicken", image: "assets/chicken.png" },
  { name: "clown-fish", image: "assets/clown-fish.png" },
  { name: "cobra", image: "assets/cobra.png" },
  { name: "cow", image: "assets/cow.png" },
  { name: "crab", image: "assets/crab.png" },
  { name: "crocodile", image: "assets/crocodile.png" },
  { name: "duck", image: "assets/duck.png" },
  { name: "elephant", image: "assets/elephant.png" },
  { name: "fox", image: "assets/fox.png" },
  { name: "frog", image: "assets/frog.png" },
  { name: "giraffe", image: "assets/giraffe.png" },
  { name: "hippopotamus", image: "assets/hippopotamus.png" },
  { name: "humming-bird", image: "assets/humming-bird.png" },
  { name: "kangaroo", image: "assets/kangaroo.png" },
  { name: "lion", image: "assets/lion.png" },
  { name: "llama", image: "assets/llama.png" },
  { name: "macaw", image: "assets/macaw.png" },
  { name: "monkey", image: "assets/monkey.png" },
  { name: "moose", image: "assets/moose.png" },
  { name: "mouse", image: "assets/mouse.png" },
  { name: "octopus", image: "assets/octopus.png" },
  { name: "ostrich", image: "assets/ostrich.png" },
  { name: "owl", image: "assets/owl.png" },
  { name: "panda", image: "assets/panda.png" },
  { name: "pelican", image: "assets/pelican.png" },
  { name: "penguin", image: "assets/penguin.png" },
  { name: "pig", image: "assets/pig.png" },
  { name: "rabbit", image: "assets/rabbit.png" },
  { name: "racoon", image: "assets/racoon.png" },
  { name: "rhinoceros", image: "assets/rhinoceros.png" },
  { name: "shark", image: "assets/shark.png" },
  { name: "sheep", image: "assets/sheep.png" },
  { name: "siberian-husky", image: "assets/siberian-husky.png" },
  { name: "sloth", image: "assets/sloth.png" },
  { name: "snake", image: "assets/snake.png" },
  { name: "squirrel", image: "assets/squirrel.png" },
  { name: "swan", image: "assets/swan.png" },
  { name: "tiger", image: "assets/tiger.png" },
  { name: "toucan", image: "assets/toucan.png" },
  { name: "turtle", image: "assets/turtle.png" },
  { name: "whale", image: "assets/whale.png" },

];

//Pick random objects from the items array
const generateRandom = (size = 4) => {
  //temporary array
  let tempArray = [...items];
  //initializes cardValues array
  let cardValues = [];
  //size should be double (4*4 matrix)/2 since pairs of objects would exist
  size = (size * size) / 2;
  //Random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //once selected remove the object from temp array
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        Create Cards
        before => front side (contains question mark)
        after => back side (contains actual image);
        data-card-values is a custom attribute which stores the names of the cards to match later
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      //If selected card is not matched yet then only run (i.e already matched card when clicked would be ignored)
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        card.classList.add("flipped");
        //if it is the firstcard (!firstCard since firstCard is initially false)
        if (!firstCard) {
          //so current card will become firstCard
          firstCard = card;
          //current cards value becomes firstCardValue
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          //increment moves since user selected second card
          //secondCard and value
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            //if both cards match add matched class so these cards would beignored next time
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            //set firstCard to false since next card would be first now
            firstCard = false;
            //winCount increment as user found a correct match
            winCount += 1;
            //check if winCount ==half of cardValues
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
            }
          } else {
            //if the cards dont match
            //flip the cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

//Initialize values and func calls
const initializer = () => {
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

initializer();
