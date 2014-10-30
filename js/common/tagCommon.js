
// namespace
var tag = {
  init: function() {
    _.templateSettings = {
      interpolate : /\{\{-(.+?)\}\}/gim,
      evaluate: /\<\jQuery(.+?)\$\>/gim,
      escape: /\{\{([^-]+?)\}\}/gim
    };
  }(),

  date: function(date, format, withTimezone) {
    if(typeof(date) != "string" || date == "")
        return "";
    format = format || "yyyy/MM/dd hh:mm";
    withTimezone = (withTimezone == true)? true: false;

    var timezone = jQuery("#timezone").val();
    var time = Date.parse(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    time += new Date().getTimezoneOffset() * 60 * 1000;
    time += timezone.substring(3,6) * 3600 * 1000;

    if(withTimezone) { // 2013/04/18 08:00(+0800)
        return new Date(time).Format(format) + "(" + timezone.substring(3,9) + ")";
    } else { // 2013/04/18 08:00
        return new Date(time).Format(format);
    }
    //return new Date(time).toLocaleString() + jQuery(.datepicker.formatDate('yy/mm/dd h:mm', new Date(time))
  },

  dopostData: function(url_, data_, callback_, progress_) {
    this.do__Data(url_, data_, callback_, progress_, "POST");
  },

  doputData: function(url_, data_, callback_, progress_) {
    this.do__Data(url_, data_, callback_, progress_, "PUT");
  },

  do__Data: function(url_, data_, callback_, progress_, method) {

    data_.append("uid", this.uid());

    var self = this;
    jQuery.ajax({
        url: url_
      , type: method
      , async: true
      , data: data_
      , dataType: "json"
      , contentType: false
      , processData: false
      , xhr : function(){
          XHR = jQuery.ajaxSettings.xhr();
          if(XHR.upload){
            XHR.upload.addEventListener('progress',function(e){
              if (progress_) {
                progress_(parseInt(e.loaded/e.total*10000)/100)
              }
            }, false);
          }
          return XHR;
        }
      , success: function(result) {
          if (result.error) {
            callback_(1, result.error);
          } else {
            callback_(0, result);
          }
        }
      , error: function(err) {
          callback_(err);
        }
    });
  },

  dopost: function(url_, obj_, callback_) {
    jQuery.ajax({
        url: url_
      , type: "POST"
      , dataType: "json"
      , data: obj_
      , success: function(result) {
    	  callback_(undefined, result);
        }
      , error: function(err) {
          callback_(err);
        }
    });
  },

  doput: function(url_, data_, callback_) {
  	data_['_method']='PUT';
    jQuery.ajax({
        url: url_
      , type: "POST"
      , dataType: "json"
      , data: data_
      , success: function(result) {
    	  callback_(undefined, result);
        }
      , error: function(err) {
    	  callback_(err);
      }
    });
  },

  dodelete: function(url_, data_, callback_) {
    var self = this;
    jQuery.ajax({
        url: url_
      , type: "DELETE"
      , async: false
      , data: JSON.stringify(data_)
      , dataType: "json"
      , contentType: "application/json"
      , processData: false
      , success: function(result) {
    	  callback_(undefined, result);
        }
      , error: function(err) {
        callback_(err);
      }
    });
  },

  doget: function(url_, callback_) {
	
	// IE10 Ajaxキャッシュ対応
	url_ += "&&random=" + new Date().getTime();
	
    jQuery.ajax({
        type: "GET"
      , url: url_
      , dataType: "json"
      , success: function(result) {
          callback_(undefined, result);
        }
      , error: function(xhr,status,err) {
        callback_(err);
      }
    });
  },

  error: function(err,defaultMsg,moveToErrPage){
    if(err){
      if(err.status == 403 || err.status == 400 || err.status == 500){
        if(moveToErrPage){
          window.location = "/error/"+err.status;
          return true;
        }
      }

      if(err.responseJSON && err.responseJSON.error && err.responseJSON.error.message){
        alertify.error(err.responseJSON.error.message);
      } else {
        alertify.error(defaultMsg);
      }
      return true;
    } else {
      return false;
    }
  },
  
  renderSelect: function(id, optionTexts,optionValues, defaultOption) {
		jQuery.each(optionValues, function(index, value) {
			if (value == defaultOption) {
				jQuery("#" + id)
		         .append(jQuery("<option></option>")
		         .attr("value",value)
		         .attr("selected",true)
		         .text(optionTexts[index])); 
			} else {
				jQuery("#" + id)
		         .append(jQuery("<option></option>")
		         .attr("value",value)
		         .text(optionTexts[index])); 
			}
		});
  },
  
  createBudget: function(doc){
	  var result = {};
	  
	  if (!_.isUndefined(doc)) {
		  _.each(doc["item"],function(item){
				if(item["key"] == "budget_sum_sales"){
					if (tag.isNull(item["value"])) {
						result["budget_sum_sales"] = 0;
					} else {
						result["budget_sum_sales"] = item["value"];
					};
				}
				else if(item["key"] == "budget_sum_profit"){
					if (tag.isNull(item["value"])) {
						result["budget_sum_profit"] = 0;
					} else {
						result["budget_sum_profit"] = item["value"];
					};
				}
				else if(item["key"] == "customer_code"){
					result["customer_code"] = item["value"];
				}
			}); 
	  }

	return result;
  },
  
  createIncrease: function(doc){
	  var result = {};
	  
	  if (!_.isUndefined(doc)) {
		  _.each(doc["item"],function(item){
				if(item["key"] == "auto_number"){
					result["auto_number"] = item["value"];
					
				} else if(item["key"] == "number_type"){
					result["number_type"] = item["value"];
				}
			}); 
	  }
	  result["id"] = doc.id;

	return result;
  },
  
  createMapping: function(doc){
	  var result = {};
	  
	  if (!_.isUndefined(doc)) {
		  _.each(doc["item"],function(item){
				if(item["key"] == "customer_code"){
					result["customer_code"] = item["value"];
					
				} else if(item["key"] == "charge_group"){
					result["charge_group"] = item["value"]["id"];
					
				} else if(item["key"] == "list_flag"){
					result["list_flag"] = item["value"]["id"];
					
				} else if(item["key"] == "other_flag"){
					// result["other_flag"] = item["value"];
					
				} else if(item["key"] == "charge_user"){
					result["charge_user"] = item["name"];
				}
					
			}); 
	  }

	return result;
  },
  
  createStrategy: function(doc){
	var result = {};
	
	if (!_.isUndefined(doc)) {
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
			else if(item["key"] == "strategy_name"){
				result["strategy_name"] = item["value"];
			}
			else if(item["key"] == "strategy_code"){
				result["strategy_code"] = item["value"];
			}
			else if(item["key"] == "main_charger"){
				if(item["value"]){
					result["main_charger"] = item["value"]["id"];
				}
				else{
					result["main_charger"] = "";
				}
				
			}
			else if(item["key"] == "sales"){
				if (tag.isNull(item["value"])) {
					result["sales"] = 0;
				} else {
					result["sales"] = item["value"];
				}
				
			}
			else if(item["key"] == "profit"){
				if (tag.isNull(item["value"])) {
					result["profit"] = 0;
				} else {
					result["profit"] = item["value"];
				}
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
			else if(item["key"] == "period4"){
				result["period4"] = item["value"];
			}
			else if(item["key"] == "memo"){
				result["memo"] = item["value"];
			}
			else if(item["key"] == "client_key"){
				result["client_key"] = item["value"];
			}
			else if(item["key"] == "other_charger"){
				if(!_.isUndefined(item["value"])) {
					result["other_charger"] = item["value"]["id"];
				} else {
					result["other_charger"] = "";
				}
			}
			
			else if(item["key"] == "sales_1"){
				if (tag.isNull(item["value"])) {
					result["sales_1"] = 0;
				} else {
					result["sales_1"] = item["value"];
				}
			}
			else if(item["key"] == "sales_2"){
				if (tag.isNull(item["value"])) {
					result["sales_2"] = 0;
				} else {
					result["sales_2"] = item["value"];
				}
			}
			else if(item["key"] == "sales_3"){
				if (tag.isNull(item["value"])) {
					result["sales_3"] = 0;
				} else {
					result["sales_3"] = item["value"];
				}
			}
			else if(item["key"] == "sales_4"){
				if (tag.isNull(item["value"])) {
					result["sales_4"] = 0;
				} else {
					result["sales_4"] = item["value"];
				}
			}
			else if(item["key"] == "sales_5"){
				if (tag.isNull(item["value"])) {
					result["sales_5"] = 0;
				} else {
					result["sales_5"] = item["value"];
				}
			}
			else if(item["key"] == "sales_6"){
				if (tag.isNull(item["value"])) {
					result["sales_6"] = 0;
				} else {
					result["sales_6"] = item["value"];
				}
			}
			else if(item["key"] == "sales_7"){
				if (tag.isNull(item["value"])) {
					result["sales_7"] = 0;
				} else {
					result["sales_7"] = item["value"];
				}
			}
			else if(item["key"] == "sales_8"){
				if (tag.isNull(item["value"])) {
					result["sales_8"] = 0;
				} else {
					result["sales_8"] = item["value"];
				}
			}
			else if(item["key"] == "sales_9"){
				if (tag.isNull(item["value"])) {
					result["sales_9"] = 0;
				} else {
					result["sales_9"] = item["value"];
				}
			}
			else if(item["key"] == "sales_10"){
				if (tag.isNull(item["value"])) {
					result["sales_10"] = 0;
				} else {
					result["sales_10"] = item["value"];
				}
			}
			else if(item["key"] == "sales_11"){
				if (tag.isNull(item["value"])) {
					result["sales_11"] = 0;
				} else {
					result["sales_11"] = item["value"];
				}
			}
			else if(item["key"] == "sales_12"){
				if (tag.isNull(item["value"])) {
					result["sales_12"] = 0;
				} else {
					result["sales_12"] = item["value"];
				}
			}
			else if(item["key"] == "profit_1"){
				if (tag.isNull(item["value"])) {
					result["profit_1"] = 0;
				} else {
					result["profit_1"] = item["value"];
				}
			}
			else if(item["key"] == "profit_2"){
				if (tag.isNull(item["value"])) {
					result["profit_2"] = 0;
				} else {
					result["profit_2"] = item["value"];
				}
			}
			else if(item["key"] == "profit_3"){
				if (tag.isNull(item["value"])) {
					result["profit_3"] = 0;
				} else {
					result["profit_3"] = item["value"];
				}
			}
			else if(item["key"] == "profit_4"){
				if (tag.isNull(item["value"])) {
					result["profit_4"] = 0;
				} else {
					result["profit_4"] = item["value"];
				}
			}
			else if(item["key"] == "profit_5"){
				if (tag.isNull(item["value"])) {
					result["profit_5"] = 0;
				} else {
					result["profit_5"] = item["value"];
				}
			}
			else if(item["key"] == "profit_6"){
				if (tag.isNull(item["value"])) {
					result["profit_6"] = 0;
				} else {
					result["profit_6"] = item["value"];
				}
			}
			else if(item["key"] == "profit_7"){
				if (tag.isNull(item["value"])) {
					result["profit_7"] = 0;
				} else {
					result["profit_7"] = item["value"];
				}
			}
			else if(item["key"] == "profit_8"){
				if (tag.isNull(item["value"])) {
					result["profit_8"] = 0;
				} else {
					result["profit_8"] = item["value"];
				}
			}
			else if(item["key"] == "profit_9"){
				if (tag.isNull(item["value"])) {
					result["profit_9"] = 0;
				} else {
					result["profit_9"] = item["value"];
				}
			}
			else if(item["key"] == "profit_10"){
				if (tag.isNull(item["value"])) {
					result["profit_10"] = 0;
				} else {
					result["profit_10"] = item["value"];
				}
			}
			else if(item["key"] == "profit_11"){
				if (tag.isNull(item["value"])) {
					result["profit_11"] = 0;
				} else {
					result["profit_11"] = item["value"];
				}
			}
			else if(item["key"] == "profit_12"){
				if (tag.isNull(item["value"])) {
					result["profit_12"] = 0;
				} else {
					result["profit_12"] = item["value"];
				}
			}
			
		});
	}
	
	return result;
  },
  
  isNull: function(str) {
	  if (str == null) {
		  return true;
	  } else if (str == "") {
		  return true;
	  }
  },
  
  addCommas: function(nStr){
    if (typeof(nStr) === "undefined") {
      nStr = "0";
    }
	  nStr += '';
	  var x = nStr.split('.');
	  var x1 = x[0];
	  var rgx = /(\d+)(\d{3})/;
	  while (rgx.test(x1)) {
	   x1 = x1.replace(rgx, '$1,$2');
	  }
	  return x1;
  },
  
  objToArray: function(obj){

	  if (!_.isUndefined(obj)) {
		  if (parseInt(obj.totalCount) != 1) {
			  return obj;
		  } else {
			  var tmpArray = [];
			  tmpArray.push(obj.document);
			  obj.document = tmpArray;
			  return obj;
		  }
	  } else {
		  var obj = {};
		  obj.document = [];
		  return obj;
	  }
	  
  },
  
  padLeft:function(num) {
	  var l = num.toString().length;
	  var str = '';
	  if(l < 8) {
		  while(str.length < (8 - l)){
			  str += '0';
		  }
		  return (str + num);
	  }
	  return num.toString();
  },
  
  getGroups:function (){
  	return tag.global_groups;
  },
  
  getLevel2Group:function (){
	var map = {};
	_.each(tag.global_groups,function(item){
		if(!_.isUndefined(item)) {
			map[item[0]] = item[1];
		}
	});
	
	var result = [];
	_.each(map,function(value,key){
		result.push([key,value]);
	});
	
	result = _.sortBy(result, function(item) {
        return item[0];
    });
	
	return result;
  },

  getLevel3GroupByFatherID:function (id){
	var map = {};
	_.each(tag.global_groups,function(item){
		if(!_.isUndefined(item)) {
			if(item[0] == id.toString()) {
				map[item[2]] = item[3];
			}
		}
	});
	var result = [];
	_.each(map,function(value,key){
		result.push([key,value]);
	});
	
	result = _.sortBy(result, function(item) {
        return item[0];
    });
	
	return result;
  },

  getLevel4GroupByFatherID:function (id){
	var map = {};
	_.each(tag.global_groups,function(item){
		if(!_.isUndefined(item)) {
			if(item[2] == id.toString()) {
				map[item[4]] = item[5];
			}
		}	
	});
	var result = [];
	_.each(map,function(value,key){
		result.push([key,value]);
	});
	
	result = _.sortBy(result, function(item) {
        return item[0];
    });
	
	return result;
  },
  
  getLevel5GroupByFatherID:function (id){
	var map = {};
	_.each(tag.global_groups,function(item){
		if(!_.isUndefined(item)) {
			if(item[4] == id.toString()) {
				map[item[6]] = item[7];
			}
		}
	});
	var result = [];
	_.each(map,function(value,key){
		result.push([key,value]);
	});
	
	result = _.sortBy(result, function(item) {
        return item[0];
    });
	
	return result;
  },
  
  global_groups:[]
};

