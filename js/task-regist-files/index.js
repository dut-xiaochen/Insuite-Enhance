jQuery(function () {
	init_data();
	// render();
	// events();
});

function render() {
	var currentYear = new Date().getFullYear();
	var currentMonth = new Date().getMonth() + 1;
	var currentDay = new Date().getDate();
	
	var yearOptionValues = [];
	yearOptionValues.push(currentYear - 1);
	yearOptionValues.push(currentYear);
	yearOptionValues.push(currentYear + 1);
	tag.renderSelect("milestoneSettingDateYear", yearOptionValues, yearOptionValues, currentYear);
	
	var monthOptionValues = [];
	for(var i=0;i<12;i++) {
		monthOptionValues.push(i+1);
	}
	tag.renderSelect("milestoneSettingDateMonth", monthOptionValues, monthOptionValues, currentMonth);
	
	var dayOptionValues = [];
	for(var i=0;i<31;i++) {
		dayOptionValues.push(i+1);
	}
	tag.renderSelect("milestoneSettingDateDay", dayOptionValues, dayOptionValues, currentDay);
	
	// renderTemplate
	var container = jQuery("#container");
	var tmpl = jQuery("#tmpl_status").html();
	var list = [{"fieldCode": "1111", "fieldName": "2222"},{"fieldCode": "aaaa", "fieldName": "bbbb"}];
	_.each(list, function(item) {
		container.append(_.template(tmpl, {
			fieldCode: item.fieldCode
				, fieldName: item.fieldName
		}));
	});
}

function init_data() {
	
	// 一覧
//	tag.doget("/hibiki/rest/1/binders/", function(err, result) {
//		if (err) {
//			alert("Error");
//			return;
//		}
//		var binderIds = [];
//		var binderList = result.binder;
//		jQuery.each(binderList,function(index,binder){
//		    jQuery("#binders").append("<p>"+binder.id+"</p>");
//		});
//	});
	
	//　新規
	tag.dopost("/hibiki/rest/1/binders/test_binder/documents/", {"test_key" :"test_key...."}, function(err, result) {
		console.log(result);
		if (err) {
			alert("Error");
			return;
		}
	});
	
//	//　更新
//	tag.doput("/hibiki/rest/1/binders/10061/documents/7", {10002:"お疲れ様です。.", _method:'PUT'}, function (err, result) {
//		console.log(err);
//	});
	
}

function events() {
	var msgList = ["閉じるボタンクリック","保存ボタンクリック"];
	jQuery("#closeBtn").click(function(e) {
		alert(jQuery("#closeBtn").val() + msgList[0]);
	});
	jQuery("#saveBtn").click(function(e) {
		alert(jQuery("#saveBtn").val() + msgList[1]);
	});
}
