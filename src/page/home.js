import { get, getAll } from "../api/product";
import footer from "../component/footer"
import header from "../component/header"
import nav from "../component/nav"
import productList from '../component/list/newList';
import { data } from "jquery";
import { addToCart } from "./ultils/cartApi";
import toastr from "toastr"

const homePage = {
    async render(){
        const response = await getAll(); 
        return `
            ${header.render()}
            <div>
            ${await nav.render()}
            <!-- Featured Start -->
            <div class="container-fluid pt-5">
                <div class="row px-xl-5 pb-3">
                    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
                            <h1 class="fa fa-check text-primary m-0 mr-3"></h1>
                            <h5 class="font-weight-semi-bold m-0">Quality Product</h5>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
                            <h1 class="fa fa-shipping-fast text-primary m-0 mr-2"></h1>
                            <h5 class="font-weight-semi-bold m-0">Free Shipping</h5>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
                            <h1 class="fas fa-exchange-alt text-primary m-0 mr-3"></h1>
                            <h5 class="font-weight-semi-bold m-0">14-Day Return</h5>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                        <div class="d-flex align-items-center border mb-4" style="padding: 30px;">
                            <h1 class="fa fa-phone-volume text-primary m-0 mr-3"></h1>
                            <h5 class="font-weight-semi-bold m-0">24/7 Support</h5>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Featured End -->
        
        
            <!-- Categories Start -->
            <div class="container-fluid pt-5">
                <div class="row px-xl-5 pb-3">
                    <div class="col-lg-4 col-md-6 pb-1">
                        <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                            <p class="text-right">15 Products</p>
                            <a href="" class="cat-img position-relative overflow-hidden mb-3">
                                <img class="img-fluid" src="img/cat-1.jpg" alt="">
                            </a>
                            <h5 class="font-weight-semi-bold m-0">Men's dresses</h5>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 pb-1">
                        <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                            <p class="text-right">15 Products</p>
                            <a href="" class="cat-img position-relative overflow-hidden mb-3">
                                <img class="img-fluid" src="img/cat-2.jpg" alt="">
                            </a>
                            <h5 class="font-weight-semi-bold m-0">Women's dresses</h5>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 pb-1">
                        <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                            <p class="text-right">15 Products</p>
                            <a href="" class="cat-img position-relative overflow-hidden mb-3">
                                <img class="img-fluid" src="img/cat-3.jpg" alt="">
                            </a>
                            <h5 class="font-weight-semi-bold m-0">Baby's dresses</h5>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 pb-1">
                        <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                            <p class="text-right">15 Products</p>
                            <a href="" class="cat-img position-relative overflow-hidden mb-3">
                                <img class="img-fluid" src="img/cat-4.jpg" alt="">
                            </a>
                            <h5 class="font-weight-semi-bold m-0">Accerssories</h5>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 pb-1">
                        <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                            <p class="text-right">15 Products</p>
                            <a href="" class="cat-img position-relative overflow-hidden mb-3">
                                <img class="img-fluid" src="img/cat-5.jpg" alt="">
                            </a>
                            <h5 class="font-weight-semi-bold m-0">Bags</h5>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-6 pb-1">
                        <div class="cat-item d-flex flex-column border mb-4" style="padding: 30px;">
                            <p class="text-right">15 Products</p>
                            <a href="" class="cat-img position-relative overflow-hidden mb-3">
                                <img class="img-fluid" src="img/cat-6.jpg" alt="">
                            </a>
                            <h5 class="font-weight-semi-bold m-0">Shoes</h5>
                        </div>
                    </div>
                </div>


                
            </div>
            <!-- Categories End -->
        
        
            <!-- Offer Start -->
            <div class="container-fluid offer pt-5">
                <div class="row px-xl-5">
                    <div class="col-md-6 pb-4">
                        <div class="position-relative bg-secondary text-center text-md-right text-white mb-2 py-5 px-5">
                            <img src="img/offer-1.png" alt="">
                            <div class="position-relative" style="z-index: 1;">
                                <h5 class="text-uppercase text-primary mb-3">20% off the all order</h5>
                                <h1 class="mb-4 font-weight-semi-bold">Spring Collection</h1>
                                <a href="" class="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 pb-4">
                        <div class="position-relative bg-secondary text-center text-md-left text-white mb-2 py-5 px-5">
                            <img src="img/offer-2.png" alt="">
                            <div class="position-relative" style="z-index: 1;">
                                <h5 class="text-uppercase text-primary mb-3">20% off the all order</h5>
                                <h1 class="mb-4 font-weight-semi-bold">Winter Collection</h1>
                                <a href="" class="btn btn-outline-primary py-md-2 px-md-3">Shop Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Offer End -->
        
        
            <!-- Products Start -->
            <div class="container-fluid pt-5">
                <div class="text-center mb-4">
                    <h2 class="section-title px-5"><span class="px-2">Trandy Products</span></h2>
                </div>

                <div class="row px-xl-5 pb-3">
                  
                ${response.data.map((product)=> `
                <div class="col-lg-3 col-md-6 col-sm-12 pb-1">
                <div class="card product-item border-0 mb-4">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img class="img-fluid w-100" src="${product.img}" alt="" height="auto">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 class="text-truncate mb-3">${product.name}</h6>
                        <div class="d-flex justify-content-center">
                            <h6>${product.price}$</h6><h6 class="text-muted ml-2"><del>$123.00</del></h6>
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <a href="/shop/${product.id}" class="btn btn-sm text-dark p-0"><i class="fas fa-eye text-primary mr-1"></i>View Detail</a>
                        <a data-id="${product.id}" class="btn btn-add btn-sm text-dark p-0"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</a>
                    </div>
                </div>
                </div>
                `).join("")}
               
                </div>
            </div>
            <!-- Products End -->
        
        
            <!-- Subscribe Start -->
            <div class="container-fluid bg-secondary my-5">
                <div class="row justify-content-md-center py-5 px-xl-5">
                    <div class="col-md-6 col-12 py-5">
                        <div class="text-center mb-2 pb-2">
                            <h2 class="section-title px-5 mb-3"><span class="bg-secondary px-2">Stay Updated</span></h2>
                            <p>Amet lorem at rebum amet dolores. Elitr lorem dolor sed amet diam labore at justo ipsum eirmod duo labore labore.</p>
                        </div>
                        <form action="">
                            <div class="input-group">
                                <input type="text" class="form-control border-white p-4" placeholder="Email Goes Here">
                                <div class="input-group-append">
                                    <button class="btn btn-primary px-4">Subscribe</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
         
        </div>
            ${footer.render()}
        `
    },
    afterRender(){
        const btns = document.querySelectorAll(".btn-add");
    
        btns.forEach(btn => {
           
            const id = btn.dataset.id;
            btn.addEventListener('click', async function(){
                const {data} = await get(id);
                addToCart({...data, quantity: 1}, () =>{
                    console.log(123)
                    toastr.success(`Thêm sản phẩm ${data.name} vào giỏ hàng thành công!`);
                    document.location.href="/"
                })
            })
        })
    }
}
export default homePage