'use strict'
const MINE = '💥';
const FLAG = '⛳';
var gFlagCounter = 0;
var gSize = 4;
var gGameInterval;
var gSecond = 0;
var gBoard = [];
var gCount = 0;
var gGameOn = true;
var gMine;
var elTimer = document.querySelector(".timer")


function createBoard(gSize) {
    var cell = {};
    for (var i = 0; i < gSize; i++) {
        var row = [];
        for (var j = 0; j < gSize; j++) {
            cell = createCell();
            row.push(cell);
            // console.log(row);

        }
        gBoard.push(row)
        // console.log(gBoard);

    }
}


function renderBoard() {
    var cellIdx = 0;
    var elTable = document.querySelector('table')
    // console.log(elTable);
    var strHTML = '';
    for (var index = 0; index < gMine; index++) {
        randomMine();
    }
    for (var i = 0; i < gSize; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gSize; j++) {
            strHTML += `<td class="hidden" id = ${cellIdx} data - i="${i}" data - j ="${j}" oncontextmenu="rightClick(this)" onclick = "cellClicked(this)"> ${gBoard[i][j].minesAroundCount} </td> `;
            cellIdx++
        }
        strHTML += '</tr>';
    }
    elTable.innerHTML = strHTML;

}

function randomMine() {
    var i = getRandomInteger(0, gSize)
    var j = getRandomInteger(0, gSize)
    gBoard[i][j].minesAroundCount = MINE;
}


function setMinesNegsCount(cell) {
    var mineCount = 0;
    var location = {
        i: 0,
        j: 0
    }
    location.i = +cell.getAttribute('i');
    location.j = +cell.getAttribute('j');
    // console.log(location);
    if (gBoard[location.i][location.j].minesAroundCount === MINE) {
        cell.innerText = MINE;
        return;

    }
    for (var idx = location.i - 1; idx <= location.i + 1; idx++) {
        for (var j = location.j - 1; j <= location.j + 1; j++) {
            if (idx < 0 || idx >= gSize || j < 0 || j >= gSize) {

                continue;
            }
            if (gBoard[idx][j].minesAroundCount === MINE) {
                mineCount++
            }

        }
    }
    gBoard[location.i][location.j].minesAroundCount = mineCount;
    gBoard[location.i][location.j].isShown = true;
    cell.innerText = mineCount;
}



function cellClicked(cell) {

    if (cell.innerHTML !== MINE) {

    }
    if (!gGameOn) {
        return;
    }
    gCount++
    if (gCount === 1) {
        startTimer()
    }
    if (gCount === (gSize ** 2) - gMine) {
        clearInterval(gGameInterval)
        gGameOn = false;
        alert('Won!');
    }

    if (cell.innerText === MINE) {
        var elTd = document.querySelectorAll('td');
        for (var i = 0; i < elTd.length; i++) {
            if (elTd[i].innerText === MINE) {

                elTd[i].classList.remove('hidden')
            }
        }
        setTimeout(alert, 100, 'Lost Try again later')
        gGameOn = false;
        clearInterval(gGameInterval)
    }
    setMinesNegsCount(cell)
    cell.classList.remove('hidden')
    // console.log(cell);

}




function easy() {
    gSize = 4;
    gMine = 2;
    init();
}
function hard() {
    gSize = 12;
    gMine = 30;
    init();
}
function medium() {
    gSize = 8;
    gMine = 12;
    init();
}


function init() {
    clearInterval(gGameInterval)
    elTimer.innerText = ' Timer : ' + 0 + ' Seconds '
    gSecond = 0;
    gCount = 0;
    gBoard = [];
    gGameOn = true;
    createBoard(gSize);
    renderBoard();

}


function createCell() {
    var cell = {
        minesAroundCount: 1,
        isShown: false,
        isMine: false,
        isMarked: false
    }
    return cell;
}



function rightClick(cell) {

    gCount++
    if (gCount === 1) {
        startTimer()
    }
    var location = {
        i: 0,
        j: 0
    }
    location.i = +cell.getAttribute('i');
    location.j = +cell.getAttribute('j');

    if (gBoard[location.i][location.j].isShown) {
        return;
    }
    if (!gBoard[location.i][location.j].isMarked) {
        gBoard[location.i][location.j].isMarked = true;
        cell.innerHTML = FLAG;
        cell.classList.toggle('hidden')
    } else {

        gBoard[location.i][location.j].isMarked = false;
        cell.innerHTML = gBoard[location.i][location.j].minesAroundCount;
        cell.classList.toggle('hidden')

    }

    if (gBoard[location.i][location.j].minesAroundCount === MINE) {
        gFlagCounter++
        if (gFlagCounter === gMine) {
            var elTd = document.querySelectorAll('td');
            for (var i = 0; i < elTd.length; i++) {
                elTd[i].classList.remove('hidden')
            }
            setTimeout(alert, 100, 'Won !! Play again ? ')
            gGameOn = false;
            clearInterval(gGameInterval)
        }
    }

}



function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


function startTimer() {

    gGameInterval = setInterval(function () {
        gSecond += 0.121
        elTimer.innerText = ' Timer : ' + gSecond.toFixed(3) + ' Seconds '
    }, 121)
}
