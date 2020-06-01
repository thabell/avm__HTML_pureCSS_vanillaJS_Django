try {
	/* ---------------- user ------------------ */
	history_content_systems = JSON.parse(localStorage.getItem("systems_history"));
	if (history_content_systems && history_content_systems.length > 0) {
		systems_items = document.querySelectorAll(".history-wrapper-light");
		for (var i = 0; i < systems_items.length; i++) {
			systems_items[i].innerHTML = "<h2><span class='h2-bright'>Перевод</span> между системами</h2>";
		}
		for (var i = 0; i < systems_items.length; i++) {
			if (history_content_systems.length < i + 1) {
				break;
			} else {
				next_item = document.createElement("figure");
				next_item.classList = "history-item";
				next_item_back = document.createElement("div");
				next_item_back.classList = "history-item-back";
				next_item_overflow_wrapper = document.createElement("div");
				next_item_overflow_wrapper.classList = "for-overflow-wrapper";
				next_item_table = document.createElement("table");
				next_item_table.innerHTML = "<thead><tr><th>" + history_content_systems[i][0][0] + "</th><th>" + history_content_systems[i][0][1] + "</th><th>" + history_content_systems[i][0][2] + "</th></tr></thead>";
				next_item_tbody = document.createElement("tbody");
				for (var j = 1; j < history_content_systems[i].length; j++) {
					next_item_tr = document.createElement("tr");
					next_item_tr.innerHTML = "<td>" + history_content_systems[i][j][0] + "</td><td>" + history_content_systems[i][j][1] + "</td><td>" + history_content_systems[i][j][2] + "</td>";
					next_item_tbody.appendChild(next_item_tr);
				}
				next_item_table.appendChild(next_item_tbody);
				next_item_overflow_wrapper.appendChild(next_item_table);
				next_item_back.appendChild(next_item_overflow_wrapper);
				next_item.appendChild(next_item_back);
				systems_items[i].appendChild(next_item);
			}
		}
	}
	history_content_logic = JSON.parse(localStorage.getItem("logic_history"));
	if (history_content_logic && history_content_logic.length > 0) {
		logic_items = document.querySelectorAll(".history-wrapper-dark");
		for (var i = 0; i < logic_items.length; i++) {
			logic_items[i].innerHTML = "<h2><span class='h2-bright'>Вычисление</span> алгебры логики</h2>";
		}
		for (var i = 0; i < logic_items.length; i++) {
			if (history_content_logic.length < i + 1) {
				break;
			} else {
				next_item = document.createElement("figure");
				next_item.classList = "history-item";
				next_item_header = document.createElement("h3");
				next_item_header.innerHTML = history_content_logic[i][0];
				next_item_back = document.createElement("div");
				next_item_back.classList = "history-item-back";
				next_item_overflow_wrapper = document.createElement("div");
				next_item_overflow_wrapper.classList = "for-overflow-wrapper";
				next_item_table = document.createElement("table");
				next_item_thead = document.createElement("thead");
				first_line = document.createElement("tr");
				html_f_first_line = "";
				for (var k = 0; k < history_content_logic[i][1].length; k++) {
					html_f_first_line = html_f_first_line + "<th>" + history_content_logic[i][1][k] + "</th>";
				}
				first_line.innerHTML = html_f_first_line;
				next_item_thead.appendChild(first_line);
				next_item_table.appendChild(next_item_thead);
				next_item_tbody = document.createElement("tbody");
				for (var j = 2; j < history_content_logic[i].length; j++) {
					next_item_tr = document.createElement("tr");
					html_f_next_line = "";
					for (var k = 0; k < history_content_logic[i][j].length; k++) {
						html_f_next_line = html_f_next_line + "<td>" + history_content_logic[i][j][k] + "</td>";
					}
					next_item_tr.innerHTML = html_f_next_line;
					next_item_tbody.appendChild(next_item_tr);
				}
				next_item_table.appendChild(next_item_tbody);
				next_item_overflow_wrapper.appendChild(next_item_table);
				next_item_back.appendChild(next_item_overflow_wrapper);
				next_item.appendChild(next_item_back);
				next_item.appendChild(next_item_header);
				logic_items[i].appendChild(next_item);
			}
		}
	}

	document.querySelectorAll(".history-wrapper-light, .history-wrapper-dark").forEach(function callback(element, index, array) {
		item_h2 = element.querySelector("h2");
		// console.log(index + " " + item_h2);
		item_figure = element.querySelector("figure");
		// console.log(index + " " + item_figure);
		if (!item_figure) {
			item_h2.classList.add("visually-hidden");
		}
	});
	/* ---------------- /user ------------------ */
} catch (error) { console.log(error) }