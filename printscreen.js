function makePrintScreen(){
	console.time("all");

	function removeScripts(tag, tagname){
		var scripts = tag.querySelectorAll(tagname);
		var i = scripts.length;
		while (i--) {
			scripts[i].parentNode.removeChild(scripts[i]);
		}
	}
	var linksWeakMap ={};
	function cloneStyle(style, baseUri){
		var clonedStyle = style.cloneNode(true);
		var styleContent = style.innerHTML;
		styleContent = styleContent.replace(/url\s*\([\s'"]*([^)\s'"]+)[\s'"]*\)/g, function () {
			var url = arguments[1];
			if (url.indexOf("http://") !== 0 &&
				url.indexOf("https://") !== 0) {
				var newUrl = baseUri.substring(0, baseUri.lastIndexOf("/") + 1) + url;
				return arguments[0].replace(arguments[1], newUrl);
			}
		});
		clonedStyle.innerHTML = styleContent;
		return clonedStyle;
	}
	function copyStyleToHead(head, tag) {
		var scripts = tag.querySelectorAll('link[rel="import"]');

		for (var i in scripts) {
			if (!scripts.hasOwnProperty(i)) {
				continue;
			}
			var script = scripts[i].import.documentElement;
			if (!linksWeakMap[script.baseURI]) {
				linksWeakMap[script.baseURI] = true;
				var styles = script.querySelectorAll('style:not([is="custom-style"])');
				if (styles.length > 0) {
					for (var k = 0; k < styles.length; k++) {
						var style = styles[k];
						//clone style the hardcore way to map relative urls to absolute urls
						
						head.appendChild(cloneStyle(style, script.baseURI));
					}
				}
				copyStyleToHead(head, script);
			}

		}
	}
	function saveValueOfNativeTags(tag){
		var inputs = tag.querySelectorAll("input");
		for (var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			input.setAttribute("cbn-print-screen-value", input.value);
		}
	}
	function removeValueOfNativeTags(tag){
		var inputs = tag.querySelectorAll("[cbn-print-screen-value]");
		for (var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			input.removeAttribute("cbn-print-screen-value");
		}
	}
	function setValueOfNativeTags(tag){
		var inputs = tag.querySelectorAll("input[cbn-print-screen-value]");
		for (var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			input.setAttribute("value",input.getAttribute("cbn-print-screen-value"));
		}
	}

	function saveScrollOfTags(tagParam){
		var tags = tagParam.querySelectorAll("*");
		for (var i = 0; i < tags.length; i++) {
			var tag = tags[i];
			if(tag.scrollTop>0){
				tag.setAttribute("cbn-print-screen-scroll-top", tag.scrollTop);
			}
			if(tag.scrollLeft>0){
				tag.setAttribute("cbn-print-screen-scroll-left", tag.scrollLeft);
			}
		}
	}
	function removeScrollOfTags(tag){
		var elem = tag.querySelectorAll("[cbn-print-screen-scroll-top], [cbn-print-screen-scroll-left]");
		for (var i = 0; i < elem.length; i++) {
			var input = elem[i];
			input.removeAttribute("cbn-print-screen-scroll-top");
		}
	}
	function setScrollOfTags(){
		var elem = document.querySelectorAll("[cbn-print-screen-scroll-top], [cbn-print-screen-scroll-left]");
		for (var i = 0; i < elem.length; i++) {
			var input = elem[i];
			var scrollTop = input.getAttribute("cbn-print-screen-scroll-top");
			var scrollLeft = input.getAttribute("cbn-print-screen-scroll-left");
			if (scrollTop) {
				input.scrollTop = scrollTop;
			}
			if (scrollLeft) {
				input.scrollLeft = scrollLeft;
			}
		}
		removeScrollOfTags(document);
	}
	saveValueOfNativeTags(document.documentElement);
	saveScrollOfTags(document.documentElement);
	var html = new DOMParser().parseFromString(document.documentElement.outerHTML, "text/html");
	setValueOfNativeTags(html.documentElement);
	removeValueOfNativeTags(document.documentElement);
	removeValueOfNativeTags(html.documentElement);
	removeScrollOfTags(document.documentElement);
	
	var head = html.head;
	var body = html.body;
	copyStyleToHead(head,document);
	removeScripts(html.documentElement, "script");
	removeScripts(html.documentElement, "template");
	removeScripts(html.documentElement, "link");
	var w = window.open('', "", "height="+window.innerHeight+",width="+window.innerWidth+",location=no,menubar=no,resizable=no,status=no,titlebar=no,toolbar=no");
	w.document.open();
	w.document.write("<!doctype html>"+html.documentElement.outerHTML+"<script>"+setScrollOfTags+removeScrollOfTags+"window.onload=setScrollOfTags;</script>");
	w.document.close();
	console.timeEnd("all");
}


function makePrintScreenVersion2(){
	/*console.time("test");
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
	console.timeEnd("test");*/
}
function makePrintScreenJquery(){
	/*$('#bugReport').hide();
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
	 }));*/
}
