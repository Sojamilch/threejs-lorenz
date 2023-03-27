import { TubeGeometry } from "three"

class Spline {

    constructor(){
        this.spline = undefined
        this._material = this._createMaterial()
        this._tubeGeometry = undefined
        this._mesh = undefined
    }


    private _createMaterial(){
        const material = new THREE.MeshLambertMaterial({color: 0xff00ff})

        return material 

    }


    addTube(){

        const extrudePath = this.spline
        this._tubeGeometry = new THREE.TubeGeometry(extrudePath,100,2,3,true)
        this.addGeometry(this._tubeGeometry)
    }
    addGeometry(geometry){
        this._mesh = new THREE.Mesh(geometry,this._material)
        
    }

}