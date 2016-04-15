//TODO: Please write code in this file.
function printReceipt(inputs){
  var outputs= count(inputs);
  var items=buildItems(outputs);
  var cartItems=buildCartItems(items);
  var receipt=buildReceipt(cartItems);
  console.log(receipt);

}
function count(inputs){
  var outputs=[];
  var count=[];
  count[0]=0;
  count[1]=0;
  count[2]=0;
  inputs.forEach(function( input){


    if(input.barcode=='ITEM000000')
          count[0]++;
    else if(input.barcode=='ITEM000001')
      count[1]++;
    else count[2]++;

  });

  var flag1=0;
  var flag2=0;
  var flag3=0;
  inputs.forEach(function(input){
    if(input.barcode=='ITEM000000'&&flag1==0){
    outputs.push({barcode:input.barcode,name:input.name,unit:input.unit,price:input.price,count:count[0]});
      flag1=1;
    }
    if(input.barcode=='ITEM000001'&&flag2==0){
      outputs.push({barcode:input.barcode,name:input.name,unit:input.unit,price:input.price,count:count[1]});
      flag2=1;
    }
    if(input.barcode=='ITEM000004'&&flag3==0){
      outputs.push({barcode:input.barcode,name:input.name,unit:input.unit,price:input.price,count:count[2]});
      flag3=1;
    }




  });
  return outputs;


}
function buildItems(outputs){
  var items=[];

  outputs.forEach(function(output){
    var subtotal=(output.count*output.price);

    items.push({item:output,subtotal:subtotal});
  });

  return items;
}
function buildCartItems(items){
  var cartItems=[];
  var total=0;
  items.forEach(function (item){
    total+=item.subtotal;

  });

  cartItems={cartitem:items,total:total};
  return cartItems;


}
function buildReceipt(cartItems){
  return ('***<没钱赚商店>收据***\n'+build(cartItems)+'----------------------\n'+
  '总计：'+((cartItems.total).toFixed(2))+'(元)\n'+'**********************');

}


function build(cartItems) {
  var text = '';
  //var citems=cartItems.cartitem;
  var citems=cartItems.cartitem;
  citems.forEach(function(citem){
    text +=('名称：' + citem.item.name + '，'+'数量：' + citem.item.count + citem.item.unit + '，'+'单价：' + (citem.item.price).toFixed(2)
    +'(元)'+'，'+ '小计：'+(citem.subtotal).toFixed(2)+'(元)\n');


  });
  return text;
}


