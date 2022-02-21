
import { getAll } from "../api/categories";
import bannerHome from "./banner/bannerHome";
import toastr from "toastr";
import "toastr/build/toastr.min.css";


const nav = {
   async render(){
       
       const response = await getAll();
    
        return `
        <div class="container-fluid mb-5">
        <div class="row border-top px-xl-5">
            <div class="col-lg-3 d-none d-lg-block">
                <a class=" shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100" data-toggle="collapse" href="#navbar-vertical" style="height: 65px; margin-top: -1px; padding: 0 30px;">
                    <h6 class="m-0">Categories</h6>
                    <i class="fa fa-angle-down text-dark"></i>
                </a>
                <nav class="collapse show navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0" id="navbar-vertical">
                    <div class="navbar-nav w-100 overflow-hidden" style="height: 410px">
                        <div class="nav-item dropdown">
                            <a href="#" class="nav-link" data-toggle="dropdown">Dresses <i class="fa fa-angle-down float-right mt-1"></i></a>
                            <div class="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                <a href="" class="dropdown-item">Men's Dresses</a>
                                <a href="" class="dropdown-item">Women's Dresses</a>
                                <a href="" class="dropdown-item">Baby's Dresses</a>
                            </div>
                        </div>
                       
                        ${response.data.map((cate) => `
                            
                            <a  href="/products/cateId/${cate.id}" class="nav-item nav-link">${cate.name}</a> 
                            `).join("")}
                           
                       
                        
                    </div>
                </nav>
            </div>
            <div class="col-lg-9">
                <nav class="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                    <a href="" class="text-decoration-none d-block d-lg-none">
                        <h1 class="m-0 display-5 font-weight-semi-bold"><span class="text-primary font-weight-bold border px-3 mr-1">E</span>Shopper</h1>
                    </a>
                    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                        <div class="navbar-nav mr-auto py-0">
                            <a href="/" class="nav-item nav-link ">Home</a>
                            <a href="/shop" class="nav-item nav-link">Shop</a>
                            <div class="nav-item dropdown">
                                <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown">Pages</a>
                                <div class="dropdown-menu rounded-0 m-0">
                                    <a href="/cart" class="dropdown-item">Shopping Cart</a>
                                    <a href="checkout" class="dropdown-item">Checkout</a>
                                </div>
                            </div>
                            <a href="/contact" class="nav-item nav-link">Contact</a>
                            ${localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).id == 1 ? '<a href="/admin" class="nav-item nav-link">Dash Board</a>' : ''}
                            
                            
                        </div>
                        
                            <a href="/">${JSON.parse(localStorage.getItem("user")).email}</a>
                            ${localStorage.getItem("user") ? '<a href="/signin" id="logout" class="nav-item nav-link">Logout</a>'

                             :`
                             <a href="/signin" class="nav-item nav-link">Login</a>
                            <a href="/signup" class="nav-item nav-link">Register</a>
                             `}
                            
                        
                    </div>
                </nav>
                ${bannerHome.render()}
            </div>
        </div>
    </div>
    
        `
    },
    afterRender(){
      
        const email = document.querySelector('#email');
        const logout =  document.querySelector('#logout');
        if(email){
          email.innerHTML = JSON.parse(localStorage.getItem('user')).email;
        }
        if(logout){
          logout.addEventListener('click', function(){
           
            
           window.location.href = "/login";
            toastr.success("Logout thành công")
          })
        }
      }
}
export default nav