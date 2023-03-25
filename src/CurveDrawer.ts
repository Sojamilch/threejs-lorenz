import * as THREE from 'three'

interface ICurve {

    curvePoints: Array<THREE.Vector3>
    createLine: (curvePoints: Array<THREE.Vector3>) => THREE.Line
    drawLine: () => void

}

/**
 * Draws a line against a curve
 */
export class CurveDrawer implements ICurve {

    curvePoints: Array<THREE.Vector3>
    line: THREE.Line
    drawCount: number
    
    //curvePoints: Array<THREE.Vector3>

    constructor(curvePoints: Array<THREE.Vector3>){
        this.curvePoints = curvePoints
        this.line = this.createLine(this.curvePoints)
        this.drawCount = 0

    }

    createLine(curvePoints: Array<THREE.Vector3>): THREE.Line{
        const drawCount = 0
        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints)

        geometry.setDrawRange(0,drawCount)

        const material = new THREE.LineBasicMaterial( { color: 0x0000ff })
        const line = new THREE.Line(geometry,material)

        return line

    }

    drawLine() {
        this.drawCount = (this.drawCount + 5) 
        this.line.geometry.setDrawRange(0,this.drawCount)
    }
    

    

}