
import * as THREE from 'three'

interface ILorenzSystem {
    curvePoints: Array<THREE.Vector3>
    calculateCurvePoints: (numberOfPoints: number) => Array<THREE.Vector3>
}

export class LorenzSystem implements ILorenzSystem {
    curvePoints: Array<THREE.Vector3>

    constructor(numberOfPoints: number){
        this.curvePoints = this.calculateCurvePoints(numberOfPoints)
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
