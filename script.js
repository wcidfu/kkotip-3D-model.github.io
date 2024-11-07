const loadModel = (containerId, modelPath) => {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
    directionalLight.position.set(5, 5, 5).normalize();
    scene.add(directionalLight);

    const loader = new THREE.GLTFLoader();
    loader.load(
        modelPath,
        (gltf) => {
            const model = gltf.scene;
            model.scale.set(1, 1, 1);

            model.traverse((node) => {
                if (node.isMesh) {
                    node.material.side = THREE.DoubleSide;
                    node.material.needsUpdate = true;
                }
            });

            scene.add(model);
            camera.position.z = 5;

            const controls = new THREE.OrbitControls(camera, renderer.domElement);

            function animate() {
                requestAnimationFrame(animate);
                controls.update();
                model.rotation.y += 0.01;
                renderer.render(scene, camera);
            }
            animate();
        },
        undefined,
        (error) => {
            console.error('Ошибка при загрузке модели:', error);
        }
    );

    window.addEventListener('resize', () => {
        const container = document.getElementById('logo-model');
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });    

    window.addEventListener('resize', () => {
        renderer.setSize(container.clientWidth, container.clientHeight);
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
    });
};

loadModel("logo-model", "Models/logo_result.glb");

