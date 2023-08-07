$(document).ready(function() {
    // 1. create a ship class
    class Ship{
        constructor(hull,firepower,accuracy){
            this.hull = hull
            this.firepower = firepower
            this.accuracy = accuracy
        }
    }

    // 1.1 Create 'USS Assembly' ship
    let USSAssembly = new Ship(20,5,.7)

    /* 1.2 Alien ship queue */
    let alienBattalian = []

    // 1.3 Create 6 Alien ships
    for(let i=0;i<6;i++){
        let shipHull = (Math.random()*(6-3))+3
        let shipFirepower = (Math.random()*(4-2))+2
        let shipAccuracy = (Math.random()*(.8-.6))+.6
        let newAlienShip = new Ship(shipHull,shipFirepower,shipAccuracy)
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

    // add stats to the DOM
    playerHull.innerText = `Hull: ${Math.round((USSAssembly.hull) * 100) / 100}`
    playerFirepower.innerText = `Firepower: ${Math.round((USSAssembly.firepower) * 100) / 100}`
    playerAccuracy.innerText = `Accuracy: ${Math.round((USSAssembly.accuracy) * 100) / 100}`
    enemyHull.innerText = `Hull: ${Math.round((alienBattalian[0].hull) * 100) / 100}`
    enemyFirepower.innerText = `Firepower: ${Math.round((alienBattalian[0].firepower) * 100) / 100}`
    enemyAccuracy.innerText = `Accuracy: ${Math.round(alienBattalian[0].accuracy * 100) / 100}`

    // query selectors for interaction
    let popup = document.querySelector(`#popup`)
    let interactionMSG = document.querySelector(`#interactionMSG`)
    let continueButton = document.querySelector(`#contBtn`)
    let retreatButton = document.querySelector(`#retreatBtn`)

    initiateRound(USSAssembly,alienBattalian)

});



// 1.4 battle round //
function initiateRound(player,opponents){

let currentPlayer=player
currentOpponent = opponents[0]

// player attack the first alien ship
Math.random() < currentPlayer.accuracy ? currentOpponent.hull-=currentPlayer.firepower : null

// update stats in the DOM
playerHull.innerText = `Hull: ${Math.round((player.hull) * 100) / 100}`
playerFirepower.innerText = `Firepower: ${Math.round((player.firepower) * 100) / 100}`
playerAccuracy.innerText = `Accuracy: ${Math.round((player.accuracy) * 100) / 100}`
enemyHull.innerText = `Hull: ${Math.round((opponents[0].hull) * 100) / 100}`
enemyFirepower.innerText = `Firepower: ${Math.round((opponents[0].firepower) * 100) / 100}`
enemyAccuracy.innerText = `Accuracy: ${Math.round(opponents[0].accuracy * 100) / 100}`

// If the ship survives, it attacks player
if(currentOpponent.hull >= 0){
    playerHull = currentPlayer.hull
    Math.random() < currentOpponent.accuracy ? currentPlayer.hull-=currentOpponent.firepower : null
    initiateRound(currentPlayer,opponents)
}else if(currentPlayer.hull <= 0){
    console.log(`You've lost the game`)
}else{
    opponents.shift()
    /* let retreatOption = prompt(`Because you've won this round, you may ewither retreat and let the aliens continue their path to Earth domination Or you may continue the battle. If you'd like to retreat type, "retreat."`) */
    retreatOption == `retreat` ? console.log(`You've retreated to safety`) :
    // player win the game if player destroy all of the aliens
    opponents.length > 0 ? initiateRound(currentPlayer,opponents) : console.log(`You've won the game`)
    // player loses the game if player are destroyed
    // window.alert(`You were overtaken by the Aliens and they're on their way to claim Earth as their own.`)
}
}