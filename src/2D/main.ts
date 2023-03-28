

import {UserScreen} from './UserScreen'
import { CurveDrawer } from './CurveDrawer'
import { Lorenz } from './Attractors/Lorenz'
import * as THREE from 'three'
import "./style.css"
import { Rossler } from './Attractors/Rossler'
//Create Scene

const CANVAS_ELEMENT = document.getElementById("webgl2") as HTMLCanvasElement
const CANVAS_ELEMENT2 = document.getElementById("webgl") as HTMLCanvasElement
const MAIN_SCREEN = new UserScreen(CANVAS_ELEMENT)

//10000 = maximum number of points
const LORENZ = new Lorenz(10000) 
const ROSSLER = new Rossler(10000)
const CURVE_DRAWER = new CurveDrawer(new THREE.Line)



const switchButton = document.getElementById("switch")

switchButton?.addEventListener("click", (event) => {
    event.preventDefault()
    if(CANVAS_ELEMENT2.style.display === "block"){
        MAIN_SCREEN.canvas.style.display = "none"
        CANVAS_ELEMENT2.style.display = "block"
    }else if(MAIN_SCREEN.canvas.style.display === "none"){
        MAIN_SCREEN.canvas.style.display = "block"
        CANVAS_ELEMENT2.style.display = "none"
    }
    
})

let currentLineIndex = 0

const LINES: Array<any> = []
LINES.push(LORENZ)
LINES.push(ROSSLER)


const DRAWING_CONFIG_FORM = document.getElementById("drawingConfigForm") as HTMLFormElement

DRAWING_CONFIG_FORM?.addEventListener("submit",drawNewLine)

function drawNewLine(event?: SubmitEvent) {

    let numberOfPoints, equation: FormDataEntryValue | null | string

    //default data
    equation = "lorenz"
    numberOfPoints = 5000

    if(event !== undefined){
        event.preventDefault()
        const FORM_DATA = new FormData(DRAWING_CONFIG_FORM)
        equation = FORM_DATA.get("equation")
        numberOfPoints = FORM_DATA.get("numberOfPoints")
    }

    LINES[currentLineIndex].resetLine()
    
    currentLineIndex = LINES.indexOf(LINES.find(x => x.name === equation))

    LINES[currentLineIndex].numberOfPoints = numberOfPoints

    LINES[currentLineIndex].resetLine()
    CURVE_DRAWER.line = LINES[currentLineIndex].line

    MAIN_SCREEN.scene.add(CURVE_DRAWER.line)
}

//window resize
window.addEventListener("resize", () => {

    MAIN_SCREEN.screenSize.width = window.innerWidth
    MAIN_SCREEN.screenSize.height = window.innerHeight

    const cameraAspect = MAIN_SCREEN.screenSize.width / MAIN_SCREEN.screenSize.height

    MAIN_SCREEN.camera.aspect = cameraAspect
    MAIN_SCREEN.camera.updateProjectionMatrix()
    MAIN_SCREEN.renderer.setSize(MAIN_SCREEN.screenSize.width, MAIN_SCREEN.screenSize.height)
})

const animate = () => {
    CURVE_DRAWER.drawLine()
    MAIN_SCREEN.controls.update()
    MAIN_SCREEN.renderer.render(MAIN_SCREEN.scene,MAIN_SCREEN.camera)
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

drawNewLine()

update()