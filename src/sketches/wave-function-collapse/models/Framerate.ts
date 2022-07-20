export default abstract class Framerate {
	static count: number = 0;
	static handle: NodeJS.Timer | undefined = undefined;
	static isEnabled = false;

	static enable = (enable: boolean) => {
		if (enable === false) {
			this.clear();
		}
		this.isEnabled = enable;
	};

	static resetInterval = () => {
		if (this.isEnabled === false) {
			return;
		}

		clearInterval(this.handle);
		this.handle = setInterval(() => {
			console.log('[Framerate]', this.count);
			this.count = 0;
		}, 1000);
	};

	static clear = () => {
		if (this.isEnabled === false) {
			return;
		}

		clearInterval(this.handle);
		this.handle = undefined;
	};

	static increment = () => {
		if (this.isEnabled === false) {
			return;
		}

		if (this.handle !== undefined) {
			this.count++;
		}
	};
}
