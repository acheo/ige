/**
 * Creates a new isometric 3d entity.
 */
var IgeEntityBox2d = IgeEntity.extend({
	classId: 'IgeEntityBox2d',

	init: function () {
		this._super();

		// Store the existing translate methods
		this._translateToProto = this.translateTo;
		this._translateByProto = this.translateBy;

		// Take over the translate methods
		this.translateTo = this._translateTo;
		this.translateBy = this._translateBy;
	},

	/**
	 * Gets / sets the physics body definition. When setting the
	 * definition the physics body will also be created automatically
	 * from the supplied definition.
	 * @param def
	 * @return {*}
	 */
	box2dBody: function (def) {
		if (def !== undefined) {
			this._box2dBodyDef = def;

			// Ask the box2d component to create a new body for us
			this._box2dBody = ige.box2d.createBody(this, def);

			return this;
		}

		return this._box2dBodyDef;
	},

	/**
	 * Takes over translateTo calls and processes box2d movement as well.
	 * @param x
	 * @param y
	 * @param z
	 * @return {*}
	 * @private
	 */
	_translateTo: function (x, y, z) {
		var entBox2d = this._box2dBody;

		// Check if the entity has a box2d body attached
		// and if so, is it updating or not
		if (entBox2d && !entBox2d.updating) {
			// We have an entity with a box2d definition that is
			// not currently updating so let's override the standard
			// transform op and take over

			// Translate the body
			entBox2d.SetPosition({x: x / ige.box2d._scaleRatio, y: y / ige.box2d._scaleRatio});
			entBox2d.SetAwake(true);
		}

		// Now call the original translate method
		this._translateToProto(x, y, z);

		return this;
	},

	/**
	 * Takes over translateBy calls and processes box2d movement as well.
	 * @param x
	 * @param y
	 * @param z
	 * @private
	 */
	_translateBy: function (x, y, z) {
		this._translateTo(this._translate.x + x, this._translate.y + y, this._translate.z + z);
	},

	/**
	 * Destroys the physics entity and the box2d body that
	 * is attached to it.
	 */
	destroy: function () {
		ige.box2d.destroyBody(this._box2dBody);
		this._super();
	}
});

if (typeof(module) !== 'undefined' && typeof(module.exports) !== 'undefined') { module.exports = IgeEntityBox2d; }