const canvas = document.getElementById("canvas");
console.log(canvas);

const gamebox = canvas.getContext("2d");

var y1 = 280;
var y2 = 360;

var k = 800;
var x = 750;
var z = 1250;
var score = 0;
var cy = 150;
var dcy = 2;
var cx = 730;
var yourscore = document.getElementById("yours");

window.requestAnimationFrame(function loop() {
  //for white downslider

  x -= 4;
  gamebox.clearRect(0, 0, canvas.width, canvas.height);
  gamebox.fillStyle = "black";
  gamebox.fillRect(0, 360, 750, 90);
  gamebox.fillStyle = "white";
  gamebox.fillRect(x, 360, 100, 90);

  if (x <= -90) {
    x = 850;
    score++;
    //console.log(score);
    yourscore.innerHTML = score;
  }

  if (x <= 300 && x >= 195 && y2 === 360) {
    console.log("lose");
    var r = alert(
      "Game Over : Refresh the game and then press OK to play again!"
    );
  }

  if (score % 4 === 0 && score != 0) {
    //console.log("SIMILAR");
    x = 1050;
  }
  if (score % 10 === 0 && score != 0) {
    console.log("SIMILAR");
    x = 2850;
  }
  if (score % 6 === 0 && score != 0) {
    console.log("SIMILAR");
    x = 1850;
  }

  if (score >= 5) {
    x -= 4.5;
    gamebox.clearRect(0, 0, canvas.width, canvas.height);
    gamebox.fillStyle = "black";
    gamebox.fillRect(0, 360, 750, 90);
    gamebox.fillStyle = "white";
    gamebox.fillRect(x, 360, 100, 90);
  }

  if (score >= 25) {
    x -= 5;
    gamebox.clearRect(0, 0, canvas.width, canvas.height);
    gamebox.fillStyle = "black";
    gamebox.fillRect(0, 360, 750, 90);
    gamebox.fillStyle = "white";
    gamebox.fillRect(x, 360, 100, 90);
  }

  //for white upslider
  z -= 4;
  gamebox.fillStyle = "black";
  gamebox.fillRect(0, 30, 750, 90);
  gamebox.fillStyle = "white";
  gamebox.fillRect(z, 30, 100, 90);
  if (z <= -90) {
    z = 1550;
    score++;
    //console.log(score);
    yourscore.innerHTML = score;
  }

  if (score >= 5) {
    z -= 4.5;
    gamebox.fillStyle = "black";
    gamebox.fillRect(0, 30, 750, 90);
    gamebox.fillStyle = "white";
    gamebox.fillRect(z, 30, 100, 90);
  }
  if (score >= 25) {
    z -= 5;
    gamebox.fillStyle = "black";
    gamebox.fillRect(0, 30, 750, 90);
    gamebox.fillStyle = "white";
    gamebox.fillRect(z, 30, 100, 90);
  }


  //circle as obstacle in between--------
  if (score >= 15) {
    gamebox.beginPath();
    gamebox.arc(cx, cy, 30, 0, Math.PI * 2, true);
    gamebox.stroke();
    gamebox.fillStyle = "red";
    gamebox.fill();
    cy += dcy;
    cx -= 1.6;

    if (cy >= 330) {
      dcy = -dcy;
    }

    if (cy <= 150) {
      dcy = 3;
    }

    if (cx <= -10) {
      cx = 750;
    }
    if (y2 === 120 && cx <= 330 && cx >= 250 && cy <= 120) {
      var r = alert(
        "Game Over : Refresh the game and then press OK to play again!"
      );
      if (r == false) {
        window.location.reload();
      }
    }
    if (y2 === 360 && cx <= 330 && cx >= 250 && cy >= 280) {
      var r = alert(
        "Game Over : Refresh the game and then press OK to play again!"
      );
      if (r == false) {
        window.location.reload();
      }
    }
  }
  //------------------------------------------

  if (z <= 300 && z >= 195 && y2 === 120) {
    var r = alert(
      "Game Over : Refresh the game and then press OK to play again!"
    );
    if (r == false) {
      window.location.reload();
    }
  }

  //saving and displaying high score in local storage
  var highs = document.getElementById("highs");
  var highscore = 0;

  var highscore = localStorage.getItem("highscore");
  highs.innerHTML = highscore;
  if (highscore !== null) {
    if (score > highscore) {
      localStorage.setItem("highscore", score);
      highs.innerHTML = highscore;
    }
  } else {
    localStorage.setItem("highscore", score);
    highs.innerHTML = highscore;
  }

  window.requestAnimationFrame(loop);

  gamebox.fillStyle = "orange";
  gamebox.fillRect(0, 0, 250, 35);

  gamebox.fillStyle = "white";
  gamebox.fillRect(250, 0, 500, 35);

  gamebox.fillStyle = "green";
  gamebox.fillRect(500, 0, 750, 35);

  gamebox.beginPath();
  

  gamebox.fillStyle = "#0000FF";
  gamebox.moveTo(300, y1);
  gamebox.lineTo(250, y2);
  gamebox.lineTo(350, y2);
  gamebox.fill();

  //mouse click event for blue block
  window.addEventListener("click", play);
  function play() {
    if (y2 === 120) {
      y2 = 360;
      y1 = 200;
    } else y2 = 120;
  }

  document.body.onkeyup = function (e) {
    //Spacebar click event for blue block
    if (e.keyCode == 32) {
      if (y2 === 360) {
        y2 = 120;
        y1 = 200;
      } else {
        y2 = 360;
        y1 = 280;
      }
      //your code
      console.log("Space pressed");
    }
  };
});

//adding timer
const startingMinutes = 0;
let time = startingMinutes * 60;
var seconds = 0;

const countdownEl = document.getElementById("timern");

setInterval(function updateCountdown() {
  const minutes = Math.floor(time / 60);
  seconds = time % 60;

  countdownEl.innerHTML = `${minutes}:${seconds}`;
  time++;
}, 1000);
