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
	jQuery('#strategy_charger').html('<img src="/images/ja/custom/TAG/ico_fc_user.png" align="absmiddle" /><a href="#" onclick="">'+ value.name + '</a>');
}

function getStrategyCharger(){
	
}

function setStrategySales(sales){
	jQuery('input[name=strategy_sales]').val(sales);
}

function getStrategySales(){
	return jQuery('input[name=strategy_sales]').val();
}

function setStrategyMonthSales(month,sales){
	jQuery('input[name=strategy_sales_m' + month + ']').val(tag.addCommas(sales));
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
	jQuery('input[name=strategy_profit_m' + month + ']').val(tag.addCommas(profit));
}

function getStrategyMonthProfit(month){
	return jQuery('input[name=strategy_profit_m' + month + ']').val();
}

function setSalesSumViewer(value){
	jQuery('#sales_sum_viewer').text(tag.addCommas(value));
}

function getSalesSumViewer(){
	return jQuery('#sales_sum_viewer').text();
}

function setProfitSumViewer(value){
	jQuery('#profit_sum_viewer').text(tag.addCommas(value));
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
	
	return re