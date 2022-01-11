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
            console.log(`Player 1 clicked cell`,cellId);
            arrayPlayer1.push(cellId);// adds and stores the index cell into the player's array
            console.log(arrayPlayer1);// prints the array with the cells clicked
            playerTurn = 1 // alternate to Player 2
            checkWinningConditions(arrayPlayer1);
        }else{
            cellBox.html("X");
            cellBox.css('color','rgb(5, 128, 128)');
            console.log(`Player 2 clicked cell`,cellId);
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

    const checkWinningConditions = function(playerMoves){
        console.log(`Inside checkWinningCOnditions`);
        for(let i = 0; i < winningConditions.length; i++){
            let winCondition = winningConditions[i];
            //console.log(`winCondition array:`,winCondition);
            let includeCounter = 0;
            for(let j = 0 ; j < winCondition.length; j++){ // looping each index for each array
                const winIndex = winCondition[j];
                //console.log(`WinningIndex:`,winIndex);
                if(playerMoves.includes(winIndex)){
                    includeCounter ++ // ++ saving addition into the includeCounter
                }
            }
            console.log(`includeCounter:`,includeCounter);
            if(includeCounter === 3){
                console.log(`You've won the game!`);
                return true;
            }
            
        } // outerForLoop WinningConditions
        console.log(`sorry, you haven't won yet`);
        return false;
        
      
    };// checkWinningConditions()
    

    // const player2 = $('.cell').one('click',function(e){
    //     if(turnPlayer === false){
    //         const cellIndexNum = $(this);
    //         cellIndexNum.css('border','5px solid green')
    //         // cellIndexNum.append('<img src= images/cross.png>');
    //         console.log(`cell clicked`, cellIndexNum);
    //     }

    // });//


});//$document.ready()

//const turnPlayer = function(numOfTurns){
    //     // const player1 =[];
    //     // const player2 =[];
    //     if(numOfTurns % 2 == 0){
    //         console.log(`even number: Turn for Player 1`);
    //         return numOfTurns
    //     } else {
    //         console.log(`odd number: Turn for Player 2`);
    //         return numOfTurns
    //     } 
    // }

    // turnPlayer(1);
    // turnPlayer(4);
    // turnPlayer(5);