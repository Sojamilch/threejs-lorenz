
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

    constructor(){
        this.curvePoints = []
        this._line = this.createLine(this.curvePoints)
    }

    createLine(curvePoints: Array<THREE.Vector3>){

        const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints)

        geometry.setDrawRange(0,0)

        const material = new THREE.LineBasicMaterial( { color: 0x0000ff })
        const line = new THREE.Line(geometry,material)
        
        return line
    }

    updateLine(){
        this._line = this.createLine(this.curvePoints)
    }
    resetLine(){
        this._line.geometry.setDrawRange(0,0)
    }


}