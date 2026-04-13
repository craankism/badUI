const body = document.querySelector('body');
const captcha = document.querySelector('#captcha');
const wholePage = document.querySelector('.wholePage');
const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#pwd');
const form = document.querySelector('#formGrid');

// black battle start spiral variables
const boxSize = 60;
let maxWidth = body.clientWidth;
let maxHeight = body.clientHeight;
let maxSquareHeight = maxHeight / boxSize;
let maxSquareWidth = maxWidth / boxSize;
let i = 0;
let j = 0;
let round = 1;
let margin = 0;

let pokeballs = 3;

// refresh site on window resize for right clientWidth/height
if (body.clientWidth > 481) {
    window.addEventListener('resize', () => {
        localStorage.clear();
        location.reload();
    })
}

// submit event
form.addEventListener('submit', (e) => {
    e.preventDefault();
    localStorage.clear();
    confirm("You don't have enough RAM!");
    setTimeout(() => {
        window.location.replace('https://downloadmoreram.com/');
    });
})

username.value = localStorage.getItem('username');
email.value = localStorage.getItem('email');
password.value = localStorage.getItem('password');
captcha.checked = localStorage.getItem('success') === 'true';

// captcha checkbox clicked
captcha.addEventListener('change', () => {
    localStorage.setItem('username', username.value);
    localStorage.setItem('email', email.value);
    localStorage.setItem('password', password.value);
    localStorage.setItem('success', false);
    newSquareRow(i, j);
    round++;
})

// black battle start spiral
function addBlackSquare(battleIntroScreen, n) {
    if (n <= 0) {
        switch (round) {
            case 1:
                i = 0;
                j = 0;
                maxWidth -= boxSize;
                maxHeight -= boxSize;
                maxSquareHeight -= 1;
                maxSquareWidth -= 1;
                margin += boxSize;
                break;
            case 2:
                i++;
                j++;
                break;
            case 3:
                j++;
                break;
            case 4:
                i--;
                j++;
                round = 0;
                break;
        }
        if (maxWidth <= 0 || maxHeight <= 0) {
            background();
            return;
        }
        round++;
        newSquareRow(i, j);
        return;
    }
    const blackSquare = document.createElement('div');
    blackSquare.style.backgroundColor = 'black';
    blackSquare.style.width = boxSize + 'px';
    blackSquare.style.height = boxSize + 'px';
    battleIntroScreen.appendChild(blackSquare);
    //console.log(n);
    setTimeout(() => {
        addBlackSquare(battleIntroScreen, n - 1);
    }, 0);
}
function newSquareRow(i, j) {
    /*
    Oben nach unten   => i === 0 && j === 0
    Links nach rechts => i === 1 && j === 1
    Unten nach oben   => i === 1 && j === 2
    Rechts nach links => i === 0 && j === 3
    */
    const align = ['flex-start', 'flex-end'];
    const direction = ['column', 'row', 'column-reverse', 'row-reverse'];
    const battleIntroScreen = document.createElement('div');
    battleIntroScreen.style.display = 'flex';
    battleIntroScreen.style.alignItems = align[i];
    battleIntroScreen.style.position = 'fixed'
    battleIntroScreen.style.flexDirection = direction[j];
    battleIntroScreen.style.inset = '0';
    battleIntroScreen.style.maxWidth = maxWidth + 'px';
    battleIntroScreen.style.maxHeight = maxHeight + 'px';
    battleIntroScreen.style.margin = margin + 'px';
    body.appendChild(battleIntroScreen);
    if (j === 0 || j === 2) addBlackSquare(battleIntroScreen, maxSquareHeight);
    else if (j === 1 || j === 3) addBlackSquare(battleIntroScreen, maxSquareWidth);
}

// battle background intro
function background() {
    body.style.backgroundColor = 'black';
    body.replaceChildren();
    const wholePage = document.createElement('main');
    wholePage.classList.add('wholePage');

    body.appendChild(wholePage);
    const wildCaptchaTop = document.createElement('img');
    wildCaptchaTop.setAttribute('src', './static/img/captcha.jpg');
    wildCaptchaTop.id = 'wildCaptchaTop';
    wholePage.appendChild(wildCaptchaTop);
    const wildCaptchaBottom = document.createElement('img');
    wildCaptchaBottom.setAttribute('src', './static/img/captcha.jpg');
    wildCaptchaBottom.id = 'wildCaptchaBottom';
    wholePage.appendChild(wildCaptchaBottom);

    wildCaptchaBottom.addEventListener('load', () => {
        wildCaptchaTop.classList.add('arrived');
        wildCaptchaBottom.classList.add('arrived');
        setTimeout(() => {
            wholePage.replaceChildren();
            mainMenuBackground();
            buttonMenu();
        }, 2000);
    })
}

// battle background
function mainMenuBackground() {
    const wholePage = document.querySelector('.wholePage');
    wholePage.replaceChildren();
    const buttonAndImage = document.createElement('div');
    buttonAndImage.id = 'captchaFightContainer';
    wholePage.appendChild(buttonAndImage);
    const captchaFight = document.createElement('img');
    captchaFight.setAttribute('src', './static/img/captchaFight.png');
    captchaFight.id = 'captchaFight';
    buttonAndImage.appendChild(captchaFight);
    const buttonGroup = document.createElement('div');
    buttonGroup.id = 'buttonGroup'
    buttonAndImage.appendChild(buttonGroup);
}

function buttonMenu() {
    const buttonGroup = document.querySelector('#buttonGroup');
    buttonGroup.style.gridTemplateColumns = '1fr 1fr';
    buttonGroup.replaceChildren();
    const buttonFight = document.createElement('button');
    buttonFight.classList.add('buttonMenu');
    buttonFight.id = 'buttonFight';
    buttonFight.textContent = 'Fight';
    buttonGroup.appendChild(buttonFight);
    const buttonPack = document.createElement('button');
    buttonPack.classList.add('buttonMenu');
    buttonPack.id = 'buttonPack'
    buttonPack.textContent = 'Pack';
    buttonGroup.appendChild(buttonPack);
    const buttonRun = document.createElement('button');
    buttonRun.classList.add('buttonMenu');
    buttonRun.id = 'buttonRun';
    buttonRun.textContent = 'Run';
    buttonGroup.appendChild(buttonRun);

    // Button "Fight" clicked
    buttonFight.addEventListener('click', () => {
        buttonGroup.replaceChildren();
        const buttonTackle = document.createElement('button');
        buttonTackle.classList.add('buttonMenu');
        buttonTackle.id = 'buttonTackle';
        buttonTackle.textContent = 'Tackle';
        buttonGroup.appendChild(buttonTackle);
        const buttonBack = document.createElement('button');
        buttonBack.classList.add('buttonMenu');
        buttonBack.id = 'buttonBack'
        buttonBack.textContent = 'Back';
        buttonGroup.appendChild(buttonBack);
        // Tackle Button
        buttonTackle.addEventListener('click', () => {
            const container = document.querySelector('#captchaFightContainer');
            const wholePage = document.querySelector('.wholePage');
            container.classList.add('tackle');
            container.addEventListener('animationend', () => {
                const chance = Math.floor(Math.random() * 20) + 1;
                setTimeout(() => {
                    wholePage.replaceChildren();
                    const tackle = document.createElement('img');
                    tackle.setAttribute('src', './static/img/tackle.jpg');
                    wholePage.appendChild(tackle);
                }, 500);
                setTimeout(() => {
                    wholePage.replaceChildren();
                    mainMenuBackground();
                    buttonMenu();
                }, 4000);

            }, { once: true });
        })
        // Back Button
        buttonBack.addEventListener('click', buttonMenu);
    })
    // Button "Pack" clicked
    buttonPack.addEventListener('click', () => {
        buttonGroup.replaceChildren();
        const buttonPokeball = document.createElement('button');
        buttonPokeball.classList.add('buttonMenu');
        buttonPokeball.id = 'buttonPokeball';
        buttonPokeball.textContent = pokeballs + 'x Pokeball';
        buttonGroup.appendChild(buttonPokeball);
        const buttonBack = document.createElement('button');
        buttonBack.classList.add('buttonMenu');
        buttonBack.id = 'buttonBack'
        buttonBack.textContent = 'Back';
        buttonGroup.appendChild(buttonBack);
        buttonGroup.style.gridTemplateColumns = '1fr';
        // Pokeball Button
        if (pokeballs > 0) {
            buttonPokeball.addEventListener('click', () => {
                const wholePage = document.querySelector('.wholePage');
                wholePage.replaceChildren();
                const pokeballThrow = document.createElement('img');
                pokeballThrow.setAttribute('src', './static/img/pokeballThrow.gif');
                wholePage.appendChild(pokeballThrow);
                setTimeout(() => {
                    wholePage.replaceChildren();
                    const chance = Math.floor(Math.random() * 10) + 1;
                    if (pokeballs <= 0) {
                        mainMenuBackground();
                        buttonMenu();
                        setTimeout(() => alert("No Pokeballs left!"), 0);
                    } else if (chance === 1) {
                        localStorage.setItem('success', true)
                        location.reload();
                        setTimeout(() => alert("You captured the CAPTCHA!"), 0);
                    } else {
                        pokeballs--;
                        mainMenuBackground();
                        buttonMenu();
                        setTimeout(() => alert("Pokeball missed!"), 0);
                    }
                }, 1800);
            })
        }

        // Back Button
        buttonBack.addEventListener('click', buttonMenu);
    })
    // Button "Run" clicked
    buttonRun.addEventListener('click', () => {
        localStorage.clear();
        location.reload();
    })
}

