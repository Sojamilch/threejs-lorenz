
import * as THREE from 'three'
import { AttractorSystem, IAttractorSystem } from './AttractorSystem'

interface ILorenz extends IAttractorSystem{
    name: string
    _numberOfPoints: number
    calculateCurvePoints: (numberOfPoints: number) => Array<THREE.Vector3>

    
}

export class Lorenz extends AttractorSystem implements ILorenz {
   // curvePoints: Array<THREE.Vector3>
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

    // createLine(curvePoints: Array<THREE.Vector3>){

    //     const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints)

    //     geometry.setDrawRange(0,0)

    //     const material = new THREE.LineBasicMaterial( { color: 0x0000ff })
    //     const line = new THREE.Line(geometry,material)
        
    //     return line
    // }

    // updateLine(){
    //     this._line = this.createLine(this.curvePoints)
    // }
    // resetLine(){
    //     this._line.geometry.setDrawRange(0,0)
    // }



    calculateCurvePoints(numberOfPoints: number): Array<THREE.Vector3>{
        let x = 0.01;
        let y = 0;
        let z = 0;
    
        let a = 15;
        let b = 28;
        let c = 8.0 / 3.0;

        //  let a = 0.2
        //  let b = 0.2
        //  let c = 5.7


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
            
            // //rossler
            // let dt = 0.1
            // let dx = (-y-z) * dt
            // let dy = (x + (a*y)) * dt
            // let dz = (b +z*(x -c) ) * dt

            // x =(x + dx)
            // y =(y + dy)
            // z =(z + dz)



            let vertex = new THREE.Vector3(
                x*10, 
                y*10, 
                z*10);
                
            points.push(vertex)
            console.log(+2)

        }
    

        return points
    }



}
