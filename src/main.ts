

import {UserScreen} from './UserScreen'
import { CurveDrawer } from './CurveDrawer'
import { LorenzSystem } from './LorenzSystem'
import "./style.css"
//Create Scene

const mainScreen = new UserScreen("webgl")

const curveDrawer = new CurveDrawer(new LorenzSystem(10000).curvePoints)

mainScreen.scene.add(curveDrawer.line)

curveDrawer.drawLine()

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
    window.requestAnimationFrame(animate)
}

animate()