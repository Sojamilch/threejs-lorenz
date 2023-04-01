
import * as THREE from 'three'

export class Line3D {

    _material: THREE.MeshLambertMaterial
    _tubeGeometry: THREE.TubeGeometry 
    _mesh: THREE.Mesh 
    _drawCount: number

    constructor(spline: THREE.CatmullRomCurve3) {
        this._material = this._createMaterial()
        this._tubeGeometry = this._createTube(spline)
        this._mesh = this._createMesh(this._tubeGeometry)
        this._drawCount = 0

    }

    get mesh(){
        return this._mesh
    }

    private _createMaterial(): THREE.MeshLambertMaterial{
        const material = new THREE.MeshLambertMaterial({color: 0xff00ff})

        return material 
    }

    private _createTube(spline: THREE.CatmullRomCurve3) {
        const extrudePath = spline
        const tubeGeometry = new THREE.TubeGeometry(extrudePath,10000,2,30,false )
        return tubeGeometry
    }

    private _createMesh(geometry: THREE.TubeGeometry){
        const mesh = new THREE.Mesh(geometry,this._material)
        //mesh.scale.set(4,4,4)
        return mesh
    }

    drawLine(){
        this._drawCount = (this._drawCount + 1000)
        this._mesh.geometry.setDrawRange(0,this._drawCount)
    }

    resetLine(){
        this._drawCount = 0
        this._mesh.geometry.setDrawRange(0,0)
    }

}