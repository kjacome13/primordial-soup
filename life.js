//here i am grabbing the canvas and defining it as the 'space' in the 'universe' and declaring the argument of getContext() as '2d' 
//because we will be rendering all the particles in a 2d plane!
const space = document.getElementById('universe').getContext('2d');


//creating a draw function that takes in the x and y positions of what we want to draw
//along with the color and size
//we can use this to draw the 'space' in our universe and all the particles in it!
const draw = (x,y,c,s) => {
    //the fillStyle is the color that will fill what we want to draw out
    space.fillStyle = c;
    //this will create a rectangle with the x and y position and the height and width provided
    //since we will be working with squares the height and width are set to the same variable
    space.fillRect(x, y, s, s);
};


//creating an empty array to hold all our groups of different particles and their information
const particles = [];


//this function defines each particle with a x and y coordinate and a color
const particle = (x, y, c) => {
    //theres also vx and vy which are the x and y velocities of each particle
    return {"x": x, "y": y, "vx": 0, "vy": 0, "color": c };
};


//function to generate any random number between 50 and 500
const random = () => {
    return Math.random()*600+50;
};

function randomSetting(min = 0.01, max = 1, decimals = 2) {
    let str = (Math.random() * (max - min) + min).toFixed(decimals);
    str *= Math.round(Math.random()) ? 1 : -1;
    return parseFloat(str);
  }


//this function creates a group of particles!
//it pushes each particle into both the group array and the particles array so that we can also return the group array to be stored if we need to
const create = (number, color) => {
    const group = [];
    for (let i = 0; i < number; i++) {
        group.push(particle(random(), random(), color));
        particles.push(group[i]);
    }
    return group;
};

//MATH TIME AHHH
const rule = (particleA, particleB, g) => {
    for (let i = 0; i < particleA.length; i++) {
        let fx = 0;
        let fy = 0;
        
        const a = particleA[i];
        
        for (let j = 0; j < particleB.length; j++) {
            
            const b = particleB[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d = Math.sqrt(dx*dx + dy*dy);

            if(d > 0 && d < 80){
                const F = g * 1/d;
                fx += (F * dx);
                fy += (F * dy);
            }
        }
       
        a.vx = (a.vx + fx)*0.5;
        a.vy = (a.vy + fy)*0.5;
        a.x += a.vx;
        a.y += a.vy;
        if(a.x <= 0 || a.x >= 800) {a.vx *= -5}
        if(a.y <= 0 || a.y >= 800) {a.vy *= -5} 
    }

}




const green = create(400, 'green');
const yellow = create(500, 'yellow');
const blue = create(200, 'blue');
const red = create(300, 'red');
const purple = create(400, 'purple');

const num = randomSetting()
console.log(num)
//new function to update and draw out all our particles in our universe!
const update = () => {
    //rules for each relationship between all particles
    rule(green, green, -0.22)
    rule(yellow, yellow, 0.15)
    rule(red, red, -0.1)
    rule(blue, blue, -1.5)
    rule(blue, green, -1)
    rule(green, yellow, 0.34)
    rule(yellow, green, 0.2)
    rule(yellow, blue, -1)
    rule(green, blue, 1)
    rule(green, red, -0.35)
    rule(yellow, red, 1)
    rule(red, green, -0.34)
    rule(blue, red, -1)
    rule(red, blue, 0.5)
    rule(purple, blue, 0.4)
    rule(purple, red, 0.94)
    rule(blue, purple, -1)
    
    rule(purple, purple, 0.23)
    rule(yellow, purple, 0.15)
    rule(green, green, -0.4)
    rule(green, purple, -0.5)
    rule(purple, green, -0.1)
    rule(yellow, yellow, 0.1)
    rule(red, green, -0.73)
    rule(green, red, 0.53)
    rule(red, purple, 0.8)
    rule(purple, red, -0.5)
    
    
    
    //this sets the pixels in the space to transparent black 
    space.clearRect(0, 0, 800, 800);
    //this fills it in with an actual black color so we can see our particles clearly
    draw(0, 0, "black", 800);
    //loop to draw each individual particle!
    for (let i = 0; i < particles.length; i++) {
        draw(particles[i].x, particles[i].y, particles[i].color, 5);
    }
    //updates the universe with all the new particles!
    requestAnimationFrame(update);
}

//show us the particles!
update();