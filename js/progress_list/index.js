jQuery(function () {
	init();
	render();
	event();
});

function init() {
	// data
}

function render() {
	// render 年度プルダウンリスト生成　今年と来年　デフォルトは今年
	var currentYear = new Date().getFullYear();
	var nextYear = currentYear + 1;
	var yearOptionValues = [];
	yearOptionValues.push(currentYear);
	yearOptionValues.push(nextYear);
	tag.renderSelect("year", yearOptionValues, yearOptionValues, currentYear);
	
	// render　合計テンプレート
	var sumContainer = jQuery("#sumCount");
	var tmplSumCount = jQuery("#tmpl_sum_count").html();
	sumContainer.append(_.template(tmplSumCount, {
		current_A_uriage:111,
		current_A_rieki:222,
	    current_B_uriage:333,
		current_B_rieki:444,
	    current_A_B_uriage:555,
		current_A_B_rieki:666,
	    last_uriage:777,
		last_rieki:888,
		diff_uriage:999,
		diff_rieki:000,
		current_plan_uriage:1111,
		current_plan_rieki:2222,
		current_diff_uriage:3333,
		current_diff_rieki:4444,
		current_A_B_C_uriage:5555,
		current_A_B_C_rieki:6666
	}));
}

function event() {
	// 状態保存ボタン
	jQuery("#saveStateBtn").click(function(event) {
		alert("状態保存！");
	});
	
	// 印刷ボタン（その他集約）
	jQuery("#printButton_other").click(function(event) {
		alert("その他を集約して印刷！");
	});
	
	// 印刷ボタン（その他集約しない）
	jQuery("#printButton").click(function(event) {
		alert("その他を集約しないで印刷！");
	});
}

// ラインオーバー
function lineOver(num) {
    lineBackcolorChange(num,'red','no');
}

// ラインアウト
function lineOut(num,line) {
    if ( line == 'evenRow' ) {
        lineBackcolorChange(num,'gray2','off');
    } else {
        lineBackcolorChange(num,'white','off');
    }
    return;
}

// 背景色変更
function lineBackcolorChange(num,color,chk){
    bcolor = 'backgroud_' + color;
    number = 'number_' + num;
    chketc = 'chketc_' + num;
    client = 'client_' + num;
    yrplan = 'yrplan_' + num;
    action = 'action_' + num;
    data01 = 'data01_' + num;
    data02 = 'data02_' + num;
    data03 = 'data03_' + num;
    data04 = 'data04_' + num;
    data05 = 'data05_' + num;
    data06 = 'data06_' + num;
    data07 = 'data07_' + num;
    data08 = 'data08_' + num;
    data09 = 'data09_' + num;
    data10 = 'data10_' + num;
    data11 = 'data11_' + num;
    data12 = 'data12_' + num;
    data13 = 'data13_' + num;
    data14 = 'data14_' + num;
    data15 = 'data15_' + num;
    data16 = 'data16_' + num;
    document.getElementById(number).className = bcolor;
    document.getElementById(chketc).className = bcolor;
    document.getElementById(client).className = bcolor;
    document.getElementById(yrplan).className = bcolor;
    document.getElementById(action).className = bcolor;
    document.getElementById(data01).className = bcolor;
    document.getElementById(data02).className = bcolor;
    document.getElementById(data03).className = bcolor;
    document.getElementById(data04).className = bcolor;
    document.getElementById(data09).className = bcolor;
    document.getElementById(data10).className = bcolor;
    document.getElementById(data13).className = bcolor;
    document.getElementById(data14).className = bcolor;

    document.getElementById(data05).className = bcolor;
    document.getElementById(data06).className = bcolor;
    document.getElementById(data07).className = bcolor;
    document.getElementById(data08).className = bcolor;
    document.getElementById(data11).className = bcolor;
    document.getElementById(data12).className = bcolor;
    document.getElementById(data15).className = bcolor;
    document.getElementById(data16).className = bcolor;

    if (chk == 'no') {
    } else if ( chk == 'on' ) {
        document.getElementById(data05).className = bcolor;
        document.getElementById(data06).className = bcolor;
        document.getElementById(data07).className = bcolor;
        document.getElementById(data08).className = bcolor;
        document.getElementById(data11).className = bcolor;
        document.getElementById(data12).className = bcolor;
        document.getElementById(data15).className = bcolor;
        document.getElementById(data16).className = bcolor;
    } else if ( chk == 'off' ) {
        document.getElementById(data05).className = "backgroud_color1";
        document.getElementById(data06).className = "backgroud_color1";
        document.getElementById(data07).className = "backgroud_color2";
        document.getElementById(data08).className = "backgroud_color2";
        document.getElementById(data11).className = "backgroud_color3";
        document.getElementById(data12).className = "backgroud_color3";
        document.getElementById(data15).className = "backgroud_color4";
        document.getElementById(data16).className = "backgroud_color4";
    }
    return;
}