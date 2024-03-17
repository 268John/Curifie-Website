let particles = [];
let buttons = [];
const maxRadius = 30;
const buttonScaleFactor = 2; // Scale factor for buttons on hover and selection
const transitionDuration = 1000; // Transition duration in milliseconds
const buttonMargin = 200; // Margin for buttons from the screen edge
const minButtonSpacing = 100; // Minimum spacing between buttons

class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.size = 1;
    this.maxSize = 3;
    this.growing = false; // Track whether particle is growing or shrinking
  }

  update() {
    // You can add more dynamics to the particle here
  }

  display() {
    noStroke();
    fill('#ff4d00'); // Particle color
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  growOnHover(cursorX, cursorY) {
    let d = dist(this.position.x, this.position.y, cursorX, cursorY);
    if (d < maxRadius) {
      this.growing = true; // Start growing if cursor is within the maxRadius
      // Linearly interpolate between maxSize at d=0 and size=1 at d=maxRadius
      this.size = map(d, 0, maxRadius, this.maxSize, this.size);
    } else if (this.growing) {
      // If particle was growing and cursor is now outside maxRadius, start shrinking
      this.size -= 0.1;
      if (this.size <= 1) {
        this.size = 1;
        this.growing = false; // Stop shrinking once size reaches 1
      }
    }
  }
}

class Button {
  constructor(x, y, label) {
    this.position = createVector(x, y);
    this.origin = createVector(x, y); // Save the origin position
    this.size = 30;
    this.targetSize = this.size;
    this.label = label;
    this.isHovered = false;
    this.isSelected = false;
    this.hoverStartTime = 0;
    this.angle = random(TWO_PI); // Initial random angle for movement
    this.radius = 50; // Radius for movement
    this.speed = 0.5; // Speed of movement
  }

  display() {
    if (this.isSelected) {
      fill('#ff4d00'); // Selected button color
    } else if (this.isHovered) {
      fill('#ff4d00'); // Hovered button color
    } else {
      fill('#ffffff'); // Default button color
    }
    push();
    translate(this.position.x, this.position.y);
    let scaleFactor = this.isHovered || this.isSelected ? buttonScaleFactor : 1;
    this.size = lerp(this.size, this.targetSize, (millis() - this.hoverStartTime) / transitionDuration);
    scale(scaleFactor);
    let diameter = textWidth(this.label) + 8; // Diameter based on text width plus padding
    ellipse(0, 0, diameter, diameter);
    textSize(12);
    textAlign(CENTER, CENTER);
    fill('#000000'); // Text color
    text(this.label, 0, 0);
    pop();
  }

  update() {
    // Move the button slowly within a limited radius around its origin
    let dx = cos(this.angle) * this.speed; // Speed of movement
    let dy = sin(this.angle) * this.speed; // Speed of movement
    let newPos = p5.Vector.add(this.origin, createVector(dx, dy)); // Add movement to origin
    let distance = p5.Vector.dist(newPos, this.origin); // Calculate distance from origin
    if (distance < this.radius) {
      this.position.set(newPos); // Update position if within radius
    }

    // Update angle for next movement
    this.angle += random(-0.05, 0.05);
  }

  hoverCheck(mouseX, mouseY) {
    let d = dist(this.position.x, this.position.y, mouseX, mouseY);
    if (d < this.size / 2) {
      this.isHovered = true;
      if (!this.hoverStartTime) {
        this.hoverStartTime = millis();
      }
    } else {
      this.isHovered = false;
      this.hoverStartTime = 0;
    }
  }

  clickCheck(mouseX, mouseY) {
    let d = dist(this.position.x, this.position.y, mouseX, mouseY);
    if (d < this.size / 2) {
      this.isSelected = !this.isSelected;
    }
  }

  checkOverlap(otherButton) {
    let d = dist(this.position.x, this.position.y, otherButton.position.x, otherButton.position.y);
    let minDistance = (this.size + otherButton.size) / 2 + minButtonSpacing;
    return d < minDistance;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#ffffff'); // Set background color to white

  // Create initial particles
  for (let i = 0; i < 20000; i++) {
    particles.push(new Particle(random(width), random(height)));
  }

  // Create buttons
  let buttonLabels = ['Architecture', 'Design', 'Biology', 'Chemistry', 'Physics', 'Mathematics', 'History', 'Literature', 'Art', 'Music', 'Technology', 'Environment', 'Geography', 'Sports', 'Food','Microbiology','Adventures','Analysis'];
  for (let label of buttonLabels) {
    let button;
    do {
      let x = random(buttonMargin, width - buttonMargin);
      let y = random(buttonMargin, height - buttonMargin);
      button = new Button(x, y, label);
    } while (buttons.some(otherButton => button.checkOverlap(otherButton)));
    buttons.push(button);
  }
}

function draw() {
  clear();

  // Update and display particles
  for (let particle of particles) {
    particle.update();
    particle.display();
  }

  // Update and display buttons
  for (let button of buttons) {
    button.update();
    button.display();
  }
}

function mouseMoved() {
  // Check hover for buttons
  for (let button of buttons) {
    button.hoverCheck(mouseX, mouseY);
  }

  // Update particle size based on cursor position
  for (let particle of particles) {
    particle.growOnHover(mouseX, mouseY);
  }
}

function mouseClicked() {
  // Check click for buttons
  for (let button of buttons) {
    button.clickCheck(mouseX, mouseY);
  }
}
