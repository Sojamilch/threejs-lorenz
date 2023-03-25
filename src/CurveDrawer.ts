import * as THREE from 'three'

interface ICurve {

    _line: THREE.Line 
    drawCount: number
    drawLine: () => void

}

/**
 * Draws a line against a curve
 */
export class CurveDrawer implements ICurve {

    _line: THREE.Line 
    drawCount: number
    
    //curvePoints: Array<THREE.Vector3>

    constructor(line: THREE.Line){
        this.drawCount = 0
        this._line = line
    }

    drawLine() {
        this.drawCount = (this.drawCount + 5) 
        this._line.geometry.setDrawRange(0,this.drawCount)

    }
    
    set line(line: THREE.Line) {
        
        this._line = line
        this._line.geometry.setDrawRange(0,0)
        this.drawCount = 0

    }

    get line() {
        return this._line
    }
    

}