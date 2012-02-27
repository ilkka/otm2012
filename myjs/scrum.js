Scrum = {
	init: function(id) {
		this.canvas = document.getElementById(id);
		this.ctx = this.canvas.getContext("2d");
		this.backgroundColor = "rgba(0, 0, 0, 0)"; //"#01939A"
		this.shadowColor = "rgba(0, 0, 0, 0.6)";
		this.arrowColor = "#FF7600";
		this.tick = 0;
		setInterval("Scrum.draw();", 50);
	},

	draw: function() {
		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

		function drawCycle(name, x, y, radius, speed, clockwise) {
			Scrum.ctx.save();
			var thickness = radius / 3;
			// circle arrow thingy
			function circleArrowShadow() {
				Scrum.ctx.save();
				function circleArrowPath(callback) {
					Scrum.ctx.beginPath();
					Scrum.ctx.arc(0, 0, radius, 0.5 * Math.PI, Math.PI, true);
					Scrum.ctx.lineTo(-radius - 0.5 * thickness, 0);
					Scrum.ctx.lineTo(-radius + 0.5 * thickness, 0 + thickness);
					Scrum.ctx.lineTo(-radius + 1.5 * thickness, 0);
					Scrum.ctx.arc(0, 0, radius - thickness, Math.PI, 0.5 * Math.PI);
					Scrum.ctx.lineTo(0, radius);
					callback();
				}
				Scrum.ctx.fillStyle = Scrum.arrowColor;
				Scrum.ctx.shadowColor = Scrum.shadowColor;
				Scrum.ctx.shadowOffsetX = 0.1 * thickness;
				Scrum.ctx.shadowOffsetY = 0.1 * thickness;
				Scrum.ctx.shadowBlur = 10;
				Scrum.ctx.translate(x, y);
				var angle = -(2 * Math.PI) * (Scrum.tick/1000) * speed;
				Scrum.ctx.rotate(angle);
				circleArrowPath(function() { Scrum.ctx.fill(); });
				Scrum.ctx.shadowColor = "rgba(0, 0, 0, 0)";
				circleArrowPath(function() { Scrum.ctx.stroke(); });
				Scrum.ctx.restore();
			}

			circleArrowShadow();

			Scrum.ctx.font = thickness + "px sans-serif";
			var metrics = Scrum.ctx.measureText("30 days");
			Scrum.ctx.fillStyle = Scrum.arrowColor;
			Scrum.ctx.fillText(name, x - 0.5 * metrics.width, y + 0.4 * thickness, 2 * radius - 2 * thickness);
			Scrum.ctx.strokeText(name, x - 0.5 * metrics.width, y + 0.4 * thickness, 2 * radius - 2 * thickness);
			Scrum.ctx.restore()
		}

		function drawArrow(start_x, start_y, end_x, end_y) {
			Scrum.ctx.save();
			var thickness = (0.17 / 3) * Scrum.canvas.width;
			var length = Math.sqrt(Math.pow(end_x - start_x, 2) + Math.pow(end_y - start_y, 2));
			function arrowPath(callback) {
				Scrum.ctx.beginPath();
				Scrum.ctx.moveTo(end_x, end_y);
				Scrum.ctx.lineTo(end_x - thickness, end_y + thickness);
				Scrum.ctx.lineTo(end_x - thickness, end_y + 0.5 * thickness);
				Scrum.ctx.lineTo(start_x, end_y + 0.5 * thickness);
				Scrum.ctx.lineTo(start_x, end_y - 0.5 * thickness);
				Scrum.ctx.lineTo(end_x - thickness, end_y - 0.5 * thickness);
				Scrum.ctx.lineTo(end_x - thickness, end_y - thickness);
				Scrum.ctx.lineTo(end_x, end_y);
				callback();
			}
			Scrum.ctx.fillStyle = Scrum.arrowColor;
			Scrum.ctx.shadowColor = Scrum.shadowColor;
			Scrum.ctx.shadowOffsetX = 0.1 * thickness;
			Scrum.ctx.shadowOffsetY = 0.1 * thickness;
			Scrum.ctx.shadowBlur = 10;
			arrowPath(function() { Scrum.ctx.fill(); });
			Scrum.ctx.shadowColor = "rgba(0, 0, 0, 0)";
			arrowPath(function() { Scrum.ctx.stroke(); });
			Scrum.ctx.restore();
		}

		function drawDocument(title, x, y) {
			Scrum.ctx.save();
			Scrum.ctx.fillStyle = "#67E46F";
			var side = Scrum.canvas.width * 0.15;
			Scrum.ctx.font = side * 0.2 + "px";
			function docPath(callback) {
				Scrum.ctx.beginPath();
				Scrum.ctx.moveTo(0.8 * side, 0);
				Scrum.ctx.lineTo(side, 0.2 * side);
				Scrum.ctx.lineTo(0.8 * side, 0.2 * side);
				Scrum.ctx.lineTo(0.8 * side, 0);
				Scrum.ctx.lineTo(0, 0);
				Scrum.ctx.lineTo(0, side);
				Scrum.ctx.lineTo(side, side);
				Scrum.ctx.lineTo(side, 0.2 * side);
				callback();
			}
			Scrum.ctx.shadowColor = Scrum.shadowColor;
			Scrum.ctx.shadowOffsetX = 0.1 * side;
			Scrum.ctx.shadowOffsetY = 0.1 * side;
			Scrum.ctx.shadowBlur = 10;
			Scrum.ctx.translate(x - side/2, y - side/2);
			docPath(function() { Scrum.ctx.fill();});
			Scrum.ctx.shadowColor = "rgba(0, 0, 0, 0)";
			docPath(function() { Scrum.ctx.stroke();});
			Scrum.ctx.fillStyle = "white";
			Scrum.ctx.textAlign = "center";
			Scrum.ctx.fillText(title, side/2, side/2, 0.9 * side);
			Scrum.ctx.restore();
		}

		drawArrow(0.1 * this.canvas.width, this.canvas.height / 2 + 0.17 * this.canvas.width,
		0.9 * this.canvas.width, this.canvas.height / 2 + 0.17 * this.canvas.width);
		drawCycle("30 days", this.canvas.width / 2, this.canvas.height / 2, 0.17 * this.canvas.width, 0.01, false);
		drawCycle("24 hours", this.canvas.width / 2 - 0.06 * this.canvas.width, this.canvas.height / 2 - 0.22 * this.canvas.width, 0.1 * this.canvas.width, 0.3, true);
		drawDocument("Product\nBacklog", 0.2 * this.canvas.width, this.canvas.height / 2 + 0.17 * this.canvas.width);
		this.tick += 50;
	},
}
