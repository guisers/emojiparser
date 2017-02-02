// GLOBAL VARS
var emojiMap;
var emojiKeys;

function init() {
   document.addEventListener("input", watchAll, true);

   chrome.storage.local.get(null, function(data) {
      if ('emojiMap' in data && 'emojiKeys' in data) {
         emojiMap = data.emojiMap;
         emojiKeys = data.emojiKeys;
      }
      else {
         loadEmoji();
      }
   });

}

function loadEmoji() {
   emojiMap = {};
   emojiKeys = [];

   var xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
         if (xhr.status === 200) {
            var result = JSON.parse(xhr.responseText);
            for (var i=0; i<result.length; i++) {
               emojiMap[result[i].short_name] = _getUnicodeFromString(result[i].unified);
            }
            emojiKeys = Object.keys(emojiMap);
            chrome.storage.local.set({'emojiMap' : emojiMap, 'emojiKeys' : emojiKeys});
         } else {
            console.log('EmojiParser: Failed to retrieve emoji data from source');
         }
      }
   };
   xhr.open("GET", "https://raw.githubusercontent.com/iamcal/emoji-data/master/emoji.json", true);
   xhr.send();
}

function _getUnicodeFromString(str) {
   if (str.length == 11) { // Handle flags and other unicode pairs
      var surrogateA = str.slice(0,5);
      var surrogateB = str.slice(6,11);
      code = String.fromCodePoint(parseInt(surrogateA,16)) + String.fromCodePoint(parseInt(surrogateB,16));
   } else {
      code = String.fromCodePoint(parseInt(str,16));  
   }
   return code;
}


function _handleSkinVariations(emoji) {
   var i=1;
   for (var variation in emoji.skin_variations) {
      if (!emoji.skin_variations.hasOwnProperty(variation)) {
         //The current property is not a direct property of p
         continue;
      }
      emojiMap[`${emoji.short_name}-${i}`] = _getUnicodeFromString(variation);
      i++;
   }
}

function _getOrCreateTooltip(title) {
   var tooltip = document.getElementById(title);
   if (!tooltip) { 
      tooltip = document.createElement('div');
      tooltip.id = title;
      tooltip.style.cssText = "position: fixed;bottom: 0px;right: 0px;z-index: 1000;white-space: pre;background-color: rgba(255, 255, 255, 0.9);font-family: 'Gill Sans MT', Arial;font-size: 16px;color: #303030;padding: 10px;border: solid 1px #aaa;max-height:350px;overflow:scroll;";
      document.body.appendChild(tooltip);
   }
   return tooltip;
}

function _hideAndClearTooltip(tooltip) {
   tooltip.textContent = "";
   tooltip.style.display = "none";
}

function _buildSuggestions(tooltip, input) {
   var suggestions = emojiKeys.filter(function(value){
      return value.indexOf(input) == 0;
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
}

function _resetCursor(event, new_input, pos) {
   if (event.target.value) { // normal input box
      event.target.value = new_input;
      event.target.selectionStart = pos;
      event.target.selectionEnd = pos;
   } else { // content-editable div
      var selection = window.getSelection();
      var focus = selection.focusNode;
      focus.data = new_input;
      var range = document.createRange();
      range.setStart(focus, pos-1);
      range.setEnd(focus, pos-1);
      selection.removeAllRanges();
      selection.addRange(range);
   }
}

function _getLastCharacter(str) {
   return str.slice(str.length-1);
}

function _getInputString(event) {
   if (event.target.value) { // normal input box
      return event.target.value;
   } else return window.getSelection().focusNode.data; // content-editable div
}

function _getCursorPos(event) {
   if (event.target.value) { // normal input box
      if (event.target.type === "text") {
         return event.target.selectionStart;
      } else {
         return -1;
      }
   } else return window.getSelection().focusOffset; // content-editable div
}

function watchAll(e) {
	var fullInput = _getInputString(e);
	var cursor = _getCursorPos(e);
	if (!fullInput || cursor < 0) return;
	var inputBeforeCursor = fullInput.slice(0, cursor);

	var tooltip = _getOrCreateTooltip("emojiParserTooltip"); 
   _hideAndClearTooltip(tooltip);
	
   var regex = /(^|\s+):([a-z|_|\d|\-|\+]+):?$/;

	if (regex.test(inputBeforeCursor)) {
		var emoji = regex.exec(inputBeforeCursor)[2];

		_buildSuggestions(tooltip, emoji);
		
		if (_getLastCharacter(inputBeforeCursor) == ":") {
			var unicode = emojiMap[emoji];
			if (unicode) {
				var toTruncate = inputBeforeCursor.length - (emoji.length+2);
				var newInput = inputBeforeCursor.slice(0, toTruncate) + unicode + fullInput.slice(cursor);
            _resetCursor(e, newInput, cursor-emoji.length);
				_hideAndClearTooltip(tooltip);
			}
		}
	}
}

init();
