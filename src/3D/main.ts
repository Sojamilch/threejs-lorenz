import * as THREE from 'three'
import { Screen } from "./Screen";
import { Spline } from "./Spline"

const CANVAS_ELEMENT = document.getElementById("webgl") as HTMLCanvasElement
//CANVAS_ELEMENT.style.display = "none"
const INIT_PARAMS = {
    camera: {
        fov: 50,
        aspectRatio: window.innerWidth/window.innerHeight,
        nearPlane: 0.01,
        farPlane: 10000
    },
    controls:{
        canvasElement: CANVAS_ELEMENT
    },
    renderer:{
        canvasElement: CANVAS_ELEMENT,
        pixelRatio: window.devicePixelRatio,
        width: window.innerWidth,
        height: window.innerHeight
    },
    light:{
        position: {x:0,y:50,z:500},
        colour: 0xf0f0f0
    }
}


function lorenz(numberOfPoints: number): Array<THREE.Vector3>{

    let x = 0.01;
    let y = 0;
    let z = 0;

    let a = 15;
    let b = 28;
    let c = 8.0 / 3.0;


    const points: Array<THREE.Vector3> = []
    

    for (var i=0;i<numberOfPoints;i++){
        //lorenz
        let dt = 0.01;
        let dx = (a * (y - x)) * dt;
        let dy = (x * (b - z) - y) * dt;
        let dz = (x * y - c * z) * dt;
        x = x + dx;
        y = y + dy;
        z = z + dz;
        


        let vertex = new THREE.Vector3(
            x*10, 
            y*10, 
            z*10);
            
        points.push(vertex)

    }

    //const spline = new THREE.CatmullRomCurve3(points)
    return points
}

let swapValue = true
function swap() {
    
    if(swapValue == true){
        SCREEN.parent.remove(SPLINE.line3D.mesh)
        SCREEN.parent.add(SPLINE.line2D.line)
        SPLINE.line2D.resetLine()
        swapValue = false

    }else{
        SCREEN.parent.add(SPLINE.line3D.mesh)
        SCREEN.parent.remove(SPLINE.line2D.line)
        SPLINE.line3D.resetLine()
        swapValue = true
    }

}

const switchButton = document.getElementById("switch")
switchButton?.addEventListener("click", swap)

const lorenzCurve = new THREE.CatmullRomCurve3(lorenz(5000))

const SCREEN = new Screen(INIT_PARAMS)
const SPLINE = new Spline(lorenzCurve)

SCREEN.parent.add(SPLINE.line3D.mesh)

window.addEventListener("resize", () => {
    SCREEN.onWindowResize()
})

const animate = () => {
    SCREEN.render()
    SPLINE.line2D.drawLine()
    SPLINE.line3D.drawLine()
}

//Run animation on delta time to keep consistent framerate across devices
const CLOCK = new THREE.Clock()
let delta = 0
let interval = 1 / 45

const update = () => {

    window.requestAnimationFrame(update)
    delta += CLOCK.getDelta()

    if(delta > interval){
        animate()
        delta = delta % interval
    }

}

update()