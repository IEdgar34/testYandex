const sliderpart = () => {
	const slide = document.querySelector(".participants__slider");
	let slidlength = document.querySelectorAll(".slider__item");
	let slidWidth = slidlength[0].clientWidth;
	const slidPrev = document.querySelector(".participants__btn-prev");
	const slidNext = document.querySelector(".participants__btn-next");
	const number = document.querySelector(".number");
	const total = document.querySelector(".total");
	let n = 0;
	let m = 0;
	var event = new MouseEvent("click", {
		view: window,
		bubbles: false,
		cancelable: true,
	});
	class s {
		constructor(
			slidSelector,
			/* widthSelector, */
			prevSelector,
			nextSelector,
			numberSelector,
			totalSelector,
			slidLengthSelector,
			timerSelector
		) {
			this.slid = slidSelector;
			this.prev = prevSelector;
			this.next = nextSelector;
			this.numb = numberSelector;
			this.total = totalSelector;
			this.slLength = slidLengthSelector;
			this.w = this.slLength[0].clientWidth;
			this.time = timerSelector;
			this.resiz();
			this.totalInit();
			this.btn();
			this.sliderNext();
			this.sliderPrev();
			this.timout();
		}
		resiz() {
			window.addEventListener("resize", () => {
				this.w = this.slLength[0].clientWidth;
				m = 0;
				n = 0;
				this.slid.style.transform = `translateX(-${n}px)`;
			});
		}
		btn() {
			if (n === 0) {
				this.prev.classList.remove("participants__btn_active");
				this.next.classList.add("participants__btn_active");
			} else if (n > 0 && n <= this.w * (this.slLength.length - 2)) {
				this.next.classList.add("participants__btn_active");
				this.prev.classList.add("participants__btn_active");
			} else if (n === this.w * (this.slLength.length - 1)) {
				this.prev.classList.add("participants__btn_active");
				this.next.classList.remove("participants__btn_active");
			}
		}
		sliderNext() {
			this.next.addEventListener("click", () => {
				if (n !== this.w * (this.slLength.length - 1)) {
					n += this.w;
					this.slid.style.transform = `translateX(-${n}px)`;
					m++;
					this.btn();
					this.numb.innerText = m + 1 + "/";
				} else if (n === this.w * (this.slLength.length - 1)) {
					n = 0;
					m = 0;
					this.slid.style.transform = `translateX(-${n}px)`;
					this.btn();
					this.numb.innerText = m + 1 + "/";
				}
			});
		}
		sliderPrev() {
			this.prev.addEventListener("click", () => {
				if (n != 0) {
					n -= this.w;
					this.slid.style.transform = `translateX(-${n}px)`;
					m--;
					this.btn();
					this.numb.innerText = m + 1 + "/";
				} else if (n === 0) {
					n = this.w * (this.slLength.length - 1);
					m = this.slLength.length - 1;
					this.slid.style.transform = `translateX(-${n}px)`;
					this.btn();
					this.numb.innerText = m + 1 + "/";
				}
			});
		}
		totalInit() {
			this.total.innerText = this.slLength.length;
		}
		timout() {
			if (this.time === true) {
				setInterval(() => this.next.dispatchEvent(event), 4000);
			}
		}
	}
	new s(slide, /* slidWidth, */ slidPrev, slidNext, number, total, slidlength, true);
};

export { sliderpart };
