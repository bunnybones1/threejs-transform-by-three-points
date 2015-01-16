var onReady = function() {
	var View = require('threejs-managed-view').View;
	var transformByThreePoints = require('./');
	var view = new View({
		useRafPolyfill: false
	});
	var scene = view.scene;

	var spin = new THREE.Object3D();
	view.scene.add(spin);
	var pointsData = [
		{
			pos: [-1, 2, 0],
			color: 0xffffff
		},
		{
			pos: [1, 2, 1],
			color: 0x7f2f2f
		},
		{
			pos: [-1, 0, .5],
			color: 0x2f7f2f
		}
	];

	var points = [];
	var ballGeometry = new THREE.SphereGeometry(.25);
	pointsData.forEach(function(pointData){
		var pointMesh = new THREE.Mesh(
			ballGeometry,
			new THREE.MeshBasicMaterial({
				color: pointData.color
			})
		);
		pointMesh.position.fromArray(pointData.pos);
		spin.add(pointMesh);
		points.push(pointMesh.position);
	});

	view.renderManager.onEnterFrame.add(function() {
		var time = (new Date()).getTime() * .001;
		spin.rotation.y += .01;
		points[1].set(
			Math.sin(time) - .5 - 1,
			Math.cos(time) - .5	,
			Math.sin(time*1.2) - .5
		)
		transformByThreePoints(testObjects[0], points[0], points[1], points[2], false, 1);
		transformByThreePoints(testObjects[1], points[1], points[0], points[2], true);
	})
	var planeMesh = new THREE.Mesh(
		new THREE.PlaneGeometry(8, 8, 8, 8),
		new THREE.MeshBasicMaterial({
			wireframe: true,
			color: 0x7f7f7f
		})
	)
	planeMesh.rotation.x += Math.PI * .5;
	spin.add(planeMesh);

	function createTestObject() {
		var testObject = new THREE.Object3D();
		var testMesh = new THREE.Mesh(
			new THREE.PlaneGeometry(1, 1, 1, 1),
			new THREE.MeshBasicMaterial({
				// wireframe: true,
				color: 0x7f3f3f
			})
		)
		testObject.add(new THREE.ArrowHelper(
			new THREE.Vector3(1, 0, 0),
			new THREE.Vector3(),
			1,
			0xff0000
		));
		testObject.add(new THREE.ArrowHelper(
			new THREE.Vector3(0, -1, 0),
			new THREE.Vector3(),
			1,
			0x00ff00
		));
		testObject.add(new THREE.ArrowHelper(
			new THREE.Vector3(0, 0, 1),
			new THREE.Vector3(),
			1,
			0x0000ff
		));
		// testMesh.position.x = .5;
		// testMesh.position.y = -.5;
		testObject.add(testMesh);
		spin.add(testObject);
		return testObject;
	}
	var testObjects = [];
	testObjects.push(createTestObject(), createTestObject());
}

var loadAndRunScripts = require('loadandrunscripts');
loadAndRunScripts(
	[
		'bower_components/three.js/three.js'
	],
	onReady
);