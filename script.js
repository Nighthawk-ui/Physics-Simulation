const CanvasSide = 651


const Center = (CanvasSide + 1) / 2 
const PlanetMass = 2*10**30
const G = 1



let PerfectRadius = 100
let satellite = {
    mass: 1.3 * 10**22,
    x: 0,
    y: 0,
    r: 0,
    acceleration: null,
    velocity: 5
    // v=g*r**3/2
}

let velocity = {
    x:0,
    y: -(satellite.velocity)
}
let PerfectAcceleration = {
    x: 0,
    y:0
}

let slider
let sliderValue
let radiusScale = 1
let isPlayground

let ObjectArray = {}
let object={
    x: null,
    y: null
}





window.onload = function(){    
    myBoard = document.getElementById("MyCanvas")
    ctx = myBoard.getContext("2d")
    myBoard.height = CanvasSide
    myBoard.width = CanvasSide
    
    satellite.x = PerfectRadius
    satellite.r = (Math.sqrt(satellite.x **2 + satellite.y**2))
    satellite.acceleration = satellite.velocity**2 / satellite.r
    UpdateForceVector(satellite.x, satellite.y, satellite.velocity, PerfectAcceleration,PerfectAcceleration)

    const PerfectOrbitButton = document.getElementById("PerfectOrbitButton")
    const PlaygroundButton = document.getElementById("PlaygroundButton")
    const PerfectObjectBox = document.getElementById("box")
    const PlaygroundBox = document.getElementById("box2")
    const AddObjectButton = document.getElementById("addObject")
    offset = myBoard.getBoundingClientRect()

    isPlayground = false

    PerfectOrbitButton.addEventListener('click' ,()=>{
        PerfectObjectBox.classList.add("active")
        PlaygroundBox.classList.remove("active")
        isPlayground = false
        satellite.x = PerfectRadius
        satellite.y = 0
        satellite.r = (Math.sqrt(satellite.x **2 + satellite.y**2))
        satellite.acceleration = satellite.velocity**2 / satellite.r
        velocity.x = 0
        velocity.y = -(satellite.velocity)
        UpdateForceVector(satellite.x, satellite.y, satellite.velocity, PerfectAcceleration,PerfectAcceleration)

    

    })

    PlaygroundButton.addEventListener('click' ,()=>{
        PlaygroundBox.classList.add("active")
        PerfectObjectBox.classList.remove("active")
        isPlayground = true
        

    })

    AddObjectButton.addEventListener('click' ,()=>{
        myBoard.addEventListener("mousemove" , drawPreview)

        myBoard.addEventListener("click" , function(event){
            myBoard.removeEventListener("mousemove",drawPreview)
            myBoard.addEventListener("mousemove" , setTragectory)

            myBoard.addEventListener("click" , function(event){
                myBoard.removeEventListener("mousemove",setTragectory)


            })



        })

    })



    slider = document.getElementById('mySlider');
    sliderValue = document.getElementById('sliderValue');
    radiusScale = slider.value



    // Update the displayed value when the slider moves
    slider.addEventListener('input', function() {

        if (!(slider.value <=5)){
            radiusScale = slider.value
            satellite.x  = ((radiusScale/50 * PerfectRadius) / satellite.r) * satellite.x
            satellite.y  = ((radiusScale/50 * PerfectRadius) / satellite.r) * satellite.y
            updateVectors()
        }


        sliderValue.textContent = slider.Value;
    });

    

   

    drawCircle(Center,Center, 20, "#6B6BB5" )
    ctx.fillText("Velocity x: " + velocity.x + "    Velocity y: " + velocity.y, 20,30)




    //setTimeout(update,1000)
    UpdateIntervalID =setInterval(update, 10)
    //requestAnimationFrame(update)
}


function update(){

    
    ctx.clearRect(0,0,CanvasSide,CanvasSide)
    //requestAnimationFrame(update)

    // MY ARROWS
    //drawLine(Center+satellite.x,Center+satellite.y,(Center+ satellite.x + 500*velocity.x),(Center+satellite.y + 500*velocity.y))
    //drawLine(Center+satellite.x,Center+satellite.y,(Center+ satellite.x + 500*acceleration.x),(Center+satellite.y + 500*acceleration.y))

    //  MY TEST LINE
    // ctx.fillStyle = "red"
    // ctx.fillRect(Center+ satellite.x,Center + satellite.y,2,2)

    // MIDDLE CIRCLE
    drawCircle(Center,Center, 20, "#6B6BB5" )
    //update satellite position    
    if (isPlayground){


        
    }else{
        satellite.x += velocity.x + PerfectAcceleration.x
        satellite.y += velocity.y + PerfectAcceleration.y
        velocity.x += PerfectAcceleration.x
        velocity.y += PerfectAcceleration.y
        
        //DRAW SATELLITE
        drawCircle(Center + satellite.x,Center + satellite.y, 20, "#6B6BB5" )
        UpdateForceVector(satellite.x,satellite.y, satellite.velocity, PerfectAcceleration,PerfectAcceleration) // updates actual radius, updates the acceleration, updates the velocity vector, updates the acceleration vectors
    }

    //Debug Log
    ctx.fillStyle = "red"
    ctx.fillText("Sat x: " + satellite.x + "    Sat y: " + satellite.y, 20,10)
    ctx.fillText("Velocity x: " + velocity.x + "    Velocity y: " + velocity.y, 20,30)
    ctx.fillText("Acce x: " + PerfectAcceleration.x + "    Acce y: " + PerfectAcceleration.y, 20,20)
    ctx.fillText("Satellite Velocity" + satellite.velocity, 20,40)
    ctx.fillText("Slider Value: " + slider.value + "Radius Scale: " + radiusScale, 20,50)
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

  
    //satellite.velocity = (Math.sqrt(velocity.x **2 + velocity.y**2))

    ratio = satellite.y/satellite.x
    
    if ( Center-(Center + satellite.x)< 0){ 
        PerfectAcceleration.x =Math.sqrt((satellite.acceleration**2)/((ratio)**2 + 1)) 
        PerfectAcceleration.x = -(PerfectAcceleration.x)
    } else {
        PerfectAcceleration.x =Math.sqrt((satellite.acceleration**2)/((ratio)**2 + 1)) 
    }


    if (Center - (Center+satellite.y) < 0) {
        PerfectAcceleration.y = Math.sqrt((satellite.acceleration**2)/(1/((ratio)**2) + 1)) 
        PerfectAcceleration.y = -(PerfectAcceleration.y)
    } else {
        PerfectAcceleration.y = Math.sqrt((satellite.acceleration**2)/(1/((ratio)**2) + 1)) 
    }
}

function drawPreview(event){
    object.x = event.clientX - offset.x
    object.y = event.clientY - offset.y
    drawCircle(object.x,object.y,20,"#6B6BB5")
}
function setTragectory(event){
    ratio = ((offset.y-event.clientY) - object.y)/((offset.x-event.clientX) - object.x)

    if ( object.x-(offset.x-event.clientX) < 0){ 
        trajectX =Math.sqrt((50**2)/((ratio)**2 + 1)) 
        trajectX = (trajectX) + object.x
    } else {
        trajectX =Math.sqrt((50**2)/((ratio)**2 + 1))  + object.x
    }


    if (object.y - (offset.y-event.clientY) <  0) {
        trajectY = Math.sqrt((50**2)/(1/((ratio)**2) + 1)) 
        trajectY = (trajectY) + object.y
    } else {
        trajectY = Math.sqrt((50**2)/(1/((ratio)**2) + 1)) + object.y

    }

    drawLine(object.x,object.y,object.x + trajectX, object.y + trajectY)
    
    

}

function UpdateForceVector(PosX,PosY, vel, accelerationX, accelerationY){
    var radius = (Math.sqrt(PosX **2 + PosY**2))
    var acceleration = vel**2 / radius

  
    var ratio = PosY/PosX
    
    if ( Center-(Center + PosX)< 0){ 
        accelerationX.x =Math.sqrt((acceleration**2)/((ratio)**2 + 1)) 
        accelerationX.x = -(accelerationX.x)
    } else {
        accelerationX.x =Math.sqrt((acceleration**2)/((ratio)**2 + 1)) 
    }


    if (Center - (Center+PosY) < 0) {
        accelerationY.y = Math.sqrt((acceleration**2)/(1/((ratio)**2) + 1)) 
        accelerationY.y = -(accelerationY.y)
    } else {
        accelerationY.y = Math.sqrt((acceleration**2)/(1/((ratio)**2) + 1)) 
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
