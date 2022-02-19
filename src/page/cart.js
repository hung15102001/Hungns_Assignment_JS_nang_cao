import footer from "../component/footer"
import header from "../component/header"
import nav from "../component/nav"
import { reRender } from "./ultils";
import { decreaseQuantity, increaseQuantity, removeItemInCart } from "./ultils/cartApi";

const cartPage = {
   async render(){
        let cart = [];
        let total = 0;
        let sum = 0;
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'))
        }
        return `
            ${header.render()}
            ${await nav.render()}
            <div class="container-fluid pt-5">
            <div class="row px-xl-5">
                <div class="col-lg-8 table-responsive mb-5">
                    <table class="table table-bordered text-center mb-0">
                        <thead class="bg-secondary text-dark">
                            <tr>
                                <th>Products</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Remove</th>
                            </tr>
                        </thead>
                        <tbody class="align-middle">
                        ${cart.map((item) => `
                        <tr>
                        <td class="align-middle"><img src="${item.img}" alt="" style="width: 50px;">${item.name}</td>
                        <td class="align-middle">${item.price}</td>
                        <td class="align-middle">
                            <div class="input-group quantity mx-auto" style="width: 100px;">
                                <div class="input-group-btn">
                                    <button data-id="${item.id}" class="btn btn-decrease btn-sm btn-primary btn-minus">
                                    <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" class="form-control form-control-sm bg-secondary text-center" value="${item.quantity}">
                                <div class="input-group-btn">
                                    <button data-id="${item.id}" class="btn btn-increase btn-sm btn-primary btn-plus">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                        <td class="align-middle">${total = item.price * item.quantity}</td>
                        <td class="align-middle"><button data-id="${item.id}" class="btn btn-sm btn-primary"><i class="fa fa-times"></i></button></td>
                    </tr>
                        `).join("")}
                         
                          
                        </tbody>
                    </table>
                </div>
                <div class="col-lg-4">
                    <form class="mb-5" action="">
                        <div class="input-group">
                            <input type="text" class="form-control p-4" placeholder="Coupon Code">
                            <div class="input-group-append">
                                <button class="btn btn-primary">Apply Coupon</button>
                            </div>
                        </div>
                    </form>
                    <div class="card border-secondary mb-5">
                        <div class="card-header bg-secondary border-0">
                            <h4 class="font-weight-semi-bold m-0">Cart Summary</h4>
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between mb-3 pt-1">
                                <h6 class="font-weight-medium">Subtotal</h6>
                                <h6 class="font-weight-medium">${sum += total}</h6>
                            </div>
                            <div class="d-flex justify-content-between">
                                <h6 class="font-weight-medium">Shipping</h6>
                                <h6 class="font-weight-medium">$10</h6>
                            </div>
                        </div>
                        <div class="card-footer border-secondary bg-transparent">
                            <div class="d-flex justify-content-between mt-2">
                                <h5 class="font-weight-bold">Total</h5>
                                <h5 class="font-weight-bold">$160</h5>
                            </div>
                            <button class="btn-block btn-primary my-3 py-3"><a href="/checkout">Proceed To Checkout</a></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            ${footer.render()}
        `
    },

    afterRender(){
        const btns = document.querySelectorAll('.btn');
        btns.forEach(button => {
            button.addEventListener('click', function(){
                const id = button.dataset.id;
                if(button.classList.contains('btn-increase')){
                    increaseQuantity(id);
                } else if (button.classList.contains('btn-decrease')){
                    decreaseQuantity(id, () => {
                        reRender(cartPage, "#app");
                    });
                } else {
                    removeItemInCart(id,  () => {
                        reRender(cartPage, "#app");
                    })
                }
            })
        })
    }
}
export default cartPage