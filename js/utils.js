function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

function determineWinner({ player, enemy, timer }) {
  clearTimeout(timer)
  document.querySelector('#endScreen').style.display = 'flex'
  if (player.health === enemy.health) {
    document.querySelector('#endScreen').innerHTML = 'Tie'
  } else if (player.health > enemy.health) {
    document.querySelector('#endScreen').innerHTML = 'Player 1 Wins'
  } else if (player.health < enemy.health) {
    document.querySelector('#endScreen').innerHTML = 'Player 2 Wins'
  }
}

let currentTime = 60
let timer
function decreaseTimer() {
  if (currentTime > 0) {
    timer = setTimeout(decreaseTimer, 1000)
    currentTime--;
    document.querySelector('#timer').innerHTML = currentTime
  }

  if (currentTime === 0) {
    determineWinner({ player, enemy, timer })
  }
}
