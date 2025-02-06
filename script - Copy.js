const CanvasSide = 651


const Center = (CanvasSide + 1) / 2 
const PlanetMass = 2*10**30
const G = 1
let X = 100
let Y = 0 
let forceX
let forceY


let satellite = {
    mass: 1.3 * 10**22,
    x: 0,
    y: 0,
    r: 0,
    acceleration: null,
    velocity: 5
    // v=g*r**3/2
}
let velocityX = 0
let velocityY = -(satellite.velocity)

let velocity = {
    x:0,
    y: -(satellite.velocity)
}
let acceleration = {
    x: 0,
    y:0
}

let slider
let sliderValue
let radiusScale = 1




window.onload = function(){    
    
    satellite.x = X
    satellite.y = Y
    satellite.r = (Math.sqrt(satellite.x **2 + satellite.y**2))
    satellite.acceleration = satellite.velocity**2 / satellite.r

    meanUpdate()
    acceleration.x = forceX
    acceleration.y = forceY


    slider = document.getElementById('mySlider');
    sliderValue = document.getElementById('sliderValue');
    radiusScale = slider.value

    // Update the displayed value when the slider moves
    slider.addEventListener('input', function() {
        if (slider.value != 0){
            radiusScale = slider.value
            satellite.x  = radiusScale/50 * X
            satellite.y  = radiusScale/50 * Y
            updateVectors()
        }
        satellite.x  = radiusScale/50 * X
        satellite.y  = radiusScale/50 * Y
        sliderValue.textContent = slider.Value;
    });

    

    myBoard = document.getElementById("MyCanvas")
    ctx = myBoard.getContext("2d")
    myBoard.height = CanvasSide
    myBoard.width = CanvasSide

    
    drawCircle(Center,Center, 20, "#6B6BB5" )
    ctx.fillText("Velocity x: " + velocity.x + "    Velocity y: " + velocity.y, 20,30)
    ctx.fillText("Force X " + forceX + " Force Y " + forceY, 20,70)


    setTimeout(update,1000)
    setInterval(update, 10)




}
// v(0,1)
// a(-1,0)
// v(-1,1) 
// a()




function update(){

    
    //ctx.clearRect(0,0,CanvasSide,CanvasSide)
    //requestAnimationFrame(update)

    // MY ARROWS
    //drawLine(Center+satellite.x,Center+satellite.y,(Center+ satellite.x + 500*velocity.x),(Center+satellite.y + 500*velocity.y))
    //drawLine(Center+satellite.x,Center+satellite.y,(Center+ satellite.x + 500*acceleration.x),(Center+satellite.y + 500*acceleration.y))


    //  MY TEST LINE
    ctx.fillStyle = "red"
    ctx.fillRect(Center+ satellite.x,Center + satellite.y,5,5)
    ctx.fillStyle = "blue"
    ctx.fillRect(Center+ X,Center + Y,5,5)


    
    // MIDDLE CIRCLE
    drawCircle(Center,Center, 20, "#6B6BB5" )
    //update satellite position    
   
    satellite.x += velocity.x + acceleration.x
    satellite.y += velocity.y + acceleration.y
    X += velocityX + forceX
    Y += velocityY + forceY
    

    
    //SATELLITE
    //drawCircle(Center + satellite.x,Center + satellite.y, 20, "#6B6BB5" )
    updateVectors()
    meanUpdate()
    







    //Debug Log
    ctx.fillStyle = "red"
    ctx.fillText("Sat x: " + satellite.x + "    Sat y: " + satellite.y, 20,10)
    ctx.fillText("Velocity x: " + velocity.x + "    Velocity y: " + velocity.y, 20,30)
    ctx.fillText("Acce x: " + acceleration.x + "    Acce y: " + acceleration.y, 20,20)
    ctx.fillText("Satellite Velocity" + satellite.velocity, 20,40)
    ctx.fillText("Slider Value: " + slider.value + "Radius Scale: " + radiusScale, 20,50)
    ctx.fillText("X " + X + " Y " + Y, 20,60)
    ctx.fillText("Force X " + forceX + " Force Y " + forceY, 20,70)

    ctx.fillText("VelocityX " + velocityX + "VelocityY " + velocityY, 20,80)



}

function drawLine(x,y,a,b){
    // Set the starting point of the line
    ctx.beginPath();         // Start a new path
    ctx.moveTo(x, y);     // Move the pen to (50, 50)

    // Set the ending point of the line
    ctx.lineTo(a, b);   // Draw a line to (300, 200)

    // Optionally, set the stroke style (color and width)
    ctx.strokeStyle = 'blue'; // Line color
    ctx.lineWidth = 4;        // Line width

    // Draw the line
    ctx.stroke();
}


function drawCircle(x, y, radius, color){
    ctx.beginPath()
    ctx.arc(x,y,radius,0, 2* Math.PI)
    ctx.fillStyle = color
    ctx.fill()
}

function updateVectors(){
    satellite.r = (Math.sqrt(satellite.x **2 + satellite.y**2))
    satellite.acceleration = satellite.velocity**2 / satellite.r

    velocityX += forceX
    velocityY += forceY
    velocity.x += acceleration.x
    velocity.y += acceleration.y
    //satellite.velocity = (Math.sqrt(velocity.x **2 + velocity.y**2))

    ratio = satellite.y/satellite.x
    
    if ( Center-(Center + satellite.x)< 0){ 
        acceleration.x =Math.sqrt((satellite.acceleration**2)/((ratio)**2 + 1)) 
        acceleration.x = -(acceleration.x)
    } else {
        acceleration.x =Math.sqrt((satellite.acceleration**2)/((ratio)**2 + 1)) 
    }


    if (Center - (Center+satellite.y) < 0) {
        acceleration.y = Math.sqrt((satellite.acceleration**2)/(1/((ratio)**2) + 1)) 
        acceleration.y = -(acceleration.y)
    } else {
        acceleration.y = Math.sqrt((satellite.acceleration**2)/(1/((ratio)**2) + 1)) 
    }
}

function meanUpdate(){
    
    Force = satellite.velocity**2 /  (Math.sqrt(X **2 + Y**2))

    ratio = Y/X
    
    if ( Center-(Center + X)< 0){ 
        forceX =Math.sqrt(( Force**2)/((ratio)**2 + 1)) 
        forceX = -(forceX)

    } else {
        forceX =Math.sqrt((Force**2)/((ratio)**2 + 1)) 
    }


    if (Center - (Center+ Y) < 0) {
        forceY= Math.sqrt((Force**2)/(1/((ratio)**2) + 1)) 
        forceY = -(forceY)
    } else {
        forceY = Math.sqrt((Force**2)/(1/((ratio)**2) + 1)) 
    }
}









// 
//function updateVectors_ConstantMag(){
    //         //update velocity (direction) the magnitude should be the same
    //         velocity.x += acceleration.x
    //         velocity.y += acceleration.y
        
    //         ratio = velocity.y/velocity.x
        
    //         if (velocity.y < 0){ 
    //             velocity.y = Math.sqrt((satellite.velocity**2)/((1/(ratio)**2) + 1)) 
    //             velocity.y = -(velocity.y)
    //         } else {
    //             velocity.y = Math.sqrt((satellite.velocity**2)/((1/(ratio)**2) + 1)) 
    //         }
                
            
    //         if (velocity.x < 0) {
    //             velocity.x = Math.sqrt((satellite.velocity**2)/(((ratio)**2) + 1)) 
    //             velocity.x = -(velocity.x)
    //         } else {
    //             velocity.x = Math.sqrt((satellite.velocity**2)/(((ratio)**2) + 1)) 
    //         }
        
        
    //         ratio = satellite.y/satellite.x
        
    //         if ( Center-(Center + satellite.x)< 0){ 
    //             acceleration.x =Math.sqrt((satellite.acceleration**2)/((ratio)**2 + 1)) 
    //             acceleration.x = -(acceleration.x)
    //         } else {
    //             acceleration.x =Math.sqrt((satellite.acceleration**2)/((ratio)**2 + 1)) 
    //         }
        
        
    //         if (Center - (Center+satellite.y) < 0) {
    //             acceleration.y = Math.sqrt((satellite.acceleration**2)/(1/((ratio)**2) + 1)) 
    //             acceleration.y = -(acceleration.y)
    //         } else {
    //             acceleration.y = Math.sqrt((satellite.acceleration**2)/(1/((ratio)**2) + 1)) 
    //         }
    // }
