const THREE = require("three");

module.exports.addImpulse = function(obj, force, direction, world) {

    if (!obj.isMesh) throw new TypeError("Object must be a threejs mesh.");
    if (typeof force != "number") throw new TypeError("Force must be a number.");
    if (!direction.isVector3) throw new TypeError("Direction must be a (threejs) Vector3.");
    if (!(world instanceof World)) throw new TypeError("World must be a trebuchet.World object.");

    direction = direction.normalize();
    var toApply = direction.multiplyScalar(force);

    var physicsObj = new PhysicsBody(obj, toApply);

    if (world.objects.includes(physicsObj)) {
        world.objects[world.objects.indexOf(physicsObj)].force += physicsObj.force;
    }
    else {
        world.objects.push(physicsObj);
    }
}

module.exports.simulateWorld = function(world) {
    world.objects.forEach(function(object) {
        object.object.position.add(object.force);
        
        object.force.x = (Math.max(Math.abs(object.force.x) - world.drag), 0);
        object.force.y = (Math.max(Math.abs(object.force.y) - world.drag), 0) * Math.sign(object.force.y);
        object.force.z = (Math.max(Math.abs(object.force.z) - world.drag), 0) * Math.sign(object.force.z);

        if (object.force.x == 0 && object.force.y == 0 && object.force.z == 0) {
            //world.objects.splice(world.objects.indexOf(object), 1);
        }
    })
}

module.exports.readPositions = function(world) {
    world.objects.forEach(function(object) {
        console.log(object.position);
    })
}

World = class {
    constructor(drag) {
        this.drag = drag;
        this.objects = [];
    }
}

PhysicsBody = class {
    constructor(obj, force) {
        this.object = obj;
        this.force = force;
    }
}

module.exports.World = World
module.exports.PhysicsBody = PhysicsBody