
import * as THREE from 'three'
import { Screen } from "./Screen";

const CANVAS_ELEMENT = document.getElementById("webgl") as HTMLCanvasElement
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

const SCREEN = new Screen(INIT_PARAMS)

window.addEventListener("resize", () => {
    SCREEN.onWindowResize()
})

const animate = () => {
    SCREEN.render()
}

//Run animation on delta time to keep consistent framerate across devices
const CLOCK = new THREE.Clock()
let delta = 0
let interval = 1 / 60

const update = () => {

    window.requestAnimationFrame(update)
    delta += CLOCK.getDelta()

    if(delta > interval){
        animate()
        delta = delta % interval
    }

}