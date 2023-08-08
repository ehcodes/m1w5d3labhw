$(document).ready(function() {
    // create a ship class
    class Ship{
        constructor(hull,firepower,accuracy,name){
            this.hull = hull
            this.firepower = firepower
            this.accuracy = accuracy
            this.name = name
        }
    }

    // Create 'USS Assembly' ship
    let USSAssembly = new Ship(20,5,.7)

    /* Alien ship queue */
    let alienBattalian = []

    // Create 6 Alien ships
    for(let i=0;i<6;i++){
        let shipHull = (Math.random()*(6-3))+3
        let shipFirepower = (Math.random()*(4-2))+2
        let shipAccuracy = (Math.random()*(.8-.6))+.6
        let name = i+1
        let newAlienShip = new Ship(shipHull,shipFirepower,shipAccuracy,name)
        alienBattalian[i]=newAlienShip
    }

    console.log(alienBattalian)

    // querySelectors for player and enemy stats
    let playerHull = document.querySelector(`#playerHull`)
    let playerFirepower = document.querySelector(`#playerFirepower`)
    let playerAccuracy = document.querySelector(`#playerAccuracy`)
    let enemyHull = document.querySelector(`#enemyHull`)
    let enemyFirepower = document.querySelector(`#enemyFirepower`)
    let enemyAccuracy = document.querySelector(`#enemyAccuracy`)

    let interactionMSG = document.querySelector(`#interactionMSG`)
    let buttonWrapper = document.querySelector(`#buttonWrapper`)
    let beginButton = document.querySelector(`#beginBtn`)
    let attackButton = document.querySelector(`#atkBtn`)
    let retreatButton = document.querySelector(`#retreatBtn`)
    let newGameButton = document.querySelector(`#newGameBtn`)

    //event listeners for button
    beginButton.addEventListener('click',()=>{
        beginButton.classList.add(`displayNone`)
        //start the game
        initiateRound(USSAssembly,alienBattalian)
    })
    attackButton.addEventListener('click',()=>{
        attackOpponent(USSAssembly,alienBattalian[0])
    })
    retreatButton.addEventListener('click',()=>{
        interactionMSG.innerText = `Now that you've retreated, the aliens will continue their path to Earth domination.`
        retreatButton.classList.add(`displayNone`)
        attackButton.classList.add(`displayNone`)
        newGameButton.classList.remove(`displayNone`)
    })

    newGameButton.addEventListener('click',()=>{
        location.reload()
    })

    // update stats in the DOM
    function updateStats(currentPlayer,currentOpponent){
        playerHull.innerText = `Hull: ${String(currentPlayer.hull).slice(0,4)}`
        playerFirepower.innerText = `Firepower: ${String(currentPlayer.firepower).slice(0,4)}`
        playerAccuracy.innerText = `Accuracy: ${String(currentPlayer.accuracy).slice(0,4)}`
        enemyHull.innerText = `Hull: ${String(currentOpponent.hull).slice(0,4)}`
        enemyFirepower.innerText = `Firepower: ${String(currentOpponent.firepower).slice(0,4)}`
        enemyAccuracy.innerText = `Accuracy: ${String(currentOpponent.accuracy).slice(0,4)}`
    }

    function attackOpponent(currentPlayer,currentOpponent){
        if(Math.random() < currentPlayer.accuracy){
            currentOpponent.hull-=currentPlayer.firepower
        }else{
            interactionMSG.innerText = `You missed the mark, better luck next time`
        }
        if(currentOpponent.hull >= 0 && currentPlayer.hull >= 0){
            attackPlayer(currentPlayer,currentOpponent)
        }else{
            alienBattalian.shift()
            interactionMSG.innerText = `You've defeated your opponent, just ${alienBattalian.length} more to secure Earth's safety from the alien horde!`
            retreatButton.classList.remove(`displayNone`)
            if(alienBattalian.length > 0){
                initiateRound(currentPlayer,alienBattalian)
            }else{
                interactionMSG.innerText = `You've defeated the aliens and secured Earth's safety!`
                attackButton.classList.add(`displayNone`)
                retreatButton.classList.add(`displayNone`)
                newGameButton.classList.remove(`displayNone`)
            }
            if(currentPlayer.hull <= 0){
                interactionMSG.innerText = `Now that you've been defeated, the remaining aliens will continue their path to Earth domination.`
            }
        }
    }

    function attackPlayer(player,opponent){
        if(Math.random() < opponent.accuracy){
            return player.hull-=opponent.firepower
        }else{
            return interactionMSG.innerText = `They missed!`
        }
    }

    // 1.4 battle round //
    function initiateRound(player,opponents){
        attackButton.classList.remove(`displayNone`)
        let currentPlayer = player
        let currentOpponent = opponents[0]
        updateStats(currentPlayer,currentOpponent)
        attackButton.classList.remove(`displayNone`)
        retreatButton.classList.remove(`displayNone`)
    }

});

