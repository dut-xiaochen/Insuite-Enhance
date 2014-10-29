jQuery(function () {
	init();
});

function init() {	
	render();
	event();
}

function render() {
	// 施策一覧取得
	var url = '/hibiki/rest/1/binders/strategy_management/views/allData/documents?year=' 
		+ year.toString() + '&&charge_group=' + depId + "&&customer_code=" + customer_code;
	var dataList = [];
	
	tag.doget(url, function(err, result) {
		if (err) {
			alert(err_system_msg);
			return;
		}
		jQuery("#list_cnt").val(result.totalCount);
		
		result = tag.objToArray(result);
		
		_.each(result.document, function(item, index) {
			var tmpObj = {};
			var strategy = tag.createStrategy(item);
			
			if (_.isNull(strategy["sales"]) && _.isNull(strategy["profit"]) && _.isNull(strategy["period3"])) {
				// 売上、利益、時期が全部無い場合、表示されない
			} else {
				tmpObj.project = strategy["project"];
				tmpObj.strategy_name = strategy["strategy_name"];
				tmpObj.sales = strategy["sales"];
				tmpObj.profit = strategy["profit"];
				tmpObj.period = strategy["period3"];
				tmpObj.strategy_code = strategy["strategy_code"];
				dataList.push(tmpObj);
				allDataList.push(strategy);
			}
		});
		
		// テンプレート生成
		renderTmpl(dataList);
	});
}

function renderTmpl(dataList) {
	var container = jQuery("#container");
    var tmpl = jQuery("#list_tmpl").html();
    
    _.each(dataList, function(item, index) {
    	// テンプレートロード
    	var content = _.template(tmpl, 
    		    {
    		    	index: index,
    		    	lineNo: index + 1,
    		        odd_or_even: index%2 == 1 ? "evenRow": "oddRow",
    		        customer_name : customer_name,
    		        project : item.project,
    		        strategy_name : item.strategy_name,
    		        sales : item.sales,
    		        profit : item.profit,
    		        period : item.period,
    		        strategy_code : item.strategy_code
    		    });
    	container.append(content);
    });
    
}

function event() {
	jQuery("#goBtn").click(function(event) {
		if (lock) {
			alert(err_double_click_msg);
			return;
		}
		lock = true;
		var indexList = [];
		// 未選の施策を洗出し
		jQuery("input:checkbox[name='chkbox']").each(
			function() {
				if (jQuery(this).prop("checked") == false) {
					var index = jQuery(this).attr("data-index");
					indexList.push(index);
				}
		});
		var tmpContinueList = [];
		_.each(indexList, function(indexItem, index) {
			tmpContinueList[index] = allDataList[indexItem];
		});
		continueDataList = tmpContinueList;
		
		// 施策コード変更
		continueDataList = changeCode(continueDataList);
		
		// 継続施策をDBバインダに追加
		var updateUrl = '/hibiki/rest/1/binders/strategy_management/documents/';

		async.eachSeries(continueDataList, function(depItem, doEach) {
			tag.dopost(updateUrl, depItem, function(err, result) {
				doEach(err);
			});
			
		}, function (err) {
			if (err) {
				alert(err_system_msg);
				return;
			} else {
				
				lock = false;
				
				// 営業一覧計画シートに遷移
				goToPlan();
			}
		});
		
	});
}

function goToPlan() {
	
	jQuery("#ongoing_form").attr("action", "/cgi-bin/custom/TAG/plan.cgi");
	// パラメータ
	jQuery("#year").val(parseInt(year) + 1);
	jQuery("#depId").val(depId);
	jQuery("#depName").val(depName);
	jQuery("#customer_code").val(customer_code);
	jQuery("#customer_name").val(customer_name);

	jQuery("#ongoing_form").submit();
	
}

function changeCode(continueDataList) {
	_.each(continueDataList, function(strategy) {
		var code = strategy.strategy_code;
		var year = code.substr(0,4);
		var newCode = (parseInt(year)+1) + code.substr(4,8);
		strategy.strategy_code = newCode;
		strategy.year = parseInt(year) + 1 + "";
		// 属性は「継続」に設定
		strategy.property = "1";
	});
	return continueDataList;
}

//ラインオーバー
function lineOver(num) {
    var chk  = 'chkbox_' + num;
    var myid = document.getElementById(chk);
    if( myid.checked == true ) {
    } else {
        lineBackcolorChange(num,'red','no');
    }
}

// ラインアウト
function lineOut(num) {
    changeCheckBox(num);
}

// 背景色変更
function lineBackcolorChange(num,color,chk){
    var bcolor = 'backgroud_' + color;
    var number = 'number_' + num;
    var cpychk = 'cpychk_' + num;
    var client = 'client_' + num;
    var column = 'column_' + num;
    var detail = 'detail_' + num;
    var uriage = 'uriage_' + num;
    var profit = 'profit_' + num;
    var period = 'period_' + num;
    var chkbox = 'chkbox_' + num;
    document.getElementById(number).className = bcolor;
    document.getElementById(cpychk).className = bcolor;
    document.getElementById(client).className = bcolor;
    document.getElementById(column).className = bcolor;
    document.getElementById(detail).className = bcolor;
    document.getElementById(uriage).className = bcolor;
    document.getElementById(profit).className = bcolor;
    document.getElementById(period).className = bcolor;
    if (chk == 'no') {
    } else if ( chk == 'on' ) {
        document.getElementById(chkbox).checked = true;
    } else if ( chk == 'off' ) {
        document.getElementById(chkbox).checked = false;
    }
}

// 全選択チェックボックス
function allchangeCheckBox() {
    var myid = document.getElementById('allCheck');
    var list_cnt = document.getElementById("list_cnt").value;
    for( var i=0; i < list_cnt; i++ ) {
        if( myid.checked == true ) {
            lineBackcolorChange(i,'gray','on');
        } else if ( i % 2 == 0 ) {
            lineBackcolorChange(i,'white','off');
        } else {
            lineBackcolorChange(i,'gray2','off');
        }
    }
}

// 各行チェックボックス
function changeCheckBox(num){
    var chk  = 'chkbox_' + num;
    var myid = document.getElementById(chk);
    if( myid.checked == true ) {
        lineBackcolorChange(num,'gray','on');
    } else if ( num % 2 == 0 ) {
        lineBackcolorChange(num,'white','off');
    } else {
        lineBackcolorChange(num,'gray2','off');
    }
}