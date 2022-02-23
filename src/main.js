import Navigo from "navigo";
import aboutPage from "./page/about";
import catePageAdmin from "./page/admin/category";
import addCatePage from "./page/admin/category/add";
import updateCatePage from "./page/admin/category/update";
import commentPage from "./page/admin/comment";
import feedbackAdmin from "./page/admin/feedback";
import newListAdmin from "./page/admin/news";
import AdminAddPosts from "./page/admin/news/addNewPage";
import AdminEditnew from "./page/admin/news/updateNewPage";
import proAdminPage from "./page/admin/product";
import addProPage from "./page/admin/product/add";
import updatePro from "./page/admin/product/update";
import userAminpage from "./page/admin/users";
import userAminAdd from "./page/admin/users/add";
import userAdminUpdate from "./page/admin/users/update";
import cartPage from "./page/cart";
import checkout from "./page/checkout";
import contactPage from "./page/contact";
import adminPage from "./page/dashboard";
import homePage from "./page/home";
import login from "./page/login";

import listProForCate from "./page/proForCate";
import shopDetail from "./page/shop/detail";
import shopPage from "./page/shop/index";
import SignupPage from "./page/signup";

const router =  new Navigo("/", {linksSelector: "a"})
const print = async (content,id) => {
    document.getElementById("app").innerHTML =  await content.render(id);
    if(content.afterRender) await content.afterRender(id);
}
router.on("/admin/*", () => {}, {
    before: (done) => {
        if (localStorage.getItem("user")) {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            if (userId === 1) {
                done();
            } else {
                document.location.href = "/";
            }
        } else {
            document.location.href = "/";
        }
    },
});


router.on({
    "/": () => print(homePage),
    "/shop":() => print(shopPage),
    "/shop/:id":({data}) => print(shopDetail, data.id),
    "/contact": () => print(contactPage),
    "/about":()=> print(aboutPage),
    "/checkout":() => print(checkout),
    "/cart":()=> print(cartPage),
    "/signin": () => print(login),
    "/signup": () => print(SignupPage),
    "/products/cateId/:cateId":({data})=> print(listProForCate, data.cateId),

    "/admin": () => print(adminPage),

    "/admin/news": () => print(newListAdmin),
    "/admin/news/add": () => print(AdminAddPosts),
    "/admin/news/edit/:id":({data}) => print(AdminEditnew, data.id),

    "/admin/users":() => print(userAminpage),
    "/admin/users/add":() => print(userAminAdd),
    "/admin/users/edit/:id":({data}) => print(userAdminUpdate, data.id),

    "/admin/products": () => print(proAdminPage),
    "/admin/products/add":() => print(addProPage),
    "/admin/products/edit/:id": ({data}) => print(updatePro, data.id),
    

    "/admin/categories": () => print(catePageAdmin),
    "/admin/categories/add":() => print(addCatePage),
    "/admin/categories/edit/:id": ({data}) => print(updateCatePage, data.id),

    "/admin/feedbacks":()=> print(feedbackAdmin),

    "/admin/comments":() => print(commentPage),
});
router.resolve();
