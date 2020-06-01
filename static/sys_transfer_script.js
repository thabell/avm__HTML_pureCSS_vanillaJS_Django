try {
	/* ---------------- systems ------------------ */
	input = document.querySelector(".systems-input");

	input_one = input.querySelector(".input-one");
	input_one_system_from = input_one.querySelector("input[name='system_from']");
	input_one_system_to = input_one.querySelector("input[name='system_to']");
	input_one_system_more_to = input_one.querySelector("input[name='system_more_to']");
	input_one_start = input_one.querySelector("input[name='start']");
	input_one_system_from.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_one_system_to.focus();
			}
		});
	input_one_system_to.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_one_system_more_to.focus();
			}
		});
	input_one_system_more_to.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_one_start.focus();
			}
		});
	input_one_start.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				systems_submit_event(event);
			}
		});

	input_multi = input.querySelector(".input-multi");
	input_multi_system_from = input_multi.querySelector("input[name='system_from']");
	input_multi_system_to = input_multi.querySelector("input[name='system_to']");
	input_multi_system_more_to = input_multi.querySelector("input[name='system_more_to']");
	input_multi_start = input_multi.querySelector("input[name='start']");
	input_multi_finish = input_multi.querySelector("input[name='finish']");
	input_multi_step = input_multi.querySelector("input[name='step']");

	input_multi_system_from.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_multi_system_to.focus();
			}
		});
	input_multi_system_to.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_multi_system_more_to.focus();
			}
		});
	input_multi_system_more_to.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_multi_start.focus();
			}
		});
	input_multi_start.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_multi_finish.focus();
			}
		});
	input_multi_finish.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				input_multi_step.focus();
			}
		});
	input_multi_step.addEventListener("keydown", function function_name(event) {
			if (event.key === "Enter") {
				event.preventDefault();
				systems_submit_event(event);
			}
		});

	submit = document.querySelector(".systems-submit")
	submit_button = submit.querySelector(".submit-button");
	submit_button.addEventListener("click", function(event) {
		event.preventDefault();
		systems_submit_event(event);
	});
	function systems_submit_event(event) {
		system_from = 10;
		system_to = 10;
		system_more_to = 10;
		start = 1;
		finish = 1;
		step = 1;
		input_one = input.querySelector(".input-one.slider__item--active");
		input_multi = input.querySelector(".input-multi.slider__item--active");
		result = document.querySelector(".result");
		result.innerHTML = '';
		if (input_one) {
	/*		console.log("one");
			console.log(input_one);*/
			input_one_system_from.classList.remove("bad-input");
			input_one_system_to.classList.remove("bad-input");
			input_one_system_more_to.classList.remove("bad-input");
			input_one_start.classList.remove("bad-input");
			check_correct_input = true;
			if (!input_one_system_from.value || !Number.isInteger(Number(input_one_system_from.value)) || Number(input_one_system_from.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Из какой системы счисления (S)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_one_system_from.classList.add("bad-input");
				input_one_system_from.focus();
			}
			if (!input_one_system_to.value || !Number.isInteger(Number(input_one_system_to.value)) || Number(input_one_system_to.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'В какую систему счисления (P)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_one_system_to.classList.add("bad-input");
				input_one_system_to.focus();
			}
			if (!input_one_system_more_to.value || !Number.isInteger(Number(input_one_system_more_to.value)) || Number(input_one_system_more_to.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Еще в какую систему счисления (Q)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_one_system_more_to.classList.add("bad-input");
				input_one_system_more_to.focus();
			}
			if (!input_one_start.value || !is_value_in_system(input_one_start.value, input_one_system_from.value)) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Число для перевода'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_one_start.classList.add("bad-input");
				input_one_start.focus();
			}
			if (check_correct_input) {
				event.preventDefault();
	/*			result.append("calculating 'one'");*/
				var ans1 = get_value_from_system_to_system(input_one_start.value, input_one_system_from.value, input_one_system_to.value);
				var ans2 = get_value_from_system_to_system(input_one_start.value, input_one_system_from.value, input_one_system_more_to.value);
				result.innerHTML = "<h2><span class='h2-bright'>Результат</span> перевода</h2><div class='result-line result-header'><div class='result-item'>" + input_one_system_from.value + "</div><div class='result-item'>" + input_one_system_to.value + "</div><div class='result-item'>" + input_one_system_more_to.value + "</div></div><div class='result-line'><div class='result-item'>" + input_one_start.value + "</div><div class='result-item'>" + ans1 + "</div><div class='result-item'>" + ans2 + "</div></div>";

				history_item = [];
				history_item.push([input_one_system_from.value, input_one_system_to.value, input_one_system_more_to.value]);
				history_item.push([input_one_start.value, ans1, ans2]);
				systems_history = JSON.parse(localStorage.getItem("systems_history"));
				if (systems_history && systems_history.length > 0) {
					systems_history.push(history_item);
				} else {
					systems_history = [];
					systems_history[0] = history_item;
				}
				for (; systems_history.length > 5; ) {
					systems_history.shift();
				}
				localStorage.setItem("systems_history", JSON.stringify(systems_history));
				console.log(localStorage);

				refreshHistory();
			}
		} else if (input_multi) {
	/*		console.log("multi");
			console.log(input_multi);*/
			input_multi_system_from.classList.remove("bad-input");
			input_multi_system_to.classList.remove("bad-input");
			input_multi_system_more_to.classList.remove("bad-input");
			input_multi_start.classList.remove("bad-input");
			input_multi_finish.classList.remove("bad-input");
			input_multi_step.classList.remove("bad-input");
			check_correct_input = true;
			if (!input_multi_system_from.value || !Number.isInteger(Number(input_multi_system_from.value)) || Number(input_multi_system_from.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Из какой системы счисления (S)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_system_from.classList.add("bad-input");
				input_multi_system_from.focus();
			}
			if (!input_multi_system_to.value || !Number.isInteger(Number(input_multi_system_to.value)) || Number(input_multi_system_to.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'В какую систему счисления (P)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_system_to.classList.add("bad-input");
				input_multi_system_to.focus();
			}
			if (!input_multi_system_more_to.value || !Number.isInteger(Number(input_multi_system_more_to.value)) || Number(input_multi_system_more_to.value) < 2) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Еще в какую систему счисления (Q)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_system_more_to.classList.add("bad-input");
				input_multi_system_more_to.focus();
			}
			if (!input_multi_start.value || !is_value_in_system(input_multi_start.value, input_multi_system_from.value)) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Начало промежутка (A)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_start.classList.add("bad-input");
				input_multi_start.focus();
			}
			if (!input_multi_finish.value || !is_value_in_system(input_multi_finish.value, input_multi_system_from.value)) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Конец промежутка (B)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_finish.classList.add("bad-input");
				input_multi_finish.focus();
			}
			if (!input_multi_step.value || !is_value_in_system(input_multi_step.value, input_multi_system_from.value)) {
				event.preventDefault();
				var error_mes = document.createElement("p");
				error_mes.innerHTML = "Введите корректное значение 'Шаг промежутка для перевода (C)'";
				result.appendChild(error_mes);
				check_correct_input = false;
				input_multi_step.classList.add("bad-input");
				input_multi_step.focus();
			}
			if (check_correct_input) {
				event.preventDefault();
				/*			result.append("calculating 'multi'");*/
				history_item = [];
				history_item.push([input_multi_system_from.value, input_multi_system_to.value, input_multi_system_more_to.value]);
				result.innerHTML = "<h2><span class='h2-bright'>Результат</span> перевода</h2><div class='result-line result-header'><div class='result-item'>" + input_multi_system_from.value + "</div><div class='result-item'>" + input_multi_system_to.value + "</div><div class='result-item'>" + input_multi_system_more_to.value + "</div></div>";

				input_multi_start10 = get_value_from_system_to_decimal(input_multi_start.value, input_multi_system_from.value);
				input_multi_finish10 = get_value_from_system_to_decimal(input_multi_finish.value, input_multi_system_from.value);
				input_multi_step10 = get_value_from_system_to_decimal(input_multi_step.value, input_multi_system_from.value);

				if (input_multi_start10 > input_multi_finish10) {
					temp = input_multi_start10;
					input_multi_start10 = input_multi_finish10;
					input_multi_finish10 = temp;
				}

				for (var i = 0; input_multi_start10 < input_multi_finish10; input_multi_start10 += input_multi_step10) {
					input_multi_start_ORIG = get_value_from_decimal_to_system(input_multi_start10, input_multi_system_from.value);
					var ans1 = get_value_from_system_to_system(input_multi_start_ORIG, input_multi_system_from.value, input_multi_system_to.value);
					var ans2 = get_value_from_system_to_system(input_multi_start_ORIG, input_multi_system_from.value, input_multi_system_more_to.value);
					var new_line = document.createElement("div");
					new_line.classList = "result-line";
					new_line.innerHTML = "<div class='result-item'>" + input_multi_start_ORIG + "</div><div class='result-item'>" + ans1 + "</div><div class='result-item'>" + ans2 + "</div>";
					result.appendChild(new_line);
					history_item.push([input_multi_start_ORIG, ans1, ans2]);
				}

				systems_history = JSON.parse(localStorage.getItem("systems_history"));
				if (systems_history && systems_history.length > 0) {
					systems_history.push(history_item);
				} else {
					systems_history = [];
					systems_history[0] = history_item;
				}
				for (; systems_history.length > 5; ) {
					systems_history.shift();
				}
				localStorage.setItem("systems_history", JSON.stringify(systems_history));
				console.log(localStorage);

				refreshHistory();
			}
		}
	}

	mas_symbls = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	function is_value_in_system(value, system) {
		check = true;
		ascii_system = system.charCodeAt(system);
		system = Number(system);
		if (system > 35) {
			check = false;
			return check;
		}
		value_mas = value.split(".");
		if (value_mas.length > 2) {
			check = false;
			return check;
		}
		value_for_test = value_mas.join("");
		/*console.log(value_for_test);*/
		if (system > 10) {
			/*console.log(mas_symbls[system - 10]);*/
			ascii_system = mas_symbls[system - 10].charCodeAt(0);
			/*console.log(ascii_system);*/
			value_for_test = value_for_test.toUpperCase();
			/*console.log(value);*/
			for (var i = 0; i < value_for_test.length; i++) {
				curr_value = value_for_test[i].charCodeAt(0);
				console.log(curr_value, ascii_system - 1);
				if (curr_value >= ascii_system || (curr_value > 57 && curr_value < 65) || curr_value < 48) {
					check = false;
					break;
				}
			}
		}
		else {
			for (var i = 0; i < value_for_test.length; i++) {
				curr_value = Number(value_for_test[i]);
				if (!Number.isInteger(curr_value) || curr_value >= system) {
					check = false;
					break;
				}
			}
		}
		return check;
	}

	function get_value_from_system_to_system(value, system_from, system_to) {
		decimal_val = value;
		if (system_from != 10) {
			decimal_val = get_value_from_system_to_decimal(value, system_from);
		}
		ans_val = decimal_val;
		if (system_to != 10) {
			ans_val = get_value_from_decimal_to_system(decimal_val, system_to);
		}
		return ans_val;
	}

	function get_value_from_system_to_decimal(value, system_from) {
		value_mas = value.split(".");
	    ans = 0;
	    power = value_mas[0].length - 1;
	    curr_value = value_mas.join("");
	    for (var i = 0; i < curr_value.length; i++) {
	    	digit = Number(curr_value[i]);
	    	if (!Number.isInteger(digit)) {
				digit = change_letter_with_number(curr_value[i]);
			}
	    	ans += digit * Math.pow(Number(system_from), power);
	    	power--;
	    }
	    console.log("get_value_from_system_to_decimal", value, system_from, ans);
	    return ans;
	}

	function get_value_from_decimal_to_system(value, system_to) {
		value_mas = String(value).split(".");
		calc_result = Number(value_mas[0]);
		ans = "";
		for (; calc_result >= system_to;) {
			ostatok = calc_result % system_to;
			calc_result = (calc_result - ostatok) / system_to;
			if (ostatok > 9) {
				ostatok = change_number_with_letter(ostatok);
			}
			ans = ostatok + ans;
		}
		if (calc_result > 9) {
			calc_result = change_number_with_letter(calc_result);
		}
		ans = calc_result + ans;
		/*console.log(ans);*/
		if (value_mas.length > 1 && value_mas[1] != "0") {
			ans += ".";
			calc_result_drob = Number("0." + value_mas[1]);
			for (var i = 0; i < 10; i++) {
				calc_result_drob = calc_result_drob * system_to;
				calc_result_drob = String(calc_result_drob).split(".");
				if (Number(calc_result_drob[0]) > 9) {
					calc_result_drob[0] = change_number_with_letter(calc_result_drob[0]);
				}
				ans += calc_result_drob[0];
				if (calc_result_drob.length < 2) {
					break;
				}
				calc_result_drob = Number("0." + calc_result_drob[1]);
			}
		}
		console.log("get_value_from_decimal_to_system", value, system_to, ans);
	    return ans;
	}

	function change_number_with_letter(value) {
		return mas_symbls[value - 10];
	}
	function change_letter_with_number(value) {
		return mas_symbls.join("").indexOf(value.toUpperCase()) + 10;
	}
	/*history*/
	function refreshHistory() {
		history_content = JSON.parse(localStorage.getItem("systems_history"));
		if (history_content && history_content.length > 0) {
			history_block = document.querySelector(".systems-history");
			history_slider = history_block.querySelector(".slider");
			mas_for_delete = history_slider.querySelectorAll(".history-refreshing-item");
			for (var i = 0; i < mas_for_delete.length; i++) {
				history_slider.removeChild(mas_for_delete[i]);
			}
			history_pagination = document.querySelector(".history-pagination");
			mas_pag_for_delete = history_slider.querySelectorAll(".history-refreshing-pagination-item");
			for (var i = 0; i < mas_pag_for_delete.length; i++) {
				history_pagination.removeChild(mas_pag_for_delete[i]);
			}
			for (var i = 0; i < history_content.length; i++) {
				next_item = document.createElement("figure");
				next_item.classList = "history-item slider__item history-refreshing-item";
				next_item_back = document.createElement("div");
				next_item_back.classList = "history-item-back";
				next_item_overflow_wrapper = document.createElement("div");
				next_item_overflow_wrapper.classList = "for-overflow-wrapper";
				next_item_table = document.createElement("table");
				next_item_table.innerHTML = "<thead><tr><th>" + history_content[i][0][0] + "</th><th>" + history_content[i][0][1] + "</th><th>" + history_content[i][0][2] + "</th></tr></thead>";
				next_item_tbody = document.createElement("tbody");
				for (var j = 1; j < history_content[i].length; j++) {
					next_item_tr = document.createElement("tr");
					next_item_tr.innerHTML = "<td>" + history_content[i][j][0] + "</td><td>" + history_content[i][j][1] + "</td><td>" + history_content[i][j][2] + "</td>";
					next_item_tbody.appendChild(next_item_tr);
				}
				next_item_table.appendChild(next_item_tbody);
				next_item_overflow_wrapper.appendChild(next_item_table);
				next_item_back.appendChild(next_item_overflow_wrapper);
				next_item.appendChild(next_item_back);
				history_slider.appendChild(next_item);
				next_pagination_item = document.createElement("button");
				next_pagination_item.classList = "pagination__item history-refreshing-pagination-item";
				next_pagination_item.setAttribute("type", "button");
				next_pagination_item.innerHTML = "<span class='visually-hidden'>*</span>";
				history_pagination.appendChild(next_pagination_item);
			}
		}
	}
	refreshHistory();
	/*/history*/
	/* ---------------- /systems ------------------*/
} catch (error) { console.log(error) }