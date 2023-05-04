class Bird {
  constructor() {
    this.bird = document.querySelector(".bird");
    this.birdTop = this.bird.getBoundingClientRect().y;
    this.event();
  }
  event() {
    setInterval(this.setBirdTop.bind(this), 10);
  }
  setBirdTop() {
    console.log(this.birdTop);
    this.birdTop += 1;
    this.bird.style.top = this.birdTop + "px";
  }
}
