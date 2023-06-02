class Bird {
  constructor() {
    this.bird = document.querySelector(".bird");
    this.map = document.querySelector(".map");
    this.startBtn = document.querySelector(".start");
    this.mapTop = this.map.getBoundingClientRect().y;
    this.birdTop = this.bird.getBoundingClientRect().y;
    this.isJump = false;
    this.speed = 5.5;
    this.gameover = this.map.getBoundingClientRect().height;
    this.time = null;
    this.event();
  }

  event() {
    this.bird.style.transition = "top 0.5s";
    this.time = setInterval(this.setBirdTop.bind(this), 50);
    this.map.addEventListener("click", this.handleFlyBird.bind(this));
  }
  setBirdTop() {
    this.speed += 0.7;
    this.birdTop += 2 + this.speed;
    const a = this.bird.getBoundingClientRect().y - this.mapTop;
    if (a >= this.gameover - 50) {
      console.log("game over");
      this.birdTop = this.gameover - 50;
      this.startBtn.style.display = "block";
      this.bird.style.transition = "none";
      clearInterval(this.time);
    }
    this.bird.style.top = this.birdTop + "px";
  }
  handleFlyBird() {
    this.speed = 5;
    this.birdTop -= 400 - this.speed;
  }
}

class Pipe {
  constructor() {
    this.copyPipeTop;
    this.copyPipebottom;
  }
}
