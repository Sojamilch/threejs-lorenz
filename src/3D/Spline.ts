import * as THREE from 'three'

interface ISpline {
    spline: THREE.CatmullRomCurve3
    _material: THREE.MeshLambertMaterial
    _tubeGeometry: THREE.TubeGeometry 
    _mesh: THREE.Mesh 
}

export class Spline implements ISpline {

    spline: THREE.CatmullRomCurve3
    _material: THREE.MeshLambertMaterial
    _tubeGeometry: THREE.TubeGeometry 
    _mesh: THREE.Mesh 

    constructor(spline: THREE.CatmullRomCurve3){
        this.spline = spline
        this._material = this._createMaterial()
        this._tubeGeometry = this._createTube()
        this._mesh = this._createMesh(this._tubeGeometry)
    }

    get mesh() {
        return this._mesh
    }

    private _createMaterial(): THREE.MeshLambertMaterial{
        const material = new THREE.MeshLambertMaterial({color: 0xff00ff})

        return material 
    }

    private _createTube() {
        const extrudePath = this.spline
        const tubeGeometry = new THREE.TubeGeometry(extrudePath,10000,2,30,false )
        return tubeGeometry
    }

    private _createMesh(geometry: THREE.TubeGeometry){
        const mesh = new THREE.Mesh(geometry,this._material)
        //mesh.scale.set(4,4,4)
        return mesh
    }

}