
import * as THREE from 'three'

export interface IAttractorSystem {
    curvePoints: Array<THREE.Vector3>
    _line: THREE.Line

    createLine: (curvePoints: Array<THREE.Vector3>) => THREE.Line
    updateLine: () => void
    resetLine: () => void
    
}

export class AttractorSystem implements AttractorSystem {
    curvePoints: Array<THREE.Vector3>
    _line: THREE.Line
    catmullRomCurve: THREE.CatmullRomCurve3

    constructor(){
        this.curvePoints = []
        this.catmullRomCurve = new THREE.CatmullRomCurve3(this.curvePoints)
        this._line = this.createLine(this.curvePoints)
    }

    createLine(curvePoints: Array<THREE.Vector3>){

        const GEOMETRY = new THREE.BufferGeometry().setFromPoints(curvePoints)

        GEOMETRY.setDrawRange(0,0)

        const MATERIAL = new THREE.LineBasicMaterial( { color: 0x0000ff })
        const LINE = new THREE.Line(GEOMETRY,MATERIAL)
        
        return LINE
    }

    updateLine(){
        this._line = this.createLine(this.curvePoints)
    }
    resetLine(){
        this._line.geometry.setDrawRange(0,0)
    }


}