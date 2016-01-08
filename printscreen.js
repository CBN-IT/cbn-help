function openBugWindow(html, width, height){
	var w = window.open('', "", "height="+width+",width="+height+",location=no,menubar=no,resizable=no,status=no,titlebar=no,toolbar=no");
	w.document.open();
	w.document.write(html);
	w.document.close();
	
}


/*function makePrintScreenVersion2(){
	console.time("test");
	var global = {};
	var tagCount = 0;
	function parseComputedStyle(parent) {
		for (var i = 0; i < parent.children.length; i++) {
			var child = parent.children[i];
			tagCount++;
			var x = getComputedStyle(child);
			for (var j = 0; j < x.length; j++) {
				var k = x[j] + ": " + x.getPropertyValue(x[j]);
				if (global[k] == undefined) {
					global[k] = [];
				}
				global[k].push(child);
			}
			parseComputedStyle(child)
		}
	}

	function computeClasses(tag) {
		parseComputedStyle(tag);
		var styles = {
			a: ""
		};
		var alphabet = "abcdefghijklmnopqrstuvwxyz";
		var alphabetCounter = 0;
		for (var i in global) {
			if (!global.hasOwnProperty(i)) {
				continue;
			}
			var g = global[i];
			if (tagCount / 2 < g.length) {
				//should be added to all elements
				styles["a"] += i + ";\n";
			} else {
				var nextStyle = alphabet[parseInt(alphabetCounter / alphabet.length)] + alphabet[(alphabetCounter % alphabet.length)];
				styles[nextStyle] = i + ";";
				alphabetCounter++;
				for (var j = 0; j < g.length; j++) {
					var t = g[j];

					if (t.applyClass == undefined) {
						t.applyClass = "a";
					}
					t.applyClass += " " + nextStyle;
				}
			}
		}
		console.log(styles);
	}
	//computeClasses(document.body);
	console.timeEnd("test");
}*/
/*function makePrintScreenJquery(){
	$('#bugReport').hide();
	 $('#bugReport').dialog("close");

	 $("input[type='text'], input[type='hidden']").each(function () {
	 $(this).attr("value", $(this).val());
	 });
	 $("textarea").each(function () {
	 $(this).html($(this).val());
	 });
	 $("input[type='checkbox'], input[type='radio']").each(function () {
	 $(this).attr("checked", $(this).is(":checked"));
	 });
	 $("select").each(function () {
	 var val = $(this).val();
	 if (!(val instanceof Array)) {
	 val = [ val ];
	 }
	 for (var i in val) {
	 $(this).find("option[value='" + val[i] + "']").attr("selected", "selected");
	 }
	 });
	 var html = $("html").html();
	 $("input[type='text'], input[type='hidden']").each(function () {
	 var val = $(this).val();
	 $(this).removeAttr("value");
	 $(this).val(val);
	 });
	 $("textarea").each(function () {
	 var val = $(this).val();
	 $(this).html("");
	 $(this).val(val);
	 });
	 $("input[type='checkbox'], input[type='radio']").each(function () {
	 });
	 html = stripScripts(html);
	 return html;
	 $(div).append($("<div>X</div>").css({
	 "font-weight": "bold",
	 "color": "red",
	 "position": "absolute",
	 "top": (mousePosition.y - 8),
	 "left": (mousePosition.x - 4),
	 "z-index": 9999999
	 }));
}*/
