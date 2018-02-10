$(document).ready(function () {
	var $checkInputs = $(".check"); //全局的全部checkbox
	var $checkAllInputs = $(".check_all"); //全选
	var $checkShops = $(".check_shop"); //全局店铺按钮
	var $ul = $(".goods_list"); //全局商品的ul
	var $cart_box = $(".cart_box"); //店铺盒子
	var $goods_content = $(".goods_content")
	var $checkShop = $cart_box.find(".check_shop"); //单个店铺按钮
	var $checkInput = $(".check_goods");
	var $selectedTotal = $("#selectedTotal");
	var $priceTotal = $("#priceTotal");
	var $add = $(".add");
	var $reduce = $(".reduce");
	var $delete = $(".list_op");
	var $deleteAll = $(".deleteAll");





	//=========================== 按钮全选 ，商铺全选======================
	function clickName(button1, button2) {
		if (button1.is(":checked")) {
			button2.prop("checked", true);
		} else {
			button2.prop("checked", false);
		}
		getTotal();
	}
	//==========================小计（单价*数量）===========================
	function getSubTotal($ul) {
		var $list_price = $ul.find(".list_price").text();
		var $count = parseInt($ul.find(".num").val());
		var $price = parseFloat($list_price);
		var $subTotal = parseFloat($count * $price).toFixed(2);
		$ul.find(".list_sum").text($subTotal);
	}

	//====================全选控制按钮=============================================
	$checkAllInputs.click(function () {
		clickName($(this), $checkInputs);
	});

	//====================店铺控制商品按钮============================================================
	$checkShop.click(function () {
		clickName($(this), $(this).parent().parent().parent().find(".check_goods"))
	})

	//====================店铺控制全选================================================================
	$checkShops.each(function () {
		$(this).click(function () {
			if ($(this).is(":checked")) {
				var len = $checkShops.length;
				var num = 0;
				$checkShops.each(function () {
					if ($(this).is(":checked")) {
						num++
					}
				})
				if (num == len) {
					$checkAllInputs.prop("checked", true);
				}
			} else {
				$checkAllInputs.prop("checked", false);
			}
		})
		getTotal();
	})

	//====================商品控制全选===============================================================
	$checkInput.each(function () {
		$(this).click(function () {
			if ($(this).is(":checked")) {
				var len = $checkInput.length;
				var num = 0;
				$checkInput.each(function () {
					if ($(this).is(":checked")) {
						num++
					}
				})
				if (num == len) {
					$checkAllInputs.prop("checked", true);
				}
			} else {
				$checkAllInputs.prop("checked", false);
			}
			getTotal();
		})
	})

	//====================商品控制店铺============================
	$checkInput.each(function () {
		$(this).click(function () {
			var $goods_list = $(this).parent().parent().parent();
			if ($(this).is(":checked")) {
				var $checkGoodInput = $goods_list.find(".check_goods");
				//店铺下的商品
				var len = $checkGoodInput.length;
				var num = 0;
				$checkGoodInput.each(function () {
					if ($(this).is(":checked")) {
						num++
					}
				})
				if (num == len) {
					$goods_list.parent().find(".check_shop").prop("checked", true);
				}
			} else {
				$goods_list.parent().find(".check_shop").prop("checked", false);
			}
			getTotal();
		})
	})

	//====================计算求和（总数，总价）================
	function getTotal() {
		var $selected = 0;
		var $price = 0;
		$(".num").each(function () {
			var $ul = $(this).parent().parent()
			var $inpChe = $ul.find(".check_goods");
			if ($inpChe.is(":checked")) {
				$selected += parseInt($ul.find(".num").val());
				$price += parseFloat($ul.find(".list_sum").text());
			}
		})
		$selectedTotal.text($selected);
		$priceTotal.text($price.toFixed(2));
	}
	//===========================按钮加减=====================
	$add.click(function () {
		var $ul = $(this).parent().parent();
		var $inputNum = $(this).prev();
		var $reduce = $(this).prev().prev();
		var $val = parseInt($inputNum.val()) + 1;
		$inputNum.val($val);
		$reduce.text("-");
		getSubTotal($ul);
		getTotal();
	})

	//============================按钮减=======================================
	$reduce.click(function () {
		var $ul = $(this).parent().parent();
		var $inputNum = $(this).next();
		var $val = parseInt($inputNum.val() - 1);
		if ($inputNum.val() > 1) {
			$inputNum.val($val);
			if ($val == 1) {
				$reduce.text("");
			}
		} else {
			$inputNum.val("1");
		}
		getSubTotal($ul);
		getTotal();
	})
	//=======================单个商品删除=========================
	$delete.click(function () {
		var $ul = $(this).parent();
		var $content = $ul.parent();
		var $conf = confirm("确认删除该商品吗？");
		if ($conf) {
			$ul.remove();
		}
				if ($content.html().trim() == null || $content.html().trim().length == 0) {
					$content.parent().remove();
					
				}
		getTotal();
	})
	//==========================键盘输入数量===========================
	$(".num").keyup(function () {
		if (isNaN($(this).val()) || $(this).val() < 1) {
			$(this).val("1");
		}
		var $inputNum = parseInt($(this).val());
		$(this).val($inputNum);
	})
	//=============================删除全部选中商品==========================
	$deleteAll.click(function() {
		var $conf = confirm("确认要删除所有选中商品吗？");
		$ul.each(function() {
			var $checkGoods = $(this).find(".check_goods");
			if ($checkGoods.is(":checked")) {
				if ($conf) {
					$ul.remove();
					
				}
				
			}
		})
		getTotal();

	})
















	$checkAllInputs.prop("checked", true);
	clickName($checkAllInputs, $checkInputs);

})