function Page(canvas) {

	this.objects = [];

	this.canvas = canvas;
	this.ctx = this.canvas.getContext("2d");

	this.isRunning = false;

	this.canvas.mouseOn = true;
	this.canvas.mousedown = false;

	this.fps = 0;
	this.frames = 0;

	this.fpsLoop = null;

	this.canvas.addEventListener("mousemove", function(e) {
			var rect = this.getBoundingClientRect();
			this.mouseX = e.clientX - rect.left;
			this.mouseY = e.clientY - rect.top;
	});

	this.canvas.addEventListener("mouseout", function(e) {
		this.mouseOn = false;
	});

	this.canvas.addEventListener("mouseover", function(e) {
		this.mouseOn = true;
	});

	this.canvas.addEventListener("mousedown", function() {this.mousedown = true;});
	this.canvas.addEventListener("mouseup", function() {this.mousedown = false;});

	this.start = function() {
		this.isRunning = true;
		this.fpsLoop = setInterval(function(_this) {_this.updateFps();}, 1000, this);
		this.loop();
	};

	this.stop = function() {
		this.isRunning = false;
		clearInterval(this.fpsLoop);
	};

	this.loop = function() {
		this.clear();
		this.render();
		this.update();
    if (this.isRunning) {
		    setTimeout(function(_this) {_this.loop(); }, 1, this);
    }
	};

	this.clear = function() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	};

	this.render = function() {
		for (var i = 0; i<this.objects.length; i++) {
			try {
				this.objects[i].draw(this);
			}
			catch (e) {
				console.error(e);
			}
		}
		this.frames++;
	};

	this.update = function() {
			this.drive();
			for (var i = 0; i<this.objects.length; i++) {
					try {
						this.objects[i].update(this);
					}
					catch (e) {
							console.error(e);
					}
			}
	};

	this.updateFps = function() {
		this.fps = this.frames;
		this.frames = 0;
	};

	this.drive = function() {
		return;
	};

	this.add = function(obj) {
		this.objects.push(obj);
	};

}
