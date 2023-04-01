import * as THREE from 'three'

interface ISpline {
    spline: THREE.CatmullRomCurve3
    _material: THREE.MeshLambertMaterial
    _tubeGeometry: THREE.TubeGeometry 
    _mesh: THREE.Mesh 
    _line: THREE.Line
}

export class Spline implements ISpline {

    spline: THREE.CatmullRomCurve3
    _material: THREE.MeshLambertMaterial
    _tubeGeometry: THREE.TubeGeometry 
    _mesh: THREE.Mesh 
    _line: THREE.Line

    constructor(spline: THREE.CatmullRomCurve3){
        this.spline = spline
        this._material = this._createMaterial()
        this._tubeGeometry = this._createTube()
        this._mesh = this._createMesh(this._tubeGeometry)
        this._line = this._createLine()
    }

    get line3D() {
        return this._mesh
    }

    get line2D() {
        return this._line
    }

    private _createLine(): THREE.Line{
        const points = this.spline.getPoints(10000)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 })
        const line = new THREE.Line(geometry,material)

        return line
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