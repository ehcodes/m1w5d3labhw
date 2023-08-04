// Earth has been attacked by a horde of aliens! player are the captain of the USS Assembly, on a mission to destroy every last alien ship.

// Battle the aliens as player try to destroy them with lasers.

// There are six alien ships. The aliens' weakness is that they are too logical and attack one at a time: they will wait to see the outcome of a battle before deploying another alien ship. playerr strength is that player have the initiative and get to attack first. However, player do not have targeting lasers and can only attack the aliens in order. After player have destroyed a ship, player have the option to make a hasty retreat.

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

// 1.4 battle round //
function initiateRound(player,opponents){
    let currentPlayer=player
    let currentOpponent = opponents[0]
    // player attack the first alien ship
    console.log(`At the beginning of this round the player's hull is ${currentPlayer.hull}`)
    console.log(`At the beginning of this round the alien's hull is ${currentOpponent.hull}`)
    Math.random() < currentPlayer.accuracy ? currentOpponent.hull-=currentPlayer.firepower : null
    console.log(`After round the alien's hull is ${currentOpponent.hull}`)
    console.log(`After round the player's hull is ${currentPlayer.hull}\n`)
    // If the ship survives, it attacks player
    if(currentOpponent.hull >= 0){
        console.log(`After round the player's hull is ${currentPlayer.hull}`)
        console.log(`At the beginning of this round the player's hull is ${currentPlayer.hull}`)
        Math.random() < currentOpponent.accuracy ? currentPlayer.hull-=currentOpponent.firepower : null
        console.log(`At the beginning of this round the alien's hull is ${currentOpponent.hull}`)
        console.log(`After round the alien's hull is ${currentOpponent.hull}\n`)
        initiateRound(currentPlayer,opponents)
    }else if(currentPlayer.hull <= 0){
        console.log(`You've lost the game`)
    }else{
        opponents.shift()
        console.log(`After round the player's hull is ${currentPlayer.hull}`)
        console.log(`At the beginning of this round the player's hull is ${currentPlayer.hull}`)
        console.log(`At the beginning of this round the alien's hull is ${currentOpponent.hull}`)
        console.log(`After round the alien's hull is ${currentOpponent.hull}\n`)
        // If player destroy the ship, player have the option to attack the next ship or to retreat
        let retreatOption = window.prompt(`If you'd like to retreat type, "retreat."`)
        // If player retreats, the game is over, perhaps leaving the game open for further developments or options
        retreatOption == `retreat` ? console.log(`You've retreated to safety`) :
        // player win the game if player destroy all of the aliens
        opponents.length > 0 ? initiateRound(currentPlayer,opponents) : console.log(`You've won the game`)
        // player loses the game if player are destroyed
        // console.log(xxx)
    }
}

initiateRound(USSAssembly,alienBattalian)