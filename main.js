var isRotate = false;
var rotation = {
    x: 0,
    y: 0
}

var _3Dobj = null;
var _3Dmaterial = null;

var width = window.innerWidth;
var height = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);

var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.shadowMap.enabled = true;
renderer.autoClear = false;
// renderer.setClearColor(0x000000, 0.0);
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap 
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);




// var cubeGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
// // var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
// var cubeMaterial = new THREE.MeshLambertMaterial({
//     color: 0xffffff    
//   });
// var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
// cube.rotation.y = Math.PI * 45 / 180;
// cube.receiveShadow = true;
// cube.castShadow = true;
// scene.add(cube);




var sceneCamera = null;
var loader = new THREE.GLTFLoader();
loader.load('dead star 23-pivot.gltf', function (gltf) {
    // console.log(gltf);
    _3Dobj = gltf.scene.children[0];
    _3Dobj.receiveShadow = true;
    _3Dobj.castShadow = true;
    _3Dmaterial = _3Dobj.children[0].material;
    var scale = 3.7 * (1080 / height);
    _3Dobj.scale.set(scale, scale, scale);
    // Object.assign(camera, {position:gltf.cameras[1].position});
    // const {x,y,z} = gltf.cameras[0].position;
    // camera.position.set(x,y,z);
    // // camera.quaternion.set(x1,y1,z1,w1);
    // console.log(cameras[1].position);
    // console.log(_3Dobj);
    camera.lookAt(_3Dobj.position);
    scene.add(gltf.scene);



}, undefined, function (err) {
    console.log(err);
})

// console.log(camera);
camera.position.y = 0.26;
camera.position.z = 1;// * (height / 1080) ;
// camera.position.z = 1.3 * (height / 1080) ;
// console.log("z: ", 1.3 * (height / 1080)) ;
camera.position.x = 0;

// console.log("x: ",camera.position.x );

// var camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
// scene.add( camera );
// const vector = _3Dobj.position;
// console.log('vector: ', vector);
// camera.lookAt(0,0,0);

var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
// var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeeee, side: THREE.BackSide });
var skybox = new THREE.Mesh(skyboxGeometry);
scene.add(skybox);

// var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 2); // soft white light
// scene.add(light);
// var rectLight = new THREE.RectAreaLight( 0xffffff, 5,  5, 3 );
// rectLight.position.set( 2, 2, 0 );
// rectLight.lookAt( 0, 0, 0 );
// rectLight.castShadow = true;  
// scene.add( rectLight )

// rectLightHelper = new THREE.RectAreaLightHelper( rectLight );
// rectLight.add( rectLightHelper );


// var pointLight = new THREE.PointLight( 0xff0000, 0.1, 10000, 10000 );
// pointLight.position.set( 1, 2, 2 );
// scene.add( pointLight );


var ambientLight = new THREE.AmbientLight(0x999999);
scene.add(ambientLight);

var light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(1, 5, 1);
light.castShadow = true;
scene.add(light);

var innerWidth = window.innerWidth;

var sphereSize = 1;
var pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
scene.add(pointLightHelper);

// var geometry = new THREE.PlaneGeometry( 3, 2, 2 );
// var material = new THREE.MeshLambertMaterial({ color: 0x1ec876 });
// // var planeMaterial = new THREE.ShadowMaterial();
// // planeMaterial.opacity = 0.2;
// var plane1 = new THREE.Mesh( geometry, material );
// // plane.rotation.set(5,0,0);
// plane1.rotateX( - Math.PI / 2 );
// plane1.position.set(0,-0.15,0);
// plane1.receiveShadow = true;
// plane1.castShadow = true;
// scene.add( plane1 );



// var material = new THREE.LineBasicMaterial({color: 0xffffff, linewidth: 5, });
var material = new THREE.LineBasicMaterial({
    color: 0xffff00,
    linewidth: 50,
    linecap: 'round', //ignored by WebGLRenderer
    linejoin: 'round' //ignored by WebGLRenderer
});
// material.linewidth = 10;
// material.



renderer.render(scene, camera);



document.addEventListener('mousemove', rotate);
document.addEventListener('mouseup', up);
document.addEventListener('mousedown', down);


function up() {
    isRotate = false;
}
function down() {
    isRotate = true;
}
var x = 0;
var y = 0;
function rotate(e) {
    x = e.clientX - innerWidth / 2;
    y = e.clientY;

    // console.log(x,y, e);
}

function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x +=0.1;
    // cube.rotation.y += 0.1;
    const deltaMove = {
        // x: x - rotation.x,
        x: x - rotation.x,
        y: y - rotation.y
    }
    // if (isRotate) {
    // console.log("delta", deltaMove.x, x  );
    // camera.rotation.x += 0.05 * (deltaMove.y) ;
    _3Dobj.rotation.y += (0.0006 * deltaMove.x);
    // _3Dobj.rotation.x += 0.002 * (-deltaMove.x);
    // console.log( _3Dobj.rotation);
    // const scale ;
    // _3Dobj.scale.x += 0.05;
    // _3Dobj.scale.y += 0.05;
    // _3Dobj.scale.z += 0.05;

    // }
    rotation = {
        x: x,
        y: y
    };
    // _3Dobj.rotation.z += 0.0005;
    renderer.render(scene, camera);

}
animate();
