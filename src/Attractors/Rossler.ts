import { AttractorSystem, IAttractorSystem } from "../AttractorSystem";
import * as THREE from 'three'


interface IRossler extends IAttractorSystem {
    name: string
    _numberOfPoints: number
    calculateCurvePoints: (numberOfPoints: number) => Array<THREE.Vector3>
}


export class Rossler extends AttractorSystem implements IRossler {
    name: string
    _numberOfPoints: number

    constructor(numberOfPoints: number){
        super()
        this.name = "rossler"
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
    
        let a = 0.4;
        let b = 2;
        let c = 4

        const POINTS: Array<THREE.Vector3> = []

        for (var i=0;i<numberOfPoints;i++){
            //rossler
            let dt = 0.1;
            let dx = (-y -z) *dt
            let dy = (x + (a*y)) *dt
            let dz = (b + z*(x-c)) *dt
            x = x + dx;
            y = y + dy;
            z = z + dz;


            let vertex = new THREE.Vector3(
                x*50, 
                y*50, 
                z*50);
                
            POINTS.push(vertex)

        }
    

        return POINTS
    }
}