var candies = ["green", "yellow", "purple", "red", "orange", "blue"];
var board = [];
var columns = 9;
var rows = 9;
var score = 0;

var selectedCandy;
var toBeDroppedCandy;

window.onload = function() {
    startGame();


    window.setInterval(function() {
        candyCrush();
        slideCandies();
        newCandy();
    }, 120);
}


function startGame() {
    for(r=0; r<rows; r++) {
    let row = [];
        for(c=0; c<columns; c++) {
            let candy = document.createElement("img");
            candy.id = r.toString() + "-" + c.toString();
            candy.src = "./images/" + candies[Math.floor(Math.random() * candies.length)] + ".png";

            candy.addEventListener("dragstart", dragStart); //dragging starts
            candy.addEventListener("dragover", dragOver); //moving over a valid drop target
            candy.addEventListener("dragenter", dragEnter); //entering a valid drop target
            candy.addEventListener("dragleave", dragLeave); //leaving a valid drop target
            candy.addEventListener("drop", dragDrop);  //dropping the dragged element on a valid drop target
            candy.addEventListener("dragend", dragEnd);  //dragging ends
            


            document.getElementById("board").append(candy);
            row.push(candy);
        }
        board.push(row);
    }

    console.log(board);
}

function dragStart() {

    selectedCandy = this;
    console.log(selectedCandy);
    
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
    
}

function dragDrop() {
    toBeDroppedCandy = this;
}

function dragEnd() {

    if(selectedCandy.src.includes("candybg") || toBeDroppedCandy.src.includes("candybg")) {
        return;
    }

    let selectedCandyPosition = selectedCandy.id.split("-");   // 0-0
    let selectedCandyRow = parseInt(selectedCandyPosition[0]);
    let selectedCandyColumn = parseInt(selectedCandyPosition[1]);

    let toBeDroppedCandyPosition = toBeDroppedCandy.id.split("-"); // 0-1
    let toBeDroppedCandyRow = parseInt(toBeDroppedCandyPosition[0]);
    let toBeDroppedCandyColumn = parseInt(toBeDroppedCandyPosition[1]);


    if(toBeDroppedCandyColumn == selectedCandyColumn-1 && selectedCandyRow == toBeDroppedCandyRow || toBeDroppedCandyColumn == selectedCandyColumn+1 && selectedCandyRow == toBeDroppedCandyRow || toBeDroppedCandyRow == selectedCandyRow-1 && selectedCandyColumn == toBeDroppedCandyColumn || toBeDroppedCandyRow == selectedCandyRow+1 && selectedCandyColumn == toBeDroppedCandyColumn) {
//if the candies are next to each other, swap them
        let selectedImg = selectedCandy.src;
        let toBeDroppedImg = toBeDroppedCandy.src;

        selectedCandy.src = toBeDroppedImg;
        toBeDroppedCandy.src = selectedImg;


        let correctMove = isValid();

        if(!correctMove) {  //if the move is not valid, swap back
            let selectedImg = selectedCandy.src;
            let toBeDroppedImg = toBeDroppedCandy.src;

            selectedCandy.src = toBeDroppedImg;
            toBeDroppedCandy.src = selectedImg;
        }

        
    }
}

function candyCrush() {
    threeCrush();
}

function threeCrush() {  

    for(let r=0; r<rows; r++) {
        for(let c=0; c<columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("candybg")) {
                candy1.src = "./images/candybg.png";
                candy2.src = "./images/candybg.png";
                candy3.src = "./images/candybg.png";
                score+= 30;
                document.getElementById("score").innerHTML = score; 
                
            }
        }
    }

    for(let c=0; c<columns; c++) {
        for(let r=0; r<rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("candybg")) {
                candy1.src = "./images/candybg.png";
                candy2.src = "./images/candybg.png";
                candy3.src = "./images/candybg.png";
                score+= 30;
                document.getElementById("score").innerHTML = score;
            }
        }
    }
}


function isValid() {
    for(let r=0; r<rows; r++) {
        for(let c=0; c<columns-2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("candybg")) {
                return true;
            }
        }
    }

    for(let c=0; c<columns; c++) {
        for(let r=0; r<rows-2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];

            if(candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("candybg")) {
                return true;
            }
        }
    }

    return false;
}

function slideCandies() {
    for(let c=0; c< columns; c++) {
        let index = rows-1;

        for(let r=rows-1; r>=0; r--) {
            if(!board[r][c].src.includes("candybg")) {
                board[index][c].src = board[r][c].src; 
                index--;
            }
        }

        for(let r=index; r>=0; r--) {
            board[r][c].src = "./images/candybg.png";
        }
    }
}

function newCandy() {
    for(let c = 0; c<columns; c++) {
        if(board[0][c].src.includes("candybg")) {
            board[0][c].src = "./images/" + candies[Math.floor(Math.random() * candies.length)] + ".png";
        }
    }
}