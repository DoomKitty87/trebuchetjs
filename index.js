const THREE = require("three");

module.exports.addImpulse = function(obj, force, direction, world) {
    obj = new THREE.Mesh(new THREE.BoxGeometry, new THREE.MeshBasicMaterial( { color: 0xff0000 } ));

    if (!(obj instanceof THREE.Mesh)) throw new TypeError("Object must be a threejs mesh.");
    if (!((typeof force).toString != "number")) throw new TypeError("Force must be a number.");
    if (!(direction instanceof THREE.Vector3)) throw new TypeError("Direction must be a (threejs) Vector3.");
    if (!(world instanceof World)) throw new TypeError("World must be a trebuchet.World object.");

    direction = direction.normalize();
    var toApply = direction.multiplyScalar(force);

    var physicsObj = new PhysicsBody(obj, toApply);

    if (!(world.objects.includes(physicsObj))) {
        world.objects.push(physicsObj);
    }
    else {
        world.objects[world.objects.indexOf(physicsObj)].force += physicsObj.force;
    }
}

module.exports.World = class {
    constructor(drag) {
        this.drag = drag;
        this.objects = [];
    }
}

module.exports.PhysicsBody = class {
    constructor(obj, force) {
        this.object = obj;
        this.force = force;
    }
}