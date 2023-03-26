
import * as THREE from 'three'
import { AttractorSystem, IAttractorSystem } from './AttractorSystem'

interface ILorenz extends IAttractorSystem{
    name: string
    _numberOfPoints: number
    calculateCurvePoints: (numberOfPoints: number) => Array<THREE.Vector3>

    
}

export class Lorenz extends AttractorSystem implements ILorenz {
    name: string
    _numberOfPoints: number

    constructor(numberOfPoints: number){
        super()
        this.name = "lorenz"
        this._numberOfPoints = numberOfPoints
        super.curvePoints = this.calculateCurvePoints(this.numberOfPoints)
    }

    get line() {
        super.resetLine()
        return this._line
    }

    set numberOfPoints(numberOfPoints:number){
        this._numberOfPoints = numberOfPoints
        super.curvePoints = this.calculateCurvePoints(this._numberOfPoints)
        super.updateLine()
    }



    calculateCurvePoints(numberOfPoints: number): Array<THREE.Vector3>{
        let x = 0.01;
        let y = 0;
        let z = 0;
    
        let a = 15;
        let b = 28;
        let c = 8.0 / 3.0;


        const points: Array<THREE.Vector3> = []
        

        for (var i=0;i<numberOfPoints;i++){
            //lorenz
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
