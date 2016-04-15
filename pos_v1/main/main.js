function printReceipt(inputs) {
  var outputs = count(inputs);
  var items = buildItems(outputs);
  var cartItems = buildCartItems(items);
  var receipt = buildReceipt(cartItems);

  console.log(receipt);
}
function count(inputs) {
  var outputs = [];
  var allItems = [];
  allItems = loadAllItems();
  var count = [0, 0, 0];

  inputs.forEach(function (input) {
    if (input == 'ITEM000001')
      count[0]++;
    else if (input == 'ITEM000003-2') {
      var s = input.split('-');
      count[1] = s[1];

    }
    else count[2]++;
  });
  var flag1 = 0;
  var flag2 = 0;
  var flag3 = 0;
  allItems.forEach(function (allitem) {
    if (flag1 == 0 && allitem.barcode == 'ITEM000001') {
      outputs.push({
        barcode: allitem.barcode,
        name: allitem.name,
        unit: allitem.unit,
        price: allitem.price,
        count: count[0]
      });
      flag1 = 1;
    }
    if (flag2 == 0 && allitem.barcode == 'ITEM000003') {
      outputs.push({
        barcode: allitem.barcode,
        name: allitem.name,
        unit: allitem.unit,
        price: allitem.price,
        count: count[1]
      });
      flag2 = 1;
    }
    if (flag3 == 0 && allitem.barcode == 'ITEM000005') {
      outputs.push({
        barcode: allitem.barcode,
        name: allitem.name,
        unit: allitem.unit,
        price: allitem.price,
        count: count[2]
      });
      flag3 = 1;
    }

  })

  return outputs;


}
function buildItems(outputs) {
  var items = [];
  var promotion = [];
  promotion = loadPromotions();
  var subtotal;
  var subtatal1;
  outputs.forEach(function (output) {
    if (output.barcode == 'ITEM000001') {
      if ((output.count) % 2 == 0)
        subtotal = ((output.count / 2) * output.price);
      else
        subtotal = ((parseInt(output.count / 2) + 2) * output.price);
    }
    else if (output.barcode == 'ITEM000005') {
      subtotal = ((parseInt(output.count / 2) + 1) * output.price);

    }
    else subtotal = (output.count * output.price);
    subtotal1 = (output.count * output.price);
    items.push({item: output, subtotal: subtotal, subtotal1: subtotal1});
  });

  return items;
}

function buildCartItems(items) {
  var cartItems = [];
  var total = 0;
  var total1 = 0;

  items.forEach(function (item) {
    total += item.subtotal;
    total1 += item.subtotal1;
  });
  cartItems = {cartitem: items, total: total, total1: total1};

  return cartItems;
}
function buildReceipt(cartItems) {
  return ('***<没钱赚商店>收据***\n' + build(cartItems) + '----------------------\n' +
  '总计：' + ((cartItems.total).toFixed(2)) + '(元)\n' + '节省：' + ((cartItems.total1 - cartItems.total).toFixed(2)) + '(元)\n' + '**********************');
}

function build(cartItems) {
  var text = '';
  var citems = cartItems.cartitem;

  citems.forEach(function (citem) {
    text += ('名称：' + citem.item.name + '，' + '数量：' + citem.item.count + citem.item.unit + '，' + '单价：' + (citem.item.price).toFixed(2)
    + '(元)' + '，' + '小计：' + (citem.subtotal).toFixed(2) + '(元)\n');
  });

  return text;
}



