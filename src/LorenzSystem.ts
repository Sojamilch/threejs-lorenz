
import * as THREE from 'three'

interface ILorenzSystem {
    curvePoints: Array<THREE.Vector3>
    _line: THREE.Line
    name: string
    _numberOfPoints: number

    calculateCurvePoints: (numberOfPoints: number) => Array<THREE.Vector3>
    createLine: (curvePoints: Array<THREE.Vector3>) => THREE.Line
    updateLine: () => void
    resetLine: () => void
    
}

export class LorenzSystem implements ILorenzSystem {
    curvePoints: Array<THREE.Vector3>
    _line: THREE.Line
    name: string
    _numberOfPoints: number

    constructor(numberOfPoints: number, name: string){
        this.name = name
        this._numberOfPoints = numberOfPoints
        this.curvePoints = this.calculateCurvePoints(this.numberOfPoints)
        this._line = this.createLine(this.curvePoints)
    }

    get line() {
        this.resetLine()
        return this._line
    }

    set numberOfPoints(numberOfPoints:number){
        this._numberOfPoints = numberOfPoints
        this.curvePoints = this.calculateCurvePoints(this._numberOfPoints)
        this.updateLine()
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



    calculateCurvePoints(numberOfPoints: number): Array<THREE.Vector3>{
        let x = 0.01;
        let y = 0;
        let z = 0;
    
        let a = 10;
        let b = 28;
        let c = 8.0 / 3.0;
    
        const points: Array<THREE.Vector3> = []
    
        for (var i=0;i<numberOfPoints;i++){
            let dt = 0.01;
            let dx = (a * (y - x)) * dt;
            let dy = (x * (b - z) - y) * dt;
            let dz = (x * y - c * z) * dt;
            x = x + dx;
            y = y + dy;
            z = z + dz;
          
            let vertex = new THREE.Vector3(
                x*10, 
                y*10, 
                z*10);
                
                points.push(vertex)
        }
    

        return points
    }



}
