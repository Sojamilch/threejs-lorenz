

import {UserScreen} from './UserScreen'
import { CurveDrawer } from './CurveDrawer'
import { LorenzSystem } from './LorenzSystem'
import * as THREE from 'three'
import "./style.css"
//Create Scene

const mainScreen = new UserScreen("webgl")
const lorenzSystem = new LorenzSystem(10000,"lorenz") 
const curveDrawer = new CurveDrawer(new THREE.Line())

let currentLineIndex = 0

const lines: Array<any> = []
lines.push(lorenzSystem)


const drawingConfigForm = document.getElementById("drawingConfigForm") as HTMLFormElement

drawingConfigForm?.addEventListener("submit",drawNewLine)

function drawNewLine(event?: SubmitEvent) {

    let numberOfPoints, equation: FormDataEntryValue | null | string

    equation = "lorenz"
    numberOfPoints = 5000

    if(event !== undefined){
        event.preventDefault()
        const formData = new FormData(drawingConfigForm)
        equation = formData.get("equation")
        numberOfPoints = formData.get("numberOfPoints")
    }


    lines[currentLineIndex].resetLine()
    
    currentLineIndex = lines.indexOf(lines.find(x => x.name === equation))
    
    console.log(currentLineIndex)

    lines[currentLineIndex].numberOfPoints = numberOfPoints

    lines[currentLineIndex].resetLine()
    curveDrawer.line = lines[currentLineIndex].line

    mainScreen.scene.add(curveDrawer.line)
}

//window resize
window.addEventListener("resize", () => {

    mainScreen.screenSize.width = window.innerWidth
    mainScreen.screenSize.height = window.innerHeight

    const cameraAspect = mainScreen.screenSize.width / mainScreen.screenSize.height

    mainScreen.camera.aspect = cameraAspect
    mainScreen.camera.updateProjectionMatrix()
    mainScreen.renderer.setSize(mainScreen.screenSize.width, mainScreen.screenSize.height)
})



const animate = () => {
    curveDrawer.drawLine()
    mainScreen.controls.update()
    mainScreen.renderer.render(mainScreen.scene,mainScreen.camera)
}

//Run animation on delta time to keep consistent framerate across devices
const clock = new THREE.Clock()
let delta = 0
let interval = 1 / 30

const update = () => {

    window.requestAnimationFrame(update)
    delta += clock.getDelta()

    if(delta > interval){
        animate()
        delta = delta % interval
    }

}

drawNewLine()
update()