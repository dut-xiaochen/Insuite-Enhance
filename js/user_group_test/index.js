function setLevel3Groups(id){
	jQuery("#level3_group").html('');
	var level3_groups = tag.getLevel3GroupByFatherID(id);

	_.each(level3_groups,function(item){
		var func = "setLevel4Groups(" + item[0] + ")";
		jQuery("#level3_group")
		.append("<button onclick=\""+ func + "\" >" + item[1] +"</button>")
	});
}

function setLevel4Groups(id){
	jQuery("#level4_group").html('');
	
	var level4_groups = tag.getLevel4GroupByFatherID(id);

	_.each(level4_groups,function(item){
		var func = "setLevel5Groups(" + item[0] + ")";
		jQuery("#level4_group")
		.append("<button onclick=\""+ func + "\" >" + item[1] +"</button>")
	});
}

function setLevel5Groups(id){
	jQuery("#level5_group").html('');
	
	var level5_groups = tag.getLevel5GroupByFatherID(id);

	_.each(level5_groups,function(item){
		jQuery("#level5_group")
		.append("<button>" + item[1] +"</button>")
	});
}

function openSelectUserWindow(){
	
}

function postdata(){
	tag.dopost('/cgi-bin/custom/TAG/cache-plan-regist.cgi','{"a":123,"b":[2,2,2]}',function(err,data){
		if(err){
			console.log('errr-post!',err);
		}
		else{
			console.log(data);
		}
	});
}

jQuery(function(){
	var level2_groups = tag.getLevel2Group();
	
	_.each(level2_groups,function(item){
		var func = "setLevel3Groups(" + item[0] + ")";
		jQuery("#level2_group")
		.append("<button onclick=\""+ func + "\" >" + item[1] +"</button>")
	});
	
	
});