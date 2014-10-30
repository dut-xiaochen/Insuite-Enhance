var deptName = [];

function getDeptCode() {
    return deptName;
}

function init(defaultDeptCode) {
    var targetDept = getDeptCode();
    var inline = false;
    if ( targetDept.length == 1 ) {
        inline = true;
    }
    render(targetDept, inline, defaultDeptCode);
    renderDepList(defaultDeptCode, nextYear);
    event();
}

function render(targetDept, inline, defaultDeptCode) {
    var yearOptionValues = [];
    yearOptionValues.push(currentYear);
    yearOptionValues.push(nextYear);
    tag.renderSelect("yearList", yearOptionValues, yearOptionValues, nextYear);
    jQuery("#nextYearTitle").text(nextYear + "年度");
    var deptOptionDisplay = [];
    var deptOptionValues = [];
    for ( var i = 0 ; i < targetDept.length ; i++ ) {
        deptOptionDisplay.push(targetDept[i].name);
        deptOptionValues.push(targetDept[i].code);
    }
    tag.renderSelect("deptList", deptOptionDisplay, deptOptionValues, defaultDeptCode);
    if ( inline ) {
        var target = targetDept[0];
        jQuery("#deptTitleName_tr").show();
        jQuery("#deptList_tr").hide();
        jQuery("#deptTitleName").html(target.name);
    } else {
        jQuery("#deptTitleName_tr").hide();
        jQuery("#deptList_tr").show();
    }
}

function renderDepList(depId, year) {
	lockFlg = true;
    jQuery(".oddRow").remove();
    jQuery(".evenRow").remove();
    jQuery("#sumContainer").empty();
    documentsData = {};
    customsData = [];
    jQuery("[name='currentYearArea']").text(nextYear);
    jQuery("[name='lastYearArea']").text(currentYear);
    tag.doget("/hibiki/rest/1/binders/custom_charge_group_master/views/allData/documents?charge_group=" + depId, function(err, result){
        if(err){
            jQuery("#message_comment").text(err);
        } else {
            result = tag.objToArray(result);
            _.each(result.document, function(customerItem, index) {
                if(customerItem.item[3].value.id === "1"){
                    customsData.push(customerItem.item[0].value);
                    eval("documentsData['" + customerItem.item[0].value + "_Data']={};");
                }
            });
                              
            tag.doget("/hibiki/rest/1/binders/strategy_management/views/allData/documents?charge_group=" + depId + "&year=" + year,function(err, result){
                if (err) {
                    jQuery("#message_comment").text(err);
                } else {
                    if(result.document){
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
                        result = tag.objToArray(result);
                        _.each(result.document, function(depItem, index) {
                            var strategy = tag.createStrategy(depItem);
                            if ( eval("typeof(documentsData['" + depItem.item[1].value + "_Data']) !== 'undefined'") ) {
                                var tmpData = {};
                                tmpData = eval("documentsData['" + depItem.item[1].value + "_Data']");
                                if ( typeof(tmpData) === "undefined" ) {
                                    tmpData = {};
                                }
                                //　当年度　A合計
                                if(typeof(tmpData["currentYearSalesA"]) !== "undefined"){
                                    currentYearSalesA    = getParsedInt(tmpData["currentYearSalesA"]);
                                    currentYearProfitA   = getParsedInt(tmpData["currentYearProfitA"]);
                                    currentYearSalesB    = getParsedInt(tmpData["currentYearSalesB"]);
                                    currentYearProfitB   = getParsedInt(tmpData["currentYearProfitB"]);
                                    currentYearSalesC    = getParsedInt(tmpData["currentYearSalesC"]);
                                    currentYearProfitC   = getParsedInt(tmpData["currentYearProfitC"]);
                                    currentYearSalesAB   = getParsedInt(tmpData["currentYearSalesAB"]);
                                    currentYearProfitAB  = getParsedInt(tmpData["currentYearProfitAB"]);
                                    currentYearSalesABC  = getParsedInt(tmpData["currentYearSalesABC"]);
                                    currentYearProfitABC = getParsedInt(tmpData["currentYearProfitABC"]);
                                } else {
                                    currentYearSalesA    = 0;
                                    currentYearProfitA   = 0;
                                    currentYearSalesB    = 0;
                                    currentYearProfitB   = 0;
                                    currentYearSalesC    = 0;
                                    currentYearProfitC   = 0;
                                    currentYearSalesAB   = 0;
                                    currentYearProfitAB  = 0;
                                    currentYearSalesABC  = 0;
                                    currentYearProfitABC = 0;
                                }
                                if(strategy["accurcy"] == "A"){
                                    currentYearSalesA += getParsedInt(strategy["sales"]);
                                    currentYearProfitA += getParsedInt(strategy["profit"]);
                                }
                                //　当年度　B合計
                                if(strategy["accurcy"] == "B"){
                                    currentYearSalesB += getParsedInt(strategy["sales"]);
                                    currentYearProfitB += getParsedInt(strategy["profit"]);
                                }
                                //　当年度　C合計
                                if(strategy["accurcy"] == "C"){
                                    currentYearSalesC += getParsedInt(strategy["sales"]);
                                    currentYearProfitC += getParsedInt(strategy["profit"]);
                                }
                                // 当年度　A＋B合計【見込み】
                                currentYearSalesAB = currentYearSalesA + currentYearSalesB;
                                currentYearProfitAB = currentYearProfitA + currentYearProfitB;
                                //　当年度　A+B+C合計【目標】
                                currentYearSalesABC = currentYearSalesA + currentYearSalesB + currentYearSalesC;
                                currentYearProfitABC = currentYearProfitA + currentYearProfitB + currentYearProfitC;
                                var tmpSaveData = {};
                                tmpSaveData["currentYearSalesA"]    = currentYearSalesA;
                                tmpSaveData["currentYearProfitA"]   = currentYearProfitA;
                                tmpSaveData["currentYearSalesB"]    = currentYearSalesB;
                                tmpSaveData["currentYearProfitB"]   = currentYearProfitB;
                                tmpSaveData["currentYearSalesC"]    = currentYearSalesC;
                                tmpSaveData["currentYearProfitC"]   = currentYearProfitC;
                                tmpSaveData["currentYearSalesAB"]   = currentYearSalesAB;
                                tmpSaveData["currentYearProfitAB"]  = currentYearProfitAB;
                                tmpSaveData["currentYearSalesABC"]  = currentYearSalesABC;
                                tmpSaveData["currentYearProfitABC"] = currentYearProfitABC;
                                eval("documentsData['" + depItem.item[1].value + "_Data'] = tmpSaveData;");
                            }
                        });
                    }
                    getLastYearData(year, documentsData, customsData, depId);
                }
            });
        }
    });
}

function getLastYearData(year, documentsData, customsData, depId) {
    tag.doget("/hibiki/rest/1/binders/strategy_management/views/allData/documents?charge_group=" + depId + "&year=" + (year-1),function(err, result){
        if (err) {
            jQuery("#message_comment").text(err);
        } else {
            if(result.document){
                var lastYearSales = 0;
                var lastYearProfit = 0;
                var increaseSales1 = 0;
                var increaseProfit1 = 0;
                result = tag.objToArray(result);
                _.each(result.document, function(depItem, index) {
                    if ( eval("typeof(documentsData['" + depItem.item[1].value + "_Data']) !== 'undefined'") ) {
                        var tmpData = {};
                        tmpData = eval("documentsData['" + depItem.item[1].value + "_Data']");
                        if ( typeof(tmpData) === "undefined" ) {
                            tmpData = {};
                        }
                        //　当年度　A合計
                        if(typeof(tmpData["lastYearSales"]) !== "undefined"){
                            lastYearSales    = getParsedInt(tmpData["lastYearSales"]);
                            lastYearProfit   = getParsedInt(tmpData["lastYearProfit"]);
                        } else {
                            lastYearSales    = 0;
                            lastYearProfit   = 0;
                        }
                        var strategy = tag.createStrategy(depItem);
                        lastYearSales += getParsedInt(strategy["sales"]);
                        lastYearProfit += getParsedInt(strategy["profit"]);
                        tmpData["lastYearSales"]   = lastYearSales;
                        tmpData["lastYearProfit"]  = lastYearProfit;
                        eval("documentsData['" + depItem.item[1].value + "_Data'] = tmpData;");
                    }
                });
            }
            getBudget(year, documentsData, customsData, depId);
        }
    });
}

function getBudget(year, documentsData, customsData, depId){
    var url = '/hibiki/rest/1/binders/budget/views/allData/documents?year=' + (year) + '&charge_group=' + depId;
    tag.doget(url, function(err, result) {
        if (err) {
            jQuery("#message_comment").text(err);
        } else {
            if(result.document){
                var lastYearBudgetSales  = 0;
                var lastYearBudgetProfit = 0;
                result = tag.objToArray(result);
                _.each(result.document, function(depItem, index) {
                    if ( eval("typeof(documentsData['" + depItem.item[8].value + "_Data']) !== 'undefined'") ) {
                        var tmpData = {};
                        tmpData = eval("documentsData['" + depItem.item[8].value + "_Data']");
                        if ( typeof(tmpData) === "undefined" ) {
                            tmpData = {};
                        }
                        //　当年度　A合計
                        if(typeof(tmpData["lastYearBudgetSales"]) !== "undefined"){
                            lastYearBudgetSales    = getParsedInt(tmpData["lastYearBudgetSales"]);
                            lastYearBudgetProfit   = getParsedInt(tmpData["lastYearBudgetProfit"]);
                        } else {
                            lastYearBudgetSales    = 0;
                            lastYearBudgetProfit   = 0;
                        }
                        var budgetObj = tag.createBudget(depItem);
                        lastYearBudgetSales  += getParsedInt(budgetObj["budget_sum_sales"]);
                        lastYearBudgetProfit += getParsedInt(budgetObj["budget_sum_profit"]);
                        tmpData["lastYearBudgetSales"]  = lastYearBudgetSales;
                        tmpData["lastYearBudgetProfit"] = lastYearBudgetProfit;
                        eval("documentsData['" + depItem.item[0].value + "_Data'] = tmpData;");
                    }
                });
            }
            getCustomName(year, documentsData, customsData, depId);
        }
    });
}

function getCustomName(year, documentsData, customsData, depId) {
    var url = '/hibiki/rest/1/binders/custom_master/views/allData/documents?1';
    tag.doget(url, function(err, result) {
        if (err) {
            jQuery("#message_comment").text(err);
        } else {
            result = tag.objToArray(result);
            if(result.document){
                var documents = result.document;
                for ( var i = 0 ; i < documents.length ; i++ ) {
                    if ( eval("documentsData['" + documents[i].item[0].value + "_Data']") ) {
                        eval("documentsData['" + documents[i].item[0].value + "_Data']['customName'] = documents[i].item[1].value;")
                    }
                }
            }
            calculateIncrease(year, documentsData, customsData, depId);
        }
    });
}

function calculateIncrease(year, documentsData, customsData, depId) {
    for ( var i = 0 ; i < customsData.length ; i++ ) {
        var tmpCalData = eval('documentsData["' + customsData[i] + '_Data"]');
        eval('tmpCalData["increaseSales1"] = getParsedInt(tmpCalData["currentYearSalesAB"]) - getParsedInt(tmpCalData["lastYearSales"]);');
        eval('tmpCalData["increaseProfit1"] = getParsedInt(tmpCalData["currentYearProfitAB"]) - getParsedInt(tmpCalData["lastYearProfit"]);');
        eval('tmpCalData["increaseSales2"] = getParsedInt(tmpCalData["currentYearSalesAB"]) - getParsedInt(tmpCalData["lastYearBudgetSales"]);');
        eval('tmpCalData["increaseProfit2"] = getParsedInt(tmpCalData["currentYearProfitAB"]) - getParsedInt(tmpCalData["lastYearBudgetProfit"]);');
        eval('documentsData["' + customsData[i] + '_Data"] = tmpCalData;');
    }
    renderPage(year, documentsData, customsData, depId);
}

function renderPage(year, documentsData, customsData, depId) {
    var container = jQuery("#progress_dept_container");
    var tmpl = jQuery("#progress_list_dep_tmpl").html();
    var customName = "";
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
    for ( var i = 0 ; i < customsData.length ; i++ ) {
        eval('customName           = documentsData["' + customsData[i] + '_Data"]["customName"];');
        currentYearSalesA          = getDocumentsDataDetail(documentsData, customsData[i], "currentYearSalesA");
        currentYearProfitA         = getDocumentsDataDetail(documentsData, customsData[i], "currentYearProfitA");
        currentYearSalesB          = getDocumentsDataDetail(documentsData, customsData[i], "currentYearSalesB");
        currentYearProfitB         = getDocumentsDataDetail(documentsData, customsData[i], "currentYearProfitB");
        currentYearSalesC          = getDocumentsDataDetail(documentsData, customsData[i], "currentYearSalesC");
        currentYearProfitC         = getDocumentsDataDetail(documentsData, customsData[i], "currentYearProfitC");
        currentYearSalesAB         = getDocumentsDataDetail(documentsData, customsData[i], "currentYearSalesAB");
        currentYearProfitAB        = getDocumentsDataDetail(documentsData, customsData[i], "currentYearProfitAB");
        currentYearSalesABC        = getDocumentsDataDetail(documentsData, customsData[i], "currentYearSalesABC");
        currentYearProfitABC       = getDocumentsDataDetail(documentsData, customsData[i], "currentYearProfitABC");
        lastYearSales              = getDocumentsDataDetail(documentsData, customsData[i], "lastYearSales");
        lastYearProfit             = getDocumentsDataDetail(documentsData, customsData[i], "lastYearProfit");
        lastYearBudgetSales        = getDocumentsDataDetail(documentsData, customsData[i], "lastYearBudgetSales");
        lastYearBudgetProfit       = getDocumentsDataDetail(documentsData, customsData[i], "lastYearBudgetProfit");
        increaseSales1             = getDocumentsDataDetail(documentsData, customsData[i], "increaseSales1");
        increaseProfit1            = getDocumentsDataDetail(documentsData, customsData[i], "increaseProfit1");
        increaseSales2             = getDocumentsDataDetail(documentsData, customsData[i], "increaseSales2");
        increaseProfit2            = getDocumentsDataDetail(documentsData, customsData[i], "increaseProfit2");
        sum_currentYearSalesA      += currentYearSalesA;
        sum_currentYearProfitA     += currentYearProfitA;
        sum_currentYearSalesB      += currentYearSalesB;
        sum_currentYearProfitB     += currentYearProfitB;
        sum_currentYearSalesAB     += currentYearSalesAB;
        sum_currentYearProfitAB    += currentYearProfitAB;
        sum_currentYearSalesABC    += currentYearSalesABC;
        sum_currentYearProfitABC   += currentYearProfitABC;
        sum_lastYearSales          += lastYearSales;
        sum_lastYearProfit         += lastYearProfit;
        sum_lastYearBudgetSales    += lastYearBudgetSales;
        sum_lastYearBudgetProfit   += lastYearBudgetProfit;
        sum_increaseSales1         += increaseSales1;
        sum_increaseProfit1        += increaseProfit1;
        sum_increaseSales2         += increaseSales2;
        sum_increaseProfit2        += increaseProfit2;
        
        var content = _.template(tmpl, {
            id:i + 1,
            rowStyle:(i + 1)%2 == 1 ? "evenRow": "oddRow",
            deptName:customName,
            currentYearSalesA:tag.addCommas(currentYearSalesA),
            currentYearProfitA:tag.addCommas(currentYearProfitA),
            currentYearSalesB:tag.addCommas(currentYearSalesB),
            currentYearProfitB:tag.addCommas(currentYearProfitB),
            currentYearSalesAB:tag.addCommas(currentYearSalesAB),
            currentYearProfitAB:tag.addCommas(currentYearProfitAB),
            currentYearSalesABC:tag.addCommas(currentYearSalesABC),
            currentYearProfitABC:tag.addCommas(currentYearProfitABC),
            lastYearSales:tag.addCommas(lastYearSales),
            lastYearProfit:tag.addCommas(lastYearProfit),
            lastYearBudgetSales:tag.addCommas(lastYearBudgetSales),
            lastYearBudgetProfit:tag.addCommas(lastYearBudgetProfit),
            increaseSales1:tag.addCommas(increaseSales1),
            increaseSales2:tag.addCommas(increaseSales2),
            increaseProfit1:tag.addCommas(increaseProfit1),
            increaseProfit2:tag.addCommas(increaseProfit2),
            currentYearSalesA_color:currentYearSalesA >= 0 ? "black" : "red",
            currentYearProfitA_color:currentYearProfitA >= 0 ? "black" : "red",
            currentYearSalesB_color:currentYearSalesB >= 0 ? "black" : "red",
            currentYearProfitB_color:currentYearProfitB >= 0 ? "black" : "red",
            currentYearSalesAB_color:currentYearSalesAB >= 0 ? "black" : "red",
            currentYearProfitAB_color:currentYearProfitAB >= 0 ? "black" : "red",
            currentYearSalesABC_color:currentYearSalesABC >= 0 ? "black" : "red",
            currentYearProfitABC_color:currentYearProfitABC >= 0 ? "black" : "red",
            lastYearSales_color:lastYearSales >= 0 ? "black" : "red",
            lastYearProfit_color:lastYearProfit >= 0 ? "black" : "red",
            lastYearBudgetSales_color:lastYearBudgetSales >= 0 ? "black" : "red",
            lastYearBudgetProfit_color:lastYearBudgetProfit >= 0 ? "black" : "red",
            increaseSales1_color:increaseSales1 >= 0 ? "black" : "red",
            increaseProfit1_color:increaseProfit1 >= 0 ? "black" : "red",
            increaseSales2_color:increaseSales2 >= 0 ? "black" : "red",
            increaseProfit2_color:increaseProfit2 >= 0 ? "black" : "red",
            buttonType:isDocumentsDataExists(documentsData, customsData[i]) ? "編集" : "作成",
            buttonColor:isDocumentsDataExists(documentsData, customsData[i]) ? "black" : "red",
            buttonClick:getButtonScripts(documentsData, customsData[i])
        });
        container.append(content);
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
    sumObj.sum_currentYearSalesA_color = sum_currentYearSalesA >= 0 ? "black" : "red";
    sumObj.sum_currentYearProfitA_color = sum_currentYearProfitA >= 0 ? "black" : "red";
    sumObj.sum_currentYearSalesB_color = sum_currentYearSalesB >= 0 ? "black" : "red";
    sumObj.sum_currentYearProfitB_color = sum_currentYearProfitB >= 0 ? "black" : "red";
    sumObj.sum_currentYearSalesAB_color = sum_currentYearSalesAB >= 0 ? "black" : "red";
    sumObj.sum_currentYearProfitAB_color = sum_currentYearProfitAB >= 0 ? "black" : "red";
    sumObj.sum_currentYearSalesABC_color = sum_currentYearSalesABC >= 0 ? "black" : "red";
    sumObj.sum_currentYearProfitABC_color = sum_currentYearProfitABC >= 0 ? "black" : "red";
    sumObj.sum_lastYearSales_color = sum_lastYearSales >= 0 ? "black" : "red";
    sumObj.sum_lastYearProfit_color = sum_lastYearProfit >= 0 ? "black" : "red";
    sumObj.sum_lastYearBudgetSales_color = sum_lastYearBudgetSales >= 0 ? "black" : "red";
    sumObj.sum_lastYearBudgetProfit_color = sum_lastYearBudgetProfit >= 0 ? "black" : "red";
    sumObj.sum_increaseSales1_color = sum_increaseSales1 >= 0 ? "black" : "red";
    sumObj.sum_increaseProfit1_color = sum_increaseProfit1 >= 0 ? "black" : "red";
    sumObj.sum_increaseSales2_color = sum_increaseSales2 >= 0 ? "black" : "red";
    sumObj.sum_increaseProfit2_color = sum_increaseProfit2 >= 0 ? "black" : "red";
    
    renderSumTempl(sumObj);
}

function isDocumentsDataExists (documentsData, customCode) {
    var result;
    eval('result = documentsData["' + customCode+ '_Data"]["currentYearSalesA"];');
    if (typeof(result) == "undefined") {
        return false;
    } else {
        return true;
    }
}

function getButtonScripts (documentsData, customCode) {
    var result;
    var scripts = "";
    var customName = "";
    eval('result = documentsData["' + customCode+ '_Data"]["currentYearSalesA"];');
    if (typeof(result) == "undefined") {
        scripts += "submitForm('" + customCode + "', ";
        eval('customName = documentsData["' + customCode + '_Data"]["customName"];');
        scripts += "'" + customName + "', 'ongoing');";
    } else {
        //edit condition
        scripts += "submitForm('" + customCode + "', ";
        eval('customName = documentsData["' + customCode + '_Data"]["customName"];');
        scripts += "'" + customName + "', 'plan');";
    }
    return scripts;
}

function getDocumentsDataDetail (documentsData, customCode, detailType) {
    var result = 0;
    eval('result = documentsData["' + customCode+ '_Data"]["' + detailType + '"];');
    if (typeof(result) === "undefined") {
        return 0;
    } else {
        return getParsedInt(result);
    }
}

function submitForm(customCode, customName, type) {
    var form = jQuery("#form");
    if ( type === "ongoing" ) {
        if ( eval('typeof(documentsData["' + customCode + '_Data"]["lastYearSales"]) === "undefined"' ) ) {
            jQuery("#year").val(parseInt(nextYear));
            form.attr("action", "/cgi-bin/custom/TAG/plan.cgi");
        } else {
            jQuery("#year").val(parseInt(nextYear) -1);
            form.attr("action", "/cgi-bin/custom/TAG/ongoing_project.cgi");
        }
        jQuery("#depId").val(jQuery("#deptList option:selected").val());
        jQuery("#depName").val(jQuery("#deptList option:selected").text());
        jQuery("#customer_code").val(customCode);
        jQuery("#customer_name").val(customName);
        form.submit();
    } else {
        form.attr("action", "/cgi-bin/custom/TAG/plan.cgi");
        jQuery("#year").val(nextYear);
        jQuery("#depId").val(jQuery("#deptList option:selected").val());
        jQuery("#depName").val(jQuery("#deptList option:selected").text());
        jQuery("#customer_code").val(customCode);
        jQuery("#customer_name").val(customName);
        form.submit();
    }

}

function renderSumTempl(sumObj) {
    var container = jQuery("#sumContainer");
    var tmpl = jQuery("#sum_tmpl").html();
    // テンプレートロード
    var content = _.template(tmpl, {
        sum_currentYearSalesA    : sumObj.sum_currentYearSalesA,
        sum_currentYearProfitA   : sumObj.sum_currentYearProfitA,
        sum_currentYearSalesB    : sumObj.sum_currentYearSalesB,
        sum_currentYearProfitB   : sumObj.sum_currentYearProfitB,
        sum_currentYearSalesAB   : sumObj.sum_currentYearSalesAB,
        sum_currentYearProfitAB  : sumObj.sum_currentYearProfitAB,
        sum_currentYearSalesABC  : sumObj.sum_currentYearSalesABC,
        sum_currentYearProfitABC : sumObj.sum_currentYearProfitABC,
        sum_lastYearSales        : sumObj.sum_lastYearSales,
        sum_lastYearProfit       : sumObj.sum_lastYearProfit,
        sum_lastYearBudgetSales  : sumObj.sum_lastYearBudgetSales,
        sum_lastYearBudgetProfit : sumObj.sum_lastYearBudgetProfit,
        sum_increaseSales1       : sumObj.sum_increaseSales1,
        sum_increaseProfit1      : sumObj.sum_increaseProfit1,
        sum_increaseSales2       : sumObj.sum_increaseSales2,
        sum_increaseProfit2      : sumObj.sum_increaseProfit2,
        sum_currentYearSalesA_color    : sumObj.sum_currentYearSalesA_color,
        sum_currentYearProfitA_color   : sumObj.sum_currentYearProfitA_color,
        sum_currentYearSalesB_color    : sumObj.sum_currentYearSalesB_color,
        sum_currentYearProfitB_color   : sumObj.sum_currentYearProfitB_color,
        sum_currentYearSalesAB_color   : sumObj.sum_currentYearSalesAB_color,
        sum_currentYearProfitAB_color  : sumObj.sum_currentYearProfitAB_color,
        sum_currentYearSalesABC_color  : sumObj.sum_currentYearSalesABC_color,
        sum_currentYearProfitABC_color : sumObj.sum_currentYearProfitABC_color,
        sum_lastYearSales_color        : sumObj.sum_lastYearSales_color,
        sum_lastYearProfit_color       : sumObj.sum_lastYearProfit_color,
        sum_lastYearBudgetSales_color  : sumObj.sum_lastYearBudgetSales_color,
        sum_lastYearBudgetProfit_color : sumObj.sum_lastYearBudgetProfit_color,
        sum_increaseSales1_color       : sumObj.sum_increaseSales1_color,
        sum_increaseProfit1_color      : sumObj.sum_increaseProfit1_color,
        sum_increaseSales2_color       : sumObj.sum_increaseSales2_color,
        sum_increaseProfit2_color      : sumObj.sum_increaseProfit2_color
    });
    container.append(content);
    lockFlg = false;
}

function event() {
    // 年度プルダウンリスト変更
    jQuery("#yearList").change(function(event) { 
    	if(lockFlg) {
    		alert(err_progress_msg);
    		return;
    	}
        var selectedYear = jQuery("#yearList option:selected").val();
        var selectedDept = jQuery("#deptList option:selected").val();
        var selectedDeptName = jQuery("#deptList option:selected").text();
        nextYear = selectedYear;
        currentYear = parseInt(selectedYear) - 1;
        jQuery("#nextYearTitle").text(selectedYear + "年度");
        renderDepList(selectedDept, selectedYear);
    });

    jQuery("#deptList").change(function(event) {
    	if(lockFlg) {
    		alert(err_progress_msg);
    		return;
    	}
        var selectedDept = jQuery("#deptList option:selected").val();
        var selectedYear = jQuery("#yearList option:selected").val();
        renderDepList(selectedDept, selectedYear);
    });
    
    // 参照ボタンを押下すると、部門別画面に遷移
    jQuery("#referenceBtn").click(function(event) {
        var refBtn = jQuery(event.target);
        var depId = refBtn.attr("name");
        window.location = "/cgi-bin/custom/TAG/progress_list.cgi?id=" + depId;
    })
}

function lineOver(num) {
    chk  = 'chkbox_' + num;
    myid = document.getElementById(chk);
    if( myid.checked == true ) {
    } else {
        lineBackcolorChange(num,'red','no');
    }
}

function lineOut(num,line) {
    changeCheckBox(num,line);
    return;
}

function lineBackcolorChange(num,color,chk){
    bcolor = 'backgroud_' + color;
    number = 'number_' + num;
    chketc = 'chketc_' + num;
    client = 'client_' + num;
    yrplan = 'yrplan_' + num;
    action = 'action_' + num;
    data01 = 'data01_' + num;
    data02 = 'data02_' + num;
    data03 = 'data03_' + num;
    data04 = 'data04_' + num;
    data05 = 'data05_' + num;
    data06 = 'data06_' + num;
    data07 = 'data07_' + num;
    data08 = 'data08_' + num;
    data09 = 'data09_' + num;
    data10 = 'data10_' + num;
    data11 = 'data11_' + num;
    data12 = 'data12_' + num;
    data13 = 'data13_' + num;
    data14 = 'data14_' + num;
    data15 = 'data15_' + num;
    data16 = 'data16_' + num;
    document.getElementById(number).className = bcolor;
    document.getElementById(chketc).className = bcolor;
    document.getElementById(client).className = bcolor;
    document.getElementById(yrplan).className = bcolor;
    document.getElementById(action).className = bcolor;
    document.getElementById(data01).className = bcolor;
    document.getElementById(data02).className = bcolor;
    document.getElementById(data03).className = bcolor;
    document.getElementById(data04).className = bcolor;
    document.getElementById(data09).className = bcolor;
    document.getElementById(data10).className = bcolor;
    document.getElementById(data13).className = bcolor;
    document.getElementById(data14).className = bcolor;

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

function changeCheckBox(num,line){
    chk  = 'chkbox_' + num;
    myid = document.getElementById(chk);
    if( myid.checked == true ) {
        lineBackcolorChange(num,'gray','on');
    } else if ( line == 'evenRow' ) {
        lineBackcolorChange(num,'gray2','off');
    } else {
        lineBackcolorChange(num,'white','off');
    }
    return;
}

function getParsedInt(value) {
    if (typeof(value) === "undefined") {
        return 0;
    } else {
        return parseInt(value);
    }
}