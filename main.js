$(document).ready(function() {
    // create a ship class
    class Ship{
        constructor(hull,firepower,accuracy){
            this.hull = hull
            this.firepower = firepower
            this.accuracy = accuracy
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
        let newAlienShip = new Ship(shipHull,shipFirepower,shipAccuracy)
        alienBattalian[i]=newAlienShip
        console.log(alienBattalian[i])
    }

    console.log(alienBattalian)

    // querySelectors for player and enemy stats
    let playerHull = document.querySelector(`#playerHull`)
    let playerFirepower = document.querySelector(`#playerFirepower`)
    let playerAccuracy = document.querySelector(`#playerAccuracy`)
    let enemyHull = document.querySelector(`#enemyHull`)
    let enemyFirepower = document.querySelector(`#enemyFirepower`)
    let enemyAccuracy = document.querySelector(`#enemyAccuracy`)

    // add stats to the DOM
    playerHull.innerText = `Hull: ${Math.round(USSAssembly.hull)}`
    playerFirepower.innerText = `Firepower: ${Math.round(USSAssembly.firepower)}`
    playerAccuracy.innerText = `Accuracy: ${Math.round(USSAssembly.accuracy)}`
    enemyHull.innerText = `Hull: ${Math.round(alienBattalian[0].hull)}`
    enemyFirepower.innerText = `Firepower: ${Math.round(alienBattalian[0].firepower)}`
    enemyAccuracy.innerText = `Accuracy: ${Math.round(alienBattalian[0].accuracy)}`

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
        attackOpponent(currentPlayer,currentOpponent)
    })
    retreatButton.addEventListener('click',()=>{
        interactionMSG.innerText = `Now that you've retreated, the aliens will continue their path to Earth domination.`
        retreatButton.classList.add(`displayNone`)
        newGameButton.classList.remove(`displayNone`)
    })

    newGameButton.addEventListener('click',()=>{
        location.reload()
    })

    // update stats in the DOM
    function updateStats(currentPlayer,currentOpponent){
        playerHull.innerText = `Hull: ${Math.round(currentPlayer.hull)}`
        playerFirepower.innerText = `Firepower: ${Math.round(currentPlayer.firepower)}`
        playerAccuracy.innerText = `Accuracy: ${Math.round(currentPlayer.accuracy)}`
        enemyHull.innerText = `Hull: ${Math.round(currentOpponent.hull)}`
        enemyFirepower.innerText = `Firepower: ${Math.round(currentOpponent.firepower)}`
        enemyAccuracy.innerText = `Accuracy: ${Math.round(currentOpponent.accuracy)}`
    }

    function attackOpponent(currentPlayer,currentOpponent){
        if(Math.random() < currentPlayer.accuracy){
            currentOpponent.hull-=currentPlayer.firepower
        }
    }

    // 1.4 battle round //
    function initiateRound(player,opponents){
        attackButton.classList.remove(`displayNone`)
        let currentPlayer = player
        let currentOpponent = opponents[0]
        updateStats(currentPlayer,currentOpponent)
        // player attack the first alien ship
        attackOpponent(currentPlayer,currentOpponent)
        // If the ship survives, it attacks player
        if(currentOpponent.hull >= 0){
            playerHull = currentPlayer.hull
            Math.random() < currentOpponent.accuracy ? currentPlayer.hull-=currentOpponent.firepower : null
            initiateRound(currentPlayer,opponents)
        }else if(currentPlayer.hull <= 0){
            console.log(`You've lost the game`)
        }else{
            opponents.shift()
            retreatButton.classList.remove(`displayNone`)
            // player win the game if player destroy all of the aliens
            opponents.length > 0 ? initiateRound(currentPlayer,opponents) : console.log(`You've won the game`)
            // player loses the game if player are destroyed
            // window.alert(`You were overtaken by the Aliens and they're on their way to claim Earth as their own.`)
        }
    }

});

