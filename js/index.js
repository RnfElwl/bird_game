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
    //새관련 변수들

    this.pipe = null;
    this.pipeSpeed = 1100;
    this.pipeTime = Math.round(Math.random() * (5 - 3) + 3);
    this.event();
  }

  event() {
    this.bird.style.transition = "top 0.5s";
    this.time = setInterval(this.setBirdTop.bind(this), 50);
    this.pipe = setInterval(this.setPipe.bind(this), this.pipeTime * 1000);
    this.map.addEventListener("click", this.handleFlyBird.bind(this));
  }
  setBirdTop() {
    this.speed += 0.7;
    this.birdTop += 2 + this.speed;
    const die = this.bird.getBoundingClientRect().y - this.mapTop;
    if (die >= this.gameover - 50) {
      console.log("game over");
      this.setGameOver();
    }
    this.bird.style.top = this.birdTop + "px";
  }
  setGameOver() {
    this.birdTop = this.gameover - 50;
    this.startBtn.style.display = "block";
    this.bird.style.transition = "none";
    clearInterval(this.time);
    clearInterval(this.pipe);
  }
  handleFlyBird() {
    this.speed = 5;
    this.birdTop -= 400 - this.speed;
  }
  setPipe() {
    console.log("hi");
    this.pipeTime = Math.round(Math.random() * (5 - 3) + 3);
    this.pipeEl = document.querySelector(".clone_pipe").cloneNode();
    this.copyPipeTop = document.querySelector(".clone_pipe-top").cloneNode();
    this.copyPipeBottom = document
      .querySelector(".clone_pipe-bottom")
      .cloneNode();
    const pipeList = document.querySelectorAll(".map .clone_pipe");
    console.log(pipeList);
    if (pipeList.length >= 3) {
      const firstNode = pipeList[0];
      firstNode.parentNode.removeChild(firstNode);
    }
    this.copyPipeTop.style.height = 70 + "px";
    this.copyPipeBottom.style.height = 70 + "px";
    this.pipeEl.appendChild(this.copyPipeTop);
    this.pipeEl.appendChild(this.copyPipeBottom);
    this.map.appendChild(this.pipeEl);
    this.pipeEl.style.right = this.pipeSpeed + "px";
  }
}
