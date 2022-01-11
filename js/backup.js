$(document).ready(function(){
   
    console.log(`DOM loaded!`);
   
    let playerTurn = 0;
    const arrayPlayer1 = []; // indexcell clicked will be pushed and saved into this array
    const arrayPlayer2 = []; // indexcell clicked will be pushed and saved into this array
   
    $('.cell').one('click',function(){

        const cellBox = $(this);
        const cellId = parseInt(cellBox.attr("id"));// get the id num of the cellBox     
       if(playerTurn === 0 ){
            cellBox.html("O");
            cellBox.css('color','rgb(5, 128, 128)');
            // console.log(`Player 1 clicked cell`,cellId);
            arrayPlayer1.push(cellId);// adds and stores the index cell into the player's array
            // console.log(arrayPlayer1);// prints the array with the cells clicked
            playerTurn = 1 // alternate to Player 2
            checkWinningConditions(arrayPlayer1);
            
        }else{
            cellBox.html("X");
            cellBox.css('color','rgb(5, 128, 128)');
            // console.log(`Player 2 clicked cell`,cellId);
            arrayPlayer2.push(cellId);
            console.log(arrayPlayer2);
            playerTurn = 0 // switch back to Player 1
            checkWinningConditions(arrayPlayer2);
        }
    });//

    const winningConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7], 
        [2,5,8],
        [2,4,6],
        [0,4,8],
    ];

    const checkWinningConditions = function(playerMoves){//for each player turn, this function will run.

        for(let i = 0; i < winningConditions.length; i++){// will loop each winning combinations array
            let winCondition = winningConditions[i];
            //console.log(`winCondition array:`,winCondition);//--> test check
            let includeCounter = 0;

            for(let j = 0 ; j < winCondition.length; j++){ // looping each index for each array
                const winIndex = winCondition[j];

                if(playerMoves.includes(winIndex)){//check against player's array to see if winning index is included
                    includeCounter ++ // ++ saving addition into the includeCounter
                }
            }
            // console.log(`includeCounter:`,includeCounter);
            if(includeCounter === 3){//counter if the players have 3 included index to return true
                console.log(`You've won the game!`);
                return true;
            }
            
        } // outerForLoop WinningConditions
        console.log(`sorry, you haven't won yet`); // outside of the first loop that checks for every possible combinations array
        return false;

    };// checkWinningConditions()
    
    const endGame = function (){


    }





});//$document.ready()

