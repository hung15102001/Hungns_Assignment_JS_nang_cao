import footer from "../../component/footer"
import header from "../../component/header"
import nav from "../../component/nav"
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { get } from "../../api/product";
import { addToCart, decreaseQuantity, increaseQuantity } from "../ultils/cartApi";
import { reRender } from "../ultils";
import { add } from "../../api/comment";


const shopDetail = {
   async render(id){
       const { data:products } =  await get(id);
        return `
            ${header.render()}
            ${await nav.render()}
            <div class="container-fluid py-5">
            <div class="row px-xl-5">
                <div class="col-lg-5 pb-5">
                    <div id="product-carousel" class="carousel slide" data-ride="carousel">
                        <div class="carousel-inner border">
                           
                                <img src="${products.img}"  class="rounded w-100 h-100">
                          
                        </div>
                    </div>
                </div>
    
                <div class="col-lg-7 pb-5">
                    <h3 class="font-weight-semi-bold">${products.name}</h3>
                    <div class="d-flex mb-3">
                        <div class="text-primary mr-2">
                            <small class="fas fa-star"></small>
                            <small class="fas fa-star"></small>
                            <small class="fas fa-star"></small>
                            <small class="fas fa-star-half-alt"></small>
                            <small class="far fa-star"></small>
                        </div>
                    </div>
                    <h3 class="font-weight-semi-bold mb-4">${products.price}$</h3>
                    <p class="mb-4">${products.desc}</p>
                    <div class="d-flex mb-3">
                        <p class="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
                        <form>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="size-1" name="size">
                                <label class="custom-control-label" for="size-1">XS</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="size-2" name="size">
                                <label class="custom-control-label" for="size-2">S</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="size-3" name="size">
                                <label class="custom-control-label" for="size-3">M</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="size-4" name="size">
                                <label class="custom-control-label" for="size-4">L</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="size-5" name="size">
                                <label class="custom-control-label" for="size-5">XL</label>
                            </div>
                        </form>
                    </div>
                    <div class="d-flex mb-4">
                        <p class="text-dark font-weight-medium mb-0 mr-3">Colors:</p>
                        <form>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="color-1" name="color">
                                <label class="custom-control-label" for="color-1">Black</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="color-2" name="color">
                                <label class="custom-control-label" for="color-2">White</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="color-3" name="color">
                                <label class="custom-control-label" for="color-3">Red</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="color-4" name="color">
                                <label class="custom-control-label" for="color-4">Blue</label>
                            </div>
                            <div class="custom-control custom-radio custom-control-inline">
                                <input type="radio" class="custom-control-input" id="color-5" name="color">
                                <label class="custom-control-label" for="color-5">Green</label>
                            </div>
                        </form>
                    </div>
                    <div class="d-flex align-items-center mb-4 pt-2">
                        <div class="input-group quantity mr-3" style="width: 130px;">
                            <div class="input-group-btn">
                                <button data-id="" class="btn btn-primary btn-minus " type="button" onclick="minus()">
                                <i class="fa fa-minus"></i>
                                </button>
                            </div>
                            <input id="inputValue" type="text" class="form-control bg-secondary text-center" value="1">
                            <div class="input-group-btn">
                                <button  class="btn btn-primary btn-plus "  type="button" onclick="plus()">
                                    <i class="fa fa-plus"></i>
                                </button>
                            </div>
                        </div>
                        <button data-id="${products.id}" id="btnAddToCart" class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
                    </div>
                 
                </div>
            </div>

            <div class="row px-xl-5">
            <div class="col">
                <div class="nav nav-tabs justify-content-center border-secondary mb-4">
                    <a class="nav-item nav-link active" data-toggle="tab" href="#tab-pane-1">Description</a>
                    <a class="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a>
                </div>
                <div class="tab-content">
                    <div class="tab-pane fade show active" id="tab-pane-1">
                        <h4 class="mb-3">Product Description</h4>
                        <p>${products.desc}</p>
                       
                    </div>
                   
                    <div class="tab-pane fade" id="tab-pane-3">
                        <div class="row">
                            <div class="col-md-6">
                            </div>
                            <div class="col-md-6">
                                <h4 class="mb-4">Leave a review</h4>
                                <small>Your email address will not be published. Required fields are marked *</small>
                                <form id="form_comment">
                                    <div class="form-group">
                                        <label for="message">Your Review *</label>
                                        <textarea id="message" cols="30" rows="5" class="form-control" required maxlength="100"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">Your Name *</label>
                                        <input type="text" class="form-control" id="name" value="${JSON.parse(localStorage.getItem('user')).fullname}" >
                                    </div>
                                    <div class="form-group">
                                        <label for="email">Your Email *</label>
                                        <input type="email" class="form-control" id="email" value="${JSON.parse(localStorage.getItem('user')).email}">
                                    </div>
                                    <input type="text" id="userId" value="${JSON.parse(localStorage.getItem('user')).id}" hidden>
                                    <div class="form-group mb-0">
                                        <button type="submit"  class="btn btn-primary px-3">Leave Your Review</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            
        </div>
            ${footer.render()}
        `
    },
    afterRender() {
        const btnAddToCart = document.querySelector("#btnAddToCart");
        const  id  = btnAddToCart.dataset.id;
        var inputValue = document.querySelector("#inputValue").value;
       const form_comment =  document.querySelector("#form_comment");

       form_comment.addEventListener("submit", async(e) => {
           e.preventDefault();

           add({
               name: document.querySelector('#name').value,
               email: document.querySelector('#email').value,
               message: document.querySelector("#message").value,
               userId: document.querySelector("#userId").value
           }).then(function(){
               toastr.success("done");
           })
       })
       
        btnAddToCart.addEventListener("click", async () => {
            const { data } = await get(id);
            
            addToCart({ ...data, quantity: inputValue.value ? inputValue.value : 1 }, () => {
                toastr.success(`Thêm sản phẩm ${data.name} vào giỏ hàng thành công!`);
            });
        });
    },
}
export default shopDetail