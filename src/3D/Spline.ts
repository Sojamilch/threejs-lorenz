import * as THREE from 'three'
import { Line2D } from './Line2D'
import { Line3D } from './Line3D'

interface ISpline {
    _line3D: Line3D
    _line2D: Line2D
}

export class Spline implements ISpline {

    _line3D: Line3D
    _line2D: Line2D

    constructor(spline: THREE.CatmullRomCurve3){
        this._line3D = new Line3D(spline)
        this._line2D = new Line2D(spline)
    }

    get line3D() {
        return this._line3D
    }

    get line2D() {
        return this._line2D
    }

}