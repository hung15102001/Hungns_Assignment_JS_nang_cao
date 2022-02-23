let cart = [];
if(localStorage.getItem('cart')){
    cart = JSON.parse(localStorage.getItem('cart'))
}

export const addToCart = (newProduct, next) => {
    const exitsProduct = cart.find(item => item.id === newProduct.id);
    if(!exitsProduct){
        cart.push(newProduct);
    } else {
        exitsProduct.quantity +=  +newProduct.quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
}
export const increaseQuantity = (id) => {
    cart.find(item => item.id === +id).quantity++;
    localStorage.setItem('cart', JSON.stringify(cart));
}
export const decreaseQuantity = (id, next) => {
    const currentProduct = cart.find(item=> item.id === +id);
    currentProduct.quantity--;
    if(currentProduct.quantity < 1){
        const confirm = window.confirm("Ban co chac chan xoa khong?");
        if(confirm){
            cart = cart.filter(item => item.id !== id);
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
}
export const removeItemInCart = (id, next) => {
    const confirm = window.confirm("Ban co chac chan xoa khong?");
    if(confirm){
        cart = cart.filter(item => item.id !== +id);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    next();
}
export const totalPrice = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0;

    if(cart.length){
        totalPrice = cart.reduce((total, item) => {
            total += item.price * item.quantity;
            return total
        }, 0)
    }
    return totalPrice;
}
