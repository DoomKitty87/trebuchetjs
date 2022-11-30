var THREE = require('three');

module.exports.addImpulse = function(obj) {
    if (typeof obj !== 'object' || !obj.isBufferGeometry) throw new TypeError('Input must be a threejs mesh.');
}