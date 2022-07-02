let colorPicker;

let settings = {
  res: 0.01,
  alpha: 128,
  nFrames: 80,
  dots: true,
  nDots: [1],
  lines: false,
  red: 0,
  green: 0,
  blue: 0
}

let gui;

let recorder = [];
// Create a new canvas to match the browser size
function setup() {
  createCanvas(windowWidth, windowHeight);
gui = new dat.GUI();
gui.add(settings, 'red', 0, 255);
gui.add(settings, 'green', 0, 255);
gui.add(settings, 'blue', 0, 255);
gui.add(settings, 'alpha', 5, 255);
gui.add(settings, 'dots', false, true);
gui.add(settings, 'nDots', [1, 2,3,4]);
gui.add(settings, 'lines', false, true);
gui.add(settings, 'nFrames', 1, 1000);
gui.add(settings, 'res', 0.001, 0.02);


colorPicker = createColorPicker('white');
colorPicker.position(20, 20 );   
background(colorPicker.color());


background(0);
}

// On window resize, update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(0);
}

// Main render loop
function draw() { 
  background(colorPicker.color());
 


  let x1 = noise(frameCount * settings.res) * width;
  let y1 = noise(100+ frameCount * settings.res) * height;
  let x2 = noise(200+frameCount * settings.res) * width;
  let y2 = noise(300+ frameCount * settings.res) * height;
  let x3 = noise(500+frameCount * settings.res) * width;
  let y3 = noise(700+ frameCount * settings.res) * height;
  let x4 = noise(900+frameCount * settings.res) * width;
  let y4 = noise(110 + frameCount * settings.res) * height;


 let frame ={
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    x3: x3,
    y3: y3,
    x4: x4,
    y4: y4
 }
recorder.push(frame);;
while(recorder.length > settings.nFrames) recorder.shift();
  
playback();
}

function playback() {
  for(frame of recorder) {


stroke(settings.red,settings.green, settings.blue, settings.alpha);
if(settings.dots) { 
  strokeWeight(5)
  if(settings.nDots == 1 && settings.lines == false) {
    point(frame.x1, frame.y1);
    settings.lines = false;
  }
  if(settings.nDots >= 2) {
    point(frame.x1, frame.y1);
    point(frame.x2, frame.y2);
  }
  if(settings.nDots >= 3) {
    point(frame.x1, frame.y1);
    point(frame.x2, frame.y2);
    point(frame.x3, frame.y3);
  }
  if(settings.nDots == 4) {
    point(frame.x1, frame.y1);
    point(frame.x2, frame.y2);
    point(frame.x3, frame.y3);
    point(frame.x4, frame.y4);
  }
  
}
if(settings.lines) {
  strokeWeight(1)
 if(settings.nDots <= 1 && settings.lines == true) {
  point(frame.x1, frame.y1);
  settings.lines = 0;
}
 
  if(settings.nDots >= 2 && settings.lines == true) {
    line(frame.x1, frame.y1, frame.x2, frame.y2);
  }
  if(settings.nDots >= 3 && settings.lines == true) {
    line(frame.x1, frame.y1, frame.x2, frame.y2);
    line(frame.x2, frame.y2, frame.x3, frame.y3);
    line(frame.x3, frame.y3, frame.x1, frame.y1);
  }
  if(settings.nDots == 4 && settings.lines == true) {
    line(frame.x1, frame.y1, frame.x2, frame.y2);
    line(frame.x2, frame.y2, frame.x3, frame.y3);
    line(frame.x3, frame.y3, frame.x4, frame.y4);
    line(frame.x4, frame.y4, frame.x1, frame.y1);
    
  }
  }
  }}
  function keyPressed() {
    // Save frame if letter 'p' is pressed
    if (keyCode === 80) {
      save(`gridofshapes.png`);
    }
  }
