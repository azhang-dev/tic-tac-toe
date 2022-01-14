$(document).ready(function(){
   
    console.log(`DOM loaded!`);
   
    let gameOver = true;// 
    let playerTurn = 0;// alternate between player 1 & 2
    let remainingTurns = 9;// helps determine a draw situation
    let arrayPlayer1 = []; // cellId clicked will saved into this array
    let arrayPlayer2 = []; // cellId clicked will saved into this array

    let player1Character = ""; //stores player1's choice of characters
    let player2Character = "";//stores player2's choice of characters
    let characterSelectionCount = 0;// will affect players turn to select 

   const $selectionText = $('.characterSelectionText'); // this text will change during selection of characters

    const winningConditions = [ // arrays of winning combinations
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7], 
        [2,5,8],
        [2,4,6],
        [0,4,8],
    ];



    const $playerSelection= $(".playerSelection").on("click",function(){
        const playerCharacter = $(this).attr("src"); // directly acessing the img content
        
        if(characterSelectionCount === 0){
            player1Character = playerCharacter;// saves the character selected
            characterSelectionCount ++;// will change to Player 2
            $(this).css({// character selected is no longer clickable
                "pointer-events":"none",
                "opacity":0.5,
            });
            $selectionText.html("Player 2: Choose your character !");

        }else{
            player2Character = playerCharacter;
            $(".playerSelection").css("display","none");//hides the selection of characters, so players can no longer choose
            $selectionText.html("LET THE GAMES BEGIN");
            gameOver = false; // now allows the game to start (cell clicking)
        }

    });//$playerSelection

    const $playGame = $('.cell').on('click',function(){//player's clicked cell's index will determine winning move
        
        const cellId = parseInt($(this).attr("id"));// get the id num of the 
        // if statement check if the clicked cell is already occupied
        if(gameOver === false){// If game is not over , keep playing. Once its over, stop all clicks


            if($(this).html() !== ""){//if cell is not empty, no click will be applied
                console.log(`already clicked`);
                console.log(`GameOver`);
                return;
            };

            if(playerTurn === 0 ){
                $selectionText.html("");// removing the text: "Let the game begin" 

                const checkWinPlayer1 =checkWinningConditions(arrayPlayer1)
                arrayPlayer1.push(cellId);// adds and stores the index cell into the player's array
                remainingTurns--;
                checkWinningConditions(arrayPlayer1);// first checks winning index
                
                $(this).html(" ");// used for if() above, so cells cannot be reclicked
                $(this).css({// changes cell's CSS
                    "background":`url(${player1Character})`,
                    "background-size":"cover",
                    "background-color":"rgb(255,113,111)",
                    "pointer-event":"none",
                });

                playerTurn = 1; // then alternate to Player 2

                if(remainingTurns === 0 && !checkWinPlayer1){
                    $(".popupDraw").css("display","flex");
                }
                
            }else{
                const checkWinPlayer2 =checkWinningConditions(arrayPlayer2);
                arrayPlayer2.push(cellId);
                remainingTurns--;
                checkWinningConditions(arrayPlayer2);
                
                $(this).html(" ");
                $(this).css({// changes cell's CSS
                    "background":`url(${player2Character})`,
                    "background-size":"cover",
                    "background-color":"rgb(254, 240, 113)",
                });
                playerTurn = 0; // switch back to Player 1
                
                if(remainingTurns === 0  && !checkWinPlayer2){
                    // window.alert(`Its a draw !  Start Again`)
                    $(".popupDraw").css("display","flex");
                }
            }
        }
    });//$playGame()

    const checkWinningConditions = function(playerMoves){//for each player's turn, this function will run-->Looping between each winning index within another loop of the winning array combination
        
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
                    $("#messageWin").html("PLAYER 1 WINS");
                    $(".popupWin").css("display","flex");  
                    
                } else if(playerTurn === 1){
                    const score = parseInt($(`#player2`).text());
                    const newScore = $(`#player2`).text(score+1);
                    $("#messageWin").html("PLAYER 2 WINS");
                    $(".popupWin").css("display","flex"); 
                }
                gameOver = true;
                return true;
            } //If() counter for 3 winning index
            
        } // outerForLoop WinningConditions
        return false;

    };// checkWinningConditions()

    const resetBoard = $(".resetBoard").on('click',function(){
        console.log(`button clicked`)
        playerTurn = 0;
        remainingTurns =9;
        arrayPlayer1 = [];
        arrayPlayer2 = [];
        gameOver=false;
        $(".cell").html("");
        $(".cell").css({
            "background":"none",
            "background-color":"rgb(11, 209, 209)",
        });
        $(".popupWin").css("display","none");
        $(".popupDraw").css("display","none");
        
    });// resetGame()

    const resetScore = $("#resetScore").on('click', function(){
        console.log(`reset score button clicked`);
        $(".score").html("0");
        gameOver=true;
        playerTurn = 0;
        remainingTurns =9;
        arrayPlayer1 = [];
        arrayPlayer2 = [];

        characterSelectionCount = 0;
        player1Character = "";
        player2Character = "";
        $selectionText.html("Player 1: Choose your character");
        $(".cell").html("");
        $(".cell").css({
            "background":"none",
            "background-color":"rgb(11, 209, 209)",
            
        });
      
        $(".playerSelection").css({
            "display":"inline",
            "pointer-events":"auto",
            "opacity":1
        });

    });//resetScore()

    $(`#toggleBackground`).click(function(){
        $(".backgroundImg").toggle();
        console.log(`background button clicked`);
    });// #togglebackground

});//$document.ready()

