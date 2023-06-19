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
    this.pipeEl = null;
    this.pipeSpeed = window.outerWidth;
    this.pipeTime = Math.round(Math.random() * (5 - 3) + 3);
    this.pipeTopHeight = 0;
    this.pipeBottomHeight = 0;
    this.comePipeIndex = 0;
    this.pipeNotPass = true;

    //스코어 관련
    this.score = 0;

    this.scoreText = document.querySelector(".score");
    this.highScoreText = document.querySelector(".highScore");
    this.highScore = this.highScoreText.innerText;
    this.scoreTime = 0;
    this.event();
  }

  event() {
    const pipes = document.querySelectorAll(".map .clone_pipe");
    for (let i = 0; i < pipes.length; i++) {
      pipes[i].parentNode.removeChild(pipes[i]);
    }
    this.setPipe();
    this.bird.style.transition = "top 0.5s";
    this.time = setInterval(this.setBirdTop.bind(this), 50);
    this.pipe = setInterval(this.setPipe.bind(this), this.pipeTime * 1000);
    this.map.addEventListener("click", this.handleFlyBird.bind(this));
  }
  setBirdTop() {
    this.speed += 0.7;
    this.birdTop += 2 + this.speed;

    const die = this.bird.getBoundingClientRect().y - this.mapTop;
    const pipe = document.querySelectorAll(".map .clone_pipe");

    if (die >= this.gameover - 50) {
      console.log("game over");
      this.setGameOver();
    } else if (die < 0) {
      this.birdTop = 50;
    }

    if (
      pipe[this.comePipeIndex].getBoundingClientRect().left <=
        this.bird.getBoundingClientRect().left + 50 &&
      pipe[this.comePipeIndex].getBoundingClientRect().left + 70 >=
        this.bird.getBoundingClientRect().left
    ) {
      const pipeTop = pipe[this.comePipeIndex]
        .querySelector(".clone_pipe-top")
        .getBoundingClientRect();
      const pipeBottom = pipe[this.comePipeIndex]
        .querySelector(".clone_pipe-bottom")
        .getBoundingClientRect().top;
      const top = this.bird.getBoundingClientRect().top;

      if (top < pipeTop.top + pipeTop.height || pipeBottom < top) {
        this.setGameOver();
      }
    }

    if (
      pipe[this.comePipeIndex].getBoundingClientRect().left + 70 <
        this.bird.getBoundingClientRect().left &&
      this.pipeNotPass
    ) {
      this.comePipeIndex += 1;
      this.score += 1;
      if (this.highScore < this.score) {
        console.log(this.highScore, this.score);
        this.highScore = this.score;
        this.highScoreText.innerText = this.highScore;
      }
      this.scoreText.innerText = this.score;
      this.pipeNotPass = false;
    }
    this.bird.style.top = this.birdTop + "px";
  }
  setGameOver() {
    this.birdTop = this.gameover - 50;
    this.startBtn.style.display = "block";
    const pipes = document.querySelectorAll(".map .clone_pipe");
    for (let i = 0; i < pipes.length; i++) {
      pipes[i].style.left = pipes[i].getBoundingClientRect().left + "px";
      pipes[i].style.transition = "none";
    }
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    this.score = 0;

    clearInterval(this.time);
    clearInterval(this.pipe);
  }
  handleFlyBird() {
    this.speed = 5;
    this.birdTop -= 400 - this.speed;
  }
  setPipe() {
    this.pipeTime = Math.round(Math.random() * (6 - 3) + 3);
    this.pipeEl = document.querySelector("body .clone_pipe").cloneNode(true);
    this.pipeEl.style.transition = "right 10s linear";

    this.pipeEl.style.right = -70 + "px";
    this.copyPipeTop = this.pipeEl.querySelector(".clone_pipe-top");
    this.copyPipeBottom = this.pipeEl.querySelector(".clone_pipe-bottom");
    this.pipeTopHeight = Math.round(Math.random() * 270);
    this.pipeBottomHeight = 270 - this.pipeTopHeight;

    this.copyPipeTop.style.height = this.pipeTopHeight + "px";
    this.copyPipeBottom.style.height = this.pipeBottomHeight + "px";
    const pipeList = document.querySelectorAll(".map .clone_pipe");

    if (pipeList.length >= 3) {
      const firstNode = pipeList[0];
      this.comePipeIndex -= 1;
      this.pipeNotPass = true;
      firstNode.parentNode.removeChild(firstNode);
    }
    this.map.appendChild(this.pipeEl);
    setTimeout(() => {
      this.pipeEl.style.right = this.pipeSpeed + "px";
    }, 100);
  }
}
