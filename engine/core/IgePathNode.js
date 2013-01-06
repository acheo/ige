/**
 * Creates a new path node for use with the IgePathFinder class.
 */
var IgePathNode = IgePoint.extend({
	classId: 'IgePathNode',

	/**
	 * @constructor
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} g
	 * @param {Number} moveCost
	 * @param {Number} h
	 * @param {Object} parent
	 * @param {String} direction
	 */
	init: function(x, y, g, moveCost, h, parent, direction) {
		//this._super(x, y, 0);
		this.z = 0; // Compat with IgePoint
		
		this.x = x;
		this.y = y;
		this.g = g + moveCost; // Cost of moving from the start point along the path to this node (parentNode.g + moveCost)
		this.h = h; // Rough distance to target node
		this.moveCost = moveCost;
		this.f = g + h; // Result of g + h
		this.link = parent;
		this.hash = x + ',' + y;
		this.listType = 0;
		this.direction = direction;
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = IgePathNode; }