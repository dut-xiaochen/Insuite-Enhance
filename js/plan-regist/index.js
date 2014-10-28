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

function setStrategyName(name){
	jQuery('input[name=strategy_name]').val(name);
}

function getStrategyName(){
	return jQuery('input[name=strategy_name]').val();
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
	jQuery('input[name=strategy_type]').val(type);
}

function getStrategyType(){
	return jQuery('input[name=strategy_type]').val();
}

function setStrategyProject(project){
	jQuery('input[name=strategy_project]').val(project);
}

function getStrategyProject(){
	return jQuery('input[name=strategy_project]').val();
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

function setStrategyProfit(profit){
	jQuery('input[name=strategy_profit]').val(profit);
}

function getStrategyProfit(){
	return jQuery('input[name=strategy_profit]').val();
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
	jQuery('#strategy_period4').val(period);
}

function getStrategyPeriod4(){
	return jQuery('#strategy_period4').val();
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
	setCreatedDate(content.created_at);
	setUpdatedDate(content.updated_at);
	
	if(content.document){
		content = content.document[0];
	}
	
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
	});
}

function getStrategyJSONFromView(){
	return {
		strategy_code:getStrategyCode(),
		property:getStrategyProperty(),
		project:getStrategyProject(),
		type:getStrategyType(),
		strategy_name:getStrategyName(),
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
}

function setStrategyFromJSON(data){
	setStrategyCode(data.strategy_code);
	setStrategyProperty(data.property);
	setStrategyProject(data.project);
	setStrategyType(data.type);
	setStrategyName(data.strategy_name);
	setStrategyClientKey(data.client_key);
//	setStrategyCharger(data.main_charger);
	setStrategySales(data.sales);
	setStrategyProfit(data.profit);
	setStrategyPeriod2(data.period2);
	setStrategyPeriod3(data.period3);
	setStrategyPeriod4(data.period4);
	setStrategyAccurcy(data.accurcy);
	setStrategyMemo(data.memo);
	setCreatedDate(data.created_date);
	setUpdatedDate(data.updated_date);
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
	if(tag.retrieve == 0){
		if(tag.strategy_code != -1){
			getStrategyInfoByCode(tag.strategy_code);
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
	tag.doget('/cgi-bin/custom/TAG/cache-plan-regist.cgi',function(err,data){
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

function clearAllValue(){
	
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
	console.log(getStrategyCode());
	console.log(getStrategyName());
	console.log(getStrategyClientKey());
	console.log(getStrategyProperty());
	console.log(getStrategyType());
	console.log(getStrategyProject());
	console.log(getStrategyCharger());
	console.log(getStrategySales());
	console.log(getStrategyProfit());
	console.log(getStrategyPeriod2());
	console.log(getStrategyPeriod3());
	console.log(getStrategyMemo());
	console.log(getStrategyAccurcy());
	console.log("testGetValueEnd");
}


