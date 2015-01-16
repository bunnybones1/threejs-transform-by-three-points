var vd = new THREE.Vector3();
var v1 = new THREE.Vector3();
var v2 = new THREE.Vector3();
function transformByThreePoints(objectToAdjust, pointAnchor, pointToLookAt, pointToOrientXTowards, flip, prescaleImpliesScaling) {
	// set the object's up vector
	v1.copy(pointToOrientXTowards).sub( pointAnchor ).normalize();
	vd.copy(pointToLookAt).sub( pointAnchor );
	v2.copy(vd).normalize();
	v1.cross(v2 ).normalize();
	objectToAdjust.up.set( v1.x, v1.y, v1.z );

	objectToAdjust.position.copy(pointAnchor);
	objectToAdjust.lookAt(pointToLookAt);
	if(flip) {
		objectToAdjust.rotateX(Math.PI * .5);
	} else {
		objectToAdjust.rotateX(Math.PI * -.5);
	}
	objectToAdjust.rotateZ(Math.PI * -.5);

	if(prescaleImpliesScaling !== undefined) {
		var scaler = vd.length() * prescaleImpliesScaling;
		objectToAdjust.scale.set(scaler, scaler, scaler);
	}
}

module.exports = transformByThreePoints;