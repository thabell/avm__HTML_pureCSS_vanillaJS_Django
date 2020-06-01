console.log(localStorage);
/*localStorage.clear();*/
/*-------------------some fun for cycling with Timeout*/
function cycl_with_Timeout(mseconds, max_count, cycled_function, args) {
	var i = 0;
	function recurs_cycl() {
		cycled_function(args);
		setTimeout(function() {
			i++;
			if (i < max_count) { recurs_cycl(); }
		}, mseconds);
	}
	recurs_cycl();
}
/* -------------------/some fun for cycling with Timeout*/


/* ------ slider ------ */
try {
	var slider = null;
	var button_previousList = document.querySelectorAll(".button-previous");
	var button_nextList = document.querySelectorAll(".button-next");
	var pagination__itemListAll = document.querySelectorAll(".pagination__item");
	var slider__itemList = new Array();
	var pagination__itemList = new Array();
	var slider__active_idx = null;
	var slider__item__active = null;

/*здесь должна быть расстановка visually-hidden по умолчанию из состояния нормального вида слайдов без js*/

	function setSlider(fire) {
		slider = fire.closest(".slider");
		slider__itemList = slider.querySelectorAll(".slider__item");
		pagination__itemList = slider.querySelectorAll(".pagination__item");
		pagination__itemList.forEach(function callback(element, index, array) {
			if (index > slider__itemList.length - 1) { return; }
			if (element.classList.contains("pagination__item--active")) {
				slider__active_idx = index; 
				slider__item__active = slider__itemList.item(slider__active_idx);
				return;
			}
		});
	}

	function slider__previous_slide(){

		var old_active = slider__item__active;
		old_active.classList.add("slider_item_right_out");
		pagination__itemList.item(slider__active_idx).classList.remove("pagination__item--active");

		var slider__new_active_idx = null;

		if (slider__active_idx != 0) {
			slider__new_active_idx = slider__active_idx - 1;
		} else {
			slider__new_active_idx = slider__itemList.length - 1;
		}

		slider__itemList.item(slider__new_active_idx).classList.add("slider__item--active");
		slider__itemList.item(slider__new_active_idx).classList.add("slider_item_left_in");

		pagination__itemList.item(slider__new_active_idx).classList.add("pagination__item--active");

		setTimeout(function() {
			old_active.classList.remove("slider__item--active");
			old_active.classList.remove("slider_item_right_out"); /*возможно зесь лучше пользоваться добавлением/убиранием visually-hidden для более простой стилизации в css*/
		}, 490);

		setTimeout(function() {
			slider__itemList.item(slider__new_active_idx).classList.remove("slider_item_left_in");
		}, 510);	
	}

	for (var i = 0; i < button_previousList.length; i++) {
		button_previousList.item(i).addEventListener("click", function function_name(event) {
			event.preventDefault();
			setSlider(event.target);
			slider__previous_slide();
		});
	}

	function slider__next_slide(){


		var old_active = slider__item__active;

		var slider__new_active_idx = null;

		if (slider__active_idx != slider__itemList.length - 1) {
			slider__new_active_idx = slider__active_idx + 1;
		} else {
			slider__new_active_idx = 0;
			old_active.classList.add("slider_item_left_out_fix");
		}

		old_active.classList.add("slider_item_left_out");
		pagination__itemList.item(slider__active_idx).classList.remove("pagination__item--active");

		slider__itemList.item(slider__new_active_idx).classList.add("slider__item--active");
		slider__itemList.item(slider__new_active_idx).classList.add("slider_item_right_in");

		pagination__itemList.item(slider__new_active_idx).classList.add("pagination__item--active");

		setTimeout(function() {
			old_active.classList.remove("slider__item--active");
			old_active.classList.remove("slider_item_left_out"); /*возможно зесь лучше пользоваться добавлением/убиранием visually-hidden для более простой стилизации в css*/
			old_active.classList.remove("slider_item_left_out_fix");
		}, 490);

		setTimeout(function() {
			slider__itemList.item(slider__new_active_idx).classList.remove("slider_item_right_in");
		}, 510);
	}

	for (var i = 0; i < button_nextList.length; i++) {
		button_nextList.item(i).addEventListener("click", function function_name(event) {
			event.preventDefault();
			setSlider(event.target);
			slider__next_slide();
		});
	}

	var slider__clicked_idx = null;
	function set_sl_nd_prev_from_pag(fire){
		slider__previous_slide();
		setSlider(fire);
	}
	function set_sl_nd_next_from_pag(fire){
		slider__next_slide();
		setSlider(fire);
	}
	pagination__itemListAll.forEach(function callback(element, index, array) {
		element.addEventListener("click", function function_name(event) {
			event.preventDefault();
			setSlider(event.target);
			pagination__itemList.forEach(function callback(element, index, array) {
				if (index > slider__itemList.length - 1) { return; }
				if (element == event.target) {
					slider__clicked_idx = index;
					return;
				}
			});
			if ((slider__clicked_idx - slider__active_idx) > 0) {
			    var count_of_steps_to_go = slider__clicked_idx - slider__active_idx;
			    /*console.log(count_of_steps_to_go);*/
			    cycl_with_Timeout(286, count_of_steps_to_go, set_sl_nd_next_from_pag, event.target);
			} else if ((slider__clicked_idx - slider__active_idx) < 0) {
			    var count_of_steps_to_go = slider__active_idx - slider__clicked_idx;
			    cycl_with_Timeout(286, count_of_steps_to_go, set_sl_nd_prev_from_pag, event.target);
			}
		});
	});
} catch (error) { console.log("Slider works not"); }
/* ------ /slider ------ */
