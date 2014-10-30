jQuery(function () {
	var level2_groups = [];
	var level3_groups = [];
	var level4_groups = [];
	var level5_groups = [];
	init();
});

function init() {
	render();
	event();
}

function render() {
	// 年度プルダウンリスト生成　今年と来年　デフォルトは今年
	renderYearList();

	// タイトル 次年度表示
	jQuery("#nextYearTitle").text(nextYear + "年度");
	
	// 本部プルダウンリスト生成
	renderHonbu();
	
}

function renderYearList() {
	var yearOptionValues = [];
	yearOptionValues.push(currentYear);
	yearOptionValues.push(nextYear);
	tag.renderSelect("yearList", yearOptionValues, yearOptionValues, nextYear);
	// テーブルのタイトル年度関連
	jQuery("[name='currentYearArea']").text(nextYear);
	jQuery("[name='lastYearArea']").text(currentYear);
	
	// 年度プルダウンリスト変更
	jQuery("#yearList").change(function(event) {
		var selectedYear = jQuery("#yearList option:selected").val();
		//　画面表示タイトル年度変更
		jQuery("#nextYearTitle").text(selectedYear + "年度");
		
		// テーブルのタイトル年度変更
		jQuery("[name='currentYearArea']").text(selectedYear);
		jQuery("[name='lastYearArea']").text(selectedYear-1);
		
	    // 部門一覧データ変更
		// 現在、局ID取得
		var currentKyokuId = "";
		if(level4_groups.length == 1) {
			currentKyokuId = jQuery("#kyokuArea").attr("data-value");
		} else {
			currentKyokuId = jQuery("#kyokuSel option:selected").val();
		}
		renderDepList(currentKyokuId, selectedYear);
		
	});
}

function renderHonbu() {
	level2_groups = tag.getLevel2Group();
	var defaultHonbuId = "";
	
	// テスト用
	// level2_groups = [["1", "本部1"],["2", "本部2"]];
	
	if (level2_groups.length == 0) {
		
		// 本部文字列 空白設定
		jQuery("#honBuArea").text("");
		jQuery("#showHonBuArea_text").show();
		jQuery("#showHonBuArea_sel").hide();
		
	} else if (level2_groups.length == 1) {
		
		//　本部文字列表示
		defaultHonbuId = level2_groups[0][0];
		jQuery("#honBuArea").text(level2_groups[0][1]);
		jQuery("#honBuArea").attr("data-value", level2_groups[0][0]);
		jQuery("#showHonBuArea_text").show();
		jQuery("#showHonBuArea_sel").hide();
		
	} else {
		
		//　本部プルダウンリスト表示
		jQuery("#showHonBuArea_text").hide();
		jQuery("#showHonBuArea_sel").show();
		
		// 本部プルダウンリスト生成
		var honbuOptionValues = [];
		var honbuOptionValues = [];
		var honbuOptionDisplays = [];
		
		_.each(level2_groups, function(groupItem, index) {
			if (index == 0) {
				defaultHonbuId = groupItem[0];
			}
			honbuOptionValues.push(groupItem[0]);
			honbuOptionDisplays.push(groupItem[1]);	
		});
		tag.renderSelect("honBuSel", honbuOptionDisplays, honbuOptionValues, defaultHonbuId);
		
	}
	
	// 小本部関連
    renderSmallHonbu(defaultHonbuId);
}

function renderSmallHonbu(honbuId) {
	level3_groups = tag.getLevel3GroupByFatherID(honbuId);
	var defaultSmallHonbuId = "";

	if (level3_groups.length == 0) {
		
		//　小本部文字列　空白表示
		jQuery("#smallHonBuArea").text("");
		jQuery("#showSmallHonBuArea_text").show();
		jQuery("#showSmallHonBuArea_sel").hide();
		
	} else if (level3_groups.length == 1) {
		
		//　小本部文字列表示
		defaultSmallHonbuId = level3_groups[0][0];
		jQuery("#smallHonBuArea").text(level3_groups[0][1]);
		jQuery("#smallHonBuArea").attr("data-value", level3_groups[0][0]);
		jQuery("#showSmallHonBuArea_text").show();
		jQuery("#showSmallHonBuArea_sel").hide();
		
	} else {
		
		//　小本部プルダウンリスト表示
		jQuery("#showSmallHonBuArea_text").hide();
		jQuery("#showSmallHonBuArea_sel").show();
		
		// クリア
		jQuery("#smallHonBuSel").html("");
		
		// 小本部プルダウンリスト生成
		var smallHonbuOptionValues = [];
		var smallHonbuOptionValues = [];
		var smallHonbuOptionDisplays = [];
		
		_.each(level3_groups, function(groupItem, index) {
			if (index == 0) {
				defaultSmallHonbuId = groupItem[0];
			}
			smallHonbuOptionValues.push(groupItem[0]);
			smallHonbuOptionDisplays.push(groupItem[1]);	
		});
		tag.renderSelect("smallHonBuSel", smallHonbuOptionDisplays, smallHonbuOptionValues, defaultSmallHonbuId);
		
	}
	
	// 局関連
	renderKyoku(defaultSmallHonbuId);
}

function renderKyoku(smallHonbuId) {
	
	level4_groups = tag.getLevel4GroupByFatherID(smallHonbuId);
	var defaultKyokuId = "";

	if (level4_groups.length == 0) {
		
		//　局文字列　空白表示
		jQuery("#kyokuArea").text("");
		jQuery("#showKyoku_text").show();
		jQuery("#showKyoku_sel").hide();
		
	} else if (level4_groups.length == 1) {
		
		//　局文字列表示
		defaultKyokuId = level4_groups[0][0];
		jQuery("#kyokuArea").text(level4_groups[0][1]);
		jQuery("#kyokuArea").attr("data-value", level4_groups[0][0]);
		jQuery("#showKyoku_text").show();
		jQuery("#showKyoku_sel").hide();
		
	} else {
		
		//　局プルダウンリスト表示
		jQuery("#showKyoku_text").hide();
		jQuery("#showKyoku_sel").show();
		
		// クリア
		jQuery("#kyokuSel").html("");
		
		// 局プルダウンリスト生成
		var kyokuOptionValues = [];
		var kyokuOptionValues = [];
		var kyokuOptionDisplays = [];
		
		_.each(level4_groups, function(groupItem, index) {
			if (index == 0) {
				defaultKyokuId = groupItem[0];
			}
			kyokuOptionValues.push(groupItem[0]);
			kyokuOptionDisplays.push(groupItem[1]);	
		});
		tag.renderSelect("kyokuSel", kyokuOptionDisplays, kyokuOptionValues, defaultKyokuId);
	
	}
	
	// 部門関連
	var selectedYear = jQuery("#yearList option:selected").val();
	renderDepList(defaultKyokuId, selectedYear);
}

// 部門データ一覧取得
function renderDepList(kyoKuId, year) {
	lockFlg = true;
	// クリア
	jQuery("#sumContainer").html("");
	jQuery("#tableContainer").html("");
	
	level5_groups = tag.getLevel5GroupByFatherID(kyoKuId);
	
	var depObjList = [];
    var index = 0;
    // 合計変数
    var sum_currentYearSalesA = 0;
    var sum_currentYearProfitA = 0;
    var sum_currentYearSalesB = 0;
    var sum_currentYearProfitB = 0;
    var sum_currentYearSalesAB = 0;
    var sum_currentYearProfitAB = 0;
    var sum_currentYearSalesABC = 0;
    var sum_currentYearProfitABC = 0;
    var sum_lastYearSales = 0;
    var sum_lastYearProfit = 0;
    var sum_lastYearBudgetSales = 0;
    var sum_lastYearBudgetProfit = 0;
    var sum_increaseSales1 = 0;
    var sum_increaseProfit1 = 0;
    var sum_increaseSales2 = 0;
    var sum_increaseProfit2 = 0;
    
    var noDisplayList = [];
	
	async.eachSeries(level5_groups, function(depItem, doEach) {
		var depId = depItem[0];
		var depName = depItem[1];
		
		// もし、この部門のクライアントの「年度計画一覧表示」フラグは表示しない場合、集計しない
		var mappingUrl = '/hibiki/rest/1/binders/custom_charge_group_master/views/allData/documents?charge_group=' 
			+ depId + '&&list_flag=2';
		
		// 表示しないクライアント一覧取得
		tag.doget(mappingUrl, function(err, result) {			
			if (parseInt(result.totalCount) > 0) {
				result = tag.objToArray(result);
				_.each(result.document, function(item) {
					var mappingObj = tag.createMapping(item);
					noDisplayList.push(mappingObj["customer_code"]);
				});
			}
			
			// 当年度　施策バインダからデータを取得
			var url = '/hibiki/rest/1/binders/strategy_management/views/allData/documents?year=' 
				+ year.toString() + '&&charge_group=' + depId;
			
			// 今年データ取得　（施策バインダから）
			tag.doget(url, function(err, result) {
				var depObj = {};
				var currentYearSalesA = 0;
				var currentYearProfitA = 0;
				var currentYearSalesB = 0;
				var currentYearProfitB = 0;
				var currentYearSalesC = 0;
				var currentYearProfitC = 0;
				var currentYearSalesAB = 0;
				var currentYearProfitAB = 0;
				var currentYearSalesABC = 0;
				var currentYearProfitABC = 0;
				var lastYearSales = 0;
				var lastYearProfit = 0;
				var lastYearBudgetSales = 0;
				var lastYearBudgetProfit = 0;
				var increaseSales1 = 0;
				var increaseProfit1 = 0;
				var increaseSales2 = 0;
				var increaseProfit2 = 0;
				
				result = tag.objToArray(result);
				
				_.each(result.document, function(depItem, index) {
					var strategy = tag.createStrategy(depItem);
					
					if ( _.indexOf(noDisplayList, strategy["customer_code"]) == -1 ) {
						
						//　当年度　A合計
						if(strategy["accurcy"] == "A"){
							currentYearSalesA += parseInt(strategy["sales"]);
							currentYearProfitA += parseInt(strategy["profit"]);
						}
						//　当年度　B合計
						if(strategy["accurcy"] == "B"){
							currentYearSalesB += parseInt(strategy["sales"]);
							currentYearProfitB += parseInt(strategy["profit"]);
						}
						//　当年度　C合計
						if(strategy["accurcy"] == "C"){
							currentYearSalesC += parseInt(strategy["sales"]);
							currentYearProfitC += parseInt(strategy["profit"]);
						}
					}
		
				});
				// 当年度　A＋B合計【見込み】
				currentYearSalesAB = currentYearSalesA + currentYearSalesB;
				currentYearProfitAB = currentYearProfitA + currentYearProfitB;
				//　当年度　A+B+C合計【目標】
				currentYearSalesABC = currentYearSalesA + currentYearSalesB + currentYearSalesC;
				currentYearProfitABC = currentYearProfitA + currentYearProfitB + currentYearProfitC;
				
				//　昨年度見通しデータ取得 (A+B+C)	　施策バインダから
				url = '/hibiki/rest/1/binders/strategy_management/views/allData/documents?year=' 
					+ (year-1).toString() + '&&charge_group=' + depId;
				tag.doget(url, function(err, result) {
					
					result = tag.objToArray(result);
					
					_.each(result.document, function(depItem, index) {
						
						var strategy = tag.createStrategy(depItem);
						
						if ( _.indexOf(noDisplayList, strategy["customer_code"]) == -1 ) {
							lastYearSales += parseInt(strategy["sales"]);
							lastYearProfit += parseInt(strategy["profit"]);
						}
					});
					// 増減1
					increaseSales1 = currentYearSalesAB - lastYearSales
					increaseProfit1 = currentYearProfitAB - lastYearProfit
					
					// 昨年度予算データ取得　予定管理バインダから
					url = '/hibiki/rest/1/binders/budget/views/allData/documents?year=' 
						+ year.toString() + '&&charge_group=' + depId;
					tag.doget(url, function(err, result) {
						
						result = tag.objToArray(result);
						
						_.each(result.document, function(depItem, index) {
							var budgetObj = tag.createBudget(depItem);
							
							if ( _.indexOf(noDisplayList, budgetObj["customer_code"]) == -1 ) {
								lastYearBudgetSales += parseInt(budgetObj["budget_sum_sales"]);
								lastYearBudgetProfit += parseInt(budgetObj["budget_sum_profit"]);
							}
							
						});
						// 増減2
						increaseSales2 = currentYearSalesAB - lastYearBudgetSales;
						increaseProfit2 = currentYearProfitAB - lastYearBudgetProfit;
						
						// 部門データ設定　コンマ追加
						depObj.depId = depId;
						depObj.depName = depName;
						depObj.index = index;
						depObj.currentYearSalesA = tag.addCommas(currentYearSalesA);
						depObj.currentYearProfitA = tag.addCommas(currentYearProfitA);
						depObj.currentYearSalesB = tag.addCommas(currentYearSalesB);
						depObj.currentYearProfitB = tag.addCommas(currentYearProfitB);
						depObj.currentYearSalesAB = tag.addCommas(currentYearSalesAB);
						depObj.currentYearProfitAB = tag.addCommas(currentYearProfitAB);
						depObj.currentYearSalesABC = tag.addCommas(currentYearSalesABC);
						depObj.currentYearProfitABC = tag.addCommas(currentYearProfitABC);
						depObj.lastYearSales = tag.addCommas(lastYearSales);
						depObj.lastYearProfit = tag.addCommas(lastYearProfit);
						depObj.lastYearBudgetSales = tag.addCommas(lastYearBudgetSales);
						depObj.lastYearBudgetProfit = tag.addCommas(lastYearBudgetProfit);
						depObj.increaseSales1 = tag.addCommas(increaseSales1);
						depObj.increaseProfit1 = tag.addCommas(increaseProfit1);
						depObj.increaseSales2 = tag.addCommas(increaseSales2);
						depObj.increaseProfit2 = tag.addCommas(increaseProfit2);
						
						//　合計
						sum_currentYearSalesA += currentYearSalesA;
						sum_currentYearProfitA += currentYearProfitA;
						sum_currentYearSalesB += currentYearSalesB;
						sum_currentYearProfitB += currentYearProfitB;
						sum_currentYearSalesAB += currentYearSalesAB;
						sum_currentYearProfitAB += currentYearProfitAB;
						sum_currentYearSalesABC += currentYearSalesABC;
						sum_currentYearProfitABC += currentYearProfitABC;
						sum_lastYearSales += lastYearSales;
						sum_lastYearProfit += lastYearProfit;
						sum_lastYearBudgetSales += lastYearBudgetSales;
						sum_lastYearBudgetProfit += lastYearBudgetProfit;
						sum_increaseSales1 += increaseSales1;
						sum_increaseProfit1 += increaseProfit1;
						sum_increaseSales2 += increaseSales2;
						sum_increaseProfit2 += increaseProfit2;
						
						// 部門データテンプレート生成
						renderDepListTempl(depObj);
				        
				        index ++;
						doEach(err);					
					});
				});
			});	
		});
			
	}, function(err) {
		if(err) {
			alert(err_system_msg);
			return;
		}
		var sumObj = {};
		sumObj.sum_currentYearSalesA = tag.addCommas(sum_currentYearSalesA);
		sumObj.sum_currentYearProfitA = tag.addCommas(sum_currentYearProfitA);
		sumObj.sum_currentYearSalesB = tag.addCommas(sum_currentYearSalesB);
		sumObj.sum_currentYearProfitB = tag.addCommas(sum_currentYearProfitB);
		sumObj.sum_currentYearSalesAB = tag.addCommas(sum_currentYearSalesAB);
		sumObj.sum_currentYearProfitAB = tag.addCommas(sum_currentYearProfitAB);
		sumObj.sum_currentYearSalesABC = tag.addCommas(sum_currentYearSalesABC);
		sumObj.sum_currentYearProfitABC = tag.addCommas(sum_currentYearProfitABC);
		sumObj.sum_lastYearSales = tag.addCommas(sum_lastYearSales);
		sumObj.sum_lastYearProfit = tag.addCommas(sum_lastYearProfit);
		sumObj.sum_lastYearBudgetSales = tag.addCommas(sum_lastYearBudgetSales);
		sumObj.sum_lastYearBudgetProfit = tag.addCommas(sum_lastYearBudgetProfit);
		sumObj.sum_increaseSales1 = tag.addCommas(sum_increaseSales1);
		sumObj.sum_increaseProfit1 = tag.addCommas(sum_increaseProfit1);
		sumObj.sum_increaseSales2 = tag.addCommas(sum_increaseSales2);
		sumObj.sum_increaseProfit2 = tag.addCommas(sum_increaseProfit2);
		
		renderSumTempl(sumObj);
		lockFlg = false;
		
	});
	
}

function renderDepListTempl(depObj) {
	var container = jQuery("#tableContainer");
    var tmpl = jQuery("#dep_strategy_tmpl").html();
	// テンプレートロード
    var content = _.template(tmpl, 
    {
    	depId: depObj.depId,
    	depName: depObj.depName,
    	index: depObj.index,
    	lineNo: depObj.index + 1,
        odd_or_even:depObj.index%2 == 1 ? "evenRow": "oddRow",
		currentYearSalesA : depObj.currentYearSalesA,
		currentYearProfitA : depObj.currentYearProfitA,
		currentYearSalesB : depObj.currentYearSalesB,
		currentYearProfitB : depObj.currentYearProfitB,
		currentYearSalesAB : depObj.currentYearSalesAB,
		currentYearProfitAB : depObj.currentYearProfitAB,
		currentYearSalesABC : depObj.currentYearSalesABC,
		currentYearProfitABC : depObj.currentYearProfitABC,
		lastYearSales : depObj.lastYearSales,
		lastYearProfit : depObj.lastYearProfit,
		lastYearBudgetSales : depObj.lastYearBudgetSales,
		lastYearBudgetProfit : depObj.lastYearBudgetProfit,
		increaseSales1 : depObj.increaseSales1,
		increaseProfit1 : depObj.increaseProfit1,
		increaseSales2 : depObj.increaseSales2,
		increaseProfit2 : depObj.increaseProfit2
    	
    });
    container.append(content);
    
    // 参照ボタンを押下すると、部門別画面に遷移
	jQuery("input[name='referenceBtn']").click(function(event) {
		var refBtn = jQuery(event.target);
		var depId = refBtn.attr("id");
		window.location = "/cgi-bin/custom/TAG/progress_list_dep.cgi?depId=" + depId;
	});
	
	// 増減文字色変更
	if (parseInt(depObj.increaseSales1) >= 0) {
		jQuery("#fontIncreaseSales1_" + depObj.index).attr("color", "black");
	}
	if (parseInt(depObj.increaseProfit1) >= 0) {
		jQuery("#fontIncreaseProfit1_" + depObj.index).attr("color", "black");
	}
	if (parseInt(depObj.increaseSales2) >= 0) {
		jQuery("#fontIncreaseSales2_" + depObj.index).attr("color", "black");
	}
	if (parseInt(depObj.increaseProfit2) >= 0) {
		jQuery("#fontIncreaseProfit2_" + depObj.index).attr("color", "black");
	}
}

function renderSumTempl(sumObj) {
	var container = jQuery("#sumContainer");
    var tmpl = jQuery("#sum_tmpl").html();
	// テンプレートロード
    var content = _.template(tmpl, 
    {
    	sum_currentYearSalesA : sumObj.sum_currentYearSalesA,
		sum_currentYearProfitA : sumObj.sum_currentYearProfitA,
		sum_currentYearSalesB : sumObj.sum_currentYearSalesB,
		sum_currentYearProfitB : sumObj.sum_currentYearProfitB,
		sum_currentYearSalesAB : sumObj.sum_currentYearSalesAB,
		sum_currentYearProfitAB : sumObj.sum_currentYearProfitAB,
		sum_currentYearSalesABC : sumObj.sum_currentYearSalesABC,
		sum_currentYearProfitABC : sumObj.sum_currentYearProfitABC,
		sum_lastYearSales : sumObj.sum_lastYearSales,
		sum_lastYearProfit : sumObj.sum_lastYearProfit,
		sum_lastYearBudgetSales : sumObj.sum_lastYearBudgetSales,
		sum_lastYearBudgetProfit : sumObj.sum_lastYearBudgetProfit,
		sum_increaseSales1 : sumObj.sum_increaseSales1,
		sum_increaseProfit1 : sumObj.sum_increaseProfit1,
		sum_increaseSales2 : sumObj.sum_increaseSales2,
		sum_increaseProfit2 : sumObj.sum_increaseProfit2
    });
    container.append(content);
    
    // 増減文字色変更
	if (parseInt(sumObj.sum_increaseSales1) >= 0) {
		jQuery("#fontSumIncreaseSales1").attr("color", "black");
	}
	if (parseInt(sumObj.sum_increaseProfit1) >= 0) {
		jQuery("#fontSumIncreaseProfit1").attr("color", "black");
	}
	if (parseInt(sumObj.sum_increaseSales2) >= 0) {
		jQuery("#fontSumIncreaseSales2").attr("color", "black");
	}
	if (parseInt(sumObj.sum_increaseProfit2) >= 0) {
		jQuery("#fontSumIncreaseProfit2").attr("color", "black");
	}
}

function event() {
	
	// 本部プルダウンリスト　Changeイベント
	jQuery("#honBuSel").change(function(event) {
		if (lockFlg) {
			alert(err_progress_msg);
			return;
		}
		var currentHonbuId = jQuery("#honBuSel option:selected").val();
		// 小本部関連
	    renderSmallHonbu(currentHonbuId);
	});
	
	// 小本部プルダウンリスト　Changeイベント
	jQuery("#smallHonBuSel").change(function(event) {
		if (lockFlg) {
			alert(err_progress_msg);
			return;
		}
		var currentSmallHonbuId = jQuery("#smallHonBuSel option:selected").val();
		// 局関連
		renderKyoku(currentSmallHonbuId);
	});
	
	// 局プルダウンリスト　Changeイベント
	jQuery("#kyokuSel").change(function(event) {
		if (lockFlg) {
			alert(err_progress_msg);
			return;
		}
		var currentKyokuId = jQuery("#kyokuSel option:selected").val();
		var selectedYear = jQuery("#yearList option:selected").val();
		// 部門関連
		renderDepList(currentKyokuId, selectedYear);
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
    var bcolor = 'backgroud_' + color;
    var number = 'number_' + num;
    var client = 'client_' + num;
    var yrplan = 'yrplan_' + num;
    var data01 = 'data01_' + num;
    var data02 = 'data02_' + num;
    var data03 = 'data03_' + num;
    var data04 = 'data04_' + num;
    var data05 = 'data05_' + num;
    var data06 = 'data06_' + num;
    var data07 = 'data07_' + num;
    var data08 = 'data08_' + num;
    var data09 = 'data09_' + num;
    var data10 = 'data10_' + num;
    var data11 = 'data11_' + num;
    var data12 = 'data12_' + num;
    var data13 = 'data13_' + num;
    var data14 = 'data14_' + num;
    var data15 = 'data15_' + num;
    var data16 = 'data16_' + num;
    document.getElementById(number).className = bcolor;
    document.getElementById(client).className = bcolor;
    document.getElementById(yrplan).className = bcolor;
    document.getElementById(data01).className = bcolor;
    document.getElementById(data02).className = bcolor;
    document.getElementById(data03).className = bcolor;
    document.getElementById(data04).className = bcolor;
    document.getElementById(data09).className = bcolor;
    document.getElementById(data10).className = bcolor;
    document.getElementById(data13).className = bcolor;
    document.getElementById(data14).className = bcolor;

    // 既に背景色が付いているエリアをどうするか
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