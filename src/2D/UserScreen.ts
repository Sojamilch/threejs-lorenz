import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

type IScreenSize = {
    width: number;
    height: number;

}

interface IScreen {
    scene: THREE.Scene
    screenSize: IScreenSize
    camera: THREE.PerspectiveCamera
    canvas: HTMLCanvasElement
    controls: OrbitControls
    renderer: THREE.WebGLRenderer

    setupScene: (camera: THREE.PerspectiveCamera, scene:THREE.Scene, screenSize: IScreenSize, canvas: HTMLCanvasElement) => THREE.WebGLRenderer
    createCamera: (fov: number,aspectRatio: number) => THREE.PerspectiveCamera
    createControls: (camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement) => OrbitControls

}


/**
 * Creates the main scene and renders it on the users screen
 */
export class UserScreen implements IScreen {

    scene: THREE.Scene
    screenSize: IScreenSize
    camera: THREE.PerspectiveCamera
    canvas: HTMLCanvasElement
    controls: OrbitControls
    renderer: THREE.WebGLRenderer


    constructor(canvas: HTMLCanvasElement){
        this.scene = new THREE.Scene()
        this.screenSize = {
            width: window.innerWidth,
            height: window.innerHeight
        } as IScreenSize
        this.camera = this.createCamera(45,this.screenSize.width/this.screenSize.height)
        this.canvas = canvas
        this.controls = this.createControls(this.camera, this.canvas)

        this.renderer = this.setupScene(this.camera,this.scene,this.screenSize,this.canvas)


    }

    setupScene(camera: THREE.PerspectiveCamera, scene:THREE.Scene, screenSize: IScreenSize, canvas: HTMLCanvasElement): THREE.WebGLRenderer {
        scene.add(camera)
        const REDNERER = new THREE.WebGLRenderer({ canvas })
        REDNERER.setSize(screenSize.width, screenSize.height)
        REDNERER.setPixelRatio(1)
        REDNERER.render(scene,camera)

        return REDNERER
        
    }

    createCamera(fov: number,aspectRatio: number): THREE.PerspectiveCamera {
        const CAMERA = new THREE.PerspectiveCamera(fov,aspectRatio,0.1,4000)
        CAMERA.position.set(1000,0,1000)
        CAMERA.lookAt(0,0,0)
        return CAMERA
    }

    createControls(camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement): OrbitControls{
        const CONTROLS = new OrbitControls(camera, canvas)
        CONTROLS.enableDamping = true
        CONTROLS.target = new THREE.Vector3(0,0,250)
        return CONTROLS
    }

}

