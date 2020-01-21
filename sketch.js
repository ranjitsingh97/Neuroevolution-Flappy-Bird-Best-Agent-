let pipes = [];
let counter = 0;
let slider;
var cnv;

let brainJSON;

function preload() {
    brainJSON = loadJSON("best_bird.json");
}

function setup() {
  cnv = createCanvas(600,400);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  input = createP('Slider to speed up');
  input.position((windowWidth / 2) - 250,(windowHeight/2) + 210 );
  //speedup = createElement('h2', 'Slider to spped up the training');
  slider = createSlider(1, 1000, 1);
  slider.position((windowWidth / 2) - 250,(windowHeight/2) + 250 );
  let birdBrain = NeuralNetwork.deserialize(brainJSON);
  bird = new Bird(birdBrain);
}

function draw() {
  
  
  for(let n = 0; n<slider.value(); n++) {
    if(counter % 50 == 0) {
      pipes.push(new Pipe());
    }
    
    counter++;
    
    for(var i = pipes.length-1; i>=0; i--) {
      //pipes[i].show();
      pipes[i].update();
      
    if(pipes[i].hits(bird)) {
        console.log("collison");
    }
      
    if(pipes[i].offscreen()) {
        pipes.splice(i,1);
        }
    }
    
    if(bird.offScreen()) {
        console.log("bottom");
    }
    
      bird.think(pipes);
      bird.update();
    
  }
  
  //All the drawing Stuff here
  background(0);
  
  bird.show();
  
  for(let pipe of pipes) {
    pipe.show();
  }
  
}
