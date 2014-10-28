// ラインオーバー
function lineOver(num,type) {
    lineBackcolorChange(num,'red',type);
    //document.getElementById(num).style.cursor = "hand";
    return;
}
// ラインアウト
function lineOut(num,line,type) {
    var color;
    if ( line == 'evenRow' ) {
        color = 'gray2';
    } else {
        color = 'white';
    }
    lineBackcolorChange(num,color,type);
    return;
}
// 背景色変更
function lineBackcolorChange(num,color,type){
    var bcolor = 'backgroud_' + color;
    var tr_id = type + '_line_' + num;
    document.getElementById(tr_id).className = bcolor;
}

function setBigTitleWithYear(year){
    var text = 'クライアント別 ' + (year-1).toString()+'年度見通し & ' + year.toString() +'年度計画';
    jQuery('#big_title').text(text);
}

function setThWithYear(year){
    jQuery('#th1').html('<b>' + year.toString() + '年度見込み<br>A・B</b>');
    jQuery('#th2').html((year-1).toString() + '年度見通し<br>');
    jQuery('#th3').html((year-1).toString() + '年度予算');
    jQuery('#th4').html(year.toString() + '年度目標<br>A・B・C');
}

function setStrategyTitleWithYear(year){
    jQuery('#strategy_t1').text((year-1).toString() + '年度実績・見込み');
    jQuery('#strategy_t2').text(year.toString() + '年度見込み');
    jQuery('#strategy_t3').text(year.toString() + '年度追加');
    jQuery('#strategy_t4').text(year.toString() + '年度追加');
}

function setNames(dept_name,client_name){
    jQuery('#dept_name').text(dept_name);
    jQuery('#client_name').text(client_name);
}

function setSalesAndBudget(d1,d2,d3,d4){
	jQuery('#sales_data_1').text(tag.addCommas(d1));
	jQuery('#sales_data_2').text(tag.addCommas(d2));
	
	var diff1 = d1 -d2;
	if(diff1 < 0){
		jQuery('#sales_data_3').attr('color','red');
	}
	else{
		jQuery('#sales_data_3').attr('color','black');
	}
	jQuery('#sales_data_3').text(tag.addCommas(diff1));
	
	jQuery('#sales_data_4').text(tag.addCommas(d3));
	
	var diff2 = d1 - d3;
	if(diff2 < 0){
		jQuery('#sales_data_5').attr('color','red');
	}
	else{
		jQuery('#sales_data_5').attr('color','black');
	}
	jQuery('#sales_data_5').text(tag.addCommas(diff2));
	jQuery('#sales_data_6').text(tag.addCommas(d4));
}

function setProfitAndBudget(d1,d2,d3,d4){
	jQuery('#profit_data_1').text(tag.addCommas(d1));
	jQuery('#profit_data_2').text(tag.addCommas(d2));
	
	var diff1 = d1 -d2;
	if(diff1 < 0){
		jQuery('#profit_data_3').attr('color','red');
	}
	else{
		jQuery('#profit_data_3').attr('color','black');
	}
	jQuery('#profit_data_3').text(tag.addCommas(diff1));
	
	jQuery('#profit_data_4').text(tag.addCommas(d3));
	
	var diff2 = d1 - d3;
	if(diff2 < 0){
		jQuery('#profit_data_5').attr('color','red');
	}
	else{
		jQuery('#profit_data_5').attr('color','black');
	}
	
	jQuery('#profit_data_5').text(tag.addCommas(diff2));
	jQuery('#profit_data_6').text(tag.addCommas(d4));
}

function setProfitSums(a,b,ab,c,abc){
	jQuery('#profit_sum_a').text(tag.addCommas(a));
	jQuery('#profit_sum_b').text(tag.addCommas(b));
	jQuery('#profit_sum_ab').text(tag.addCommas(ab));
	jQuery('#profit_sum_c').text(tag.addCommas(c));
	jQuery('#profit_sum_abc').text(tag.addCommas(abc));
}

function setSalesSums(a,b,ab,c,abc){
	jQuery('#sales_sum_a').text(tag.addCommas(a));
	jQuery('#sales_sum_b').text(tag.addCommas(b));
	jQuery('#sales_sum_ab').text(tag.addCommas(ab));
	jQuery('#sales_sum_c').text(tag.addCommas(c));
	jQuery('#sales_sum_abc').text(tag.addCommas(abc));
}

function setContinueStrategyContents(contents){
    var container = jQuery("#continue_strategy_container");
    var tmpl = jQuery("#continue_strategy_tmpl").html();

    _.each(contents, function(item,index) {
        var content = _.template(tmpl, 
        {
            id:index,
            odd_or_even:index%2 == 1 ? "evenRow": "oddRow",
            project: item.project,
            type: item.type,
            strategy_code:item.strategy_code,
            strategy_name:item.strategy_name,
            main_charger:item.main_charger,
            pre_sales:tag.addCommas(item.pre_sales),
            pre_profit:tag.addCommas(item.pre_profit),
            pre_time:item.pre_time,
            sales:tag.addCommas(item.sales),
            profit:tag.addCommas(item.profit),
            period2:item.period2,
            period3:item.period3,
            accurcy:item.accurcy,
            create_date:item.create_date,
            update_date:item.update_date
        });
        container.append(content);
    });
}

function setSumOfContinueStrategy(sum1,sum2,sum3,sum4){
    jQuery('#continue_strategy_sum1').text(tag.addCommas(sum1));
    jQuery('#continue_strategy_sum2').text(tag.addCommas(sum2));
    jQuery('#continue_strategy_sum3').text(tag.addCommas(sum3));
    jQuery('#continue_strategy_sum4').text(tag.addCommas(sum4));
}

function setNewStrategyContents(contents){
    var container = jQuery("#new_strategy_container");
    var tmpl = jQuery("#new_strategy_tmpl").html();

    _.each(contents, function(item,index) {
        var content = _.template(tmpl, 
        {
            id:index,
            odd_or_even:index%2 == 1 ? "evenRow": "oddRow",
            project: item.project,
            type: item.type,
            strategy_code:item.strategy_code,
            strategy_name:item.strategy_name,
            main_charger:item.main_charger,
            sales:tag.addCommas(item.sales),
            profit:tag.addCommas(item.profit),
            period2:item.period2,
            period3:item.period3,
            accurcy:item.accurcy,
            create_date:item.create_date,
            update_date:item.update_date
        });
        container.append(content);

    });
}

function setSumOfNewStrategy(sum1,sum2){
    jQuery('#new_strategy_sum1').text(tag.addCommas(sum1));
    jQuery('#new_strategy_sum2').text(tag.addCommas(sum2));
}

function setChallengeStrategyContents(contents){
    var container = jQuery("#challenge_strategy_container");
    var tmpl = jQuery("#challenge_strategy_tmpl").html();

    _.each(contents, function(item,index) {
        var content = _.template(tmpl, 
        {
            id:index,
            odd_or_even:index%2 == 1 ? "evenRow": "oddRow",
            project: item.project,
            type: item.type,
            strategy_code:item.strategy_code,
            strategy_name:item.strategy_name,
            main_charger:item.main_charger,
            sales:tag.addCommas(item.sales),
            profit:tag.addCommas(item.profit),
            period2:item.period2,
            period3:item.period3,
            accurcy:item.accurcy,
            create_date:item.create_date,
            update_date:item.update_date
        });
        container.append(content);
    });
}

function setSumOfChallengeStrategy(sum1,sum2){
    jQuery('#challenge_strategy_sum1').text(tag.addCommas(sum1));
    jQuery('#challenge_strategy_sum2').text(tag.addCommas(sum2));
}

function convertTimeFormat(year){
	return year.substring(2,4) + '/'+ year.substring(5,7);
}

function createStrategy(doc){
	var result = {};
	result["create_date"] = convertTimeFormat(doc["created_at"]);
	result["update_date"] = convertTimeFormat(doc["updated_at"]);
	
	_.each(doc["item"],function(item){
		if(item["key"] == "customer_code"){
			result["customer_code"] = item["value"];
		}
		else if(item["key"] == "charge_group"){
			result["charge_group"] = item["value"]["id"];
		}
		else if(item["key"] == "year"){
			result["year"] = item["value"];
		}
		else if(item["key"] == "property"){
			result["property"] = item["value"]["id"];
		}
		else if(item["key"] == "project"){
			result["project"] = item["value"];
		}
		else if(item["key"] == "type"){
			result["type"] = item["value"];
		}
		else if(item["key"] == "strategy_code"){
			result["strategy_code"] = item["value"];
		}
		else if(item["key"] == "strategy_name"){
			result["strategy_name"] = item["value"];
		}
		else if(item["key"] == "strategy_code"){
			result["strategy_code"] = item["value"];
		}
		else if(item["key"] == "main_charger"){
			if(item["value"]){
				result["main_charger"] = item["value"]["name"];
			}
			else{
				result["main_charger"] = "";
			}
			
		}
		else if(item["key"] == "sales"){
			result["sales"] = item["value"];
		}
		else if(item["key"] == "profit"){
			result["profit"] = item["value"];
		}
		else if(item["key"] == "period2"){
			result["period2"] = item["value"];
		}
		else if(item["key"] == "period3"){
			result["period3"] = item["value"];
		}
		else if(item["key"] == "accurcy"){
			if(item["value"]){
				result["accurcy"] = item["value"]["name"];
			}
			else{
				result["accurcy"] = "";
			}
		}
	});
	return result;
}

function convertToContinueStrategy(strategy,pre_year_data){
	var result = {
	    project: strategy.project,
        type: strategy.type,
        strategy_code:strategy.strategy_code,
        strategy_name:strategy.strategy_name,
        main_charger:"",
        pre_sales:0,
        pre_profit:0,
        pre_time:"",
        sales:strategy.sales,
        profit:strategy.profit,
        period2:strategy.period2,
        period3:strategy.period3,
        accurcy:strategy.accurcy,
        create_date:strategy.create_date,
        update_date:strategy.update_date
	};
	
	var pre = pre_year_data["pre_year_data"][result.strategy_code.substring(4,result.strategy_code.length)];
	
	if(pre){
		result.main_charger = pre.main_charger;
		result.pre_sales = pre.sales;
		result.pre_profit = pre.profit;
		result.pre_time = pre.year;
	}
	
	return result;
}

function convertToNewStrategy(strategy){
	var result = {
	    project: strategy.project,
        type: strategy.type,
        strategy_code:strategy.strategy_code,
        strategy_name:strategy.strategy_name,
        main_charger:strategy.main_charger,
        sales:strategy.sales,
        profit:strategy.profit,
        period2:strategy.period2,
        period3:strategy.period3,
        accurcy:strategy.accurcy,
        create_date:strategy.create_date,
        update_date:strategy.update_date
	};
	return result;
}

function convertToChallengeStragegy(strategy){
	var result = {
	    project: strategy.project,
        type: strategy.type,
        strategy_code:strategy.strategy_code,
        strategy_name:strategy.strategy_name,
        main_charger:strategy.main_charger,
        sales:strategy.sales,
        profit:strategy.profit,
        period2:strategy.period2,
        period3:strategy.period3,
        accurcy:strategy.accurcy,
        create_date:strategy.create_date,
        update_date:strategy.update_date
	};
	return result;
}

function getPreYearData(year,custom_code,charge_group_code){
	
	var url = '/hibiki/rest/1/binders/strategy_management/views/10001/documents?year=' 
	+ (year-1).toString() + '&&customer_code=' + custom_code +'&&charge_group=' + charge_group_code;
	
	tag.doget(url,function(err,result){
		if(err){
			return;
		}
		
		var r = {};
		r["pre_year_data"] = {};
		r["sales_sum_of_A_plus_B"] = 0;
		r["profit_sum_of_A_plus_B"] = 0;
		
		_.each(result.document,function(doc){
			var strategy = createStrategy(doc);
			r["pre_year_data"][strategy.strategy_code.substring(4,strategy.strategy_code.length)] = strategy;
			if(strategy["accurcy"] == "A"){
				r["sales_sum_of_A_plus_B"] += parseInt(strategy["sales"]);
				r["profit_sum_of_A_plus_B"] += parseInt(strategy["profit"]);
			}
			if(strategy["accurcy"] == "B"){
				r["sales_sum_of_A_plus_B"] += parseInt(strategy["sales"]);
				r["profit_sum_of_A_plus_B"] += parseInt(strategy["profit"]);
			}
		});
		getThisYearData(year,custom_code,charge_group_code,r);
	});
}

function getThisYearData(year,custom_code,charge_group_code,pre_year_data){
	
	var url = '/hibiki/rest/1/binders/strategy_management/views/10001/documents?year=' 
	+ year.toString() + '&&customer_code=' + custom_code +'&&charge_group=' + charge_group_code;
	
	tag.doget(url,function(err,result){
		if(err){
			return;
		}
		
		var sales_sum_of_A = 0;
		var sales_sum_of_B = 0;
		var sales_sum_of_C = 0;
		
		var profit_sum_of_A = 0;
		var profit_sum_of_B = 0;
		var profit_sum_of_C = 0;
		
		var pre_sales_sum = 0;
		var pre_profit_sum = 0;
		var continue_sales_sum = 0;
		var continue_profit_sum = 0;
		var new_sales_sum = 0;
		var new_profit_sum = 0;
		var challenge_sales_sum = 0;
		var challenge_profit_sum = 0;
		
		var continue_strategy = [];
		var new_strategy = [];
		var challenge_strategy = [];
		
		_.each(result.document,function(doc){
			var strategy = createStrategy(doc);
			if(strategy["accurcy"] == "A"){
				sales_sum_of_A += parseInt(strategy["sales"]);
				profit_sum_of_A += parseInt(strategy["profit"]);
				//console.log("1",strategy["sales"],strategy["profit"]);
			}
			else if(strategy["accurcy"] == "B"){
				sales_sum_of_B += parseInt(strategy["sales"]);
				profit_sum_of_B += parseInt(strategy["profit"]);
				//console.log("2",strategy["sales"],strategy["profit"]);
			}
			else if(strategy["accurcy"] == "C"){
				sales_sum_of_C += parseInt(strategy["sales"]);
				profit_sum_of_C += parseInt(strategy["profit"]);
				//console.log("3",strategy["sales"],strategy["profit"]);
			}
			
			if(strategy["property"] == "1"){
				var s = convertToContinueStrategy(strategy,pre_year_data);
				pre_sales_sum += parseInt(s.pre_sales);
				pre_profit_sum += parseInt(s.pre_profit);
				continue_sales_sum += parseInt(s.sales);
				continue_profit_sum += parseInt(s.profit);
				continue_strategy.push(s);
			}
			else if(strategy["property"] == "2"){
				var s = convertToNewStrategy(strategy);
				new_sales_sum += parseInt(s.sales);
				new_profit_sum += parseInt(s.profit);
				new_strategy.push(s);
			}
			else if(strategy["property"] == "3"){
				var s = convertToChallengeStragegy(strategy);
				challenge_sales_sum += parseInt(s.sales);
				challenge_profit_sum += parseInt(s.profit);
				challenge_strategy.push(s);
			}
		});
		setSumOfContinueStrategy(pre_sales_sum,pre_profit_sum,continue_sales_sum,continue_profit_sum);
		setSumOfNewStrategy(new_sales_sum,new_profit_sum);
		setSumOfChallengeStrategy(challenge_sales_sum,challenge_profit_sum);
		
		setProfitSums(profit_sum_of_A,profit_sum_of_B,profit_sum_of_A+profit_sum_of_B,profit_sum_of_C,profit_sum_of_A+profit_sum_of_B+profit_sum_of_C);
		setSalesSums(sales_sum_of_A,sales_sum_of_B,sales_sum_of_A+sales_sum_of_B,sales_sum_of_C,sales_sum_of_A+sales_sum_of_B+sales_sum_of_C);
		
		setContinueStrategyContents(continue_strategy);
		setNewStrategyContents(new_strategy);
		setChallengeStrategyContents(challenge_strategy);
		
		
		var this_year_data = {};
		this_year_data["sales_sum_ab"] = sales_sum_of_A+sales_sum_of_B;
		this_year_data["profit_sum_ab"] = profit_sum_of_A+profit_sum_of_B;
		this_year_data["sales_sum_abc"] = sales_sum_of_A+sales_sum_of_B +sales_sum_of_C;
		this_year_data["profit_sum_abc"] = profit_sum_of_A+profit_sum_of_B+profit_sum_of_C;
		getBudget(year - 1,custom_code,charge_group_code,pre_year_data,this_year_data);
	});
}

function setYear(year){
	setBigTitleWithYear(year);
	setThWithYear(year);
	setStrategyTitleWithYear(year);
}

function getBudget(year,custom_code,charge_group_code,pre_year_data,this_year_data){
	var url = '/hibiki/rest/1/binders/budget/views/10001/documents?year=' 
	+ year.toString() + '&&tag_client_name=' + custom_code +'&&charge_group=' + charge_group_code;
	
	tag.doget(url,function(err,result){
		if(err){
			return;
		}
		
		var items = [];
		if(result.totalCount != "0"){
			items = result["document"]["item"];
		}
		
		var ret = {
			"budget_sum_sales":0,
			"budget_sum_profit":0
		};
		
		_.each(items,function(item){
			if(item["key"] == "budget_sum_sales"){
				ret["budget_sum_sales"] = item["value"];
			}
			if(item["key"] == "budget_sum_profit"){
				ret["budget_sum_profit"] = item["value"];
			}
		});
		setSalesAndBudget(this_year_data["sales_sum_ab"],pre_year_data["sales_sum_of_A_plus_B"],ret["budget_sum_sales"],this_year_data["sales_sum_abc"]);
		setProfitAndBudget(this_year_data["profit_sum_ab"],pre_year_data["profit_sum_of_A_plus_B"],ret["budget_sum_profit"],this_year_data["profit_sum_abc"]);
	});
}

jQuery(function(){
	setNames(dept_name,customer_name);
	getPreYearData(year,customer_code,dept_code);
	setYear(year);
});

function makePlan(type){
	window.open("/cgi-bin/custom/TAG/plan-regist.cgi?mode="+type);
}

function editPlan(id){
	window.ope