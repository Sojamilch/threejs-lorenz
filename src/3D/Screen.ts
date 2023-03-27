
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


type TCameraParams = {
    fov: number
    aspectRatio: number
    nearPlane: number
    farPlane: number
}

type TControlsParams = {
    canvasElement: HTMLCanvasElement | undefined
}

type TRenderParams = {
    canvasElement: HTMLCanvasElement | undefined
    pixelRatio: number
    width: number
    height: number
}

type TPosition = {
    x: number
    y: number
    z: number
}

type TLightParams = {
    position: TPosition
    colour: number
}

type TInitParams = {
    camera: TCameraParams
    controls: TControlsParams
    renderer: TRenderParams
    light: TLightParams
}

interface IScreen {
    params: TInitParams
    camera: THREE.PerspectiveCamera
    scene: THREE.Scene
    light: THREE.DirectionalLight
    controls: OrbitControls
    renderer: THREE.WebGLRenderer
}

export class Screen implements IScreen {

    params: TInitParams
    camera: THREE.PerspectiveCamera
    scene: THREE.Scene
    light: THREE.DirectionalLight
    controls: OrbitControls
    renderer: THREE.WebGLRenderer

    constructor(params: TInitParams){

        this.params = params
        this.scene = new THREE.Scene()
        this.camera = this._createCamera()
        this.light = this._createLight()
        this.controls = this._createControls()
        this.renderer = this._createRenderer()
        this._init()
    }

    private _createLight(): THREE.DirectionalLight {
        const LIGHT_PARAMS = this.params.light

        const light = new THREE.DirectionalLight(LIGHT_PARAMS.colour)
        light.position.set(LIGHT_PARAMS.position.x, LIGHT_PARAMS.position.y, LIGHT_PARAMS.position.z)

        return light
    }

    private _createCamera(): THREE.PerspectiveCamera {

        const CAMERA_PARAMS = this.params.camera
        const camera = new THREE.PerspectiveCamera(CAMERA_PARAMS.fov, CAMERA_PARAMS.aspectRatio, CAMERA_PARAMS.farPlane, CAMERA_PARAMS.nearPlane)
        camera.position.set(0,50,500)
        return camera
    }

    private _createControls(): OrbitControls {

        const CONTROL_PARAMS = this.params.controls

        const controls = new OrbitControls(this.camera, CONTROL_PARAMS.canvasElement)
        controls.enableDamping = true
        controls.target = new THREE.Vector3(0,0,250)
        return controls
    }

    private _createRenderer(): THREE.WebGLRenderer {
        
        const REDNERER_PARAMS = this.params.renderer
        const canvas = REDNERER_PARAMS.canvasElement

        const REDNERER = new THREE.WebGLRenderer({ canvas, antialias:true })
        REDNERER.setSize(REDNERER_PARAMS.width, REDNERER_PARAMS.height)
        REDNERER.setPixelRatio(REDNERER_PARAMS.pixelRatio)

        return REDNERER
    }

    private _init() {   
        this.scene.add(this.camera)
        this.scene.add(this.light)
        this.renderer.render(this.scene,this.camera)

    }

    onWindowResize() {

        this.camera.aspect = window.innerWidth/window.innerHeight
        this.camera.updateMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    render() {
        this.renderer.render(this.scene, this.camera)
    }

}
