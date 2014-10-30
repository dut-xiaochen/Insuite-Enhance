function checkNum(obj) {
     if (isNaN(obj.value)) {
         obj.value = "";
     }
     if (obj != null) {
         if (obj.value.toString().split(".").length > 1 && obj.value.toString().split(".")[1].length > 2) {
             //alert("小数点后多于两位！");
             obj.value = "";
         }
     }
 }

function detailAmount(id){
    var obj = document.getElementById(id);
    if (obj.style.display == "block") {
        obj.style.display = "none";
    } else {
        obj.style.display = "block";
    }
}

function setCachedMainCharger(charger){
	main_charger = charger;
}

function getCachedMainCharger(){
	return main_charger;
}

function addSelUser(id,name){
	sel_user[id] = name;
}

function setStrategyCode(code){
	jQuery('#strategy_code').text(code.toString());
}

function getStrategyCode(){
	return jQuery('#strategy_code').text();
}

function setStrategyCustomerName(name){
	jQuery('#customer_name').text(name);
}

function getStrategyCustomerName(){
	return jQuery('#customer_name').text();
}

function setStrategyName(name){
	if(mode == "edit_continue_strategy"){
		jQuery('#strategy_name').text(name);
	}else{
		jQuery('input[name=strategy_name]').val(name);
	}
}

function getStrategyName(){
	if(mode == "edit_continue_strategy"){
		return jQuery('#strategy_name').text();
	}else{
		return jQuery('input[name=strategy_name]').val();
	}
}

function setStrategyClientKey(key){
	jQuery('input[name=strategy_client_key]').val(key);
}

function getStrategyClientKey(){
	return jQuery('input[name=strategy_client_key]').val();
}

function setStrategyProperty(property){
	jQuery('#strategy_property').text(property);
}

function getStrategyProperty(){
	return jQuery('#strategy_property').text();
}

function setStrategyType(type){
	if(mode == "edit_continue_strategy"){
		jQuery('#strategy_type').text(type);
	}else{
		jQuery('input[name=strategy_type]').val(type);
	}
}

function getStrategyType(){
	if(mode == "edit_continue_strategy"){
		return jQuery('#strategy_type').text();
	}else{
		return jQuery('input[name=strategy_type]').val();
	}
}

function setStrategyProject(project){
	if(mode == "edit_continue_strategy"){
		jQuery("#strategy_project").text(project);
	}else{
		jQuery('input[name=strategy_project]').val(project);
	}
}

function getStrategyProject(){
	if(mode == "edit_continue_strategy"){
		return jQuery("#strategy_project").text();
	}else{
		return jQuery('input[name=strategy_project]').val();
	}
}

function setStrategyCharger(value){
	if(value.id){
		setCachedMainCharger(value.id);
		sel_user[value.id] = value.name;
	}
	//console.log('main_charger',value);
}

function setStrategyOtherCharger(value){
	//console.log('other_charger',value);
	if(value){
		if(!value.length){
			value = [value];
		}
		_.each(value,function(item){
			sel_user[item.id] = item.name;
		});
	}
	createRadioFromSelUser();
}

function setStrategySales(sales){
	jQuery('input[name=strategy_sales]').val(sales);
}

function getStrategySales(){
	return jQuery('input[name=strategy_sales]').val();
}

function setStrategyMonthSales(month,sales){
	var node = 'input[name=strategy_sales_m' + month + ']';
	jQuery(node).val(sales);
}

function getStrategyMonthSales(month){
	return jQuery('input[name=strategy_sales_m' + month + ']').val();
}

function setStrategyProfit(profit){
	jQuery('input[name=strategy_profit]').val(profit);
}

function getStrategyProfit(){
	return jQuery('input[name=strategy_profit]').val();
}

function setStrategyMonthProfit(month,profit){
	var node = 'input[name=strategy_profit_m' + month + ']';
	jQuery(node).val(profit);
}

function getStrategyMonthProfit(month){
	return jQuery('input[name=strategy_profit_m' + month + ']').val();
}

function setSalesSumViewer(){
	var sum = 0;
	for(var month = 1; month < 13; month++){
		var value = getStrategyMonthSales(month);
		value = parseInt(value);
		if(!isNaN(value)){
			sum += value;
		}
	}
	jQuery('#sales_sum_viewer').text(tag.addCommas(sum));
}

function getSalesSumViewer(){
	return jQuery('#sales_sum_viewer').text();
}

function setProfitSumViewer(){
	var sum = 0;
	for(var month = 1; month < 13; month++){
		var value = getStrategyMonthProfit(month);
		value = parseInt(value);
		if(!isNaN(value)){
			sum += value;
		}
	}
	jQuery('#profit_sum_viewer').text(tag.addCommas(sum));
}

function getProfitSumViewer(){
	return jQuery('#profit_sum_viewer').text();
}

function setStrategyPeriod2(period){
	jQuery('input[name=strategy_period2]').val(period);
}

function getStrategyPeriod2(){
	return jQuery('input[name=strategy_period2]').val();
}

function setStrategyPeriod3(period){
	jQuery('input[name=strategy_period3]').val(period);
}

function getStrategyPeriod3(){
	return jQuery('input[name=strategy_period3]').val();
}

function setStrategyPeriod4(period){
	var p = (parseInt(period) - 2013).toString();
	jQuery('#strategy_period4').val(p);
}

function getStrategyPeriod4(){
	var p = (parseInt(jQuery('#strategy_period4').val()) + 2013).toString();
	return p;
}

function setStrategyMemo(memo){
	jQuery('textarea[name=strategy_memo]').val(memo);
}

function getStrategyMemo(){
	return jQuery('textarea[name=strategy_memo]').val();
}

function setStrategyAccurcy(accurcy){
	jQuery('#strategy_accurcy').val(accurcy  + 1 );
}

function getStrategyAccurcy(){
	return parseInt(jQuery('#strategy_accurcy').val())- 1;
}

function setCreatedDate(date){
	jQuery('#created_date').text(date);
}

function getCreatedDate(){
	return jQuery('#created_date').text();
}

function setUpdatedDate(date){
	jQuery('#updated_date').text(date);
}

function getUpdatedDate(){
	return jQuery('#updated_date').text();
}

function setStrategyContent(content){
	
	if(content.totalCount > 1){
		alert("multi data found!");
	}
	
	if(content.document){
		content = content.document;
	}
	
	setStrategyCustomerName(customer_name);
	setCreatedDate(content.created_at);
	setUpdatedDate(content.updated_at);
	
	_.each(content.item,function(item){
		if(item.key){
			//console.log(item);
		}
		
		if(item.key == "strategy_code"){
			setStrategyCode(item.value);
		}
		else if(item.key == "strategy_name"){
			setStrategyName(item.value);
		}
		else if(item.key == "client_key"){
			setStrategyClientKey(item.value);
		}
		else if(item.key == "property"){
			setStrategyProperty(item.value.name);
		}
		else if(item.key == "project"){
			setStrategyProject(item.value);
		}
		else if(item.key == "type"){
			setStrategyType(item.value);
		}
		else if(item.key == "memo"){
			setStrategyMemo(item.value);
		}
		else if(item.key == "main_charger"){
			if(item.value){
				setCachedMainCharger(item.value.id);
				addSelUser(item.value.id,item.value.name);
			}
		}
		else if(item.key == "other_charger"){
			setStrategyOtherCharger(item.value);
		}
		else if(item.key == "sales"){
			setStrategySales(item.value);
		}
		else if(item.key == "profit"){
			setStrategyProfit(item.value);
		}
		else if(item.key == "period2"){
			setStrategyPeriod2(item.value);
		}
		else if(item.key == "period3"){
			setStrategyPeriod3(item.value);
		}
		else if(item.key == "period4"){
			setStrategyPeriod4(item.value);
		}
		else if(item.key == "accurcy"){
			setStrategyAccurcy(parseInt(item.value.id));	
		}
		else if(item.key.substring(0,6) == "sales_"){
			var month = item.key.substring(6,item.key.length);
			setStrategyMonthSales(month,item.value);
		}
		else if(item.key.substring(0,7) == "profit_"){
			var month = item.key.substring(7,item.key.length);
			setStrategyMonthProfit(month,item.value);
		}
		setSalesSumViewer();
		setProfitSumViewer();
	});
}

function getStrategyJSONFromView(){
	var result = {
		property:getStrategyProperty(),
		project:getStrategyProject(),
		type:getStrategyType(),
		strategy_name:getStrategyName(),
		client_key:getStrategyClientKey(),
		sales:getStrategySales(),
		profit:getStrategyProfit(),
		period2:getStrategyPeriod2(),
		period3:getStrategyPeriod3(),
		period4:getStrategyPeriod4(),
		accurcy:getStrategyAccurcy(),
		memo:getStrategyMemo(),
		created_date:getCreatedDate(),
		updated_date:getUpdatedDate()
	};
	
	//gloabl var saved
	result.strategy_code = strategy_code;
	result.mode = mode;
	result.year = year;
	result.customer_code = customer_code;
	result.customer_name = customer_name;
	result.charge_group = charge_group;
	result.record_id = record_id;
	result.main_charger = main_charger;
	
	var key = "";
	var value = "";
	for(var month = 1; month < 13; month++){
		key = "sales_" + month.toString();
		value = getStrategyMonthSales(month);
		result[key] = value;
		
		key = "profit_" + month.toString();
		value = getStrategyMonthProfit(month);
		result[key] = value;
	}
	
	return result;
}

function setStrategyFromJSON(data){
	if(data.strategy_code != -1){
		setStrategyCode(strategy_code);
	}
	setStrategyProperty(data.property);
	setStrategyProject(data.project);
	setStrategyType(data.type);
	setStrategyName(data.strategy_name);
	setStrategyCustomerName(data.customer_name);
	setStrategyClientKey(data.client_key);
	setStrategySales(data.sales);
	setStrategyProfit(data.profit);
	setStrategyPeriod2(data.period2);
	setStrategyPeriod3(data.period3);
	setStrategyPeriod4(data.period4);
	setStrategyAccurcy(data.accurcy);
	setStrategyMemo(data.memo);
	setCreatedDate(data.created_date);
	setUpdatedDate(data.updated_date);
	
	var key = "";
	var value = "";
	for(var month = 1; month < 13; month++){
		key = "sales_" + month.toString();
		value = data[key];
		setStrategyMonthSales(month,value);
		
		key = "profit_" + month.toString();
		value = data[key];
		setStrategyMonthProfit(month,value);
	}
	setSalesSumViewer();
	setProfitSumViewer();
	setCachedMainCharger( data.main_charger);
	createRadioFromSelUser();
	//setStrategyCharger(data.main_charger);
	//setStrategyOtherCharger(data.other_charger);
	
	mode = data.mode;
	year = data.year;
	customer_code = data.customer_code;
	customer_name = data.customer_name;
	charge_group = data.charge_group;
	record_id = data.record_id;
	strategy_code = data.strategy_code;
	
	//main_charger = data.main_charger;
}

function getStrategyInfoByCode(code){
	var url = '/hibiki/rest/1/binders/strategy_management/views/10001/documents?strategy_code=' + code;
	
	tag.doget(url,function(err,result){
		if(err){
			alert("get data failed!");
			return;
		}
		setStrategyContent(result);
	});
}

function initRegistNewStrategy(){
	setStrategyCustomerName(customer_name);
	
	//strategy_code
	//create_date
	//update_date
	
	if(mode == 'new'){
		setStrategyProperty('新規施策');	
	}
	else if(mode == 'challenge'){
		setStrategyProperty('プロモート・チャレンジ施策');
	}
}

jQuery(function(){
	if(retrieve == 0){
		if(strategy_code != -1){
			getStrategyInfoByCode(strategy_code);
		}
		else{
			initRegistNewStrategy();
		}
	}
	else{
		retrieveInfoFromServerTmpFile();
	}
});

function backupInfoInServerTmpFile(){
	var info = getStrategyJSONFromView();
	//JSON.stringify(info)
	tag.dopost('/cgi-bin/custom/TAG/cache-plan-regist.cgi',info,function(err,data){
		if(err){
			//console.log('errr-post!',err);
		}
		else{
			//console.log(data);
		}
	});
}

function retrieveInfoFromServerTmpFile(){
	tag.doget('/cgi-bin/custom/TAG/cache-plan-regist.cgi?1',function(err,data){
		if(err){
			return;
		}
		setStrategyFromJSON(data.data);					
	});
}

function onSelectUser(){
	backupInfoInServerTmpFile();
	openSelectUserWin();
}

function insertOrUpdateStrategy(){
	if(strategy_code == -1){
		insertStrategy();
	}
	else{
		updateStrategy();
	}
}

function getOtherChargerString(){
	var result = '';
	_.each(sel_user,function(value,key){
		if(key != main_charger){
			result += (key + '\n');
		}
	});
	if(result.length > 1){
		result = result.substring(0,result.length - 1);
	}
	return result;
}

function updateAutoNumber(id,num){
	var update_num = tag.padLeft(parseInt(num) + 1);
	var update_url = '/hibiki/rest/1/binders/auto_number/documents/' + id;
	tag.doput(update_url, {"auto_number":update_num}, function (err, result) {
		if (err) {
			alert("システムエラー発生しまいました！");
		}
	});
}

function getAutoNumber(callback){
	var url = '/hibiki/rest/1/binders/auto_number/views/allData/documents?number_type=1'
	tag.doget(url, function(err, result) {
		if (err) {
			alert("システムエラー発生しまいました！");
		}
		var cur = tag.createIncrease(result.document);
        callback(cur.id,cur.auto_number);
	});
}

function insertStrategy(){
	
	var property = "";
	if(mode == "new"){
		property = "2";
	}
	else if(mode == "challenge"){
		property = "3";
	}
	else{
		alert("システムエラー発生しまいました！");
		return;
	}
	
	var data = {
		"customer_code":customer_code,
		"charge_group":charge_group,
		"strategy_code":"",
		"year":year,
		"property":property,
		"project":getStrategyProject(),
		"type":getStrategyType(),
		"strategy_name":getStrategyName(),
		"client_key":getStrategyClientKey(),
		"main_charger":getCachedMainCharger(),
		"other_charger":getOtherChargerString(),
		"sales":getStrategySales(),
		"profit":getStrategyProfit(),
		"period2":getStrategyPeriod2(),
		"period3":getStrategyPeriod3(),
		"period4":getStrategyPeriod4(),
		"accurcy":getStrategyAccurcy().toString(),
		"memo":getStrategyMemo()
	};
	
	var key = "";
	var value = "";
	for(var month = 1; month < 13; month++){
		key = "sales_" + month.toString();
		value = getStrategyMonthSales(month);
		data[key] = value;
		
		key = "profit_" + month.toString();
		value = getStrategyMonthProfit(month);
		data[key] = value;
	}
	
	getAutoNumber(function(id,num){
		updateAutoNumber(id,num);
		data["strategy_code"] = data.year + num;
		
		strategy_code = data["strategy_code"];
		
		
		var url = '/hibiki/rest/1/binders/strategy_management/documents/';
		tag.dopost(url,data,function(err,data){
			if(err){
				alert("エーラ！");
			}
			else{
				alert("データが追加しました。");
				onUpdateOrInsertOver();
			}
		});
	});
}

function updateStrategy(){
	var data = {
		"project":getStrategyProject(),
		"type":getStrategyType(),
		"strategy_name":getStrategyName(),
		"client_key":getStrategyClientKey(),
		"main_charger":getCachedMainCharger(),
		"other_charger":getOtherChargerString(),
		"sales":getStrategySales(),
		"profit":getStrategyProfit(),
		"period2":getStrategyPeriod2(),
		"period3":getStrategyPeriod3(),
		"period4":getStrategyPeriod4(),
		"accurcy":getStrategyAccurcy().toString(),
		"memo":getStrategyMemo()
	};
	
	var key = "";
	var value = "";
	for(var month = 1; month < 13; month++){
		key = "sales_" + month.toString();
		value = getStrategyMonthSales(month);
		data[key] = value;
		
		key = "profit_" + month.toString();
		value = getStrategyMonthProfit(month);
		data[key] = value;
	}
	//console.log(data);
	var url = '/hibiki/rest/1/binders/strategy_management/documents/' + record_id;
	tag.doput(url, data ,function(err,data){
		if(err){
			alert("エーラ！");
		}
		else{
			alert("データが更新しました。");
			onUpdateOrInsertOver();
		}
	});
}

function onUpdateOrInsertOver(){
	jQuery("#plan_regist_form").attr("action", "/cgi-bin/custom/TAG/plan-regist.cgi");
	jQuery("input[name=mode]").val(mode);
	jQuery("input[name=year]").val(year);
	jQuery("input[name=customer_code]").val(customer_code);
	jQuery("input[name=customer_name]").val(customer_name);
	jQuery("input[name=charge_group]").val(charge_group);
	jQuery("input[name=record_id]").val(record_id);
	jQuery("input[name=strategy_code]").val(strategy_code);
	jQuery("input[name=backup_tmp]").val("1");
	jQuery("#plan_regist_form").submit();
}

function testGetValue(){
	//console.log("testGetValueStart");
	//console.log(getStrategyJSONFromView());
	//console.log("testGetValueEnd");
}

function changeMainCharger(value){
	jQuery('#star_' + getCachedMainCharger() ).html('');
	jQuery('#star_' + value).html('<img id="star" src="/images/ja/custom/TAG/parts_hd16_053.gif" width="14" height="14" align="absmiddle" border=0>');
	setCachedMainCharger(value);
}

function createRadioFromSelUser(){
	var html = '';
	_.each(sel_user,function(value,key){
		html += '<input type="radio" name="main_charger" value="' + key +'" onchange="changeMainCharger(this.value)"><img src="/images/ja/custom/TAG/ico_fc_user.png" title="一般ユーザ" align="absmiddle"/>';
		html += '<a href="#" onclick="#">' + value +'</a><span id="star_' + key +'"></span><br>';
	});
	jQuery('#strategy_charger').html(html);
	
	if(main_charger == ""){
		return;
	}
	
	if(!sel_user[main_charger]){
		return;
	}
	
	jQuery('input[value=' + getCachedMainCharger() + ']').attr('checked','true');
	jQuery('#star_' + getCachedMainCharger() ).html('<img id="star" src="/images/ja/custom/TAG/parts_hd16_053.gif" width="14" height="14" align="absmiddle" border=0>');
}

