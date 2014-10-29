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
		main_charger = value.id;
		sel_user[value.id] = value.name;
	}
	//console.log('main_charger',value);
}

function getStrategyCharger(){
	
}

function setStrategyOtherCharger(value){
	//console.log('other_charger',value);
	_.each(value,function(item){
		sel_user[item.id] = item.name;
	});
	createRadioFromSelUser();
	initChargerStar();
}

function getStrategyOtherCharger(){

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
	jQuery('#strategy_accurcy').val(accurcy);
}

function getStrategyAccurcy(){
	return jQuery('#strategy_accurcy').val();
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
		//multi record exist,this data is wrong  
	}
	
	if(content.document){
		content = content.document;
	}
	
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
			setStrategyCharger(item.value);
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
			setStrategyAccurcy(parseInt(item.value.id) + 1);	
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
		strategy_code:getStrategyCode(),
		property:getStrategyProperty(),
		project:getStrategyProject(),
		type:getStrategyType(),
		strategy_name:getStrategyName(),
		customer_name:getStrategyCustomerName(),
		client_key:getStrategyClientKey(),
		main_charger:getStrategyCharger(),
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
	setStrategyCode(data.strategy_code);
	setStrategyProperty(data.property);
	setStrategyProject(data.project);
	setStrategyType(data.type);
	setStrategyName(data.strategy_name);
	setStrategyCustomerName(data.customer_name);
	setStrategyClientKey(data.client_key);
	setStrategyCharger(data.main_charger);
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
}

function getStrategyInfoByCode(code){
	var url = '/hibiki/rest/1/binders/strategy_management/views/10001/documents?strategy_code=' + code;
	
	tag.doget(url,function(err,result){
		if(err){
			return;
		}
		setStrategyContent(result);
		testGetValue();
	});
}

jQuery(function(){
	if(retrieve == 0){
		if(strategy_code != -1){
			getStrategyInfoByCode(strategy_code);
		}
		else{
		}
	}
	else{
		retrieveInfoFromServerTmpFile();
	}
});

function backupInfoInServerTmpFile(){
	var info = getStrategyJSONFromView();

	tag.dopost('/cgi-bin/custom/TAG/cache-plan-regist.cgi',JSON.stringify(info),function(err,data){
		if(err){
			console.log('errr-post!',err);
		}
		else{

			console.log(data);
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
	if(tag.strategy_code == -1){
		insertStrategy();
	}
	else{
		updateStrategy();
	}
}

function insertStrategy(){
	
}

function updateStrategy(){
	
}

function testGetValue(){
	console.log("testGetValueStart");
	console.log(getStrategyJSONFromView());
	console.log("testGetValueEnd");
}

function changeMainCharger(value){
	jQuery('#star_' + main_charger ).html('');
	jQuery('#star_' + value).html('<img id="star" src="/images/ja/custom/TAG/parts_hd16_053.gif" width="14" height="14" align="absmiddle" border=0>');
	main_charger = value;
}

function createRadioFromSelUser(){
	var html = '';
	_.each(sel_user,function(value,key){
		html += '<input type="radio" name="main_charger" value="' + key +'" onchange="changeMainCharger(this.value)"><img src="/images/ja/custom/TAG/ico_fc_user.png" title="一般ユーザ" align="absmiddle"/>';
		html += '<a href="#" onclick="#">' + value +'</a><span id="star_' + key +'"></span><br>';
	});
	jQuery('#strategy_charger').html(html);
}

function initChargerStar(){
	jQuery('input[value=' + main_charger + ']').attr('checked','true');
	jQuery('#star_' + main_charger ).html('<img id="star" src="/images/ja/custom/TAG/parts_hd16_053.gif" width="14" height="14" align="absmiddle" border=0>');
}

