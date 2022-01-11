$(document).ready(function(){
   
    console.log(`DOM loaded!`);
   
    let playerTurn = 0;
    const arrayPlayer1 = []; // cellId clicked will saved into this array
    const arrayPlayer2 = []; // cellId clicked will saved into this array
   
    $('.cell').one('click',function(){

        const cellId = parseInt($(this).attr("id"));// get the id num of the 
        
       if(playerTurn === 0 ){
            
            $(this).html("O");
            $(this).css('color','rgb(5, 128, 128)');
            arrayPlayer1.push(cellId);// adds and stores the index cell into the player's array
            checkWinningConditions(arrayPlayer1);// first checks winning index
            playerTurn = 1 // then alternate to Player 2
        
        }else{
            $(this).html("X");
            $(this).css('color','rgb(5, 128, 128)');
            arrayPlayer2.push(cellId);
            checkWinningConditions(arrayPlayer2);
            playerTurn = 0 // switch back to Player 1
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
            let losingCounter = 0;

            for(let j = 0 ; j < winCondition.length; j++){ // looping each index within each winning array
                const winIndex = winCondition[j];
                if(playerMoves.includes(winIndex)){//check against player's array to see if winning index is included
                    includeCounter ++ // ++ saving addition into the includeCounter   
                }
            }
            if(includeCounter === 3){//counter if the players have 3 winning indexes included to return true
                console.log(`You've won the game!`);
            
                if(playerTurn === 0){
                    const score = parseInt($(`#player1`).text());
                    const newScore = $(`#player1`).text(score+1);
                } else if(playerTurn === 1){
                    const score = parseInt($(`#player2`).text());
                    const newScore = $(`#player2`).text(score+1);
                } // logs the score for the winning player
                return true;
            } //If() counter for 3 winning index
            else if (includeCounter !== 3){
                console.log(`Game Over`)
            }
            
        } // outerForLoop WinningConditions
        let remainingTurns = 9;
        // if(){
            console.log(`sorry, you haven't won yet`); // outside of the first loop
            return false;
        // }
    

    };// checkWinningConditions()
    // const gameOver = function(){

    //     if(winningConditions)
    // }

    // const endGame = function (){


    // }





});//$document.ready()

