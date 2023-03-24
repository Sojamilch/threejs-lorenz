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


    constructor(canvasID: string){
        this.scene = new THREE.Scene()
        this.screenSize = {
            width: window.innerWidth,
            height: window.innerHeight
        } as IScreenSize
        this.camera = this.createCamera(45,this.screenSize.width/this.screenSize.height)
        this.canvas = document.getElementById(canvasID) as HTMLCanvasElement
        this.controls = this.createControls(this.camera, this.canvas)

        this.renderer = this.setupScene(this.camera,this.scene,this.screenSize,this.canvas)


    }

    setupScene(camera: THREE.PerspectiveCamera, scene:THREE.Scene, screenSize: IScreenSize, canvas: HTMLCanvasElement): THREE.WebGLRenderer {
        scene.add(camera)
        const renderer = new THREE.WebGLRenderer({ canvas })
        renderer.setSize(screenSize.width, screenSize.height)
        renderer.setPixelRatio(1)
        renderer.render(scene,camera)

        return renderer
        
    }

    createCamera(fov: number,aspectRatio: number): THREE.PerspectiveCamera {
        const camera = new THREE.PerspectiveCamera(fov,aspectRatio)
        camera.position.set(1000,0,1000)
        camera.lookAt(0,0,0)
        return camera
    }

    createControls(camera: THREE.PerspectiveCamera, canvas: HTMLCanvasElement): OrbitControls{
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true
        controls.target = new THREE.Vector3(0,0,250)
        return controls
    }

}

