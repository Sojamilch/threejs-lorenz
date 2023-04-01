
import * as THREE from 'three'

export class Line2D {

    _line: THREE.Line
    _drawCount: number

    constructor(spline: THREE.CatmullRomCurve3){
        this._line = this._createLine(spline)
        this._drawCount = 0

    }
    
    private _createLine(spline: THREE.CatmullRomCurve3): THREE.Line{
        const points = spline.getPoints(10000)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 })
        const line = new THREE.Line(geometry,material)

        return line
    }
    
    get line() {
        return this._line
    }

    drawLine(){
        this._drawCount = (this._drawCount + 5)
        this._line.geometry.setDrawRange(0,this._drawCount)
    }

    resetLine(){
        this._drawCount = 0
        this._line.geometry.setDrawRange(0,0)
    }
}