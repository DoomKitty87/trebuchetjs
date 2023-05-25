# TrebuchetJS
 Lightweight physics simulation engine for Three.js. Naive calculations of drag and other physical effects favor performance and cartoon feel for applications where user interactivity is more important than realism.

# API
TREBUCHET.World(float drag, float gravity, string up_axis)
Constructor for a World object, which contains all PhysicsBody objects that are affected by the package's simulations.

TREBUCHET.PhysicsBody(var object, float force)
Constructor for a PhysicsBody, which can be placed into a World object to simulate physics for it. Object should be a three.js mesh object.

TREBUCHET.addImpulse(var object, float force, THREE.Vector3 direction, World world)
Adds a force impulse to a given object, in a direction and with a force amount. Specifies World to simulate the object in.

TREBUCHET.simulateWorld(World world)
To be run every frame; Runs all physics simulations (forces, drag, and gravity) for a given world and all objects inside it.

TREBUCHET.readPositions(World world)
Prints to the console the positions of all objects in a given World. For debugging.