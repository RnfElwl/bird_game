class Bird {
  constructor() {
    this.bird = document.querySelector(".bird");
    this.map = document.querySelector(".map");
    this.birdTop = this.bird.getBoundingClientRect().y;
    this.isJump = false;
    this.speed = 1.5;

    this.event();
  }
  event() {
    setInterval(this.setBirdTop.bind(this), 10);
    this.map.addEventListener("click", this.handleFlyBird.bind(this));
  }
  setBirdTop() {
    this.speed += 0.03;
    this.birdTop += 1 + this.speed;
    this.bird.style.top = this.birdTop + "px";
  }
  handleFlyBird() {
    this.speed = 1;
    this.birdTop -= 500 - this.speed;
    this.bird.style.top = this.birdTop + "px";
  }
}
