const slider = () => {
	const btnGroup = document.querySelector(".stages__btn-wrap");
	const wrapper = document.querySelector(".stages__cards_wrap");
	let trueAndFalse = wrapper.getAttribute("data-grid");
	let wv = document.documentElement.offsetWidth;

	const gridItem = `
    	                <div class="stages__card_dn slide_item">
							<div class="stages__card stages__card_card1">
								<div class="stages__card_circl">1</div>
								<p class="stages__card_descr">Строительство железнодорожной магистрали Москва-Васюки</p>
							</div>
							<div class="stages__card stages__card_card2">
								<div class="stages__card_circl">2</div>
								<p class="stages__card_descr">
									Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов
								</p>
							</div>
						</div>
						<div class="slide_item stages__card stages__card_card3">
							<div class="stages__card_circl">3</div>
							<p class="stages__card_descr">
								Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей,
								фруктов, икры, шоколадных конфет
							</p>
						</div>
						<div class="slide_item stages__card_dn">
							<div class="stages__card stages__card_card4">
								<div class="stages__card_circl">4</div>
								<p class="stages__card_descr">Строительство дворца для турнира</p>
							</div>
							<div class="stages__card stages__card_card5">
								<div class="stages__card_circl">5</div>
								<p class="stages__card_descr">Размещение гаражей для гостевого автотранспорта</p>
							</div>
						</div>
						<div class="slide_item stages__card stages__card_card6">
							<div class="stages__card_circl">6</div>
							<p class="stages__card_descr">
								Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов
							</p>
						</div>
						<div class="slide_item stages__card stages__card_card7">
							<div class="stages__card_circl">7</div>
							<p class="stages__card_descr">
								Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов
								и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн
							</p>
						</div>
					

    `;

	const gridItemNotWrap = `
                        
							<div class="stages__card stages__card_card1">
								<div class="stages__card_circl">1</div>
								<p class="stages__card_descr">Строительство железнодорожной магистрали Москва-Васюки</p>
							</div>
							<div class="stages__card stages__card_card2">
								<div class="stages__card_circl">2</div>
								<p class="stages__card_descr">
									Открытие фешенебельной гостиницы «Проходная пешка» и других небоскрёбов
								</p>
							</div>
						
						<div class="stages__card stages__card_card3">
							<div class="stages__card_circl">3</div>
							<p class="stages__card_descr">
								Поднятие сельского хозяйства в радиусе на тысячу километров: производство овощей,
								фруктов, икры, шоколадных конфет
							</p>
						</div>
						
							<div class="stages__card stages__card_card4">
								<div class="stages__card_circl">4</div>
								<p class="stages__card_descr">Строительство дворца для турнира</p>
							</div>
							<div class="stages__card stages__card_card5">
								<div class="stages__card_circl">5</div>
								<p class="stages__card_descr">Размещение гаражей для гостевого автотранспорта</p>
							</div>
						
						<div class="stages__card stages__card_card6">
							<div class="stages__card_circl">6</div>
							<p class="stages__card_descr">
								Постройка сверхмощной радиостанции для передачи всему миру сенсационных результатов
							</p>
						</div>
						<div class="stages__card stages__card_card7">
							<div class="stages__card_circl">7</div>
							<p class="stages__card_descr">
								Создание аэропорта «Большие Васюки» с регулярным отправлением почтовых самолётов
								и дирижаблей во все концы света, включая Лос-Анжелос и Мельбурн
							</p>
						</div>
					</div>
					

        `;
	function initBtn() {
		if (wv < 1184) {
			wrapper.innerHTML = gridItem;
			btnGroup.classList.add("stages__btn-wrap_active");
			wrapper.setAttribute("data-grid", true);
		} else {
			wrapper.innerHTML = gridItemNotWrap;
			btnGroup.classList.remove("stages__btn-wrap_active");
			wrapper.setAttribute("data-grid", false);
		}
	}
	initBtn();
	window.addEventListener("resize", (e) => {
		addElem();
	});
	function addElem() {
		wv = document.documentElement.clientWidth;
		trueAndFalse = wrapper.getAttribute("data-grid");
		if (wv < 1184 && trueAndFalse === "false") {
			wrapper.innerHTML = gridItem;
			wrapper.setAttribute("data-grid", true);
			btnGroup.classList.add("stages__btn-wrap_active");
			initSlider();
		} else if (wv > 1183 && trueAndFalse === "true") {
			wrapper.innerHTML = gridItemNotWrap;
			wrapper.style.transform = "translateX(0)";
			wrapper.setAttribute("data-grid", false);
			btnGroup.classList.remove("stages__btn-wrap_active");
		}
	}

	function initSlider() {
		if (document.documentElement.clientWidth < 1184) {
			const sliderLength = document.querySelectorAll(".slide_item");
			const slide = document.querySelector(".stages__cards_wrap");
			let width = sliderLength[0].clientWidth;
			const dotsWrap = document.querySelector(".stages__btn-dots");
			const prev = document.querySelector(".stages__btn-prev");
			const next = document.querySelector(".stages__btn-next");
			let dotsArr;
			let counter = 0;
			let i = 0;
			let dot = 0;
			dots();

			function dotsActive(countSelector, classSelector, arrSelector) {
				arrSelector[countSelector].classList.add(classSelector);
			}
			function dotsNotActive(classSelector, arrSelector) {
				arrSelector.forEach((element) => {
					element.classList.remove(classSelector);
				});
			}
			dotsNotActive("stages__dots_active", dotsArr);
			dotsActive(dot, "stages__dots_active", dotsArr);
			function nextItem() {
				if (i < (width + 20) * (sliderLength.length - 1)) {
					i += width + 20;
					counter++;
					slide.style.transform = `translateX(-${i}px)`;
					btnActive();
					dot++;
					dotsNotActive("stages__dots_active", dotsArr);
					dotsActive(dot, "stages__dots_active", dotsArr);
					console.log(dot);
				}
			}
			function prevItem() {
				if (i > 0) {
					i -= width + 20;
					counter--;
					slide.style.transform = `translateX(-${i}px)`;
					btnActive();
					dot--;
					dotsNotActive("stages__dots_active", dotsArr);
					dotsActive(dot, "stages__dots_active", dotsArr);
				}
			}
			function btnActive() {
				if (i < (width + 20) * (sliderLength.length - 1) && i > 0) {
					next.classList.add("stages__btn_active");
					prev.classList.add("stages__btn_active");
				} else if (i === (width + 20) * (sliderLength.length - 1)) {
					next.classList.remove("stages__btn_active");
				} else if (i === 0) {
					prev.classList.remove("stages__btn_active");
				}
			}
			btnActive();
			next.addEventListener("click", () => {
				nextItem();
			});
			prev.addEventListener("click", () => {
				prevItem();
			});

			function dots() {
				for (let i = 0; i <= sliderLength.length; i++) {
					const div = document.createElement("div");
					div.classList.add("stages__dots");
					dotsArr = document.querySelectorAll(".stages__dots");
					if (dotsArr.length < sliderLength.length) {
						dotsWrap.append(div);
					}
				}
			}
		}
	}
	initSlider();
};
export { slider };
