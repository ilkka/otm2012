Spinners = {
	Spinner: function(canvas_id, text, speed) {
		this.canvas = document.getElementById(canvas_id);
		this.ctx = this.canvas.getContext("2d");
		this.text = text;
		this.tick = 0;
		this.speed = speed;

		this.backgroundColor = "rgba(0, 0, 0, 0)"; //"#01939A"
		this.shadowColor = "rgba(0, 0, 0, 0.6)";
		this.arrowColor = "#FF7600";

		this.radius = Math.min(this.canvas.width, this.canvas.height) * 0.4;
		this.thickness = this.radius / 3;
		this.x = this.canvas.width/2;
		this.y = this.canvas.height/2;
		this.ctx.font = this.thickness + "px sans-serif";
		this.metrics = this.ctx.measureText(text);

		this.circleArrowPath = function(callback) {
			this.ctx.beginPath();
			this.ctx.arc(0, 0, this.radius, 0.5 * Math.PI, Math.PI, true);
			this.ctx.lineTo(-this.radius - 0.5 * this.thickness, 0);
			this.ctx.lineTo(-this.radius + 0.5 * this.thickness, 0 + this.thickness);
			this.ctx.lineTo(-this.radius + 1.5 * this.thickness, 0);
			this.ctx.arc(0, 0, this.radius - this.thickness, Math.PI, 0.5 * Math.PI);
			this.ctx.lineTo(0, this.radius);
			callback(this.ctx);
		}
		// circle arrow thingy
		this.circleArrowShadow = function() {
			this.ctx.save();
			this.ctx.fillStyle = this.arrowColor;
			this.ctx.shadowColor = this.shadowColor;
			this.ctx.shadowOffsetX = 0.1 * this.thickness;
			this.ctx.shadowOffsetY = 0.1 * this.thickness;
			this.ctx.shadowBlur = 10;
			this.ctx.translate(this.x, this.y);
			var angle = -(2 * Math.PI) * (this.tick/1000) * this.speed;
			this.ctx.rotate(angle);
			this.circleArrowPath(function(ctx) { ctx.fill(); });
			this.ctx.shadowColor = "rgba(0, 0, 0, 0)";
			this.circleArrowPath(function(ctx) { ctx.stroke(); });
			this.ctx.restore();
		}

		this.drawCycle = function() {
			this.ctx.save();
			this.circleArrowShadow();

			this.ctx.fillStyle = this.arrowColor;
			if (this.text !== undefined) {
				this.ctx.fillText(this.text, this.x - 0.5 * this.metrics.width, this.y + 0.4 * this.thickness, 2 * this.radius - 2 * this.thickness);
				this.ctx.strokeText(this.text, this.x - 0.5 * this.metrics.width, this.y + 0.4 * this.thickness, 2 * this.radius - 2 * this.thickness);
			}
			this.ctx.restore()
		}

		this.draw = function() {
			this.ctx.fillStyle = this.backgroundColor;
			this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
			this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

			this.drawCycle();
			this.tick += 50;
		};
	}
}
