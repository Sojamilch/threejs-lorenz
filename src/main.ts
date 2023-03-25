

import {UserScreen} from './UserScreen'
import { CurveDrawer } from './CurveDrawer'
import { LorenzSystem } from './LorenzSystem'
import * as THREE from 'three'
import "./style.css"
//Create Scene

const mainScreen = new UserScreen("webgl")

const curveDrawer = new CurveDrawer(new LorenzSystem(10000).curvePoints)

mainScreen.scene.add(curveDrawer.line)

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

update()