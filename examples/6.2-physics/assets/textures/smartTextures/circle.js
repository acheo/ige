var image = {
	render: function (ctx, entity) {
		ctx.fillStyle = '#ffffff';
        var cx = -entity._bounds2d.x2 + entity._bounds2d.x * 0.5;
        var cy = -entity._bounds2d.y2 + entity._bounds2d.y * 0.5;
        var radius = entity._bounds2d.x*0.5;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2, true);
        ctx.fill();
	}
};