window.onload = function() {
  var cartTable = document.getElementById("cartTable");
  var tr = cartTable.children[1].rows;
  var checkInputs = document.getElementsByClassName("check");
  var checkAllInputs = document.getElementsByClassName("check_all");
  var selectedTotal = document.getElementById("selectedTotal");
  var priceTotal = document.getElementById("priceTotal");
  var deleteAll = document.getElementById("deleteAll");


  //计算
  function getTotal() {
    var selected = 0;
    var price = 0;
    for (var i = 0, len = tr.length; i < len; i++) {
      if (tr[i].getElementsByTagName("input")[0].checked) {
        selected += parseInt(tr[i].getElementsByTagName("input")[1].value);
        price += parseFloat(tr[i].cells[4].innerHTML);
      }
    }
    selectedTotal.innerHTML = selected;
    priceTotal.innerHTML = price.toFixed(2);
  }
  //小计
  function getSubTotal(tr) {
    var tds = tr.cells;
    var price = parseFloat(tds[2].innerHTML);
    var count = parseInt(tr.getElementsByTagName("input")[1].value);
    var subtotal = parseFloat(price * count);
    tds[4].innerHTML = subtotal.toFixed(2);
  }

  for (var i = 0; i < checkInputs.length; i++) {
    checkInputs[i].onclick = function() {
      if (this.className === "check_all check") {
        for (var j = 0; j < checkInputs.length; j++) {
          checkInputs[j].checked = this.checked;
        }
      }
      if (this.checked == false) {
        for (var k = 0; k < checkAllInputs.length; k++) {
          checkAllInputs[k].checked = false;
        }
      }
      getTotal()
    }
  }
  for (var i = 0; i < tr.length; i++) {
    tr[i].onclick = function(e) {
      e = e || window.event;
      var el = e.srcElement;
      var cls = el.className;
      var input = this.getElementsByTagName("input")[1];
      var val = parseInt(input.value);
      var reduce = this.getElementsByTagName("span")[1];

      switch (cls) {
        case "add":

          input.value = val + 1;
          reduce.innerHTML = "-";
          getSubTotal(this);
          break;
        case "reduce":
          if (val > 1) {
            input.value = val - 1;
          }
          if (input.value <= 1) {
            reduce.innerHTML = " ";
          }
          getSubTotal(this);
          break;
        case "delete":
          var conf = confirm("确定要删除该商品吗？");
          if (conf) {
            this.parentNode.removeChild(this)
          }
          break;
        default:
      }
      getTotal();
    }
    tr[i].getElementsByTagName("input")[1].onkeyup = function() {
      var val = parseInt(this.value);
      var tr = this.parentNode.parentNode;
      var reduce = tr.getElementsByTagName("span")[1];
      if (isNaN(val) || val < 1) {
        val = 1;

      }
      this.value = val;
      if (val <= 1) {
        reduce.innerHTML = "";
      } else {
        reduce.innerHTML = "-";
      }
      getSubTotal(tr);
      getTotal();
    }
  }
  deleteAll.onclick = function() {
    if (selectedTotal.innerHTML != "0") {
      var conf = confirm("确定要删除所选中的商品吗？");
      if (conf) {
        for (var i = 0; i < tr.length; i++) {
          var input = tr[i].getElementsByTagName("input")[0];
          if (input.checked) {
            tr[i].parentNode.removeChild(tr[i]);
            i--;

          }
        }

      }

    }
  }
  checkAllInputs[0].checked = true;
  checkAllInputs[0].onclick();


}
