//=========================================================================
//                               购物车js
//=========================================================================
window.onload = function () {
	var checkInputs = document.getElementsByClassName("check");
	var checkAllInputs = document.getElementsByClassName("check_all");
	var check_shop = document.getElementsByClassName("check_shop");
	var selectedTotal = document.getElementById("selectedTotal");
	var priceTotal = document.getElementById("priceTotal");
	var content = document.getElementsByClassName("goods_content");
	var ul = document.getElementsByClassName("goods_list");
	var deleteAll = document.getElementById("deleteAll");
	var sumTotal = document.getElementById("sumTotal");
	var check_goods = document.getElementsByClassName("check_goods");
	//  check_goods   所有  商品按钮


	function changeFlag(parm1, parm2) {
		var flag = true;
		for (var i = 0; i < parm1.length; i++) {
			if (parm1[i].checked == false) {
				flag = false;
				break;
			}
		}

		if (flag) {
			for (var j = 0; j < parm2.length; j++) {
				parm2[j].checked = true;
			}
		} else {
			for (var k = 0; k < parm2.length; k++) {
				parm2[k].checked = false;
			}
		}

	}
	//===================数量与价格的计算========================
	function getTotal() {
		var selected = 0;
		var price = 0;
		for (var i = 0; i < ul.length; i++) {
			if (ul[i].getElementsByTagName("input")[0].checked) {
				selected += parseInt(ul[i].getElementsByTagName("input")[1].value);
				price += parseFloat(ul[i].getElementsByTagName("li")[4].innerHTML);
			}
		}
		selectedTotal.innerHTML = selected;
		priceTotal.innerHTML = price.toFixed(2);
	}

	for (var i = 0; i < checkInputs.length; i++) {
		//===============================全选控制小按钮================================
		checkInputs[i].onclick = function () {

			if (this.className === "check_all check") {
				for (var j = 0; j < checkInputs.length; j++) {
					checkInputs[j].checked = this.checked;
				}
			}
			if (this.className === "check_shop check") {
				var uls = this.parentNode.parentNode.parentNode.getElementsByClassName(
					"goods_list"
				);
				for (var l = 0; l < uls.length; l++) {
					var check_shopInputs = uls[l].getElementsByTagName("input")[0];
					check_shopInputs.checked = this.checked;
				}
			}

			if (this.className === "check check_goods") {
				var check_shop = this.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("check_shop");
				var check_good = this.parentNode.parentNode.parentNode.getElementsByClassName("check");

				//===========商品按钮控制店铺=============
				var flag = true;
				changeFlag(check_good, check_shop);
				// for (var i = 0; i < check_good.length; i++) {
				//   if (check_good[i].checked == false) {
				//     flag = false;
				//     break;
				//   }
				// }

				// if (flag) {
				//   for (var j = 0; j < check_shop.length; j++) {
				//     check_shop[j].checked = true;
				//   }
				// } else {
				//   for (var k = 0; k < check_shop.length; k++) {
				//     check_shop[k].checked = false;
				//   }
				// }
				//==============商品按钮控制全选===========
				var check_goods = document.getElementsByClassName("check_goods");
				changeFlag(check_goods, checkAllInputs);
				//  check_goods   所有  商品按钮
				// for (var l = 0; l < check_goods.length; l++) {
				//   if (check_goods[l].checked == false) {
				//     flag = false;
				//     break;
				//   }
				// }
				// if (flag) {
				//   for (let m = 0; m < checkAllInputs.length; m++) {
				//     checkAllInputs[m].checked = true;
				//   }
				// } else {
				//   for (var n = 0; n < checkAllInputs.length; n++) {
				//     checkAllInputs[n].checked = false;
				//   }
				// }

			}
			getTotal();
		}
	}


	//============================底部删除选中=================================
	deleteAll.onclick = function () {
		if (selectedTotal.innerHTML != "0") {
			var conf = confirm("确定要删除所选中的商品吗");
			if (conf) {
				for (var i = 0; i < ul.length; i++) {
					var input = ul[i].getElementsByTagName("input")[0];
					if (input.checked) {
						ul[i].parentNode.removeChild(ul[i]);
						i--;

						getTotal();
					}
				}
			}
		}
	}

	//============================小计（单价*数量）================================
	function getSubTotal(ul) {
		var selected = parseInt(ul.getElementsByTagName("input")[1].value);
		var price = parseFloat(
			ul.getElementsByClassName("list_price")[0].innerText
		);
		var subTotal = parseFloat(price * selected).toFixed(2);
		ul.getElementsByClassName("list_sum")[0].innerHTML = subTotal;
	}
	//===========================按钮加减与单商品删除===============================

	for (var i = 0; i < ul.length; i++) {
		ul[i].onclick = function (e) {
			e = e || window.event;
			var el = e.srcElement;
			var cls = el.className;
			var reduce = this.getElementsByClassName("reduce")[0];
			var num = this.getElementsByTagName("input")[1];
			var val = parseInt(num.value);
			switch (cls) {
				case "add": //=========按钮加==============
					num.value = val + 1;
					reduce.innerHTML = "-";
					getSubTotal(this);
					getTotal();
					break;
				case "reduce": //==========按钮减==============
					if (val > 1) {
						num.value = val - 1;
						reduce.innerHTML = "-";
						getSubTotal(this);
						getTotal();
					}
					if (num.value <= 1) {
						reduce.innerHTML = "";
					}
					break;
				case "list_op": //===========单商品删除=========
					var conf = confirm("是否删除？");
					if (conf) {
						this.parentNode.removeChild(this);
						getSubTotal(this);
						getTotal();
					}
					break;
				default:
			}
		};
		//=============================数量输入==================
		ul[i].getElementsByTagName("input")[1].onkeyup = function () {
			var val = this.value;
			var ul = this.parentNode.parentNode;
			var reduce = ul.getElementsByClassName("reduce")[0];
			if (isNaN(val) || val < 1) {
				val = 1;
			}
			this.value = val;
			if (val <= 1) {
				reduce.innerHTML = ""
			} else {
				reduce.innerHTML = "-";
			}
			getSubTotal(ul);
			getTotal();
		};
	}
	checkAllInputs[0].checked = true;
	checkAllInputs[0].onclick();
};