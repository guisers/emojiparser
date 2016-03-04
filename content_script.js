document.addEventListener("input", watchAll, true);

var regex = /(^|\s+):[a-z|_|\d]+:?$/;

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
		var match = inputBeforeCursor.match(regex)[0];
		var emoji = match.slice(match.indexOf(":"), match.length);

		var suggestions = emojiKeys.filter(function(value){
			return value.indexOf(emoji) >= 0;
		});
		
		for (var i=0; i<suggestions.length;i++) {
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
				var toTruncate = inputBeforeCursor.length - emoji.length;
				var newInput = inputBeforeCursor.slice(0, toTruncate) + unicode + fullInput.slice(cursor);
				if (e.target.value) { // normal input box
					e.target.value = newInput;
					e.target.selectionStart = cursor-emoji.length+2;
					e.target.selectionEnd = cursor-emoji.length+2;
				} else { // content-editable div
					var selection = window.getSelection();
					var focus = selection.focusNode;
					focus.data = newInput;
					var range = document.createRange();
				  range.setStart(focus, cursor-emoji.length+1);
				  range.setEnd(focus, cursor-emoji.length+1);
				  selection.removeAllRanges();
				  selection.addRange(range);
				}
				tooltip.textContent = "";
				tooltip.style.display = "none";
			}
		}
	}
}

/* 
	Emoji data pulled from https://github.com/EmptyStackExn/m17n-im-shortcode-unicode-emoji
*/

var emojiMap = {
   ":+1:":"\u{1F44D}",
   ":-1:":"\u{1F44E}",
   ":100:":"\u{1F4AF}",
   ":1234:":"\u{1F522}",
   ":8ball:":"\u{1F3B1}",
   ":a:":"\u{1F170}",
   ":ab:":"\u{1F18E}",
   ":abc:":"\u{1F524}",
   ":abcd:":"\u{1F521}",
   ":accept:":"\u{1F251}",
   ":aerial_tramway:":"\u{1F6A1}",
   ":airplane:":"\u{02708}",
   ":alarm_clock:":"\u{023F0}",
   ":alien:":"\u{1F47D}",
   ":ambulance:":"\u{1F691}",
   ":anchor:":"\u{02693}",
   ":angel:":"\u{1F47C}",
   ":anger:":"\u{1F4A2}",
   ":angry:":"\u{1F620}",
   ":anguished:":"\u{1F627}",
   ":ant:":"\u{1F41C}",
   ":apple:":"\u{1F34E}",
   ":aquarius:":"\u{02652}",
   ":aries:":"\u{02648}",
   ":arrow_backward:":"\u{025C0}",
   ":arrow_double_down:":"\u{023EC}",
   ":arrow_double_up:":"\u{023EB}",
   ":arrow_down:":"\u{02B07}",
   ":arrow_down_small:":"\u{1F53D}",
   ":arrow_forward:":"\u{025B6}",
   ":arrow_heading_down:":"\u{02935}",
   ":arrow_heading_up:":"\u{02934}",
   ":arrow_left:":"\u{02B05}",
   ":arrow_lower_left:":"\u{02199}",
   ":arrow_lower_right:":"\u{02198}",
   ":arrow_right:":"\u{027A1}",
   ":arrow_right_hook:":"\u{021AA}",
   ":arrow_up:":"\u{02B06}",
   ":arrow_up_down:":"\u{02195}",
   ":arrow_up_small:":"\u{1F53C}",
   ":arrow_upper_left:":"\u{02196}",
   ":arrow_upper_right:":"\u{02197}",
   ":arrows_clockwise:":"\u{1F503}",
   ":arrows_counterclockwise:":"\u{1F504}",
   ":art:":"\u{1F3A8}",
   ":articulated_lorry:":"\u{1F69B}",
   ":astonished:":"\u{1F632}",
   ":athletic_shoe:":"\u{1F45F}",
   ":atm:":"\u{1F3E7}",
   ":b:":"\u{1F171}",
   ":baby:":"\u{1F476}",
   ":baby_bottle:":"\u{1F37C}",
   ":baby_chick:":"\u{1F424}",
   ":baby_symbol:":"\u{1F6BC}",
   ":back:":"\u{1F519}",
   ":baggage_claim:":"\u{1F6C4}",
   ":balloon:":"\u{1F388}",
   ":ballot_box_with_check:":"\u{02611}",
   ":bamboo:":"\u{1F38D}",
   ":banana:":"\u{1F34C}",
   ":bangbang:":"\u{0203C}",
   ":bank:":"\u{1F3E6}",
   ":bar_chart:":"\u{1F4CA}",
   ":barber:":"\u{1F488}",
   ":baseball:":"\u{026BE}",
   ":basketball:":"\u{1F3C0}",
   ":bath:":"\u{1F6C0}",
   ":bathtub:":"\u{1F6C1}",
   ":battery:":"\u{1F50B}",
   ":bear:":"\u{1F43B}",
   ":bee:":"\u{1F41D}",
   ":beer:":"\u{1F37A}",
   ":beers:":"\u{1F37B}",
   ":beetle:":"\u{1F41E}",
   ":beginner:":"\u{1F530}",
   ":bell:":"\u{1F514}",
   ":bento:":"\u{1F371}",
   ":bicyclist:":"\u{1F6B4}",
   ":bike:":"\u{1F6B2}",
   ":bikini:":"\u{1F459}",
   ":bird:":"\u{1F426}",
   ":birthday:":"\u{1F382}",
   ":black_circle:":"\u{026AB}",
   ":black_joker:":"\u{1F0CF}",
   ":black_large_square:":"\u{02B1B}",
   ":black_medium_small_square:":"\u{025FE}",
   ":black_medium_square:":"\u{025FC}",
   ":black_nib:":"\u{02712}",
   ":black_small_square:":"\u{025AA}",
   ":black_square_button:":"\u{1F532}",
   ":blossom:":"\u{1F33C}",
   ":blowfish:":"\u{1F421}",
   ":blue_book:":"\u{1F4D8}",
   ":blue_car:":"\u{1F699}",
   ":blue_heart:":"\u{1F499}",
   ":blush:":"\u{1F60A}",
   ":boar:":"\u{1F417}",
   ":boat:":"\u{026F5}",
   ":bomb:":"\u{1F4A3}",
   ":book:":"\u{1F4D6}",
   ":bookmark:":"\u{1F516}",
   ":bookmark_tabs:":"\u{1F4D1}",
   ":books:":"\u{1F4DA}",
   ":boom:":"\u{1F4A5}",
   ":boot:":"\u{1F462}",
   ":bouquet:":"\u{1F490}",
   ":bow:":"\u{1F647}",
   ":bowling:":"\u{1F3B3}",
   ":boy:":"\u{1F466}",
   ":bread:":"\u{1F35E}",
   ":bride_with_veil:":"\u{1F470}",
   ":bridge_at_night:":"\u{1F309}",
   ":briefcase:":"\u{1F4BC}",
   ":broken_heart:":"\u{1F494}",
   ":bug:":"\u{1F41B}",
   ":bulb:":"\u{1F4A1}",
   ":bullettrain_front:":"\u{1F685}",
   ":bullettrain_side:":"\u{1F684}",
   ":bus:":"\u{1F68C}",
   ":busstop:":"\u{1F68F}",
   ":bust_in_silhouette:":"\u{1F464}",
   ":busts_in_silhouette:":"\u{1F465}",
   ":cactus:":"\u{1F335}",
   ":cake:":"\u{1F370}",
   ":calendar:":"\u{1F4C6}",
   ":calling:":"\u{1F4F2}",
   ":camel:":"\u{1F42B}",
   ":camera:":"\u{1F4F7}",
   ":cancer:":"\u{0264B}",
   ":candy:":"\u{1F36C}",
   ":capital_abcd:":"\u{1F520}",
   ":capricorn:":"\u{02651}",
   ":car:":"\u{1F697}",
   ":card_index:":"\u{1F4C7}",
   ":carousel_horse:":"\u{1F3A0}",
   ":cat:":"\u{1F431}",
   ":cat2:":"\u{1F408}",
   ":cd:":"\u{1F4BF}",
   ":chart:":"\u{1F4B9}",
   ":chart_with_downwards_trend:":"\u{1F4C9}",
   ":chart_with_upwards_trend:":"\u{1F4C8}",
   ":checkered_flag:":"\u{1F3C1}",
   ":cherries:":"\u{1F352}",
   ":cherry_blossom:":"\u{1F338}",
   ":chestnut:":"\u{1F330}",
   ":chicken:":"\u{1F414}",
   ":children_crossing:":"\u{1F6B8}",
   ":chocolate_bar:":"\u{1F36B}",
   ":christmas_tree:":"\u{1F384}",
   ":church:":"\u{026EA}",
   ":cinema:":"\u{1F3A6}",
   ":circus_tent:":"\u{1F3AA}",
   ":city_sunrise:":"\u{1F307}",
   ":city_sunset:":"\u{1F306}",
   ":cl:":"\u{1F191}",
   ":clap:":"\u{1F44F}",
   ":clapper:":"\u{1F3AC}",
   ":clipboard:":"\u{1F4CB}",
   ":clock1:":"\u{1F550}",
   ":clock10:":"\u{1F559}",
   ":clock1030:":"\u{1F565}",
   ":clock11:":"\u{1F55A}",
   ":clock1130:":"\u{1F566}",
   ":clock12:":"\u{1F55B}",
   ":clock1230:":"\u{1F567}",
   ":clock130:":"\u{1F55C}",
   ":clock2:":"\u{1F551}",
   ":clock230:":"\u{1F55D}",
   ":clock3:":"\u{1F552}",
   ":clock330:":"\u{1F55E}",
   ":clock4:":"\u{1F553}",
   ":clock430:":"\u{1F55F}",
   ":clock5:":"\u{1F554}",
   ":clock530:":"\u{1F560}",
   ":clock6:":"\u{1F555}",
   ":clock630:":"\u{1F561}",
   ":clock7:":"\u{1F556}",
   ":clock730:":"\u{1F562}",
   ":clock8:":"\u{1F557}",
   ":clock830:":"\u{1F563}",
   ":clock9:":"\u{1F558}",
   ":clock930:":"\u{1F564}",
   ":closed_book:":"\u{1F4D5}",
   ":closed_lock_with_key:":"\u{1F510}",
   ":closed_umbrella:":"\u{1F302}",
   ":cloud:":"\u{02601}",
   ":clubs:":"\u{02663}",
   ":cocktail:":"\u{1F378}",
   ":coffee:":"\u{02615}",
   ":cold_sweat:":"\u{1F630}",
   ":collision:":"\u{1F4A5}",
   ":computer:":"\u{1F4BB}",
   ":confetti_ball:":"\u{1F38A}",
   ":confounded:":"\u{1F616}",
   ":confused:":"\u{1F615}",
   ":congratulations:":"\u{03297}",
   ":construction:":"\u{1F6A7}",
   ":construction_worker:":"\u{1F477}",
   ":convenience_store:":"\u{1F3EA}",
   ":cookie:":"\u{1F36A}",
   ":cool:":"\u{1F192}",
   ":cop:":"\u{1F46E}",
   ":copyright:":"\u{000A9}",
   ":corn:":"\u{1F33D}",
   ":couple:":"\u{1F46B}",
   ":couple_with_heart:":"\u{1F491}",
   ":couplekiss:":"\u{1F48F}",
   ":cow:":"\u{1F42E}",
   ":cow2:":"\u{1F404}",
   ":credit_card:":"\u{1F4B3}",
   ":crescent_moon:":"\u{1F319}",
   ":crocodile:":"\u{1F40A}",
   ":crossed_flags:":"\u{1F38C}",
   ":crown:":"\u{1F451}",
   ":cry:":"\u{1F622}",
   ":crying_cat_face:":"\u{1F63F}",
   ":crystal_ball:":"\u{1F52E}",
   ":cupid:":"\u{1F498}",
   ":curly_loop:":"\u{027B0}",
   ":currency_exchange:":"\u{1F4B1}",
   ":curry:":"\u{1F35B}",
   ":custard:":"\u{1F36E}",
   ":customs:":"\u{1F6C3}",
   ":cyclone:":"\u{1F300}",
   ":dancer:":"\u{1F483}",
   ":dancers:":"\u{1F46F}",
   ":dango:":"\u{1F361}",
   ":dart:":"\u{1F3AF}",
   ":dash:":"\u{1F4A8}",
   ":date:":"\u{1F4C5}",
   ":deciduous_tree:":"\u{1F333}",
   ":department_store:":"\u{1F3EC}",
   ":diamond_shape_with_a_dot_inside:":"\u{1F4A0}",
   ":diamonds:":"\u{02666}",
   ":disappointed:":"\u{1F61E}",
   ":disappointed_relieved:":"\u{1F625}",
   ":dizzy:":"\u{1F4AB}",
   ":dizzy_face:":"\u{1F635}",
   ":do_not_litter:":"\u{1F6AF}",
   ":dog:":"\u{1F436}",
   ":dog2:":"\u{1F415}",
   ":dollar:":"\u{1F4B5}",
   ":dolls:":"\u{1F38E}",
   ":dolphin:":"\u{1F42C}",
   ":door:":"\u{1F6AA}",
   ":doughnut:":"\u{1F369}",
   ":dragon:":"\u{1F409}",
   ":dragon_face:":"\u{1F432}",
   ":dress:":"\u{1F457}",
   ":dromedary_camel:":"\u{1F42A}",
   ":droplet:":"\u{1F4A7}",
   ":dvd:":"\u{1F4C0}",
   ":e-mail:":"\u{1F4E7}",
   ":ear:":"\u{1F442}",
   ":ear_of_rice:":"\u{1F33E}",
   ":earth_africa:":"\u{1F30D}",
   ":earth_americas:":"\u{1F30E}",
   ":earth_asia:":"\u{1F30F}",
   ":egg:":"\u{1F373}",
   ":eggplant:":"\u{1F346}",
   ":eight_pointed_black_star:":"\u{02734}",
   ":eight_spoked_asterisk:":"\u{02733}",
   ":electric_plug:":"\u{1F50C}",
   ":elephant:":"\u{1F418}",
   ":email:":"\u{02709}",
   ":end:":"\u{1F51A}",
   ":envelope:":"\u{02709}",
   ":envelope_with_arrow:":"\u{1F4E9}",
   ":euro:":"\u{1F4B6}",
   ":european_castle:":"\u{1F3F0}",
   ":european_post_office:":"\u{1F3E4}",
   ":evergreen_tree:":"\u{1F332}",
   ":exclamation:":"\u{02757}",
   ":expressionless:":"\u{1F611}",
   ":eyeglasses:":"\u{1F453}",
   ":eyes:":"\u{1F440}",
   ":facepunch:":"\u{1F44A}",
   ":factory:":"\u{1F3ED}",
   ":fallen_leaf:":"\u{1F342}",
   ":family:":"\u{1F46A}",
   ":fast_forward:":"\u{023E9}",
   ":fax:":"\u{1F4E0}",
   ":fearful:":"\u{1F628}",
   ":feet:":"\u{1F43E}",
   ":ferris_wheel:":"\u{1F3A1}",
   ":file_folder:":"\u{1F4C1}",
   ":fire:":"\u{1F525}",
   ":fire_engine:":"\u{1F692}",
   ":fireworks:":"\u{1F386}",
   ":first_quarter_moon:":"\u{1F313}",
   ":first_quarter_moon_with_face:":"\u{1F31B}",
   ":fish:":"\u{1F41F}",
   ":fish_cake:":"\u{1F365}",
   ":fishing_pole_and_fish:":"\u{1F3A3}",
   ":fist:":"\u{0270A}",
   ":flags:":"\u{1F38F}",
   ":flashlight:":"\u{1F526}",
   ":flipper:":"\u{1F42C}",
   ":floppy_disk:":"\u{1F4BE}",
   ":flower_playing_cards:":"\u{1F3B4}",
   ":flushed:":"\u{1F633}",
   ":foggy:":"\u{1F301}",
   ":football:":"\u{1F3C8}",
   ":footprints:":"\u{1F463}",
   ":fork_and_knife:":"\u{1F374}",
   ":fountain:":"\u{026F2}",
   ":four_leaf_clover:":"\u{1F340}",
   ":free:":"\u{1F193}",
   ":fried_shrimp:":"\u{1F364}",
   ":fries:":"\u{1F35F}",
   ":frog:":"\u{1F438}",
   ":frowning:":"\u{1F626}",
   ":fuelpump:":"\u{026FD}",
   ":full_moon:":"\u{1F315}",
   ":full_moon_with_face:":"\u{1F31D}",
   ":game_die:":"\u{1F3B2}",
   ":gem:":"\u{1F48E}",
   ":gemini:":"\u{0264A}",
   ":ghost:":"\u{1F47B}",
   ":gift:":"\u{1F381}",
   ":gift_heart:":"\u{1F49D}",
   ":girl:":"\u{1F467}",
   ":globe_with_meridians:":"\u{1F310}",
   ":goat:":"\u{1F410}",
   ":golf:":"\u{026F3}",
   ":grapes:":"\u{1F347}",
   ":green_apple:":"\u{1F34F}",
   ":green_book:":"\u{1F4D7}",
   ":green_heart:":"\u{1F49A}",
   ":grey_exclamation:":"\u{02755}",
   ":grey_question:":"\u{02754}",
   ":grimacing:":"\u{1F62C}",
   ":grin:":"\u{1F601}",
   ":grinning:":"\u{1F600}",
   ":guardsman:":"\u{1F482}",
   ":guitar:":"\u{1F3B8}",
   ":gun:":"\u{1F52B}",
   ":haircut:":"\u{1F487}",
   ":hamburger:":"\u{1F354}",
   ":hammer:":"\u{1F528}",
   ":hamster:":"\u{1F439}",
   ":hand:":"\u{0270B}",
   ":handbag:":"\u{1F45C}",
   ":hankey:":"\u{1F4A9}",
   ":hatched_chick:":"\u{1F425}",
   ":hatching_chick:":"\u{1F423}",
   ":headphones:":"\u{1F3A7}",
   ":hear_no_evil:":"\u{1F649}",
   ":heart:":"\u{02764}",
   ":heart_decoration:":"\u{1F49F}",
   ":heart_eyes:":"\u{1F60D}",
   ":heart_eyes_cat:":"\u{1F63B}",
   ":heartbeat:":"\u{1F493}",
   ":heartpulse:":"\u{1F497}",
   ":hearts:":"\u{02665}",
   ":heavy_check_mark:":"\u{02714}",
   ":heavy_division_sign:":"\u{02797}",
   ":heavy_dollar_sign:":"\u{1F4B2}",
   ":heavy_exclamation_mark:":"\u{02757}",
   ":heavy_minus_sign:":"\u{02796}",
   ":heavy_multiplication_x:":"\u{02716}",
   ":heavy_plus_sign:":"\u{02795}",
   ":helicopter:":"\u{1F681}",
   ":herb:":"\u{1F33F}",
   ":hibiscus:":"\u{1F33A}",
   ":high_brightness:":"\u{1F506}",
   ":high_heel:":"\u{1F460}",
   ":hocho:":"\u{1F52A}",
   ":honey_pot:":"\u{1F36F}",
   ":honeybee:":"\u{1F41D}",
   ":horse:":"\u{1F434}",
   ":horse_racing:":"\u{1F3C7}",
   ":hospital:":"\u{1F3E5}",
   ":hotel:":"\u{1F3E8}",
   ":hotsprings:":"\u{02668}",
   ":hourglass:":"\u{0231B}",
   ":hourglass_flowing_sand:":"\u{023F3}",
   ":house:":"\u{1F3E0}",
   ":house_with_garden:":"\u{1F3E1}",
   ":hushed:":"\u{1F62F}",
   ":ice_cream:":"\u{1F368}",
   ":icecream:":"\u{1F366}",
   ":id:":"\u{1F194}",
   ":ideograph_advantage:":"\u{1F250}",
   ":imp:":"\u{1F47F}",
   ":inbox_tray:":"\u{1F4E5}",
   ":incoming_envelope:":"\u{1F4E8}",
   ":information_desk_person:":"\u{1F481}",
   ":information_source:":"\u{02139}",
   ":innocent:":"\u{1F607}",
   ":interrobang:":"\u{02049}",
   ":iphone:":"\u{1F4F1}",
   ":izakaya_lantern:":"\u{1F3EE}",
   ":jack_o_lantern:":"\u{1F383}",
   ":japan:":"\u{1F5FE}",
   ":japanese_castle:":"\u{1F3EF}",
   ":japanese_goblin:":"\u{1F47A}",
   ":japanese_ogre:":"\u{1F479}",
   ":jeans:":"\u{1F456}",
   ":joy:":"\u{1F602}",
   ":joy_cat:":"\u{1F639}",
   ":key:":"\u{1F511}",
   ":keycap_ten:":"\u{1F51F}",
   ":kimono:":"\u{1F458}",
   ":kiss:":"\u{1F48B}",
   ":kissing:":"\u{1F617}",
   ":kissing_cat:":"\u{1F63D}",
   ":kissing_closed_eyes:":"\u{1F61A}",
   ":kissing_heart:":"\u{1F618}",
   ":kissing_smiling_eyes:":"\u{1F619}",
   ":koala:":"\u{1F428}",
   ":koko:":"\u{1F201}",
   ":lantern:":"\u{1F3EE}",
   ":large_blue_circle:":"\u{1F535}",
   ":large_blue_diamond:":"\u{1F537}",
   ":large_orange_diamond:":"\u{1F536}",
   ":last_quarter_moon:":"\u{1F317}",
   ":last_quarter_moon_with_face:":"\u{1F31C}",
   ":laughing:":"\u{1F606}",
   ":leaves:":"\u{1F343}",
   ":ledger:":"\u{1F4D2}",
   ":left_luggage:":"\u{1F6C5}",
   ":left_right_arrow:":"\u{02194}",
   ":leftwards_arrow_with_hook:":"\u{021A9}",
   ":lemon:":"\u{1F34B}",
   ":leo:":"\u{0264C}",
   ":leopard:":"\u{1F406}",
   ":libra:":"\u{0264E}",
   ":light_rail:":"\u{1F688}",
   ":link:":"\u{1F517}",
   ":lips:":"\u{1F444}",
   ":lipstick:":"\u{1F484}",
   ":lock:":"\u{1F512}",
   ":lock_with_ink_pen:":"\u{1F50F}",
   ":lollipop:":"\u{1F36D}",
   ":loop:":"\u{027BF}",
   ":loudspeaker:":"\u{1F4E2}",
   ":love_hotel:":"\u{1F3E9}",
   ":love_letter:":"\u{1F48C}",
   ":low_brightness:":"\u{1F505}",
   ":m:":"\u{024C2}",
   ":mag:":"\u{1F50D}",
   ":mag_right:":"\u{1F50E}",
   ":mahjong:":"\u{1F004}",
   ":mailbox:":"\u{1F4EB}",
   ":mailbox_closed:":"\u{1F4EA}",
   ":mailbox_with_mail:":"\u{1F4EC}",
   ":mailbox_with_no_mail:":"\u{1F4ED}",
   ":man:":"\u{1F468}",
   ":man_with_gua_pi_mao:":"\u{1F472}",
   ":man_with_turban:":"\u{1F473}",
   ":mans_shoe:":"\u{1F45E}",
   ":maple_leaf:":"\u{1F341}",
   ":mask:":"\u{1F637}",
   ":massage:":"\u{1F486}",
   ":meat_on_bone:":"\u{1F356}",
   ":mega:":"\u{1F4E3}",
   ":melon:":"\u{1F348}",
   ":memo:":"\u{1F4DD}",
   ":mens:":"\u{1F6B9}",
   ":metro:":"\u{1F687}",
   ":microphone:":"\u{1F3A4}",
   ":microscope:":"\u{1F52C}",
   ":milky_way:":"\u{1F30C}",
   ":minibus:":"\u{1F690}",
   ":minidisc:":"\u{1F4BD}",
   ":mobile_phone_off:":"\u{1F4F4}",
   ":money_with_wings:":"\u{1F4B8}",
   ":moneybag:":"\u{1F4B0}",
   ":monkey:":"\u{1F412}",
   ":monkey_face:":"\u{1F435}",
   ":monorail:":"\u{1F69D}",
   ":moon:":"\u{1F314}",
   ":mortar_board:":"\u{1F393}",
   ":mount_fuji:":"\u{1F5FB}",
   ":mountain_bicyclist:":"\u{1F6B5}",
   ":mountain_cableway:":"\u{1F6A0}",
   ":mountain_railway:":"\u{1F69E}",
   ":mouse:":"\u{1F42D}",
   ":mouse2:":"\u{1F401}",
   ":movie_camera:":"\u{1F3A5}",
   ":moyai:":"\u{1F5FF}",
   ":muscle:":"\u{1F4AA}",
   ":mushroom:":"\u{1F344}",
   ":musical_keyboard:":"\u{1F3B9}",
   ":musical_note:":"\u{1F3B5}",
   ":musical_score:":"\u{1F3BC}",
   ":mute:":"\u{1F507}",
   ":nail_care:":"\u{1F485}",
   ":name_badge:":"\u{1F4DB}",
   ":necktie:":"\u{1F454}",
   ":negative_squared_cross_mark:":"\u{0274E}",
   ":neutral_face:":"\u{1F610}",
   ":new:":"\u{1F195}",
   ":new_moon:":"\u{1F311}",
   ":new_moon_with_face:":"\u{1F31A}",
   ":newspaper:":"\u{1F4F0}",
   ":ng:":"\u{1F196}",
   ":no_bell:":"\u{1F515}",
   ":no_bicycles:":"\u{1F6B3}",
   ":no_entry:":"\u{026D4}",
   ":no_entry_sign:":"\u{1F6AB}",
   ":no_good:":"\u{1F645}",
   ":no_mobile_phones:":"\u{1F4F5}",
   ":no_mouth:":"\u{1F636}",
   ":no_pedestrians:":"\u{1F6B7}",
   ":no_smoking:":"\u{1F6AD}",
   ":non-potable_water:":"\u{1F6B1}",
   ":nose:":"\u{1F443}",
   ":notebook:":"\u{1F4D3}",
   ":notebook_with_decorative_cover:":"\u{1F4D4}",
   ":notes:":"\u{1F3B6}",
   ":nut_and_bolt:":"\u{1F529}",
   ":o:":"\u{02B55}",
   ":o2:":"\u{1F17E}",
   ":ocean:":"\u{1F30A}",
   ":octopus:":"\u{1F419}",
   ":oden:":"\u{1F362}",
   ":office:":"\u{1F3E2}",
   ":ok:":"\u{1F197}",
   ":ok_hand:":"\u{1F44C}",
   ":ok_woman:":"\u{1F646}",
   ":older_man:":"\u{1F474}",
   ":older_woman:":"\u{1F475}",
   ":on:":"\u{1F51B}",
   ":oncoming_automobile:":"\u{1F698}",
   ":oncoming_bus:":"\u{1F68D}",
   ":oncoming_police_car:":"\u{1F694}",
   ":oncoming_taxi:":"\u{1F696}",
   ":open_book:":"\u{1F4D6}",
   ":open_file_folder:":"\u{1F4C2}",
   ":open_hands:":"\u{1F450}",
   ":open_mouth:":"\u{1F62E}",
   ":ophiuchus:":"\u{026CE}",
   ":orange_book:":"\u{1F4D9}",
   ":outbox_tray:":"\u{1F4E4}",
   ":ox:":"\u{1F402}",
   ":package:":"\u{1F4E6}",
   ":page_facing_up:":"\u{1F4C4}",
   ":page_with_curl:":"\u{1F4C3}",
   ":pager:":"\u{1F4DF}",
   ":palm_tree:":"\u{1F334}",
   ":panda_face:":"\u{1F43C}",
   ":paperclip:":"\u{1F4CE}",
   ":parking:":"\u{1F17F}",
   ":part_alternation_mark:":"\u{0303D}",
   ":partly_sunny:":"\u{026C5}",
   ":passport_control:":"\u{1F6C2}",
   ":paw_prints:":"\u{1F43E}",
   ":peach:":"\u{1F351}",
   ":pear:":"\u{1F350}",
   ":pencil:":"\u{1F4DD}",
   ":pencil2:":"\u{0270F}",
   ":penguin:":"\u{1F427}",
   ":pensive:":"\u{1F614}",
   ":performing_arts:":"\u{1F3AD}",
   ":persevere:":"\u{1F623}",
   ":person_frowning:":"\u{1F64D}",
   ":person_with_blond_hair:":"\u{1F471}",
   ":person_with_pouting_face:":"\u{1F64E}",
   ":phone:":"\u{0260E}",
   ":pig:":"\u{1F437}",
   ":pig2:":"\u{1F416}",
   ":pig_nose:":"\u{1F43D}",
   ":pill:":"\u{1F48A}",
   ":pineapple:":"\u{1F34D}",
   ":pisces:":"\u{02653}",
   ":pizza:":"\u{1F355}",
   ":point_down:":"\u{1F447}",
   ":point_left:":"\u{1F448}",
   ":point_right:":"\u{1F449}",
   ":point_up:":"\u{0261D}",
   ":point_up_2:":"\u{1F446}",
   ":police_car:":"\u{1F693}",
   ":poodle:":"\u{1F429}",
   ":poop:":"\u{1F4A9}",
   ":post_office:":"\u{1F3E3}",
   ":postal_horn:":"\u{1F4EF}",
   ":postbox:":"\u{1F4EE}",
   ":potable_water:":"\u{1F6B0}",
   ":pouch:":"\u{1F45D}",
   ":poultry_leg:":"\u{1F357}",
   ":pound:":"\u{1F4B7}",
   ":pouting_cat:":"\u{1F63E}",
   ":pray:":"\u{1F64F}",
   ":princess:":"\u{1F478}",
   ":punch:":"\u{1F44A}",
   ":purple_heart:":"\u{1F49C}",
   ":purse:":"\u{1F45B}",
   ":pushpin:":"\u{1F4CC}",
   ":put_litter_in_its_place:":"\u{1F6AE}",
   ":question:":"\u{02753}",
   ":rabbit:":"\u{1F430}",
   ":rabbit2:":"\u{1F407}",
   ":racehorse:":"\u{1F40E}",
   ":radio:":"\u{1F4FB}",
   ":radio_button:":"\u{1F518}",
   ":rage:":"\u{1F621}",
   ":railway_car:":"\u{1F683}",
   ":rainbow:":"\u{1F308}",
   ":raised_hand:":"\u{0270B}",
   ":raised_hands:":"\u{1F64C}",
   ":raising_hand:":"\u{1F64B}",
   ":ram:":"\u{1F40F}",
   ":ramen:":"\u{1F35C}",
   ":rat:":"\u{1F400}",
   ":recycle:":"\u{0267B}",
   ":red_car:":"\u{1F697}",
   ":red_circle:":"\u{1F534}",
   ":registered:":"\u{000AE}",
   ":relaxed:":"\u{0263A}",
   ":relieved:":"\u{1F60C}",
   ":repeat:":"\u{1F501}",
   ":repeat_one:":"\u{1F502}",
   ":restroom:":"\u{1F6BB}",
   ":revolving_hearts:":"\u{1F49E}",
   ":rewind:":"\u{023EA}",
   ":ribbon:":"\u{1F380}",
   ":rice:":"\u{1F35A}",
   ":rice_ball:":"\u{1F359}",
   ":rice_cracker:":"\u{1F358}",
   ":rice_scene:":"\u{1F391}",
   ":ring:":"\u{1F48D}",
   ":rocket:":"\u{1F680}",
   ":roller_coaster:":"\u{1F3A2}",
   ":rooster:":"\u{1F413}",
   ":rose:":"\u{1F339}",
   ":rotating_light:":"\u{1F6A8}",
   ":round_pushpin:":"\u{1F4CD}",
   ":rowboat:":"\u{1F6A3}",
   ":rugby_football:":"\u{1F3C9}",
   ":runner:":"\u{1F3C3}",
   ":running:":"\u{1F3C3}",
   ":running_shirt_with_sash:":"\u{1F3BD}",
   ":sa:":"\u{1F202}",
   ":sagittarius:":"\u{02650}",
   ":sailboat:":"\u{026F5}",
   ":sake:":"\u{1F376}",
   ":sandal:":"\u{1F461}",
   ":santa:":"\u{1F385}",
   ":satellite:":"\u{1F4E1}",
   ":satisfied:":"\u{1F606}",
   ":saxophone:":"\u{1F3B7}",
   ":school:":"\u{1F3EB}",
   ":school_satchel:":"\u{1F392}",
   ":scissors:":"\u{02702}",
   ":scorpius:":"\u{0264F}",
   ":scream:":"\u{1F631}",
   ":scream_cat:":"\u{1F640}",
   ":scroll:":"\u{1F4DC}",
   ":seat:":"\u{1F4BA}",
   ":secret:":"\u{03299}",
   ":see_no_evil:":"\u{1F648}",
   ":seedling:":"\u{1F331}",
   ":shaved_ice:":"\u{1F367}",
   ":sheep:":"\u{1F411}",
   ":shell:":"\u{1F41A}",
   ":ship:":"\u{1F6A2}",
   ":shirt:":"\u{1F455}",
   ":shit:":"\u{1F4A9}",
   ":shoe:":"\u{1F45E}",
   ":shower:":"\u{1F6BF}",
   ":signal_strength:":"\u{1F4F6}",
   ":six_pointed_star:":"\u{1F52F}",
   ":ski:":"\u{1F3BF}",
   ":skull:":"\u{1F480}",
   ":sleeping:":"\u{1F634}",
   ":sleepy:":"\u{1F62A}",
   ":slot_machine:":"\u{1F3B0}",
   ":small_blue_diamond:":"\u{1F539}",
   ":small_orange_diamond:":"\u{1F538}",
   ":small_red_triangle:":"\u{1F53A}",
   ":small_red_triangle_down:":"\u{1F53B}",
   ":smile:":"\u{1F604}",
   ":smile_cat:":"\u{1F638}",
   ":smiley:":"\u{1F603}",
   ":smiley_cat:":"\u{1F63A}",
   ":smiling_imp:":"\u{1F608}",
   ":smirk:":"\u{1F60F}",
   ":smirk_cat:":"\u{1F63C}",
   ":smoking:":"\u{1F6AC}",
   ":snail:":"\u{1F40C}",
   ":snake:":"\u{1F40D}",
   ":snowboarder:":"\u{1F3C2}",
   ":snowflake:":"\u{02744}",
   ":snowman:":"\u{026C4}",
   ":sob:":"\u{1F62D}",
   ":soccer:":"\u{026BD}",
   ":soon:":"\u{1F51C}",
   ":sos:":"\u{1F198}",
   ":sound:":"\u{1F509}",
   ":space_invader:":"\u{1F47E}",
   ":spades:":"\u{02660}",
   ":spaghetti:":"\u{1F35D}",
   ":sparkle:":"\u{02747}",
   ":sparkler:":"\u{1F387}",
   ":sparkles:":"\u{02728}",
   ":sparkling_heart:":"\u{1F496}",
   ":speak_no_evil:":"\u{1F64A}",
   ":speaker:":"\u{1F50A}",
   ":speech_balloon:":"\u{1F4AC}",
   ":speedboat:":"\u{1F6A4}",
   ":star:":"\u{02B50}",
   ":star2:":"\u{1F31F}",
   ":stars:":"\u{1F303}",
   ":station:":"\u{1F689}",
   ":statue_of_liberty:":"\u{1F5FD}",
   ":steam_locomotive:":"\u{1F682}",
   ":stew:":"\u{1F372}",
   ":straight_ruler:":"\u{1F4CF}",
   ":strawberry:":"\u{1F353}",
   ":stuck_out_tongue:":"\u{1F61B}",
   ":stuck_out_tongue_closed_eyes:":"\u{1F61D}",
   ":stuck_out_tongue_winking_eye:":"\u{1F61C}",
   ":sun_with_face:":"\u{1F31E}",
   ":sunflower:":"\u{1F33B}",
   ":sunglasses:":"\u{1F60E}",
   ":sunny:":"\u{02600}",
   ":sunrise:":"\u{1F305}",
   ":sunrise_over_mountains:":"\u{1F304}",
   ":surfer:":"\u{1F3C4}",
   ":sushi:":"\u{1F363}",
   ":suspension_railway:":"\u{1F69F}",
   ":sweat:":"\u{1F613}",
   ":sweat_drops:":"\u{1F4A6}",
   ":sweat_smile:":"\u{1F605}",
   ":sweet_potato:":"\u{1F360}",
   ":swimmer:":"\u{1F3CA}",
   ":symbols:":"\u{1F523}",
   ":syringe:":"\u{1F489}",
   ":tada:":"\u{1F389}",
   ":tanabata_tree:":"\u{1F38B}",
   ":tangerine:":"\u{1F34A}",
   ":taurus:":"\u{02649}",
   ":taxi:":"\u{1F695}",
   ":tea:":"\u{1F375}",
   ":telephone:":"\u{0260E}",
   ":telephone_receiver:":"\u{1F4DE}",
   ":telescope:":"\u{1F52D}",
   ":tennis:":"\u{1F3BE}",
   ":tent:":"\u{026FA}",
   ":thought_balloon:":"\u{1F4AD}",
   ":thumbsdown:":"\u{1F44E}",
   ":thumbsup:":"\u{1F44D}",
   ":ticket:":"\u{1F3AB}",
   ":tiger:":"\u{1F42F}",
   ":tiger2:":"\u{1F405}",
   ":tired_face:":"\u{1F62B}",
   ":tm:":"\u{02122}",
   ":toilet:":"\u{1F6BD}",
   ":tokyo_tower:":"\u{1F5FC}",
   ":tomato:":"\u{1F345}",
   ":tongue:":"\u{1F445}",
   ":top:":"\u{1F51D}",
   ":tophat:":"\u{1F3A9}",
   ":tractor:":"\u{1F69C}",
   ":traffic_light:":"\u{1F6A5}",
   ":train:":"\u{1F683}",
   ":train2:":"\u{1F686}",
   ":tram:":"\u{1F68A}",
   ":triangular_flag_on_post:":"\u{1F6A9}",
   ":triangular_ruler:":"\u{1F4D0}",
   ":trident:":"\u{1F531}",
   ":triumph:":"\u{1F624}",
   ":trolleybus:":"\u{1F68E}",
   ":trophy:":"\u{1F3C6}",
   ":tropical_drink:":"\u{1F379}",
   ":tropical_fish:":"\u{1F420}",
   ":truck:":"\u{1F69A}",
   ":trumpet:":"\u{1F3BA}",
   ":tshirt:":"\u{1F455}",
   ":tulip:":"\u{1F337}",
   ":turtle:":"\u{1F422}",
   ":tv:":"\u{1F4FA}",
   ":twisted_rightwards_arrows:":"\u{1F500}",
   ":two_hearts:":"\u{1F495}",
   ":two_men_holding_hands:":"\u{1F46C}",
   ":two_women_holding_hands:":"\u{1F46D}",
   ":u5272:":"\u{1F239}",
   ":u5408:":"\u{1F234}",
   ":u55b6:":"\u{1F23A}",
   ":u6307:":"\u{1F22F}",
   ":u6708:":"\u{1F237}",
   ":u6709:":"\u{1F236}",
   ":u6e80:":"\u{1F235}",
   ":u7121:":"\u{1F21A}",
   ":u7533:":"\u{1F238}",
   ":u7981:":"\u{1F232}",
   ":u7a7a:":"\u{1F233}",
   ":umbrella:":"\u{02614}",
   ":unamused:":"\u{1F612}",
   ":underage:":"\u{1F51E}",
   ":unlock:":"\u{1F513}",
   ":up:":"\u{1F199}",
   ":v:":"\u{0270C}",
   ":vertical_traffic_light:":"\u{1F6A6}",
   ":vhs:":"\u{1F4FC}",
   ":vibration_mode:":"\u{1F4F3}",
   ":video_camera:":"\u{1F4F9}",
   ":video_game:":"\u{1F3AE}",
   ":violin:":"\u{1F3BB}",
   ":virgo:":"\u{0264D}",
   ":volcano:":"\u{1F30B}",
   ":vs:":"\u{1F19A}",
   ":walking:":"\u{1F6B6}",
   ":waning_crescent_moon:":"\u{1F318}",
   ":waning_gibbous_moon:":"\u{1F316}",
   ":warning:":"\u{026A0}",
   ":watch:":"\u{0231A}",
   ":water_buffalo:":"\u{1F403}",
   ":watermelon:":"\u{1F349}",
   ":wave:":"\u{1F44B}",
   ":wavy_dash:":"\u{03030}",
   ":waxing_crescent_moon:":"\u{1F312}",
   ":waxing_gibbous_moon:":"\u{1F314}",
   ":wc:":"\u{1F6BE}",
   ":weary:":"\u{1F629}",
   ":wedding:":"\u{1F492}",
   ":whale:":"\u{1F433}",
   ":whale2:":"\u{1F40B}",
   ":wheelchair:":"\u{0267F}",
   ":white_check_mark:":"\u{02705}",
   ":white_circle:":"\u{026AA}",
   ":white_flower:":"\u{1F4AE}",
   ":white_large_square:":"\u{02B1C}",
   ":white_medium_small_square:":"\u{025FD}",
   ":white_medium_square:":"\u{025FB}",
   ":white_small_square:":"\u{025AB}",
   ":white_square_button:":"\u{1F533}",
   ":wind_chime:":"\u{1F390}",
   ":wine_glass:":"\u{1F377}",
   ":wink:":"\u{1F609}",
   ":wolf:":"\u{1F43A}",
   ":woman:":"\u{1F469}",
   ":womans_clothes:":"\u{1F45A}",
   ":womans_hat:":"\u{1F452}",
   ":womens:":"\u{1F6BA}",
   ":worried:":"\u{1F61F}",
   ":wrench:":"\u{1F527}",
   ":x:":"\u{0274C}",
   ":yellow_heart:":"\u{1F49B}",
   ":yen:":"\u{1F4B4}",
   ":yum:":"\u{1F60B}",
   ":zap:":"\u{026A1}"
}

var emojiKeys = Object.keys(emojiMap);