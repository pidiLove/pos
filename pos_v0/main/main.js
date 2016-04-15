//TODO: Please write code in this file.
function printReceipt(inputs){
  var items=buildItems(inputs);
  var cartItems=buildCartItems(items);
  var receipt=buildReceipt(cartItems);
  console.log(receipt);

}
function buildItems(inputs){
	var items=[];
	inputs.forEach(function( input){
	var subtotal=(input.count*input.price);

	items.push({item:input,subtotal:subtotal});
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


