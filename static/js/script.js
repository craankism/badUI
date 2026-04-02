const body = document.querySelector('body');
const captcha = document.querySelector('#captcha');
const wholePage = document.querySelector('.wholePage');

const boxSize = 60;
let maxWidth = body.clientWidth;
let maxHeight = body.clientHeight;
let maxSquareHeight = maxHeight / boxSize;
let maxSquareWidth = maxWidth / boxSize;

let i = 0;
let j = 0;
let round = 1;
let margin = 0;

captcha.addEventListener('change', () => {
    newSquareRow(i, j);
    round++;
})

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
    }, 5);
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

function background() {
    body.style.backgroundColor = 'black';
    body.replaceChildren();
    const wholePage = document.createElement('main');
    wholePage.setAttribute('class', 'wholePage');
    body.appendChild(wholePage);
    const wildCaptchaTop = document.createElement('img');
    wildCaptchaTop.setAttribute('src', './static/img/captcha.jpg');
    wildCaptchaTop.setAttribute('id', 'wildCaptchaTop');
    wholePage.appendChild(wildCaptchaTop);
    const wildCaptchaBottom = document.createElement('img');
    wildCaptchaBottom.setAttribute('src', './static/img/captcha.jpg');
    wildCaptchaBottom.setAttribute('id', 'wildCaptchaBottom');
    wholePage.appendChild(wildCaptchaBottom);

    wildCaptchaBottom.addEventListener('load', () => {
        wildCaptchaTop.classList.add('arrived');
        wildCaptchaBottom.classList.add('arrived');
        setTimeout(() => {
            wholePage.replaceChildren();
            const buttonGroup = document.createElement('div');
            buttonGroup.classList.add('buttonGroup');
            const captchaFight = document.createElement('img');
            captchaFight.setAttribute('src', './static/img/captchaFight.png');
            captchaFight.setAttribute('id', 'captchaFight');
            captchaFight.style.zIndex = '-1';
            wholePage.appendChild(captchaFight);
            const buttonFight = document.createElement('button');
            buttonFight.textContent = 'Fight';
            buttonGroup.appendChild(buttonFight);
            wholePage.appendChild(buttonGroup);
            const buttonPack = document.createElement('button');
            buttonPack.textContent = 'Pack';
            buttonGroup.appendChild(buttonPack);
            wholePage.appendChild(buttonGroup);
            const buttonRun = document.createElement('button');
            buttonRun.textContent = 'Run';
            buttonGroup.appendChild(buttonRun);
            wholePage.appendChild(buttonGroup);

        }, 2000);
    })
}

