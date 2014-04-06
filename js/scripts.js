var process = document.getElementById('process');

process.onclick = function() {
	if (document.getElementById('toggle').checked) {
		// DOM Parsing in Javascript
		var xmlHttp = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
		if (xmlHttp.readyState == 0 || xmlHttp.readyState == 4) {
			xmlHttp.open("GET", 'xml/note.xml', true);
			xmlHttp.onreadystatechange = (function() {
				if (xmlHttp.readyState == 4) {
					if (xmlHttp.status == 200) {
						var xmlDoc = xmlHttp.responseXML;
						for (var i = 0; i < xmlDoc.getElementsByTagName("blurt").length; i++) {
							blurt = xmlDoc.getElementsByTagName("blurt")[i];
							blurter = blurt.getElementsByTagName("blurter")[0].childNodes[0].nodeValue;
							blurtAlert = blurt.getElementsByTagName("blurtAlert")[0].childNodes[0].nodeValue;
							blurtTime = blurt.getElementsByTagName("blurtTime")[0].childNodes[0].nodeValue;

							var theadBelow = document.getElementById('toAppend');
							var toAppend = '<tr><td>'+blurter+'</td><td>'+blurtAlert+'</td><td>'+blurtTime+'</td></tr>';
							theadBelow.innerHTML = toAppend + theadBelow.innerHTML;
							document.getElementById('blurtAlert').value = '';
						}
					} else {
						alert('Something went wrong!');
					}
				}
			});
			xmlHttp.send(null);
		} else {
			alert('Something went wrong!');
		}
	} else {
		// String Parsing in Javascript
		var xhrResponseString;
		var blurt = '<blurt><blurter>' + document.getElementById('blurter').value + '</blurter>'
					+ '<blurtAlert>' + document.getElementById('blurtAlert').value + '</blurtAlert>'
					+ '<blurtTime>' + new Date() + '</blurtTime></blurt>';
		if (window.DOMParser) {
			parser = new DOMParser();
			xhrResponseString = parser.parseFromString(blurt, "text/xml");
		} else { // Internet Explorer
			xhrResponseString = new ActiveXObject("Microsoft.XMLDOM");
			xhrResponseString.loadXML(blurt);
		}
		blurter = xhrResponseString.getElementsByTagName('blurter')[0].childNodes[0].nodeValue;
		blurtAlert = xhrResponseString.getElementsByTagName('blurtAlert')[0].childNodes[0].nodeValue;
		blurtTime = xhrResponseString.getElementsByTagName('blurtTime')[0].childNodes[0].nodeValue;
		
		var theadBelow = document.getElementById('toAppend');
		var toAppend = '<tr><td>'+blurter+'</td><td>'+blurtAlert+'</td><td>'+blurtTime+'</td></tr>';
		theadBelow.innerHTML = toAppend + theadBelow.innerHTML;
		document.getElementById('blurtAlert').value = '';
	}
}