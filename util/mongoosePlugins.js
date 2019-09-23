module.exports = function(schema, options) {
	schema.set("toJSON", {
		virtuals: true,
		transform: function(doc, ret, options) {
			ret.id = ret._id;
			delete ret._id;
			delete ret.__v;
		}
	});
};
