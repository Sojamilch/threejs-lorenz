import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'

//Create Scene
const scene = new THREE.Scene()

function generateLorenzPoints(numberOfPoints: number): Array<THREE.Vector3> {

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

let numberOfPoints = 10000

const lorenzPointsArray = generateLorenzPoints(numberOfPoints) 

let drawCount = 2
const geometry = new THREE.BufferGeometry().setFromPoints(lorenzPointsArray)
geometry.setDrawRange(0,drawCount)
const material = new THREE.LineBasicMaterial( { color: 0x0000ff })
const line = new THREE.Line(geometry,material)

scene.add(line)

//Size
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Camera
const camera = new THREE.PerspectiveCamera(45,sizes.width/sizes.height)
camera.position.set(1000,0,1000)
camera.lookAt(0,0,0)
scene.add(camera)

//Line Material 


//render
const canvas = document.getElementById("webgl") as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(1)
renderer.render(scene,camera)

//Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.target = new THREE.Vector3(0,0,250)


//window resize
window.addEventListener("resize", () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
})

//draws the line sequentially after calculation
function increaseDrawCount(){
    drawCount = drawCount + 5
    line.geometry.setDrawRange(0,drawCount)
}


const animate = () => {
    increaseDrawCount()
    controls.update()
    renderer.render(scene,camera)
    window.requestAnimationFrame(animate)
}

animate()