obj   = JSON.parse(BDTASK.phrase());
theme = JSON.parse(BDTASK.theme());
$(function($){
	"use strict";
    //index coin-stream inline js start
    if(path == ""){
	    var currentPrice = {};
	    var socket = io.connect('https://streamer.cryptocompare.com/');
	    //Use SubscriptionId 0 for TRADE, 2 for CURRENT and 5 for CURRENTAGG
	    //For aggregate quote updates use CCCAGG as market
	    var string_coin  = BDTASK.coin_stream();
	    var coin_stream  = string_coin.split(',');
	    var subscription = coin_stream;
	  
	    socket.emit('SubAdd', { subs: subscription });
	    socket.on("m", function(message) {
	        var messageType = message.substring(0, message.indexOf("~"));
	        var res = {};
	        if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
	            res = CCC.CURRENT.unpack(message);
	            dataUnpack(res);
	        }
	    });

	    var dataUnpack = function(data) {
	        var from = data['FROMSYMBOL'];
	        var to = data['TOSYMBOL'];
	        var fsym = CCC.STATIC.CURRENCY.getSymbol(from);
	        var tsym = CCC.STATIC.CURRENCY.getSymbol(to);
	        var pair = from + to;

	        if (!currentPrice.hasOwnProperty(pair)) {
	            currentPrice[pair] = {};
	        }

	        for (var key in data) {
	            currentPrice[pair][key] = data[key];
	        }

	        if (currentPrice[pair]['LASTTRADEID']) {
	            currentPrice[pair]['LASTTRADEID'] = parseInt(currentPrice[pair]['LASTTRADEID']).toFixed(0);
	        }
	        currentPrice[pair]['CHANGE24HOUR'] = CCC.convertValueToDisplay(tsym, (currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR']));
	        currentPrice[pair]['CHANGE24HOURPCT'] = ((currentPrice[pair]['PRICE'] - currentPrice[pair]['OPEN24HOUR']) / currentPrice[pair]['OPEN24HOUR'] * 100).toFixed(2) + "%";;
	        displayData(currentPrice[pair], from, tsym, fsym);
	    };

	    var displayData = function(current, from, tsym, fsym) {
	        var priceDirection = current.FLAGS;
	        for (var key in current) {
	            if (key == 'CHANGE24HOURPCT') {
	                $('#' + key + '_' + from).text(' (' + current[key] + ')');
	            }
	            else if (key == 'LASTVOLUMETO' || key == 'VOLUME24HOURTO') {
	                $('#' + key + '_' + from).text(CCC.convertValueToDisplay(tsym, current[key]));
	            }
	            else if (key == 'LASTVOLUME' || key == 'VOLUME24HOUR' || key == 'OPEN24HOUR' || key == 'OPENHOUR' || key == 'HIGH24HOUR' || key == 'HIGHHOUR' || key == 'LOWHOUR' || key == 'LOW24HOUR') {
	                $('#' + key + '_' + from).text(CCC.convertValueToDisplay(fsym, current[key]));
	            }
	            else {
	                $('#' + key + '_' + from).text(current[key]);
	            }
	        }

	        $('#PRICE_' + from).removeClass();
	        $('#BGCOLOR_' + from).removeClass();
	        if (priceDirection & 1) {
	            $('#PRICE_' + from).addClass("up");
	            $('#BGCOLOR_' + from).addClass("upbg");
	        }
	        else if (priceDirection & 2) {
	            $('#PRICE_' + from).addClass("down");
	            $('#BGCOLOR_' + from).addClass("downbg");
	        }
	        if (current['PRICE'] > current['OPEN24HOUR']) {
	            $('#CHANGE24HOURPCT_' + from).removeClass();
	            $('#CHANGE24HOURPCT_' + from).addClass("up");
	        }
	        else if (current['PRICE'] < current['OPEN24HOUR']) {
	            $('#CHANGE24HOURPCT_' + from).removeClass();
	            $('#CHANGE24HOURPCT_' + from).addClass("down");
	        }
	    };

	    
	    //Ajax Subscription index
	    $("#subscribeForm").on("submit", function(event) {
	        event.preventDefault();
	        var inputdata = $("#subscribeForm").serialize();
	        var email 	  = $('input[name=subscribe_email]').val();

	        if (email == "") {
	            allert_warning('warning', obj['please_enter_valid_email'][BDTASK.language()]);
	            return false;
	        }
	        if (!isValidEmailAddress(email)) {
	        	allert_warning('warning', obj['please_enter_valid_email'][BDTASK.language()]);
	            return false;
	        }
	        $.ajax({
	            url: BDTASK.getSiteAction('home/subscribe'),
	            type: "post",
	            data: inputdata,
	            success: function(result,status,xhr) {
	                alert("Subscribtion complete");
	                location.reload();
	            },
	            error: function (xhr,status,error) {
	                if (xhr.status===500) {
	                	alert(obj['already_subscribe'][BDTASK.language()]);
	                }
	            }
	        });
	    });
	}
	if(path == "profile-verify"){
		$("#verify_type").on("change", function(event) {
            event.preventDefault();
            var verify_type = $("#verify_type").val();
            if (verify_type == 'passport') {
                $("#verify_field").html("<div class='form-group row'><label for='document1' class='col-md-4 col-form-label'>Passport Cover </label><div class='col-md-8'><input name='document1' type='file' class='form-control' id='document1' required></div></div><div class='form-group row'><label for='document2' class='col-md-4 col-form-label'>Passport Inner </label><div class='col-md-8'><input name='document2' type='file' class='form-control' id='document2' required></div></div>");
            } else if (verify_type == 'driving_license') {
                $("#verify_field").html("<div class='form-group row'><label for='document1' class='col-md-4 col-form-label'>Driving License </label><div class='col-md-8'><input name='document1' type='file' class='form-control' id='document1' required></div></div>");
            } else if (verify_type == 'nid') {
                $("#verify_field").html("<div class='form-group row'><label for='document1' class='col-md-4 col-form-label'>NID With selfie </label><div class='col-md-8'><input name='document1' type='file' class='form-control' id='document1' required></div></div>");
            } else {
                $("#verify_field").html();
            }
        });
	}
	if(path == "register"){

		var myInput = document.getElementById("pass");
        var letter  = document.getElementById("letter");
        var capital = document.getElementById("capital");
        var special = document.getElementById("special");
        var number  = document.getElementById("number");
        var length  = document.getElementById("length");

        myInput.onfocus = function() {
            document.getElementById("message").style.display = "block";
        }
        myInput.onblur = function() {
            document.getElementById("message").style.display = "none";
        }

        myInput.onkeyup = function() {

          var lowerCaseLetters = /[a-z]/g;
          if(myInput.value.match(lowerCaseLetters)) {  
            letter.classList.remove("invalid");
            letter.classList.add("valid");
          } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
          }

          var upperCaseLetters = /[A-Z]/g;
          if(myInput.value.match(upperCaseLetters)) {  
            capital.classList.remove("invalid");
            capital.classList.add("valid");
          } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
          }

          var specialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
          if(myInput.value.match(specialCharacter)) {  
            special.classList.remove("invalid");
            special.classList.add("valid");
          } else {
            special.classList.remove("valid");
            special.classList.add("invalid");
          }

          var numbers = /[0-9]/g;
          if(myInput.value.match(numbers)) {  
            number.classList.remove("invalid");
            number.classList.add("valid");
          } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
          }

          if(myInput.value.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
          } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
          }
        }
        //Registration From validation check
        

    //user the bracket end of segment
	}
    //index coin-stream inline js end    
    //get url paramiter
    var getUrlParameter = function getUrlParameter(sParam) {
    	var sPageURL = window.location.search.substring(1),
    	sURLVariables = sPageURL.split('&'),
    	sParameterName,
    	i;
    	for (i = 0; i < sURLVariables.length; i++) {
    		sParameterName = sURLVariables[i].split("=");

    		if (sParameterName[0] === sParam) {
    			return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
    		}
    	}
    };
    var market  = getUrlParameter('market');
	
	//chart-data-script
	if(path == "exchange"){

    	var market_details = JSON.parse(BDTASK.market_details());
    	console.log(market_details);

		done();
        done01();
        done1();
        done2();
        done02();
		var chart = AmCharts.makeChart("exchangesChart", {
			"type": "stock",
			"color": "#000",
			"theme": "light",
			"dataSets": [{
				"title": "Market",
				"fieldMappings": [{
					"fromField": "open",
					"toField": "open"
				}, {
					"fromField": "price_high_24h",
					"toField": "high"
				}, {
					"fromField": "price_low_24h",
					"toField": "low"
				}, {
					"fromField": "close",
					"toField": "close"
				}, {
					"fromField": "total_coin_supply",
					"toField": "volume"
				}],
				"compared": false,
				"categoryField": "date",
		      /**
		       * data loader for data set data
		       */
		       "dataLoader": {
		       	"url": BDTASK.getSiteAction('home/tradecharthistory?market='+market),
		       	"format": "json",
		       	"showCurtain": true,
		       	"showErrors": false,
		       	"async": true,
		       	"reverse": true,
		       	"delimiter": ",",
		       	"useColumnNames": true
		       },
		   }],
		   "dataDateFormat": "YYYY-MM-DD",
		   "panels": [{
		   	"title": "Value",
		   	"percentHeight": 70,
		   	"stockGraphs": [{
		   		"type": "candlestick",
		   		"id": "g1",
		   		"openField": "open",
		   		"closeField": "close",
		   		"highField": "high",
		   		"lowField": "low",
		   		"valueField": "close",
		   		"lineColor": "#7f8da9",
		   		"fillColors": "#7f8da9",
		   		"negativeLineColor": "#db4c3c",
		   		"negativeFillColors": "#db4c3c",
		   		"fillAlphas": 1,
		   		"comparedGraphLineThickness": 2,
		   		"columnWidth": 0.7,
		   		"useDataSetColors": false,
		   		"comparable": true,
		   		"compareField": "close",
		   		"showBalloon": false,
		   		"proCandlesticks": true
		   	}],
		   	"stockLegend": {
		   		"valueTextRegular": undefined,
		   		"periodValueTextComparing": "[[percents.value.close]]%"
		   	}
		   },
		   {
		   	"title": "Volume",
		   	"percentHeight": 30,
		   	"marginTop": 1,
		   	"columnWidth": 0.6,
		   	"showCategoryAxis": false,
		   	"stockGraphs": [{
		   		"valueField": "volume",
		   		"openField": "open",
		   		"type": "column",
		   		"showBalloon": false,
		   		"fillAlphas": 1,
		   		"lineColor": "#7f8da9",
		   		"fillColors": "#7f8da9",
		   		"negativeLineColor": "#db4c3c",
		   		"negativeFillColors": "#db4c3c",
		   		"useDataSetColors": false
		   	}],
		   	"stockLegend": {
		   		"markerType": "none",
		   		"markerSize": 0,
		   		"labelText": "",
		   		"periodValueTextRegular": "[[value.close]]"
		   	},
		   	"valueAxes": [{
		   		"usePrefixes": true
		   	}]
		   }
		   ],
		   "panelsSettings": {
		   	"color": "#000",
		   	"plotAreaFillColors": "#333",
		   	"plotAreaFillAlphas": 0,
		   	"marginLeft": 60,
		   	"marginTop": 5,
		   	"marginBottom": 5
		   },
		   "chartScrollbarSettings": {
		   	"graph": "g1",
		   	"graphType": "line",
		   	"usePeriod": "WW",
		   	"backgroundColor": "#dfdfdf",
		   	"graphFillColor": "#666",
		   	"graphFillAlpha": 0.2,
		   	"gridColor": "#fff",
		   	"gridAlpha": 0.15,
		   	"selectedBackgroundColor": "#ebebeb",
		   	"selectedGraphFillAlpha": 1
		   },
		   "categoryAxesSettings": {
		   	"equalSpacing": true,
		   	"dashLength": "7",
		   	"gridColor": "#000",
		   	"gridAlpha": 0.1
		   },
		   "valueAxesSettings": {
		   	"gridColor": "#000",
		   	"dashLength": "7",
		   	"gridAlpha": 0.1,
		   	"inside": false,
		   	"showLastLabel": true
		   },
		   "chartCursorSettings": {
		   	"pan": true,
		   	"valueLineEnabled": true,
		   	"valueLineBalloonEnabled": true
		   },
		   "legendSettings": {
		   	"color": "#000",
		   },
		   "stockEventsSettings": {
		   	"showAt": "high",
		   	"type": "pin"
		   },
		   "balloon": {
		   	"textAlign": "left",
		   	"offsetY": 10
		   },
		   "periodSelector": {
		   	"position": "top",
		   	"periods": [{
		   		"period": "DD",
		   		"count": 1,
		   		"label": "1D"
		   	}, {
		   		"period": "MM",
		   		"count": 1,
		   		"selected": true,
		   		"label": "1M"
		   	}, {
		   		"period": "MM",
		   		"count": 6,
		   		"label": "6M"
		   	}, {
		   		"period": "YYYY",
		   		"count": 1,
		   		"label": "1Y"
		   	}, {
		   		"period": "MAX",
		   		"label": "MAX"
		   	}]
		   }
		});
		//message chat start
		$("#message_form").on("submit", function(event) {
			event.preventDefault();
			var inputdata = $("#message_form").serialize();

			$.ajax({
				url: BDTASK.getSiteAction('home/ajaxMessageChat'),
				type: "post",
				data: inputdata,
				dataType : "json",
				success: function(data) {     
					$("#live_chat_list").append("<li> <div class='message-top'><img src="+BDTASK.getSiteAction('assets/website/img/img-user.png')+" alt='User'/><span>"+data.datetime+"</span></div><p class='msg-text'>"+data.message+"</p></li>");                
					document.getElementById("message_form").reset();
				},
				error: function(data){
					$("#live_chat").append("<pre>"+data+"</pre>");
				}

			});
		});
		//message chat end

		function done() {
            setTimeout( function() { 
            updates_buy();
            done();
            }, 1500);
        }
         
        function done01() {
            setTimeout( function() { 
            updates_sell();
            done01();
            }, 2000);
        }
         
        function done1() {
            setTimeout( function() {
            marketupdates();
            done1();
            }, 5000);
        }
         
        function done2() {
            setTimeout( function() { 
            messageChat(); 
            done2();
            }, 1800);
        }
         
        function done02() {
            setTimeout( function() {         
            tradehistoryupdates(); 
            done02();
            }, 10000);
        }

        //Message Ajax load
        function messageChat() {
            $.getJSON(BDTASK.getSiteAction("home/jsonMessageStream"), function(data) {
                $("#live_chat_list").empty();
                $.each(data, function(index, element){
                   $("#live_chat_list").prepend("<li><div class='message-top'><img src="+BDTASK.getSiteAction('assets/website/img/img-user.png')+" alt='User'/><span>"+element.datetime+"</span></div><p class='msg-text'>"+element.message+"</p></li>");

                });
            });
        }

        //Market coinpair load 
        function marketupdates() {
            $.getJSON(BDTASK.getSiteAction('home/market_streamer/?market='+market), function(data) {

                $.each(data.marketstreamer, function(index, element){

                    $('#price_'+element.market_symbol).text(parseFloat(element.last_price).toString());
                    $('#volume_'+element.market_symbol).text(Math.round(element.total_coin_supply*100)/100);

                    var change = element.price_change_24h/element.last_price;
                    var price_change_percent = (Math.round(change*100)/100)*100;

                    $('#price_change_'+element.market_symbol).text(parseFloat(price_change_percent.toFixed(2)).toString()+'%');
                    if (change>0) {
                        $('#price_change_'+element.market_symbol).addClass("positive");
                        $('#price_change_'+element.market_symbol).removeClass('negative');

                    } else if (change<0) {
                        $('#price_change_'+element.market_symbol).addClass("negative");
                        $('#price_change_'+element.market_symbol).removeClass('positive');
                    } else {
                        $('#price_change_'+element.market_symbol).removeClass('positive');
                        $('#price_change_'+element.market_symbol).removeClass('negative');
                    };

                });
            });
        }

        //Buy Orders load
        function updates_buy() {
            $.getJSON(BDTASK.getSiteAction('home/streamer_buy/?market='+market), function(data) {
                $("#buytrades").empty();

                $.each(data.trades, function(index, element){
                    var tradeType = "BAD_REQUEST";
                    var cls     = "";
                    if (element.bid_type=='BUY') {
                        tradeType   = "BUY";
                        cls       ="positive";

                        $("#buytrades").prepend("<tr><td class='buy_price'>"+ parseFloat(element.bid_price).toFixed(8) +"</td><td class='buy_qty text-right'>"+ parseFloat(element.total_qty).toFixed(6) +"</td><td class='text-right'>"+ parseFloat(parseFloat(element.total_price).toString()).toFixed(6) +"</td></tr>");
                    } else {

                        tradeType = "BAD_REQUEST";
                        cls       = "";
                    }

                    //Max Row Show From Stemar
                    var maxTableRow = 22;
                    var length = $('table tbody#buytrades tr').length;
                    if (length >= (maxTableRow)) {
                        $('table tbody#buytrades tr:last').remove();
                    }
                });
            });
        }

        //Sell Orders load
        function updates_sell() {
            $.getJSON(BDTASK.getSiteAction('home/streamer_sell/?market='+market), function(data) {
                $("#selltrades").empty();

                $.each(data.trades, function(index, element){

                    var tradeType = "BAD_REQUEST";
                    var cls       = "";
                    if (element.bid_type=='SELL') {
                        tradeType   = "SELL";
                        cls       ="negative";

                        $("#selltrades").prepend("<tr><td class='sell_price'>"+  parseFloat(element.bid_price).toFixed(8) +"</td><td class='sell_qty text-right'>"+ parseFloat(element.total_qty).toFixed(6) +"</td><td class='text-right'>"+ parseFloat(parseFloat(element.total_price).toString()).toFixed(6) +"</td></tr>");
                    }
                    else {
                        tradeType = "BAD_REQUEST";
                        cls       = "";
                    }
                    //Max Row Show From Stemar
                    var maxTableRow = 22;
                    var length1 = $('table tbody#selltrades tr').length;
                    if (length1 >= (maxTableRow)) {
                        $('table tbody#selltrades tr:last').remove();
                    }

                });
            });
        }

        //Historycal data load
        function tradehistoryupdates() {
            $.getJSON(BDTASK.getSiteAction('home/tradehistory/?market='+market), function(data) {
                $("#tradeHistory").empty();   
                var lastprice;
                if (data.available_buy_coin!=null) {
                    $(".available_buy_coin").html(parseFloat(data.available_buy_coin.bid_qty_available||0).toString());
                } else {
                    $(".available_buy_coin").html(0.00);
                }
                if (data.available_sell_coin!=null) {
                    $(".available_sell_coin").html(parseFloat(data.available_sell_coin.bid_qty_available||0).toString());
                } else {
                    $(".available_sell_coin").html(0.00);
                }

                if (data.coinhistory) {

                    var change = data.coinhistory.price_change_24h/data.coinhistory.last_price;
                    var price_change_percent = (Math.round(change*100)/100)*100;

                    if (change > 0) {
                        $(".price_updown").html(parseFloat(data.coinhistory.last_price).toString()+' <i class="fa fa-arrow-up" aria-hidden="true"></i>');
                        $('.price_updown').addClass("positive");
                        $('.coin-change-price').addClass("positive");
                        $('.price_updown').removeClass("negative");
                        $('.coin-change-price').removeClass("negative");

                    } else if(change < 0) {
                        $(".price_updown").html(parseFloat(data.coinhistory.last_price).toString()+' <i class="fa fa-arrow-down" aria-hidden="true"></i>');
                        $('.price_updown').addClass("negative");
                        $('.coin-change-price').removeClass("positive");
                        $('.price_updown').addClass("negative");
                        $('.coin-change-price').addClass("negative");

                    } else {

                        $(".price_updown").html(parseFloat(data.coinhistory.last_price).toString());
                        $('.price_updown').removeClass('positive');
                        $('.price_updown').removeClass("coin-change-price");
                        $('.price_updown').removeClass('positive');
                        $('.price_updown').removeClass("coin-change-price");
                    }

                    if (typeof(data.coinhistory.last_price)!=='undefined' || typeof(data.coinhistory.last_price)!='null') {
                        var last_price = data.coinhistory.last_price||0;
                        $(".coin-last-price").html(parseFloat(last_price).toString());
                    };
                    if (typeof(data.coinhistory.volume_24h)!=='undefined' || typeof(data.coinhistory.volume_24h)!='null') {
                        var volume_24h = data.coinhistory.volume_24h;
                        $(".total_volume").html(parseFloat(volume_24h).toString());

                    };
                    if (typeof(data.coinhistory.price_change_24h)!=='undefined' || typeof(data.coinhistory.price_change_24h)!='null') {
                        var price_change_24h = data.coinhistory.price_change_24h||0;
                        var price_change_percent = (Math.round((price_change_24h/last_price)*100)/100)*100;
                        $(".coin-change-price").html(parseFloat(price_change_percent.toFixed(2)).toString()+'%');

                    };
                    if (typeof(data.coinhistory.price_high_24h)!=='undefined' || typeof(data.coinhistory.price_high_24h)!='null') {
                        var price_high_24h = data.coinhistory.price_high_24h||0;
                        $(".coin-price-high").html(parseFloat(price_high_24h).toString());
                    };
                    if (typeof(data.coinhistory.price_low_24h)!=='undefined' || typeof(data.coinhistory.price_low_24h)!='null') {
                        var price_low_24h = data.coinhistory.price_low_24h||0;
                        $(".coin-price-low").html(parseFloat(price_low_24h).toString());
                    };
                };

                $.each(data.tradehistory, function(index, element){

                    var tradeType = "BAD_REQUEST";
                    var cls       = "";
                    var cls1      = "";
                    if (element.bid_type=='BUY') {
                        tradeType   = "BUY";
                        cls    		= "positive";
                        cls1   		= "buy_price";
                    }
                    else if (element.bid_type=='SELL') {
                        tradeType   = "SELL";
                        cls         = "negative";
                        cls1        = "sell_price";
                    } else {
                        tradeType = "BAD_REQUEST";
                        cls       = "";
                    }

                    $("#tradeHistory").prepend("<tr><td class='date'>"+element.success_time+"</td><td class='type "+cls+"'>"+tradeType+"</td><td class='amount text-right'>"+ parseFloat(element.complete_qty).toFixed(6) +"</td><td class='price text-right "+cls1+"'>"+ parseFloat(element.bid_price).toString() +"</td><td class='total text-right'>"+ parseFloat(element.complete_amount).toString() +"</td></tr>");

                    //Max Row Show From Stemar
                    var maxTableRow = 18;
                    var length = $('table tbody#tradeHistory tr').length;
                    if (length >= (maxTableRow)) {
                        $('table tbody#tradeHistory tr:last').remove();
                    }

                });
            });
        }
        //Market Price From Market place
       
        $.getJSON(BDTASK.getSiteAction('home/coin_pairs'), function(data){

            $.each(data.coin_pairs, function(index, element){
                var cryptolistfrom = element.market_symbol; 
                var cryptolistto   = element.currency_symbol;

                $.getJSON("https://min-api.cryptocompare.com/data/price?fsym="+cryptolistto+"&tsyms="+cryptolistfrom+"&api_key="+BDTASK.crypto_api(), function(result) {
                    if (result[Object.keys(result)[0]]=='Error') {
                        $('#price_'+element.market_symbol).text(market_details.initial_price);
                    } else if ($('#price_'+cryptolistto+'_'+cryptolistfrom).text() == '0.00' || $('#price_'+cryptolistto+'_'+cryptolistfrom).text() == '0') {
                        $('#price_'+cryptolistto+'_'+cryptolistfrom).text(result[Object.keys(result)[0]]);
                    };
                });
            });
        });

        var cryptolistfrom = market_details.currency_symbol; 
        var cryptolistto   = market_details.market_symbol;

        $.getJSON("https://min-api.cryptocompare.com/data/price?fsym="+cryptolistfrom+"&tsyms="+cryptolistto+"&api_key="+BDTASK.crypto_api(), function(result) {

                var rate = 1;
                if (result[Object.keys(result)[0]]=='Error') {
                    rate = market_details.initial_price;

                } else {
                    rate = parseFloat(parseFloat(result[Object.keys(result)[0]]).toFixed(8)).toString();
                };

                $( "#buypricing").val(rate);
                $( "#sellpricing").val(rate);

                var buywithout_feesval = rate*1;              
                buywithout_feesval     = buywithout_feesval.toFixed(8);       

                $("#buywithout_fees").text(parseFloat(buywithout_feesval).toString());
                $('#buywithout_feesval').val(parseFloat(buywithout_feesval).toString());
                var feetxt = (BDTASK.buyfees()/100)*(buywithout_feesval);
                feetxt = feetxt.toFixed(8);
                var fees = $("#buyfees").text(parseFloat(feetxt).toString()+market_details.market_symbol+' ('+BDTASK.buyfees()+'%)');
                $('#buyfeesval').val(feetxt);
                var total = +buywithout_feesval + +feetxt;
                $("#buytotal").text(parseFloat(total.toFixed(8)).toString());
                $('#buytotalval').val(parseFloat(total.toFixed(8)).toString());


                //anothoer segment
                var sellwithout_fees = rate*1;           
                var sellwithout_fees = sellwithout_fees.toFixed(8);           

                $("#sellwithout_fees").text(parseFloat(sellwithout_fees).toString());
                $('#sellwithout_feesval').val(1);
                var feetxt = (BDTASK.sellfees()/100)*1;
                var feetxt2 = (BDTASK.sellfees()/100)*sellwithout_fees;
                feetxt = feetxt.toFixed(8);
                feetxt2 = feetxt2.toFixed(8);
              
                $("#sellfees").text(parseFloat(feetxt2).toString()+market_details.market_symbol+' ('+BDTASK.sellfees()+'%)');
                $('#sellfeesval').val(parseFloat(feetxt).toString());

                var total = 1 + +feetxt;        
                var total2 = +sellwithout_fees + +feetxt2;
                $("#selltotal").text(parseFloat(total2.toFixed(8)).toString());
                $('#selltotalval').val(parseFloat(total).toString());
        });

        //Buy Sell market/Initial price
        $('body').on('click','.buy_price, .sell_price', function() {
            var buy_price = $( this ).text();
            $( "#buypricing").val(buy_price);
            $( "#sellpricing").val(buy_price);
        });

        $('body').on('click','.buy_qty', function() {
            var buy_qty = $( this ).text();
            $( "#buyamount").val(buy_qty);
            $( "#sellamount").val(buy_qty);

            var sellwithout_fees = buy_qty*1;           
            var sellwithout_fees = sellwithout_fees.toFixed(8);           

            $("#sellwithout_fees").text(parseFloat(sellwithout_fees).toString());
            $('#sellwithout_feesval').val(1);
            var feetxt = (BDTASK.sellfees()/100)*1;
            var feetxt2 = (BDTASK.sellfees()/100)*sellwithout_fees;
            feetxt = feetxt.toFixed(8);
            feetxt2 = feetxt2.toFixed(8);
           
            $("#sellfees").text(parseFloat(feetxt2).toString()+market_details.market_symbol+' ('+BDTASK.sellfees()+'%)');
            $('#sellfeesval').val(parseFloat(feetxt).toString());

            var total  = 1 + +feetxt;        
            var total2 = +sellwithout_fees + +feetxt2;
            $("#selltotal").text(parseFloat(total2.toFixed(8)).toString());
            $('#selltotalval').val(parseFloat(total).toString());
        });

        $('body').on('click','.sell_qty', function() {
            var buy_qty = $( this ).text();
            $( "#buyamount").val(buy_qty);
            $( "#sellamount").val(buy_qty);

            var sellwithout_fees = buy_qty*1;           
            var sellwithout_fees = sellwithout_fees.toFixed(8);           

            $("#sellwithout_fees").text(parseFloat(sellwithout_fees).toString());
            $('#sellwithout_feesval').val(1);
            var feetxt  = (BDTASK.sellfees()/100)*1;
            var feetxt2 = (BDTASK.sellfees()/100)*sellwithout_fees;
            feetxt  = feetxt.toFixed(8);
            feetxt2 = feetxt2.toFixed(8);

            $("#sellfees").text(parseFloat(feetxt2).toString()+market_details.market_symbol+' ('+BDTASK.sellfees()+'%)');
            $('#sellfeesval').val(parseFloat(feetxt).toString());

            var total  = 1 + +feetxt;        
            var total2 = +sellwithout_fees + +feetxt2;
            $("#selltotal").text(parseFloat(total2.toFixed(8)).toString());
            $('#selltotalval').val(parseFloat(total).toString());
        });

        $("#buypricing").on("keyup", function(event) {
            event.preventDefault();

            var buypricing = parseFloat($("#buypricing").val())||1;
            var buyamount  = parseFloat($("#buyamount").val())||1;

            var buywithout_feesval = buypricing*buyamount;              
            buywithout_feesval 	   = buywithout_feesval.toFixed(8);       

            $("#buywithout_fees").text(parseFloat(buywithout_feesval).toString());
            $('#buywithout_feesval').val(parseFloat(buywithout_feesval).toString());
            var feetxt = (BDTASK.buyfees()/100)*(buywithout_feesval);
            feetxt = feetxt.toFixed(8);
            var fees = $("#buyfees").text(parseFloat(feetxt).toString()+market_details.market_symbol+' ('+BDTASK.buyfees()+'%)');
            $('#buyfeesval').val(parseFloat(feetxt).toString());
            var total = +buywithout_feesval + +feetxt;
            $("#buytotal").text(parseFloat(total.toFixed(8)).toString());
            $('#buytotalval').val(parseFloat(total.toFixed(8)).toString());

        });

        $("#buyamount").on("keyup", function(event) {
            event.preventDefault();

            var buypricing = parseFloat($("#buypricing").val())||1;
            var buyamount  = parseFloat($("#buyamount").val())||1;

            var buywithout_feesval = buypricing*buyamount;              
            buywithout_feesval 	   = buywithout_feesval.toFixed(8); 

            $("#buywithout_fees").text(parseFloat(buywithout_feesval).toString());
            $('#buywithout_feesval').val(parseFloat(buywithout_feesval).toString());
            var feetxt = (BDTASK.buyfees()/100)*(buywithout_feesval);
            feetxt = feetxt.toFixed(8);
            var fees = $("#buyfees").text(parseFloat(feetxt).toString()+market_details.market_symbol+' ('+BDTASK.buyfees()+'%)');
            $('#buyfeesval').val(feetxt);
            var total = +buywithout_feesval + +feetxt;
            $("#buytotal").text(parseFloat(total.toFixed(8)).toString());
            $('#buytotalval').val(parseFloat(total.toFixed(8)).toString());
        });

        $("#buyform").on("submit", function(event) {
            event.preventDefault();
            var inputdata = $("#buyform").serialize();
            $.ajax({
                url: BDTASK.getSiteAction('home/buy'),
                type: "post",
                data: inputdata,
                success: function(data) {

                    if (data == 0) {
                        $(".buyloginMessage").html("<p class='alert-danger'>Trade dose not submited</p>");
                    } else if (data == 1) {
                        $(".buyloginMessage").html("<p class='alert-warning'>Please Login/Register!</p>");
                    } else if (data == 2) {
                        $(".buyloginMessage").html("<p class='alert-warning'>You Have not sufficent Balance!</p>");
                    } else {
                        $(".buyloginMessage").html("<p class='alert-success'>Your Order Requested Successfully</p>");
                        var trade = JSON.parse(data);                        
                        $("#balance_buy").text(parseFloat(trade.balance).toString());
                        $("#balance_sell").text(parseFloat(trade.balance_up_to).toString());
                        $("#buytrades").prepend("<tr><td class='buy_price text-right'>"+trade.trades.bid_price+"</td><td class=' text-right'>"+trade.trades.bid_qty+"</td><td class=' text-right'>"+trade.trades.total_amount+"</td></tr>");
                    }
                    
                    document.getElementById("buyform").reset();

                    var cryptolistfrom = market_details.currency_symbol; 
                    var cryptolistto   = market_details.market_symbol; 

                    $.getJSON("https://min-api.cryptocompare.com/data/price?fsym="+cryptolistfrom+"&tsyms="+cryptolistto+"&api_key="+BDTASK.crypto_api(), function(result) {

                            var rate = 1;
                            if (result[Object.keys(result)[0]]=='Error') {
                                rate = market_details.initial_price;

                            } else {
                                rate = parseFloat(parseFloat(result[Object.keys(result)[0]]).toFixed(8)).toString();
                            };

                            $( "#buypricing").val(rate);
                            $( "#sellpricing").val(rate);

                            var buywithout_feesval = rate*1;              
                            buywithout_feesval = buywithout_feesval.toFixed(8);       
                            $("#buywithout_fees").text(parseFloat(buywithout_feesval).toString());
                            $('#buywithout_feesval').val(parseFloat(buywithout_feesval).toString());
                            var feetxt = (BDTASK.buyfees()/100)*(buywithout_feesval);
                            feetxt = feetxt.toFixed(8);
                            var fees = $("#buyfees").text(parseFloat(feetxt).toString()+market_details.market_symbol+' ('+BDTASK.buyfees()+'%)');
                            $('#buyfeesval').val(feetxt);
                            var total = +buywithout_feesval + +feetxt;
                            $("#buytotal").text(parseFloat(total.toFixed(8)).toString());
                            $('#buytotalval').val(parseFloat(total.toFixed(8)).toString());

                            var sellwithout_fees = rate*1;           
                            var sellwithout_fees = sellwithout_fees.toFixed(8);           

                            $("#sellwithout_fees").text(parseFloat(sellwithout_fees).toString());
                            $('#sellwithout_feesval').val(1);
                            var feetxt = (BDTASK.sellfees()/100)*1;
                            var feetxt2 = (BDTASK.sellfees()/100)*sellwithout_fees;
                            feetxt = feetxt.toFixed(8);
                            feetxt2 = feetxt2.toFixed(8);
                            $("#sellfees").text(parseFloat(feetxt2).toString()+market_details.market_symbol+' ('+BDTASK.sellfees()+'%)');
                            $('#sellfeesval').val(parseFloat(feetxt).toString());

                            var total = 1 + +feetxt;        
                            var total2 = +sellwithout_fees + +feetxt2;
                            $("#selltotal").text(parseFloat(total2.toFixed(8)).toString());
                            $('#selltotalval').val(parseFloat(total).toString());
                    });
                },
                error: function(data){
                    $(".buyloginMessage").prepend("<pre>"+data+"</pre>");
                }
            });
        });

		//Ajax Sell
		$("#sellpricing").on("keyup", function(event) {
            event.preventDefault();

            var sellpricing = parseFloat($("#sellpricing").val())||0;
            var sellamount  = parseFloat($("#sellamount").val())||0; 

            var sellwithout_fees = sellpricing*sellamount;           
            var sellwithout_fees = sellwithout_fees.toFixed(8);           

            $("#sellwithout_fees").text(parseFloat(sellwithout_fees).toString());
            $('#sellwithout_feesval').val(parseFloat(sellamount.toFixed(8)).toString());
            var feetxt = (BDTASK.sellfees()/100)*sellamount;
            var feetxt2 = (BDTASK.sellfees()/100)*sellwithout_fees;
            feetxt = feetxt.toFixed(8);
            feetxt2 = feetxt2.toFixed(8);

            $("#sellfees").text(parseFloat(feetxt2).toString()+market_details.market_symbol+' ('+BDTASK.sellfees()+'%)');
            $('#sellfeesval').val(parseFloat(feetxt).toString());

            var total  = +sellamount + +feetxt;        
            var total2 = +sellwithout_fees + +feetxt2;
            $("#selltotal").text(parseFloat(total2.toFixed(8)).toString());
            $('#selltotalval').val(parseFloat(total).toString());
        });

        $("#sellamount").on("keyup", function(event) {
            event.preventDefault();
            var sellpricing = parseFloat($("#sellpricing").val())||1;
            var sellamount  = parseFloat($("#sellamount").val())||1;

            var sellwithout_fees = sellpricing*sellamount;           
            var sellwithout_fees = sellwithout_fees.toFixed(8);

            $("#sellwithout_fees").text(parseFloat(sellwithout_fees).toString());
            $('#sellwithout_feesval').val(parseFloat(sellamount.toFixed(8)).toString());
            var feetxt = (BDTASK.sellfees()/100)*sellamount;
            var feetxt2 = (BDTASK.sellfees()/100)*sellwithout_fees;
            feetxt = feetxt.toFixed(8);
            feetxt2 = feetxt2.toFixed(8);

            $("#sellfees").text(parseFloat(feetxt2).toString()+market_details.market_symbol+' ('+BDTASK.sellfees()+'%)');
            $('#sellfeesval').val(parseFloat(feetxt).toString());

            var total  = +sellamount + +feetxt;
            var total2 = +sellwithout_fees + +feetxt2;
            $("#selltotal").text(parseFloat(total2).toString());
            $('#selltotalval').val(parseFloat(total).toString());
        });

        $("#sellform").on("submit", function(event) {
            event.preventDefault();
            var inputdata = $("#sellform").serialize();
            $.ajax({
                url: BDTASK.getSiteAction('home/sell'),
                type: "post",
                data: inputdata,
                success: function(data) {                            
                    if (data==0) {
                        $(".sellloginMessage").html("<p class='alert-danger'>Trade dose not submited</p>");
                    } else if (data==1) {
                        $(".sellloginMessage").html("<p class='alert-warning'>Please Login/Register!</p>");
                    } else if (data==2) {
                        $(".sellloginMessage").html("<p class='alert-warning'>You Have not sufficent Balance!</p>");
                    } else {

                        $(".sellloginMessage").html("<p class='alert-success'>Your Order Requested Successfully</p>");
                        var trade = JSON.parse(data);
                        $("#balance_sell").text(parseFloat(trade.balance).toString());
                        $("#balance_buy").text(parseFloat(trade.balance_up_to).toString());
                        $("#selltrades").prepend("<tr><td class='sell_price'>"+trade.trades.bid_price+"</td><td>"+trade.trades.bid_qty+"</td><td>"+trade.trades.total_amount+"</td></tr>");
                    }
                    
                    document.getElementById("sellform").reset();

                    var cryptolistfrom = market_details.currency_symbol; 
                    var cryptolistto   = market_details.market_symbol;
                    $.getJSON("https://min-api.cryptocompare.com/data/price?fsym="+cryptolistfrom+"&tsyms="+cryptolistto+"&api_key="+BDTASK.crypto_api(), function(result) {
                            var rate = 1;
                            if (result[Object.keys(result)[0]]=='Error') {
                                rate = market_details.initial_price;
                            } else {
                                rate = parseFloat(parseFloat(result[Object.keys(result)[0]]).toFixed(8)).toString();
                            };

                            $( "#buypricing").val(rate);
                            $( "#sellpricing").val(rate);

                            var buywithout_feesval = rate*1;              
                            buywithout_feesval = buywithout_feesval.toFixed(8);       
                            $("#buywithout_fees").text(parseFloat(buywithout_feesval).toString());
                            $('#buywithout_feesval').val(parseFloat(buywithout_feesval).toString());
                            var feetxt = (BDTASK.buyfees()/100)*(buywithout_feesval);
                            feetxt = feetxt.toFixed(8);
                            var fees = $("#buyfees").text(parseFloat(feetxt).toString()+market_details.market_symbol+' ('+BDTASK.buyfees()+'%)');
                            $('#buyfeesval').val(feetxt);
                            var total = +buywithout_feesval + +feetxt;
                            $("#buytotal").text(parseFloat(total.toFixed(8)).toString());
                            $('#buytotalval').val(parseFloat(total.toFixed(8)).toString());


                            var sellwithout_fees =    rate*1;           
                            var sellwithout_fees =    sellwithout_fees.toFixed(8);           
                            $("#sellwithout_fees").text(parseFloat(sellwithout_fees).toString());
                            $('#sellwithout_feesval').val(1);
                            var feetxt = (BDTASK.sellfees()/100)*1;
                            var feetxt2 = (BDTASK.sellfees()/100)*sellwithout_fees;
                            feetxt = feetxt.toFixed(8);
                            feetxt2 = feetxt2.toFixed(8);

                            $("#sellfees").text(parseFloat(feetxt2).toString()+market_details.market_symbol+' ('+BDTASK.sellfees()+'%)');
                            $('#sellfeesval').val(parseFloat(feetxt).toString());
                            var total = 1 + +feetxt;        
                            var total2 = +sellwithout_fees + +feetxt2;
                            $("#selltotal").text(parseFloat(total2.toFixed(8)).toString());
                            $('#selltotalval').val(parseFloat(total).toString());
                    });
                },
                error: function(data){
                    $(".sellloginMessage").prepend("<pre>"+data+"</pre>");
                }
            });
        });


		//Market Depth
        var chart = AmCharts.makeChart("marketDepth", {
            "type": "serial",
            "theme": "patterns",
            "dataLoader": {
                "url": BDTASK.getSiteAction('home/market_depth?market='+market),
                "format": "json",
                "reload": 120,
                "showErrors": false,
                "postProcess": function (data) {
                    // Function to process (sort and calculate cummulative volume)
                    function processData(list, type, desc) {
                        // Convert to data points
                        for (var i = 0; i < list.length; i++) {
                            list[i] = {
                                value: Number(list[i][0]),
                                volume: Number(list[i][1])
                            };
                        }
                        // Sort list just in case
                        list.sort(function (a, b) {
                            if (a.value > b.value) {
                                return 1;
                            } else if (a.value < b.value) {
                                return -1;
                            } else {
                                return 0;
                            }
                        });

                        // Calculate cummulative volume
                        if (desc) {
                            for (var i = list.length - 1; i >= 0; i--) {
                                if (i < (list.length - 1)) {
                                    list[i].totalvolume = list[i + 1].totalvolume + list[i].volume;
                                } else {
                                    list[i].totalvolume = list[i].volume;
                                }
                                var dp = {};
                                dp["value"] = list[i].value;
                                dp[type + "volume"] = list[i].volume;
                                dp[type + "totalvolume"] = list[i].totalvolume;
                                res.unshift(dp);
                            }
                        } else {
                            for (var i = 0; i < list.length; i++) {
                                if (i > 0) {
                                    list[i].totalvolume = list[i - 1].totalvolume + list[i].volume;
                                } else {
                                    list[i].totalvolume = list[i].volume;
                                }
                                var dp = {};
                                dp["value"] = list[i].value;
                                dp[type + "volume"] = list[i].volume;
                                dp[type + "totalvolume"] = list[i].totalvolume;
                                res.push(dp);
                            }
                        }

                    }
                    // Init
                    var res = [];
                    processData(data.bids, "bids", true);
                    processData(data.asks, "asks", false);
                    return res;
                }
            },
            "graphs": [{
                    "id": "bids",
                    "fillAlphas": 0.2,
                    "lineAlpha": 1,
                    "lineThickness": 2,
                    "lineColor": "#0f0",
                    "type": "step",
                    "valueField": "bidstotalvolume",
                    "balloonFunction": balloon
                }, {
                    "id": "asks",
                    "fillAlphas": 0.2,
                    "lineAlpha": 1,
                    "lineThickness": 2,
                    "lineColor": "#f00",
                    "type": "step",
                    "valueField": "askstotalvolume",
                    "balloonFunction": balloon
                }, {
                    "lineAlpha": 0,
                    "fillAlphas": 0.2,
                    "lineColor": "#0f0",
                    "type": "column",
                    "clustered": false,
                    "valueField": "bidsvolume",
                    "showBalloon": true
                }, {
                    "lineAlpha": 0,
                    "fillAlphas": 0.2,
                    "lineColor": "#f00",
                    "type": "column",
                    "clustered": false,
                    "valueField": "asksvolume",
                    "showBalloon": true
                }],
            "categoryField": "value",
            "chartCursor": {},
            "balloon": {
                "textAlign": "left"
            },
            "valueAxes": [{
                    "title": "Volume"
                }],
            "categoryAxis": {
                "title": "Price ("+market_details.currency_symbol+"/"+market_details.market_symbol+")",
                "minHorizontalGap": 100,
                "startOnAxis": true,
                "showFirstLabel": false,
                "showLastLabel": false
            },
            "export": {
                "enabled": true
            }
        });

		function balloon(item, graph) {
            var txt;
            if (graph.id === "asks") {
                txt = "Ask: <strong>" + formatNumber(item.dataContext.value, graph.chart, 4) + "</strong><br />"
                        + "Total volume: <strong>" + formatNumber(item.dataContext.askstotalvolume, graph.chart, 4) + "</strong><br />"
                        + "Volume: <strong>" + formatNumber(item.dataContext.asksvolume, graph.chart, 4) + "</strong>";
            } else {
                txt = "Bid: <strong>" + formatNumber(item.dataContext.value, graph.chart, 4) + "</strong><br />"
                        + "Total volume: <strong>" + formatNumber(item.dataContext.bidstotalvolume, graph.chart, 4) + "</strong><br />"
                        + "Volume: <strong>" + formatNumber(item.dataContext.bidsvolume, graph.chart, 4) + "</strong>";
            }
            return txt;
        }

        function formatNumber(val, chart, precision) {
            return AmCharts.formatNumber(
                val,
                {
                    precision: precision ? precision : chart.precision,
                    decimalSeparator: chart.decimalSeparator,
                    thousandsSeparator: chart.thousandsSeparator
                }
            );
        }         
    //exchange segment condition end under }
	}

	// Ajax Contract From
	$("body").on("submit","#contactForm", function(event) {
		event.preventDefault();

		var first_name  = $('#first_name').val();
		var email   	= $('#email').val();
		var phone   	= $('#phone').val();
		var comment 	= $('#comment').val();
		if(first_name == ""){
			allert_warning('warning', obj['first_name'][BDTASK.language()]);
			return false;
		} else if(phone == ""){
			allert_warning('warning', obj['phone_required'][BDTASK.language()]);
			return false;
		} else if (email == "") {
			allert_warning('warning', obj['email_required'][BDTASK.language()]);
			return false;
		} else if (comment == "") {
			allert_warning('warning', obj['comments_required'][BDTASK.language()]);
			return false;
		}

		var inputdata = $("#contactForm").serialize();

		$.ajax({
			url: BDTASK.getSiteAction("home/contactMsg"),
			type: "post",
			data: inputdata,
			success: function(d) {

				allert_warning('success',obj['message_send_successfuly'][BDTASK.language()]); 
				location.reload();
			},
			error: function(){
				allert_warning('error', obj['message_send_fail'][BDTASK.language()]);
			}
		});
	});

	//Ajax Language Change start
	$("#lang-change").on("change", function(event) {
        event.preventDefault();
        var lang = $("#lang-change").val();
        var token   ="&csrf_test_name="+BDTASK.csrf_hash();
        var inputdata = "lang="+lang+token;
        $.ajax({
            url: BDTASK.getSiteAction('home/langChange'),
            type: "post",
            data: inputdata,
            success: function(result,status,xhr) {
                location.reload();
            },
            error: function(xhr,status,error){
                location.reload();
            }
        });
    });
	//Ajax Language Change end

	//deposit inline js start
	if(path == "deposit"){
		$("#deposit_type").on("change", function(event){
			var deposit_type = $("#deposit_type").val()|| 0;

	        if (deposit_type == 'coin') {
	            $.getJSON(BDTASK.getSiteAction("home/dafult_data"), function(data) {
	                var htmlCoin = "<option>"+obj['select_option'][BDTASK.language()]+"</option>";
	                $.each(data.coin_list, function(index, element){
	                	if(element.symbol != "USD"){
		                    htmlCoin += "<option value="+element.symbol+" >"+element.full_name+"</option>";
		                }
	                });
	                $( "#crypto_coin").html(htmlCoin);
	            });

	            $("#crypto_coin").on("change", function(event){
	            	var crypto_coin = $("#crypto_coin").val()|| 0;
	            	if (crypto_coin == 'BTC') {
	            		$.getJSON(BDTASK.getSiteAction("home/dafult_data"), function(data) {
			                var htmlGateway = "<option>"+obj['deposit_method'][BDTASK.language()]+"</option>";
			                $.each(data.payment_gateway, function(index, v){
			                	if(v.identity == "bitcoin" || v.identity == "coinpayment" || v.identity == "payeer" || v.identity == "token"){
				                    htmlGateway += "<option value="+v.identity+" >"+v.agent+"</option>";
				                }
			                });
			                $( "#payment_method").html(htmlGateway);
			            });
	            	} else if (crypto_coin == 'BTC' || crypto_coin == 'BCH' || crypto_coin=='LTC' || crypto_coin=='LTCT' || crypto_coin=='DASH' || crypto_coin=='DOGE' || crypto_coin=='SPD' || crypto_coin=='RDD' || crypto_coin=='POT' || crypto_coin=='FTC' || crypto_coin=='VTC' || crypto_coin=='PPC' || crypto_coin=='MUE' || crypto_coin=='UNIT'){

	            		$.getJSON(BDTASK.getSiteAction("home/dafult_data"), function(data) {
			                var htmlGateway = "<option>"+obj['deposit_method'][BDTASK.language()]+"</option>";
			                $.each(data.payment_gateway, function(index, v){
			                	if(v.identity == "bitcoin" || v.identity == "coinpayment" || v.identity == "token"){
				                    htmlGateway += "<option value="+v.identity+" >"+v.agent+"</option>";
				                }
			                });
			                $( "#payment_method").html(htmlGateway);
			            });
	            	} else {
	            		$.getJSON(BDTASK.getSiteAction("home/dafult_data"), function(data) {
			                var htmlGateway = "<option>"+obj['deposit_method'][BDTASK.language()]+"</option>";
			                $.each(data.payment_gateway, function(index, v){
			                	if(v.identity == "coinpayment" || v.identity == "token"){
				                    htmlGateway += "<option value="+v.identity+" >"+v.agent+"</option>";
				                }
			                });
			                $( "#payment_method").html(htmlGateway);
			            });
	            	}
	            });
	        } else {
	        	$("#crypto_coin").html("<option value=''>"+obj['select_option'][BDTASK.language()]+"</option><option value='USD' >US Dollar</option>");
	        	$("#crypto_coin").on("change", function(event){
	            	var crypto_coin = $("#crypto_coin").val()|| 0;
	            	if (crypto_coin == 'USD') {
	            		$.getJSON(BDTASK.getSiteAction("home/dafult_data"), function(data) {
			                var htmlGateway = "<option>"+obj['deposit_method'][BDTASK.language()]+"</option>";
			                $.each(data.payment_gateway, function(index, v){
			                	if(v.identity != "bitcoin" && v.identity != "coinpayment"){
				                    htmlGateway += "<option value="+v.identity+" >"+v.agent+"</option>";
				                }
			                });
			                $( "#payment_method").html(htmlGateway);
			            });
	            	} else {
                        $( "#payment_method").html("<option>"+obj['deposit_method'][BDTASK.language()]+"</option>");
                    }
	            });
	        }
		});

		$("#payment_method").on("change", function(event) {
            event.preventDefault();
            var payment_method	= $("#payment_method").val()|| 0;
            var gateway 		= JSON.parse(BDTASK.gateway());
            var gateway_bank 	= JSON.parse(BDTASK.gateway_bank());

            if(payment_method == 'phone'){

            	$( ".payment_info").html("<div class='form-group'><label for='send_money'>Send Money</label><h2><a href=tel:"+gateway.public_key+">"+gateway.public_key+"</a></h2></div><div class='form-group'><label for='om_name'>"+obj['om_name'][BDTASK.language()]+"</label><input name='om_name' class='form-control om_name' type='text' id='om_name' autocomplete='off'></div><div class='form-group'><label for='om_mobile'>"+obj['om_mobile_no'][BDTASK.language()]+"</label><input name='om_mobile' class='form-control om_mobile' type='text' id='om_mobile' autocomplete='off'></div><div class='form-group'><label for='transaction_no'>"+obj['transaction_no'][BDTASK.language()]+"</label><input name='transaction_no' class='form-control transaction_no' type='text' id='transaction_no' autocomplete='off'></div><div class='form-group'><label for='idcard_no'>"+obj['idcard_no'][BDTASK.language()]+"</label><input name='idcard_no' class='form-control idcard_no' type='text' id='idcard_no' autocomplete='off'></div>");

            } else if (payment_method == 'bank') {

            	$( ".payment_info").html("<div class='form-group'><label for='send_money'>Account Name</label><h4>"+gateway_bank.acc_name+"</h4></div><div class='form-group'><label for='send_money'>Account No</label><h4>"+gateway_bank.acc_no+"</h4></div><div class='form-group'><label for='send_money'>Branch Name</label><h4>"+gateway_bank.branch_name+"</h4></div><div class='form-group'><label for='send_money'>SWIFT Code</label><h4>"+gateway_bank.swift_code+"</h4></div><div class='form-group'><label for='send_money'>ABN No</label><h4>"+gateway_bank.abn_no+"</h4></div><div class='form-group'><label for='send_money'>Country</label><h4>"+gateway_bank.country+"</h4></div><div class='form-group'><label for='send_money'>Bank Name</label><h4>"+gateway_bank.bank_name+"</h4></div><div class='form-group'><label for='document'>Document</label><input name='document' class='form-control document' type='file' id='document' autocomplete='off'></div>");

            } else if (payment_method=='token') {

                $( ".payment_info").html("<div class='form-group'><label for='comment' class=''>Your Wallet</label><textarea class='form-control' name='comment' id='comment' rows='1'></textarea></div>");

            } else {

                $( ".payment_info").html("<div class='form-group'><label for='comment' class=''>"+obj['comments'][BDTASK.language()]+"</label><textarea class='form-control' name='comment' id='comment' rows='3'></textarea></div>");
            }
        });
    //deposit inline js end

	//end of segment condition
	}

	if(path == "withdraw"){
		$("#withdraw_type").on("change", function(event){
			var withdraw_type = $("#withdraw_type").val()|| 0;

	        if (withdraw_type == 'coin') {
	            $.getJSON(BDTASK.getSiteAction("home/dafult_data"), function(data) {
	                var htmlCoin = "<option>"+obj['select_option'][BDTASK.language()]+"</option>";
	                $.each(data.coin_list, function(index, element){
	                	if(element.symbol != "USD"){
		                    htmlCoin += "<option value="+element.symbol+" >"+element.full_name+"</option>";
		                }
	                });
	                $( "#crypto_coin").html(htmlCoin);
	            });

	            $("#crypto_coin").on("change", function(event){
	            	var crypto_coin = $("#crypto_coin").val()|| 0;
	            	if (crypto_coin == 'BTC') {
	            		$.getJSON(BDTASK.getSiteAction("home/dafult_data"), function(data) {
			                var htmlGateway = "<option>"+obj['withdraw_method'][BDTASK.language()]+"</option>";
			                $.each(data.payment_gateway, function(index, v){
			                	if(v.identity == "bitcoin" || v.identity == "coinpayment" || v.identity == "payeer" || v.identity == "token"){
				                    htmlGateway += "<option value="+v.identity+" >"+v.agent+"</option>";
				                }
			                });
			                $( "#payment_method").html(htmlGateway);
			            });
	            	} else if (crypto_coin=='BTC' || crypto_coin=='BCH' || crypto_coin=='LTC' || crypto_coin=='LTCT' || crypto_coin=='DASH' || crypto_coin=='DOGE' || crypto_coin=='SPD' || crypto_coin=='RDD' || crypto_coin=='POT' || crypto_coin=='FTC' || crypto_coin=='VTC' || crypto_coin=='PPC' || crypto_coin=='MUE' || crypto_coin=='UNIT'){

	            		$.getJSON(BDTASK.getSiteAction("home/dafult_data"), function(data) {
			                var htmlGateway = "<option>"+obj['withdraw_method'][BDTASK.language()]+"</option>";
			                $.each(data.payment_gateway, function(index, v){
			                	if(v.identity == "bitcoin" || v.identity == "coinpayment" || v.identity == "token"){
				                    htmlGateway += "<option value="+v.identity+" >"+v.agent+"</option>";
				                }
			                });
			                $( "#payment_method").html(htmlGateway);
			            });
	            	} else {
	            		$.getJSON(BDTASK.getSiteAction("home/dafult_data"), function(data) {
			                var htmlGateway = "<option>"+obj['withdraw_method'][BDTASK.language()]+"</option>";
			                $.each(data.payment_gateway, function(index, v){
			                	if(v.identity == "coinpayment" || v.identity == "token"){
				                    htmlGateway += "<option value="+v.identity+" >"+v.agent+"</option>";
				                }
			                });
			                $( "#payment_method").html(htmlGateway);
			            });
	            	}
	            });
	        } else {
	        	$("#crypto_coin").html("<option value=''>"+obj['select_option'][BDTASK.language()]+"</option><option value='USD' >US Dollar</option>");
	        	$("#crypto_coin").on("change", function(event){
	            	var crypto_coin = $("#crypto_coin").val()|| 0;
	            	if (crypto_coin == 'USD') {
	            		$.getJSON(BDTASK.getSiteAction("home/dafult_data"), function(data) {
			                var htmlGateway = "<option>"+obj['withdraw_method'][BDTASK.language()]+"</option>";
			                $.each(data.payment_gateway, function(index, v){
			                	if(v.identity != "bitcoin" && v.identity != "coinpayment"){
				                    htmlGateway += "<option value="+v.identity+" >"+v.agent+"</option>";
				                }
			                });
			                $( "#payment_method").html(htmlGateway);
			            });
	            	} else {
                        $( "#payment_method").html("<option>"+obj['withdraw_method'][BDTASK.language()]+"</option>");
                    }
	            });
	        }
		});
	}

	//coinmarket js start
	if($( ".value_graph").length){
        // Sparkline Ajax
        window.setTimeout(function(){
          $( ".value_graph").text("Loading...");
          $.ajax({
            url: BDTASK.getSiteAction('home/coingraphdata'),
            type: "GET",
            dataType : "json",
            success: function(result,status,xhr) {
              var keys = Object.keys(result);
              for(var i=0;i<keys.length;i++){
                var key = keys[i];
                $("#GRAPH_"+key).text(result[key]);
                $('#GRAPH_'+key).sparkline('html', {type:'line', height:'40px', lineWidth:1, lineColor:'#35a947', fillColor:false, spotColor:'red'} );
              }
            },
            error: function(xhr,status,error){
              console.log(obj['no_data'][language]);
            }
          });
        }, 500);
    }
	//coinmarket js end
});

$(function(){
    "use strict";
    var info = $('table tbody tr');
    info.click(function() {
        var email    = $(this).children().first().text(); 
        var password = $(this).children().first().next().text();
        var user_role = $(this).attr('data-role');  

        $("input[name=luseremail]").val(email);
        $("input[name=lpassword]").val(password);
        $('select option[value='+user_role+']').attr("selected", "selected"); 
    });

    $('.footerHide').on('click', function(){
       $('#footer').hide();
    });

    $('.footerShow').on('click', function(){
       $('#footer').show();
    });
});
//Confirm Password check
function rePassword() {
    var pass = document.getElementById("pass").value;
    var r_pass = document.getElementById("r_pass").value;

    if (pass !== r_pass) {
        document.getElementById("r_pass").style.borderColor = '#f00';
        document.getElementById("r_pass").style.boxShadow = '0 0 0 0.2rem rgba(255, 0, 0,.25)';
        return false;
    }
    else{
        document.getElementById("r_pass").style.borderColor = '#ced4da';
        document.getElementById("r_pass").style.boxShadow = 'unset';
        return true;
    }
}

function validateForm() {

    var name     = document.forms["registerForm"]["rf_name"].value;
    var email    = document.forms["registerForm"]["remail"].value;
    var pass     = document.forms["registerForm"]["rpass"].value;
    var r_pass   = document.forms["registerForm"]["rr_pass"].value;
    var checkbox = document.forms["registerForm"]["accept_terms"].value;
       
    if (name == "") {

    	allert_warning('warning', obj['first_name_required'][BDTASK.language()]);
        return false;
    } else if (email == "") {

        allert_warning('warning', obj['email'][BDTASK.language()]);
        return false;

    } else if (pass == "") {

        allert_warning('warning', obj['password_required'][BDTASK.language()]);
        return false;

    } else if (!pass.match(/[a-z]/)) {

		allert_warning('warning', obj['a_lowercase_letter'][BDTASK.language()]);
		return false;

	} else if (!pass.match(/[A-Z]/)) {
		
		allert_warning('warning', obj['a_capital_uppercase_letter'][BDTASK.language()]);
		return false;

	} else if (!pass.match(/\d/)) {

		allert_warning('warning', obj['a_number'][BDTASK.language()]);
		return false;

	} else if (!pass.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g)) {

		allert_warning('warning', obj['a_special'][BDTASK.language()]);
		return false;

	} else if (pass.length < 8) {

        allert_warning('warning', obj['please_enter_at_least_8_characters_input'][BDTASK.language()]);
        return false;

    } else if (r_pass == "") {

        allert_warning('warning', obj['confirm_password_must_be_filled_out'][BDTASK.language()]);
        return false;

    } else if (checkbox == "") {

        allert_warning('warning', obj['must_confirm_privacy_policy_and_terms_and_conditions'][BDTASK.language()]);
        return false;
    }
}
function allert_warning(type, message){

	toastr[type]("", message)
	toastr.options = {
	  "closeButton": true,
	  "debug": false,
	  "newestOnTop": false,
	  "progressBar": false,
	  "positionClass": "toast-top-right",
	  "preventDuplicates": false,
	  "onclick": null,
	  "showDuration": "300",
	  "hideDuration": "1000",
	  "timeOut": "5000",
	  "extendedTimeOut": "1000",
	  "showEasing": "swing",
	  "hideEasing": "linear",
	  "showMethod": "fadeIn",
	  "hideMethod": "fadeOut"
	}
}
//Valid Email Address Check
function checkEmail() {
    var email = document.getElementById('email');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!filter.test(email.value)) {
        document.getElementById("email").style.borderColor = '#f00';
        document.getElementById("email").style.boxShadow = '0 0 0 0.2rem rgba(255, 0, 0,.25)';
        return false;
    }
    else{
        document.getElementById("email").style.borderColor = '#ced4da';
        document.getElementById("email").style.boxShadow = 'unset';
        return true;
    }
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return pattern.test(emailAddress);
}
//print a div
function printContent(el){
	var restorepage  = $('body').html();
	var printcontent = $('#' + el).clone();
	$('body').empty().html(printcontent);
	window.print();
	$('body').html(restorepage);
	location.reload();
}
//copy url clickbord
function copyFunction() {
  var copyText = document.getElementById("copyed");
  copyText.select();
  document.execCommand("Copy");
}
//deposit segment start
if(path == "deposit"){
	function Fee(method){
	            
	    var amount      = document.forms['deposit_form'].elements['amount'].value;
	    var method      = document.forms['deposit_form'].elements['method'].value;
	    var crypto_coin = document.forms['deposit_form'].elements['crypto_coin'].value;
	    var level       = document.forms['deposit_form'].elements['level'].value;

	    var inputdata = $("#deposit_form").serialize();

	    if (amount!="" || amount==0) {
	        $("#payment_method" ).prop("disabled", false);
	    }
	    if (amount=="" || amount==0) {
	        $('#fee').text("Fees is "+0);
	    }
	    if (amount!="" && method!=""){
	        $.ajax({
	            url     : BDTASK.getSiteAction('customer/ajaxload/fees_load'),
	            type    : 'POST', //the way you want to send data to your URL
	            data    : inputdata,
	            dataType: "JSON",
	            success : function(data) { 
	                if(data){
	                    $('[name="fees"]').val(data.fees);
	                    $('#fee').text("Fees is "+data.fees);              
	                } else {
	                    alert('Error!');
	                }  
	            }
	        });
	    } 
	}
}
//deposit segment end

//withdraw confirm start
if(path == "withdraw"){
	function Fee(method){
        var amount      = document.forms['withdraw'].elements['amount'].value;
        var method      = document.forms['withdraw'].elements['method'].value;
        var crypto_coin = document.forms['withdraw'].elements['crypto_coin'].value;
        var level       = document.forms['withdraw'].elements['level'].value;
        var inputdata = $("#withdraw").serialize();
        if (amount!="" || amount==0) {
            $("#payment_method" ).prop("disabled", false);
        }
        if (amount=="" || amount==0) {
            $('#fee').text("Fees is "+0);
        }
        if (amount!="" && method!=""){
            $.ajax({
                url     : BDTASK.getSiteAction('customer/ajaxload/fees_load'),
                type    : 'POST', //the way you want to send data to your URL
                data    : inputdata,
                dataType: "JSON",
                success : function(data) { 
                    if(data){
                        $('[name="fees"]').val(data.fees);
                        $('#fee').text("Fees is "+data.fees);                    
                    } else {
                        alert('Error!');
                    }  
                }
            });
        } 
    }

    function WalletId(method){            

        var inputdata = $("#withdraw").serialize();

        $.ajax({
            url     : BDTASK.getSiteAction('customer/ajaxload/walletid'),
            type    : 'POST', //the way you want to send data to your URL
            data    : inputdata,
            dataType:'JSON',
            success: function(data) { 
                if(data){
                    if (method=='bank') {
                        var bank = JSON.parse(data.wallet_id);
                        $('[name="walletid"]').val(data.wallet_id);
                        $('button[type=submit]').prop('disabled', false);
                        $('#walletidis').html("<small>Account Name: "+ bank.acc_name +"</small><br><small>Account No: "+ bank.acc_no +"</small><br><small>Branch Name: "+ bank.branch_name +"</small><br><small>SWIFT Code: "+ bank.swift_code +"</small><br><small>ABN No: "+ bank.abn_no +"</small><br><small>Country: "+ bank.country +"</small><br><small>Bank Name: "+ bank.bank_name +"</small><br>");
                    } else {
                        $('[name="walletid"]').val(data.wallet_id);
                        $('button[type=submit]').prop('disabled', false);
                        $('#walletidis').text('Your Wallet Id Is '+data.wallet_id);

                    };
                    $('#coinwallet').html("");
                    $('#walletidis').removeClass("text-danger");
	                $('#walletidis').addClass("text-success");
                } else {

                    if(method=='coinpayment' || method=='token'){
                        $('button[type=submit]').prop('disabled', false);
                        $('#coinwallet').html("<div class='form-group'><label for='amount'>Your Address</label><input class='form-control' name='wallet_address' type='text' id='wallet_address'></div>");
                        $('#walletidis').text('');

                    } else {
                        $('#coinwallet').html("");
                        $('button[type=submit]').prop('disabled', true);
                        $('#walletidis').text('Your have no withdrawal account');
                    }

                    $('#walletidis').removeClass("text-success");
	                $('#walletidis').addClass("text-danger");

                }  
            }
        });
    }
//end is if condition
}
function withdraw(id){
    var inputdata = $("#confirm_withdraw").serialize();
    swal({
        title: 'Please Wait......',
        type: 'warning',
        showConfirmButton: false,
        onOpen: function () {
            swal.showLoading();
        }
    });

    $.ajax({
        url: BDTASK.getSiteAction('home/withdraw_verify'),
        type: 'POST', //the way you want to send data to your URL
        data: inputdata+'&id='+id,
        success: function(data) {
            if(data!=''){
                swal({
                    title: "Good job!",
                    text: "Your Custom Email Send Successfully",
                    type: "success",
                    showConfirmButton: false,
                    timer: 1500
                });

               window.location.href = BDTASK.getSiteAction('withdraw-details/'+data);
                
            } else {
                swal({
                    title: "Wops!",
                    text: "Error Message",
                    type: "error",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    });
}
//withdraw confirm end
if(path == "transfer"){
	function ReciverChack(receiver_id){

        var inputdata = $("#transfer").serialize();

        $.ajax({
            url  : BDTASK.getSiteAction('customer/ajaxload/checke_reciver_id'),
            type : 'POST', //the way you want to send data to your URL
            data : inputdata,
            success: function(data) {                    
                if(data!=0){
                    $('#receiver_id').css("border","1px green solid");
                    $('#receiver_alert').css("color","green");
                    $('button[type=submit]').prop('disabled', false);
                } else {
                    $('button[type=submit]').prop('disabled', true);
                    $('#receiver_id').css("border","1px red solid");
                    $('#receiver_alert').css("color","red");
                }  
            },
        });
    }
//this end is if condition
}
if(path == "transfer-confirm"){
	function transfer(id){
	    var inputdata = $("#transfer_confirm").serialize();
	    swal({
	        title: 'Please Wait......',
	        type: 'warning',
	        showConfirmButton: false,
	        onOpen: function () {
	            swal.showLoading();
	        }
	    });

	    $.ajax({
	        url: BDTASK.getSiteAction('home/transfer_verify'),
	        type: 'POST', //the way you want to send data to your URL
	        data: inputdata+'&id='+id,
	        success: function(data) { 

	            if(data!=''){
	                swal({
	                    title: "Good job!",
	                    text: "Your Custom Email Send Successfully",
	                    type: "success",
	                    showConfirmButton: false,
	                    timer: 1500,
	                });
	                window.location.href = BDTASK.getSiteAction('transfer-details/'+data);
	            } else {
	                swal({
	                    title: "Wops!",
	                    text: "Error Message",
	                    type: "error",
	                    showConfirmButton: false,
	                    timer: 1500
	                });
	            }
	        }
	    });
	}
}

$(document).ready(function () {
    //SlimScroll
    $('.markert-table, .history-table').slimScroll({
        height: '411px',
        color: theme.theme_color,
        allowPageScroll: true,
        size: '8px',
        distance: '0px'

    });
    $('.buyOrder, .sellOrder, .sellRequest').slimScroll({
        height: '454px',
        color: theme.theme_color,
        allowPageScroll: true,
        size: '8px',
        distance: '0px'
    });
    $('.notice').slimScroll({
        height: '358px',
        color: theme.theme_color,
        allowPageScroll: true,
        size: '8px',
        distance: '0px'
    });
    $('#live_chat_list').slimScroll({
        height: '300px',
        color: theme.theme_color,
        allowPageScroll: true,
        size: '8px',
        distance: '0px'
    });

 	if(path == ""){
	    var $particles_js = $('#banner_bg_effect');
	    if ($particles_js.length > 0) {
	        particlesJS('banner_bg_effect',
	        // Update your personal code.
	        {
	            "particles": {
	                "number": {
	                    "value": 120,
	                    "density": {
	                        "enable": true,
	                        "value_area": 800
	                    }
	                },
	                "color": {
	                    "value": theme.theme_color
	                },
	                "shape": {
	                    "type": "polygon",
	                    "stroke": {
	                        "width": 0,
	                        "color": "#000000"
	                    },
	                    "polygon": {
	                        "nb_sides": 5
	                    },
	                    "image": {
	                        "src": BDTASK.getSiteAction('img/github.svg'),
	                        "width": 100,
	                        "height": 100
	                    }
	                },
	                "opacity": {
	                    "value": 0.4,
	                    "random": false,
	                    "anim": {
	                        "enable": false,
	                        "speed": 1,
	                        "opacity_min": 0.1,
	                        "sync": false
	                    }
	                },
	                "size": {
	                    "value": 3,
	                    "random": true,
	                    "anim": {
	                        "enable": false,
	                        "speed": 40,
	                        "size_min": 0.1,
	                        "sync": false
	                    }
	                },
	                "line_linked": {
	                    "enable": true,
	                    "distance": 150,
	                    "color": theme.theme_color,
	                    "opacity": 0.1,
	                    "width": 1
	                },
	                "move": {
	                    "enable": true,
	                    "speed": 6,
	                    "direction": "none",
	                    "random": false,
	                    "straight": false,
	                    "out_mode": "out",
	                    "bounce": false,
	                    "attract": {
	                        "enable": false,
	                        "rotateX": 600,
	                        "rotateY": 1200
	                    }
	                }
	            },
	            "interactivity": {
	                "detect_on": "canvas",
	                "events": {
	                    "onhover": {
	                        "enable": true,
	                        "mode": "repulse"
	                    },
	                    "onclick": {
	                        "enable": true,
	                        "mode": "push"
	                    },
	                    "resize": true
	                },
	                "modes": {
	                    "grab": {
	                        "distance": 400,
	                        "line_linked": {
	                            "opacity": 1
	                        }
	                    },
	                    "bubble": {
	                        "distance": 400,
	                        "size": 40,
	                        "duration": 2,
	                        "opacity": 8,
	                        "speed": 3
	                    },
	                    "repulse": {
	                        "distance": 200,
	                        "duration": 0.4
	                    },
	                    "push": {
	                        "particles_nb": 4
	                    },
	                    "remove": {
	                        "particles_nb": 2
	                    }
	                }
	            },
	            "retina_detect": true
	        });
	    }
	}
});

