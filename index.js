function transformByThreePoints(objectToAdjust, pointAnchor, pointToLookAt, pointToOrientXTowards, flip, scaling, anisoScaling) {
	// set the object's up vector
	var v1 = pointToOrientXTowards.clone().sub( pointAnchor ).normalize();
	var v2 = pointToLookAt.clone().sub( pointAnchor ).normalize();
	var v3 = v1.cross(v2 ).normalize();
	objectToAdjust.up.set( v3.x, v3.y, v3.z );

	objectToAdjust.position.copy(pointAnchor);
	objectToAdjust.lookAt(pointToLookAt);
	if(flip) {
		objectToAdjust.rotateX(Math.PI * .5);
	} else {
		objectToAdjust.rotateX(Math.PI * -.5);
	}
	objectToAdjust.rotateZ(Math.PI * -.5);
}

module.exports = transformByThreePoints;