var emojiMap = {};
var emojiKeys = [];
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
   if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
         var result = JSON.parse(xhr.responseText);
         for (var i=0; i<result.length; i++) {
            var code;
            if (result[i].unified.length == 11) {
               var surrogateA = result[i].unified.slice(0,5);
               var surrogateB = result[i].unified.slice(6,11);
               code = String.fromCodePoint(parseInt(surrogateA,16)) + String.fromCodePoint(parseInt(surrogateB,16));
            } else {
               code = String.fromCodePoint(parseInt(result[i].unified,16));  
            }
            emojiMap[result[i].short_name] = code;
         }
         emojiKeys = Object.keys(emojiMap);
      } else {
         console.log("Emoji parser failed to parse emoji data from source");
      }
   }
 };
 xhr.open("GET", "https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json", true);
 xhr.send();

document.addEventListener("input", watchAll, true);

var regex = /(^|\s+):([a-z|_|\d|\-|\+]+):?$/;

function watchAll(e) {
	// content-editable div
	var fullInput = window.getSelection().focusNode.data;
	var cursor = window.getSelection().focusOffset;
	if (e.target.value) { // normal input box
		fullInput = e.target.value;
		cursor = e.target.selectionStart;
	}
	if (!fullInput) return; 
	inputBeforeCursor = fullInput.slice(0, cursor);

	var tooltip = document.getElementById("emojiParserTooltip");
	if (!tooltip) { // create tooltip if haven't yet
		tooltip = document.createElement('div');
		tooltip.id = "emojiParserTooltip";
		tooltip.style.cssText = "position: fixed;bottom: 0px;right: 0px;z-index: 1000;white-space: pre;background-color: rgba(255, 255, 255, 0.9);font-family: 'Gill Sans MT', Arial;font-size: 16px;color: #303030;padding: 10px;border: solid 1px #aaa;max-height:350px;overflow:scroll;";
		document.body.appendChild(tooltip);
	}

	tooltip.textContent = "";
	tooltip.style.display = "none";

	if (regex.test(inputBeforeCursor)) {
		var emoji = regex.exec(inputBeforeCursor)[2];

		var suggestions = emojiKeys.filter(function(value){
			return value.indexOf(emoji) == 0;
		});
		
		for (var i=0; i<Math.min(suggestions.length, 10);i++) {
			tooltip.textContent += emojiMap[suggestions[i]]+"   "+suggestions[i];
			if (i<suggestions.length-1) {
				tooltip.textContent += "\r\n\r\n";
			}
		}
		if (suggestions.length>0) {
			tooltip.style.display = "block";
		}
		
		var lastCharacter = inputBeforeCursor.slice(inputBeforeCursor.length-1);
		if (lastCharacter == ":") {
			var unicode = emojiMap[emoji];
			if (unicode) {
				var toTruncate = inputBeforeCursor.length - (emoji.length+2);
				var newInput = inputBeforeCursor.slice(0, toTruncate) + unicode + fullInput.slice(cursor);
				if (e.target.value) { // normal input box
					e.target.value = newInput;
					e.target.selectionStart = cursor-emoji.length;
					e.target.selectionEnd = cursor-emoji.length;
				} else { // content-editable div
					var selection = window.getSelection();
					var focus = selection.focusNode;
					focus.data = newInput;
					var range = document.createRange();
				  range.setStart(focus, cursor-emoji.length-1);
				  range.setEnd(focus, cursor-emoji.length-1);
				  selection.removeAllRanges();
				  selection.addRange(range);
				}
				tooltip.textContent = "";
				tooltip.style.display = "none";
			}
		}
	}
}