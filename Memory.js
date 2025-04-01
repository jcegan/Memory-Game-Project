let cardArray = [
    document.getElementById('axe1'),
    document.getElementById('bow1'),
    document.getElementById('castle1'),
    document.getElementById('chest1'),
    document.getElementById('crown1'),
    document.getElementById('hammer1'),
    document.getElementById('helmet1'),
    document.getElementById('mug1'),
    document.getElementById('scroll1'),
    document.getElementById('shield1'),
    document.getElementById('sword1'),
    document.getElementById('torch1'),
    document.getElementById('axe2'),
    document.getElementById('bow2'),
    document.getElementById('castle2'),
    document.getElementById('chest2'),
    document.getElementById('crown2'),
    document.getElementById('hammer2'),
    document.getElementById('helmet2'),
    document.getElementById('mug2'),
    document.getElementById('scroll2'),
    document.getElementById('shield2'),
    document.getElementById('sword2'),
    document.getElementById('torch2')
];
let lives = 12;
reset();
const buttonRst = document.getElementById("button-rst");
let isClicked = 0;
let firstCard = null;
let secondCard = null;
let firstCardId = null;
let secondCardId = null;

function flipCard(card){
    const cover = card.getElementsByClassName("cover")[0];
    card.classList.add("card-slot-ani"); 
    cover.classList.add("cover-ani");
    card.classList.add('card-slot-events');
    setTimeout(() => {
        card.classList.remove("card-slot-ani");
    }, 900);

    const cardName = String(card.getAttribute('id'));
    const regex = /axe|bow|castle|chest|crown|hammer|helmet|mug|scroll|shield|sword|torch/;
    const matchedName = cardName.match(regex);
    return [ 
        String(matchedName),
        card
    ]
}

function revFlipCards(card1, card2){
    const cover1 = card1.getElementsByClassName("cover")[0];
    const cover2 = card2.getElementsByClassName("cover")[0];
    setTimeout(() => {
    card1.classList.add("card-slot-ani-rev");
    cover1.classList.add("cover-ani-rev");
    card2.classList.add("card-slot-ani-rev");
    cover2.classList.add("cover-ani-rev");
    setTimeout(() => {
        cover1.classList.remove("cover-ani");
        cover2.classList.remove("cover-ani");
    }, 400);
    
    setTimeout(() => {
        card1.classList.remove('card-slot-events');
        card2.classList.remove('card-slot-events');
        card1.classList.remove("card-slot-ani-rev");
        cover1.classList.remove("cover-ani-rev");
        card2.classList.remove("card-slot-ani-rev");
        cover2.classList.remove("cover-ani-rev");
    }, 1300);
}, 1700);
};

function identifyCards(card){
    
    if (isClicked){
        isClicked += 1;
        secondCard = flipCard(card)[0];
        secondCardElement = flipCard(card)[1];
    } else {
        isClicked += 1;
        firstCard = flipCard(card)[0];
        firstCardElement = flipCard(card)[1];
    }
    if (isClicked >= 2 && firstCard == secondCard){
        firstCardElement.style.border = '5px solid green';
        secondCardElement.style.border = '5px solid green';
        setTimeout(() => {
            firstCardElement.classList.add('card-slot-events');
            secondCardElement.classList.add('card-slot-events');
        }, 1600);
        let match1 = cardArray.indexOf(firstCardElement);
        let match2 = cardArray.indexOf(secondCardElement);
        cardArray.splice(match1, 1);
        cardArray.splice(match2, 1);

        isClicked = 0;
        firstCard = null;
        secondCard = null;
        firstCardId = null;
        secondCardId = null;

        if (cardArray.length == 0){
        document.getElementById('winner-msg').style.display = 'block';
        };
        
    } else if (isClicked >= 2 && firstCard !== secondCard){
        revFlipCards(firstCardElement, secondCardElement);
        isClicked = 0;
        firstCard = null;
        secondCard = null;
        firstCardId = null;
        secondCardId = null;
        lives -= 1;
        document.getElementById('lives-counter').innerText = `Lives remaining: ${lives}`;
        if (lives == 0){
            document.getElementById("card-table").style.pointerEvents = 'none';
            setTimeout(() => {
                document.getElementById("card-table").style.pointerEvents = 'none';
            }, 2750);
            document.getElementById('winner-msg').style.display = 'block';
            document.getElementById('winner-msg').innerText = 'You lose buddy sorry...';
            document.getElementById("card-table").style.border = '8px solid red';
            
        }
    }  
};

function shuffleCards(array) {
    for (let i = array.length - 1; i > 0; i--) { 
        const j = Math.floor(Math.random() * (i + 1)); 
        [array[i], array[j]] = [array[j], array[i]];
  };
};

function reset() {
    const table = document.getElementById("card-table");
    cardArray = [
        document.getElementById('axe1'),
        document.getElementById('bow1'),
        document.getElementById('castle1'),
        document.getElementById('chest1'),
        document.getElementById('crown1'),
        document.getElementById('hammer1'),
        document.getElementById('helmet1'),
        document.getElementById('mug1'),
        document.getElementById('scroll1'),
        document.getElementById('shield1'),
        document.getElementById('sword1'),
        document.getElementById('torch1'),
        document.getElementById('axe2'),
        document.getElementById('bow2'),
        document.getElementById('castle2'),
        document.getElementById('chest2'),
        document.getElementById('crown2'),
        document.getElementById('hammer2'),
        document.getElementById('helmet2'),
        document.getElementById('mug2'),
        document.getElementById('scroll2'),
        document.getElementById('shield2'),
        document.getElementById('sword2'),
        document.getElementById('torch2')
    ];
    shuffleCards(cardArray);
    document.getElementById('winner-msg').style.display = 'none';
    document.getElementById('winner-msg').innerText = 'Nice dude you win! play again?';
    lives = 12;
    document.getElementById('lives-counter').innerText = `Lives remaining: ${lives}`;
    cardArray.forEach((card) => {
        table.appendChild(card);
        card.classList.remove('card-slot-events');
        const cover = card.getElementsByClassName("cover")[0];
        cover.classList.remove("cover-ani");
        card.style.border = '5px solid black';
    })
    table.style.pointerEvents = 'initial';
    table.style.border = '0px solid red';
};

buttonRst.addEventListener('click', reset);

cardArray.forEach((card) => {
card.addEventListener('click', () => {
    document.getElementById("card-table").style.pointerEvents = 'none';
    if (isClicked == 1){
    setTimeout(() => {
        document.getElementById("card-table").style.pointerEvents = 'initial';
    }, 2700)} else {
    setTimeout(() => {
        document.getElementById("card-table").style.pointerEvents = 'initial';
    }, 1000)
    };
    identifyCards(card);
});
});