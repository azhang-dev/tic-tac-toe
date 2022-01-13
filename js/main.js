$(document).ready(function(){
   
    console.log(`DOM loaded!`);
   
    let playerTurn = 0;
    let remainingTurns = 9;
    let arrayPlayer1 = []; // cellId clicked will saved into this array
    let arrayPlayer2 = []; // cellId clicked will saved into this array
    let gameOver = false;

    const playGame = $('.cell').on('click',function(){

        const cellId = parseInt($(this).attr("id"));// get the id num of the 
        // if statement check if the clicked cell is already occupied
        if(gameOver === false){// If game is not over , keep playing. Once its over, stop all clicks

            if($(this).html() !== ""){//if cell is not empty, no click will be applied
                console.log(`already clicked`);
                console.log(`GameOver`);
                return;
            }

            if(playerTurn === 0 ){
                const checkWinPlayer1 =checkWinningConditions(arrayPlayer1)
                console.log(`checkwin for player 1`,checkWinPlayer1);
                $(this).html("O");
                $(this).css('color','rgb(5, 128, 128)');
                arrayPlayer1.push(cellId);// adds and stores the index cell into the player's array
                remainingTurns--;
                checkWinningConditions(arrayPlayer1);// first checks winning index
                playerTurn = 1; // then alternate to Player 2
                if(remainingTurns === 0 && !checkWinPlayer1){
                    console.log(`checkwin for player 1`,!checkWinPlayer1);
                    console.log(`Its a draw! Start Again`);
                    window.alert(`Its a draw! Start Again`)
                }
                
            }else{
                const checkWinPlayer2 =checkWinningConditions(arrayPlayer2)
                console.log(`checkwin for player 2`,checkWinPlayer2);
                $(this).html("X");
                $(this).css('color','rgb(5, 128, 128)');
                arrayPlayer2.push(cellId);
                remainingTurns--;
                checkWinningConditions(arrayPlayer2);
                playerTurn = 0; // switch back to Player 1
                
                if(remainingTurns === 0  && !checkWinPlayer2){
                    console.log(`checkwin for player 1`,!checkWinPlayer2);
                    console.log(`Its a draw! Start Again`);
                    window.alert(`Its a draw! Start Again`)
                }
            }
            console.log(`Remaining turns left:`,remainingTurns);
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

            for(let j = 0 ; j < winCondition.length; j++){ // looping each index within each winning array
                const winIndex = winCondition[j];
                if(playerMoves.includes(winIndex)){//check against player's array to see if winning index is included
                    includeCounter ++ // ++ saving addition into the includeCounter 
                }
                
            }
            if(includeCounter === 3){//counter if the players have 3 winning indexes included to return true
                
                if(playerTurn === 0){
                    const score = parseInt($(`#player1`).text());
                    const newScore = $(`#player1`).text(score+1);
                    window.alert(`Player 1 Won! Congrats!`)
                    
                } else if(playerTurn === 1){
                    const score = parseInt($(`#player2`).text());
                    const newScore = $(`#player2`).text(score+1);
                    window.alert(`Player 2 Won! Congrats!`)
                    
                } // logs the score for the winning player
                gameOver = true;
                console.log(`You've won the game! Game Over:`,gameOver);
                return true;
            } //If() counter for 3 winning index
            
        } // outerForLoop WinningConditions
        return false;

    };// checkWinningConditions()

    const resetBoard = $("#resetBoard").on('click',function(){
        playerTurn = 0;
        remainingTurns =9;
        let emptyCell = $(".cell").html("");
        arrayPlayer1 = [];
        arrayPlayer2 = [];
        gameOver=false;
        console.log(`Reset button clicked`);
        console.log("empty cell",emptyCell);
        console.log(playerTurn)
        
    });// resetGame()

    const resetScore = $("#resetScore").on('click', function(){
        $(".score").html("0");
        
        playerTurn = 0;
        remainingTurns =9;
       $(".cell").html("");
        arrayPlayer1 = [];
        arrayPlayer2 = [];
        gameOver=false;

    });//resetScore()

});//$document.ready()

