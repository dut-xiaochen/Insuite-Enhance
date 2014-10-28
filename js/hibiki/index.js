jQuery(function () {

	var container = jQuery("#container");
	
	var tmpl = jQuery("#tmpl_status").html();

	var list = [{"fieldCode": "1111", "fieldName": "2222"},{"fieldCode": "aaaa", "fieldName": "bbbb"}];

	_.each(list, function(item) {
		var content = _.template(tmpl, 
		{
			fieldCode: item.fieldCode, 
			fieldName: item.fieldName
		});
		console.log(content);
		container.append(content);
	});
	//alert("update");
});


 jQuery.ajax({
     url: '/hibiki/rest/1/binders/',type: 'get',dataType: 'json'
 })
 .done(function(result){
 	if (!result) {
 		return;
 	}

 	var binderIds = [];
 	var binderList = result.binder instanceof Array ? result.binder : [result.binder];
 	jQuery.each(binderList,function(index,binder){
 	    //binderIds.push(binder.id);
	    jQuery("#binders").append("<p>" + binder.id + "</p>");
 	});
 })
 .fail(function(){
 	alert("失敗!");
 });

// jQuery.ajax({
//     url:'/hibiki/rest/1/binders/10061/documents/1',
//     type:'POST',
//     dataType:'json',
//     data: {
//          10002:'夏季休暇を取得します。',
//          _method:'PUT'
//     }
// })
// .done(function(result){
//     alert('文書更新成功');
// })
// .fail(function(){
//     alert('文書更新失敗');
// });


// jQuery.ajax({
//     url:'/hibiki/rest/1/binders/10061/documents/',
//     type:'post',
//     dataType:'json',
//     data: {
//         10002:'夏季休暇を取得します1.'
//     }
// })
// .done(function(result){
//     alert('文書新規成功');
// })
// .fail(function(){
//     alert('文書新規失敗');
// });


