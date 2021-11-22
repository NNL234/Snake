document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
    const GAME_AREA_WIDTH = 20 ;
    const GAME_AREA_HEIGHT = 10;
    for(let i = 0;i < GAME_AREA_HEIGHT;i++) {
      for (let j = 0; j < GAME_AREA_WIDTH;j++) {
        grid.appendChild(document.createElement('div'))
      }
    }

    grid.style.width = GAME_AREA_WIDTH * 20 +"px"
    grid.style.height = GAME_AREA_HEIGHT *20 + "px"
    const squares = grid.children
    const DIRECTION = {
        UP : -GAME_AREA_WIDTH,
        DOWN : GAME_AREA_WIDTH,
        LEFT : -1,
        RIGHT : 1,
    }
    let currentIndex =0 
    let fruitIndex = 0 
    let currentSnake = [1,0] 
    let direction = DIRECTION.RIGHT
    let score = 0
    let speed = 1
    let intervalTime = 0
    let interval
  
    function startGame() {
      currentSnake.forEach(index => squares[index].classList.remove('snake'))
      squares[fruitIndex].classList.remove('fruit')
      clearInterval(interval)
      score = 0
      randomFruit()
      direction = 1
      scoreDisplay.innerText = score
      intervalTime = 200
      currentSnake = [1,0]
      currentIndex = 0
      currentSnake.forEach(index => squares[index].classList.add('snake'))
      interval = setInterval(moveOutcomes, intervalTime)
    }
 
    function moveOutcomes() {
  
      if (
        (currentSnake[0] + GAME_AREA_HEIGHT >= (GAME_AREA_WIDTH * GAME_AREA_HEIGHT) && direction === DIRECTION.DOWN ) ||
        (currentSnake[0] % GAME_AREA_WIDTH === GAME_AREA_WIDTH -1 && direction ===DIRECTION.RIGHT) || 
        (currentSnake[0] % GAME_AREA_WIDTH === 0 && direction === DIRECTION.LEFT) ||   
        (currentSnake[0] - GAME_AREA_HEIGHT < 0 && direction === DIRECTION.UP) ||  
        squares[currentSnake[0] + direction].classList.contains('snake') 
      ) {
        return clearInterval(interval) 
      }
  
      const tail = currentSnake.pop() 
      squares[tail].classList.remove('snake')  
      currentSnake.unshift(currentSnake[0] + direction) 
  
      if(squares[currentSnake[0]].classList.contains('fruit')) {
        squares[currentSnake[0]].classList.remove('fruit')
        squares[tail].classList.add('snake')
        currentSnake.push(tail)
        randomFruit()
        score++
        scoreDisplay.textContent = score
        clearInterval(interval)
        intervalTime = intervalTime * speed
        interval = setInterval(moveOutcomes, intervalTime)
      }
      squares[currentSnake[0]].classList.add('snake')
    }
  
    

    function randomFruit() {
      do{
        fruitIndex = Math.floor(Math.random() * squares.length)
      } while(squares[fruitIndex].classList.contains('fruit')) 
      squares[fruitIndex].classList.add('fruit')
    }
  
    document.addEventListener('keyup', (e) => {  
      if(e.keyCode === 39 && direction !==DIRECTION.LEFT) {
        direction = DIRECTION.RIGHT 
      } else if (e.keyCode === 38 && direction!== DIRECTION.DOWN) {
        direction = DIRECTION.UP 
      } else if (e.keyCode === 37 && direction!== DIRECTION.RIGHT) {
        direction = DIRECTION.LEFT 
      } else if (e.keyCode === 40 && direction!== DIRECTION.UP) {
        direction = DIRECTION.DOWN 
      }
    })
    startBtn.addEventListener('click', startGame)
  })
