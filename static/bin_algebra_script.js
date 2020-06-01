try {
	/* ---------------- logic ------------------ */
	input = document.querySelector(".logic-input");
	logic_formula = input.querySelector(".logic-formula");
	/*logic_formula.focus();*/
	logic_formula.addEventListener("keydown", function function_name(event) {
		if (event.key === "Enter") {
			event.preventDefault();
			logic_submit_event(event);
		}
	});

	submit = document.querySelector(".logic-submit")
	submit_button = submit.querySelector(".submit-button");
	submit_button.addEventListener("click", function(event) {
		event.preventDefault();
		logic_submit_event(event);
	});

	refreshHistory();

	hangMiniButtonsEvents();


	function logic_submit_event(event) {
		result = document.querySelector(".result");
		mas_for_delete = result.querySelectorAll(".result-refreshing-item");
		for (var i = 0; i < mas_for_delete.length; i++) {
			/*console.log(mas_for_delete[i]);*/
			result.removeChild(mas_for_delete[i]);
		}
		result_pagination = result.querySelector("result-pagination");
		mas_pag_for_delete = result.querySelectorAll(".result-refreshing-pagination-item");
		for (var i = 0; i < mas_pag_for_delete.length; i++) {
			result_pagination.removeChild(mas_pag_for_delete[i]);
		}
		logic_formula.classList.remove("bad-input");
		if (!logic_formula.value || !tryToParseFormula(logic_formula.value)) {
			var error_mes = document.createElement("p");
			error_mes.classList = "result-refreshing-item";
			error_mes.innerHTML = "Введите корректное значение 'Формула (F)'";
			result.appendChild(error_mes);
			logic_formula.classList.add("bad-input");
			logic_formula.focus();
		} else {
			/*var success_mes = document.createElement("p");
			success_mes.classList = "result-refreshing-item";
			success_mes.innerHTML = "calculating";
			result.appendChild(success_mes);*/

			frml_ = stripWhite(logic_formula.value)
			for_history_header = frml_;
			priority = setPriorityByBrackets(frml_);
			console.log(priority);


			table_ = calculateFormulaForTable(frml_, priority);
			/*console.log(table_);*/
			result.appendChild(drawTableInDiv(table_));

			blocks = getBlocksInfo(frml_, priority);
			console.log(blocks);
			result.appendChild(drawBlocksInDiv(blocks));

			function recurs_cycl() {
				setTimeout(function() {
					scheme_ = document.querySelector(".result").querySelector(".result-scheme");
					if (scheme_.classList.contains("slider__item--active")) {
						correctBlocks();
					} else {
						console.log("wait...");
						return recurs_cycl();
					}
				}, 2000);
			}
			recurs_cycl();

			history_item = table_;
			history_item.unshift(for_history_header);
			/*console.log(table_);*/
			logic_history = JSON.parse(localStorage.getItem("logic_history"));
			if (logic_history && logic_history.length > 0) {
				logic_history.push(history_item);
			} else {
				logic_history = [];
				logic_history.push(history_item);
			}
			for (; logic_history.length > 5; ) {
				logic_history.shift();
			}
			localStorage.setItem("logic_history", JSON.stringify(logic_history));
			console.log(localStorage);

			refreshHistory();
		}
		document.querySelector(".table.pagination__item").click();
	}
	function tryToParseFormula(formula) {
		check = true;
		/*f-|↓&+⊕→↔()*/
		formula = formula.toUpperCase();
		is_turn_f_number = true;
		for (var i = 0; i < formula.length; i++) {
			curr_char_code = formula[i].charCodeAt(0);
			/*console.log(formula[i], curr_char_code);*/
			if (curr_char_code == 32) {
			} else if (curr_char_code == 40 || curr_char_code == 41 || curr_char_code == 45) {
			} else if (is_turn_f_number) {
				if (curr_char_code == 70 || curr_char_code < 65 || curr_char_code > 90) {
					check = false;
					break;
				} else {
					is_turn_f_number = false;
				}
			} else {
				if (curr_char_code != 38 &&  curr_char_code != 43 && curr_char_code != 124 && curr_char_code != 8594 && curr_char_code != 8595 && curr_char_code != 8596 && curr_char_code != 8853) {
					check = false;
					break;
				} else {
					is_turn_f_number = true;
				}
			}
		}
		return check;
	}
	function stripWhite(formula) {
		formula = formula.toUpperCase();
		new_formula = "";
		for (var i = 0; i < formula.length; i++) {
			curr_char_code = formula[i].charCodeAt(0);
			if (curr_char_code == 32) {
			} else {
				new_formula += formula[i];
			}
		}
		return new_formula;
	}
/*(((-(B&A))+A)+(C⊕D) ) ⊕ (A⊕D)*/
	function setPriorityByBrackets(formula) {
		/*sequence_f_acts = [];
		sequence_f_acts.push("");*/
		idxs_of_operands_in_order = [];
		index_of_act = 0;
		for (var i = 0; i < formula.length; i++) {
			if (formula[i] == "(") {
				index_of_act++;
				/*sequence_f_acts.splice(index_of_act, 0, "");*/
				idxs_of_operands_in_order.splice(index_of_act, 0, "");
			} else if (formula[i] == ")") {
				index_of_act--;
			} else {
				/*sequence_f_acts[index_of_act] = sequence_f_acts[index_of_act] + formula[i];*/
				if (formula[i].charCodeAt(0) < 65 || formula[i].charCodeAt(0) > 90) {
					idxs_of_operands_in_order[index_of_act] = i;
				}
			}
		}
		/*console.log(idxs_of_operands_in_order);*/
		return idxs_of_operands_in_order;
	}


/*м.б. расставить просто скобки в самом начале ДА*/
/* МЫ ПОКА ЧТО НЕ УМЕЕМ РААСТАВЛЯТЬ ПРИОРИТЕТЫ ОПЕРАЦИЙ! ПОЖАЛУЙСТА, ПОСТАВЬТЕ ВСЕ НЕОБХОДИМЫЕ СКОБКИ САМОСТОЯТЕЛЬНО */

	/*function setPriorityByInversion(formula) {}*/

	/*function setPriorityByOperator(formula) {}*/
	/*
	function setPriorityByShaeffer(formula) {}
	function setPriorityByPirs(formula) {}
	function setPriorityByConjunction(formula) {}
	function setPriorityByDisjunction(formula) {}
	function setPriorityBySumByAbsTwo(formula) {}
	function setPriorityByImplication(formula) {}
	function setPriorityByEqual(formula) {}*/

	function calculateFormulaForTable(formula, priority) {
		set_ = getSetOfVars(formula);
		len_f_set = set_[1].length;
		ans____ = [];
		line____ = [];
		for (var i = 0; i < set_[0].length; i++) {
			line____.push(set_[0][i]);
		}
		line____.push("F");
		ans____.push(line____);
		for (; set_[1].length <= len_f_set; set_[1] = fillWithNull(String(addTwoNumbersBinary(set_[1], 1)), len_f_set)) {
			/*console.log(formula, set_, ans____);*/
			line____ = [];
			for (var i = 0; i < set_[1].length; i++) {
				line____.push(set_[1][i]);
			}
			line____.push(calculateNextLine(formula, priority, set_));
			ans____.push(line____);
		}
		return ans____;
	}

	function fillWithNull(str, leng) {
		while (str.length < leng) {
			str = "0" + str;
		}
		return str;
	}

	function addTwoNumbersBinary(number1, number2) {
		number1_in_10 = get_value_from_system_to_decimal(number1, 2);
		number2_in_10 = get_value_from_system_to_decimal(number2, 2);
		ans_in_10 = number1_in_10 + number2_in_10;
		return get_value_from_decimal_to_system(ans_in_10, 2);
	}

	function get_value_from_system_to_decimal(value, system_from) {
		value_mas = String(value).split(".");
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
	    /*console.log("get_value_from_system_to_decimal", value, system_from, ans);*/
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
		/*console.log("get_value_from_decimal_to_system", value, system_to, ans);*/
	    return ans;
	}

	function getSetOfVars(formula) {
		set_of_variables = [];
		set_of_variables[0] = []; /*names*/
		set_of_variables[1] = ""; /*values*/ /*прибавлять двоично*/
		for (var i = 0; i < formula.length; i++) {
			curr_char_code = formula[i].charCodeAt(0);
			/*console.log(formula_string[i], curr_char_code);*/
			if (curr_char_code >= 65 && curr_char_code <= 90) {
				if (set_of_variables[0].includes(formula[i])) {
				} else {
					/*console.log("+++", formula_string[i]);*/
					set_of_variables[0].push(formula[i]);
					set_of_variables[1] += "0";
				}
			}
		}

		/*console.log("new_set_of_variables", set_of_variables);*/
		for (var i = 0; i < set_of_variables[0].length; i++) {
			for (var j = 0; j < set_of_variables[0].length - 1; j++) {
				if (set_of_variables[0][j].charCodeAt(0) > set_of_variables[0][j + 1].charCodeAt(0)) {
					temp = set_of_variables[0][j];
					set_of_variables[0][j] = set_of_variables[0][j + 1];
					set_of_variables[0][j + 1] = temp;
				}
			}
		}
		str0 = "";
		for (var i = 0; i < set_of_variables[0].length; i++) {
			str0 += set_of_variables[0][i];
		}
		set_of_variables[0] = str0;
		/*console.log("new_set_of_variables", set_of_variables);*/
		return set_of_variables;
	}

	function calculateNextLine(formula_, priority_, set_of_variables) {
		activated_frml = [];
		for (var i = 0; i < formula_.length; i++) {
			activated_frml.push(formula_[i]);
		}
		for (var i = priority_.length - 1; i >= 0; i--) {
			operand = activated_frml[priority_[i]].charCodeAt(0);
			vars = [];
			if (operand != 45) {/*не инверсия*/
				vars.push(activated_frml[priority_[i] - 1]);
			}
			vars.push(activated_frml[priority_[i] + 1]);
			/*console.log(vars);*/
			for (var j = 0; j < vars.length; j++) {
				if (vars[j] != "0" && vars[j] != "1") {
					vars[j] = set_of_variables[1][set_of_variables[0].indexOf(vars[j])];
				}
				if (vars[j] == "0") {
					vars[j] = false;
				} else if (vars[j] == "1") {
					vars[j] = true;
				}
			}
			solution = 0;
			switch (operand) {
				case 38:
					if (vars[0] && vars[1]) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				case 43:
					if (vars[0] || vars[1]) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				case 45:
					if (vars[0]) {
						solution = "0";
					} else {
						solution = "1";
					}
					break;
				case 124:
					if (!(vars[0] && vars[1])) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				case 8594:
					if (vars[0] && !vars[1]) {
						solution = "0";
					} else {
						solution = "1";
					}
					break;
				case 8595:
					if (!(vars[0] || vars[1])) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				case 8596:
					if (vars[0] == vars[1]) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				case 8853:
					if (vars[0] != vars[1]) {
						solution = "1";
					} else {
						solution = "0";
					}
					break;
				default:
					alert("error");
					return;
			}
			start_of_cut = priority_[i];
			finish_of_cut = priority_[i] + 1;
			if (operand != 45) {/*не инверсия*/
				start_of_cut--;
			}
			for (var j = start_of_cut - 1; j >= 0; j--) {
				if ((activated_frml[j] == "0") || (activated_frml[j] == "1")) {
					start_of_cut--;
				} else if (activated_frml[j] == "(") {
					start_of_cut--;
					break;
				} else {
					break;
				}
			}
			for (var j = finish_of_cut + 1; j < activated_frml.length; j++) {
				if ((activated_frml[j] == "0") || (activated_frml[j] == "1")) {
					finish_of_cut++;
				} else if (activated_frml[j] == ")") {
					finish_of_cut++;
					break;
				} else {
					break;
				}
			}
			for (var j = start_of_cut; j <= finish_of_cut; j++) {
				activated_frml[j] = solution;
			}
			/*console.log(activated_frml, priority_, set_of_variables, vars, operand, solution);*/
		}
		/*console.log(set_of_variables, "sooooolllllll", solution);*/

		return solution;
	}

	function drawTableInDiv(table__) {
		var table_div  = document.createElement("div");
		table_div.classList = "result-table slider__item slider__item--active result-refreshing-item";
		var first_line = document.createElement("div");
		first_line.classList = "result-line result-header";
		html_f_first_line = "";
		for (var i = 0; i < table__[0].length; i++) {
			html_f_first_line = html_f_first_line + "<div class='result-item'>" + table__[0][i] + "</div>";
		}
		first_line.innerHTML = html_f_first_line;
		table_div.appendChild(first_line);
		for (var i = 1; i < table__.length; i++) {
			var new_line = document.createElement("div");
			new_line.classList = "result-line";
			html_f_new_line = "";
			for (var j = 0; j < table__[i].length; j++) {
				html_f_new_line = html_f_new_line + "<div class='result-item'>" + table__[i][j] + "</div>";
			}
			new_line.innerHTML = html_f_new_line;
			table_div.appendChild(new_line);
		}
		return table_div;
	}

	function getBlocksInfo(formula_, priority_) {
		blocks_info = [];
		new_block_id = 0;
		new_line_id = 0;

		names_of_vars = getSetOfVars(formula_)[0];
		for (var i = 0; i < names_of_vars.length; i++) {
			next_block = {};
			next_block.value = names_of_vars[i];
			next_block.line = 0;
			next_block.id = new_block_id;
			next_block.operation = 0;
			new_block_id++;
			blocks_info.push(next_block);
		}
		new_line_id += 2;

		activated_frml = [];
		for (var i = 0; i < formula_.length; i++) {
			activated_frml.push(formula_[i]);
		}
		mas_for_formulas = activated_frml.slice(0);
		mas_for_ids = activated_frml.slice(0);

		for (var i = priority_.length - 1; i >= 0; i--) {

			next_block = {};
			next_block.value = "";
			next_block.formula = "";

			next_block.operation = activated_frml[priority_[i]].charCodeAt(0);;
			next_block.variables_ids = [];
			next_block.id = new_block_id;
			new_block_id++;
			next_block.line = new_line_id;
			new_line_id++;

			// operand = activated_frml[priority_[i]].charCodeAt(0);
			vars = [];
			if (next_block.operation != 45) {/*не инверсия*/
				vars.push("");
				for (var j = priority_[i] - 1; j >= 0; j--) {
					if ((activated_frml[j].charCodeAt(0) > 47 && activated_frml[j].charCodeAt(0) < 58) || (activated_frml[j].charCodeAt(0) >= 65 && activated_frml[j].charCodeAt(0) <= 90)) {
						vars[0] = activated_frml[j] + vars[0];
					} else if (activated_frml[j] == "_") {
					} else {
						break;
					}
				}
				vars.push("");
				for (var j = priority_[i] + 1; j < activated_frml.length; j++) {
					if ((activated_frml[j].charCodeAt(0) > 47 && activated_frml[j].charCodeAt(0) < 58) || (activated_frml[j].charCodeAt(0) >= 65 && activated_frml[j].charCodeAt(0) <= 90)) {
						vars[1] = vars[1] + activated_frml[j];
					} else if (activated_frml[j] == "_") {
					} else {
						break;
					}
				}
			} else {
				vars.push("");
				for (var j = priority_[i] + 1; j < activated_frml.length; j++) {
					if ((activated_frml[j].charCodeAt(0) > 47 && activated_frml[j].charCodeAt(0) < 58) || (activated_frml[j].charCodeAt(0) >= 65 && activated_frml[j].charCodeAt(0) <= 90)) {
						vars[0] = vars[0] + activated_frml[j];
					} else if (activated_frml[j] == "_") {
					} else {
						break;
					}
				}
			}

			/*console.log("VAAAARS", vars, next_block.operation);*/

			for (var j = 0; j < vars.length; j++) {
				if (vars[j].charCodeAt(0) >= 65 && vars[j].charCodeAt(0) <= 90) {
					for (var k = 0; k < blocks_info.length; k++) {
						if (blocks_info[k].value == vars[j]) {
							next_block.variables_ids.push(blocks_info[k].id);
						}
					}
				} else {
					next_block.variables_ids.push(vars[j]);
				}
			}

			for (var j = 0; j < vars.length; j++) {
				if (vars[j].charCodeAt(0) >= 65 && vars[j].charCodeAt(0) <= 90) {
				} else {
					for (var k = 0; k < blocks_info.length; k++) {
						if (String(blocks_info[k].id) == vars[j]) {
							vars[j] = "(" + blocks_info[k].formula + ")";
						}
					}
				}
			}

			/*console.log(vars);*/

			if (next_block.operation != 45) {
				next_block.formula = vars[0] + activated_frml[priority_[i]] + vars[1];
			} else {
				next_block.formula = activated_frml[priority_[i]] + vars[0];
			}
			/*next_block.value = next_block.formula;*/


			middle_cut = priority_[i];
			start_of_cut = priority_[i];
			finish_of_cut = priority_[i] + 1;
			if (next_block.operation != 45) {/*не инверсия*/
				start_of_cut--;
			}
			for (var j = start_of_cut - 1; j >= 0; j--) {
				if ((activated_frml[j].charCodeAt(0) > 47 && activated_frml[j].charCodeAt(0) < 58) || (activated_frml[j] == "_")) {
					start_of_cut--;
				} else if (activated_frml[j] == "(") {
					start_of_cut--;
					break;
				} else {
					break;
				}
			}
			for (var j = finish_of_cut + 1; j < activated_frml.length; j++) {
				if ((activated_frml[j].charCodeAt(0) > 47 && activated_frml[j].charCodeAt(0) < 58) || (activated_frml[j] == "_")) {
					finish_of_cut++;
				} else if (activated_frml[j] == ")") {
					finish_of_cut++;
					break;
				} else {
					break;
				}
			}
			for (var j = start_of_cut; j <= finish_of_cut; j++) {
				activated_frml[j] = "_";
			}
			/*console.log(String(next_block.id)[0], String(next_block.id).length, middle_cut, activated_frml[middle_cut + 0]);*/
			for (var j = 0; j < String(next_block.id).length; j++) {
				activated_frml[middle_cut + j] = String(next_block.id)[j];
			}

			blocks_info.push(next_block);

			/*console.log(activated_frml, next_block.formula, next_block.variables_ids, next_block.operation, next_block.id, next_block.line);*/
		}
		last_block = {}
		last_block.value = "F";
		last_block.operation = 0;
		last_block.line = new_line_id;
		last_block.id = new_block_id;
		last_block.variables_ids = new_block_id - 1;
		blocks_info.push(last_block);

		return blocks_info;
	}

	function drawBlocksInDiv(blocks) {
		var result_scheme = document.createElement("div");
		result_scheme.classList = "result-scheme slider__item result-refreshing-item";
		overflow_wrapper = document.createElement("div");
		overflow_wrapper.classList = "result-scheme-for-overflow-wrapper";
		new_line = document.createElement("div");
		new_line.classList = "result-scheme-result-line result-header";
		number_of_line = 0;
		for (var i = 0; i < blocks.length; i++) {
			if (blocks[i].line > number_of_line) {
				number_of_line++;
				overflow_wrapper.appendChild(new_line);
				new_line = document.createElement("div");
				new_line.classList = "result-scheme-result-line";
			}
			new_block = document.createElement("div");
			new_block.classList = "result-scheme-result-item";
			new_block.innerHTML = blocks[i].value;
			new_block.setAttribute("id", blocks[i].id);
			new_block.setAttribute("line", blocks[i].line);
			new_block.setAttribute("formula", blocks[i].formula);
			new_block.setAttribute("title", blocks[i].formula);
			new_block.setAttribute("operation", blocks[i].operation);
			new_block.setAttribute("variables_ids", blocks[i].variables_ids);
			new_span_for_pseudo = document.createElement("span");
			new_span_for_pseudo.classList = "q0";
			new_block.appendChild(new_span_for_pseudo);
			new_span_for_pseudow = document.createElement("span");
			new_span_for_pseudow.classList = "q1";
			new_block.appendChild(new_span_for_pseudow);
			new_span_for_pseudoz = document.createElement("span");
			new_span_for_pseudoz.classList = "z";
			new_block.appendChild(new_span_for_pseudoz);
			new_b_for_pseudo = document.createElement("b");
			new_block.appendChild(new_b_for_pseudo);
			new_line.appendChild(new_block);
		}
		new_line.classList = "result-scheme-result-line result-header";
		overflow_wrapper.appendChild(new_line);
		result_scheme.appendChild(overflow_wrapper);
		return result_scheme;
	}

	function correctBlocks() {
		scheme = document.querySelector(".result").querySelector(".result-scheme");
		first_line_items = scheme.querySelector(".result-scheme-result-line.result-header").querySelectorAll(".result-scheme-result-item");
		count_f_first_itms = first_line_items.length;
		/*console.log(scheme.offsetHeight);*/
		height_f_scheme = scheme.offsetHeight;
		// dist = height_f_scheme / count_f_first_itms / 2;
		for (var i = 0; i < first_line_items.length; i++) {
			dist = first_line_items[i].offsetTop - 262;
			first_line_items[i].setAttribute("distance", dist);
			// dist += height_f_scheme / count_f_first_itms;
			first_line_items[i].innerHTML = "<input type='text' placeholder='" + first_line_items[i].innerHTML[0] + "'>";
			first_line_items[i].addEventListener("keydown", function function_name(event) {
				if ((event.key === " ") || (event.key === "Enter")) {
					event.preventDefault();
					submit_blocks_event();
				} else if (event.key === "ArrowDown") {
					event.preventDefault();
					next_block_event(event.target);
				} else if (event.key === "ArrowUp") {
					event.preventDefault();
					prev_block_event(event.target);
				}
			});
		}
		items = scheme.querySelectorAll(".result-scheme-result-item");
		for (var i = 0; i < items.length; i++) {
			if (items[i].getAttribute("id") > count_f_first_itms - 1) {
				distance_vars = [];
				distance = 0;
				ids = items[i].getAttribute("variables_ids").split(",");
				for (var j = 0; j < ids.length; j++) {
					for (var k = 0; k < items.length; k++) {
						if (items[k].getAttribute("id") == String(ids[j])) {
							/*console.log(items[k]);*/
							distance_vars.push(Number(items[k].getAttribute("distance")));
						}
					}

				}
				for (var j = 0; j < distance_vars.length; j++) {
					distance += distance_vars[j];
				}
				distance /= distance_vars.length;
				/*console.log(distance_vars, distance);*/
				if (distance_vars.length > 1) {
					selector = ".result-scheme-result-item" + "[id='" + items[i].getAttribute("id") + "'] span.q" + 0;
					pseudo = scheme.querySelector(selector);
					pseudo.style.width = "5px";
					diffrnce = Math.abs(distance_vars[0] - distance);
					pseudo.style.height = (diffrnce - 30) + "px";
					pseudo.style.top = "-" + (diffrnce - 45) + "px";

					selector = ".result-scheme-result-item" + "[id='" + items[i].getAttribute("id") + "'] span.q" + 1;
					pseudo = scheme.querySelector(selector);
					pseudo.style.width = "5px";
					diffrnce = Math.abs(distance_vars[1] - distance);
					pseudo.style.height = (diffrnce - 20) + "px";
					pseudo.style.top = 60 + "px";
					// for (var j = 0; j < distance_vars.length; j++) {
					//
					// 	/*console.log(selector);*/
					// 	pseudo.style.top = diffrnce * 2 * ((-1) ** j) / (2 ** j) + 10 + "px";
					// }
				}
				/*console.log(distance);*/
				items[i].style.marginTop = String(distance) + "px";
				items[i].setAttribute("distance", distance);
			}
			distance_vars = [];
		}
	}

	function submit_blocks_event(argument) {
		set_of_vars = [];
		first_line_items = document.querySelector(".result-scheme").querySelector(".result-scheme-result-line.result-header").querySelectorAll(".result-scheme-result-item");
		for (var i = 0; i < first_line_items.length; i++) {
			set_of_vars.push(first_line_items[i].querySelector("input").value);
		}
		/*console.log(set_of_vars);*/
		for (var i = 0; i < set_of_vars.length; i++) {
			if (String(set_of_vars[i]) == "0") {
				set_of_vars[i] = "0";
			} else if (String(set_of_vars[i]) == "1") {
				set_of_vars[i] = "1";
			} else {
				first_line_items[i].innerHTML = "<input type='text' value='0'>";
				set_of_vars[i] = "0";
			}
		}
		/*console.log(set_of_vars);*/
		newstrr = "";
		for (var i = 0; i < set_of_vars.length; i++) {
			newstrr += set_of_vars[i];
		}
		set_of_vars = newstrr;
		logic_formula = document.querySelector(".logic-formula");

		frml_ = stripWhite(logic_formula.value)
		priority = setPriorityByBrackets(frml_);
		got_set = getSetOfVars(frml_);
		got_set[1] = set_of_vars;
		sol = calculateNextLine(frml_, priority, got_set);
		items = document.querySelector(".result-scheme").querySelectorAll(".result-scheme-result-item");
		items[items.length - 1].innerHTML = sol;
	}

	function next_block_event(trgt) {
		first_line_items = document.querySelector(".result-scheme").querySelector(".result-scheme-result-line.result-header").querySelectorAll(".result-scheme-result-item");
		/*console.log("-------", trgt);*/
		for (var i = 0; i < first_line_items.length; i++) {
			/*console.log(first_line_items[i]);*/
			if (first_line_items[i].querySelector("input") === trgt || first_line_items[i] === trgt) {
				if (i + 1 < first_line_items.length) {
					first_line_items[i + 1].querySelector("input").focus();
				} else {
					first_line_items[0].querySelector("input").focus();
				}
				break;
			}
		}
	}

	function prev_block_event(trgt) {
		first_line_items = document.querySelector(".result-scheme").querySelector(".result-scheme-result-line.result-header").querySelectorAll(".result-scheme-result-item");
		/*console.log("-------", trgt);*/
		for (var i = 0; i < first_line_items.length; i++) {
			/*console.log(first_line_items[i]);*/
			if (first_line_items[i].querySelector("input") === trgt || first_line_items[i] === trgt) {
				if (i - 1 >= 0) {
					first_line_items[i - 1].querySelector("input").focus();
				} else {
					first_line_items[first_line_items.length - 1].querySelector("input").focus();
				}
				break;
			}
		}
	}

	/*history*/
	function refreshHistory() {
		history_content = JSON.parse(localStorage.getItem("logic_history"));
		if (history_content && history_content.length > 0) {
			history_block = document.querySelector(".logic-history");
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
				next_item_header = document.createElement("h3");
				next_item_header.innerHTML = history_content[i][0];
				next_item_back = document.createElement("div");
				next_item_back.classList = "history-item-back";
				next_item_overflow_wrapper = document.createElement("div");
				next_item_overflow_wrapper.classList = "for-overflow-wrapper";
				next_item_table = document.createElement("table");
				next_item_thead = document.createElement("thead");
				first_line = document.createElement("tr");
				html_f_first_line = "";
				for (var k = 0; k < history_content[i][1].length; k++) {
					html_f_first_line = html_f_first_line + "<th>" + history_content[i][1][k] + "</th>";
				}
				first_line.innerHTML = html_f_first_line;
				next_item_thead.appendChild(first_line);
				next_item_table.appendChild(next_item_thead);
				next_item_tbody = document.createElement("tbody");
				for (var j = 2; j < history_content[i].length; j++) {
					next_item_tr = document.createElement("tr");
					html_f_next_line = "";
					for (var k = 0; k < history_content[i][j].length; k++) {
						html_f_next_line = html_f_next_line + "<td>" + history_content[i][j][k] + "</td>";
					}
					next_item_tr.innerHTML = html_f_next_line;
					next_item_tbody.appendChild(next_item_tr);
				}
				next_item_table.appendChild(next_item_tbody);
				next_item_overflow_wrapper.appendChild(next_item_table);
				next_item_back.appendChild(next_item_overflow_wrapper);
				next_item.appendChild(next_item_back);
				next_item.appendChild(next_item_header);
				history_slider.appendChild(next_item);
				next_pagination_item = document.createElement("button");
				next_pagination_item.classList = "pagination__item history-refreshing-pagination-item";
				next_pagination_item.setAttribute("type", "button");
				next_pagination_item.innerHTML = "<span class='visually-hidden'>*</span>";
				history_pagination.appendChild(next_pagination_item);
			}
		}
	}
	/*/history*/

	function hangMiniButtonsEvents() {
		operands_butts = input.querySelector(".operands");
		operands_butts.querySelector(".button-45").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "-";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-124").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "|";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-8595").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "↓";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-38").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "&";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-43").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "+";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-8853").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "⊕";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-8594").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "→";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-8596").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "↔";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-40").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + "(";
			logic_formula.focus();
		});
        operands_butts.querySelector(".button-41").addEventListener("click", function function_name(event) {
			event.preventDefault();
			logic_formula.value = logic_formula.value + ")";
			logic_formula.focus();
		});
	}
	/* ---------------- /logic ------------------ */
} catch (error) { console.log(error) }