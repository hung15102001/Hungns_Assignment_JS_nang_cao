
import axios from "axios";
import { getAll } from "../../../api/categories"
import { edit, get } from "../../../api/product";
import headerAdmin from "../../../component/admin/headerAdmin"
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import $ from "jquery";
import validate from "jquery-validation";
const updatePro = {
    async render(id){
        const cate = await getAll();
        const {data} = await get(id);
        console.log(data.img)
        return `

            ${headerAdmin.render()}
            <div>
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                  <p class="mt-1 text-sm text-gray-600">Thêm Sản phẩm</p>
                </div>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <form id="formedit">
                  <div class="shadow sm:rounded-md sm:overflow-hidden">
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div class="grid grid-cols-3 gap-6">
                        <div class="col-span-3 sm:col-span-2">
                          <label for="company-website" class="block text-sm font-medium text-gray-700"> Name </label>
                          <div class="mt-1 flex rounded-md shadow-sm">
                        
                            <input type="text" name="email" id="name" class="py-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Abc" value="${data.name}" requied>
                          </div>
                        </div>
                      </div>
          
                      <div>
                        <label for="about" class="block text-sm font-medium text-gray-700">Price</label>
                        <div class="mt-1">
                          <input id="price" name="name" rows="3" class="py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="100$" value="${data.price}" requied></input>
                        </div>
                        <label for="about" class="block text-sm font-medium text-gray-700">Quantity</label>
                        <div class="mt-1">
                        <input id="quantity" name="name" rows="3" class="py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="100$" value="${data.quantity}" requied></input>
                      </div>
                     
                      </div>
                      <div>
                      <label for="about" class="block text-sm font-medium text-gray-700">Category</label>
                      <div class="mt-1">
                   
                        <select id="cate">
                        ${cate.data.map(cate=>`
                         <option selected="${cate.id}" value="${cate.id}">${cate.name}</option>
                        `).join("")}
                           
                        </select>
                      </div>
                      <label for="about" class="block text-sm font-medium text-gray-700 mt-2">Status</label>

                      <div class="mt-1">
                   
                      <select id="status">
                   
                       <option value="1">Còn hàng</option>
                       <option value="2">Hết hàng</option>
                  
                      </select>

                    </div>
                    </div>

                    <div>
                    <label for="about" class="block text-sm font-medium text-gray-700">Description</label>
                    <div class="mt-1">
                      <textarea id="desc" name="desc" rows="3" class="py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Chuối hột" requied>${data.desc}</textarea>
                    </div>
                  </div>
               
                      <div>
                        <label class="block text-sm font-medium text-gray-700"> Photo </label>
                        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div class="space-y-1 text-center">
                           <img src="${data.img}" id="imgView" width="300px">
                            <div class="flex text-sm text-gray-600">
                              <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Upload a file
                                <input id="file_upload" name="file-upload" type="file" class="">
                                </span>
                              </label>
                              <p class="pl-1">or drag and drop</p> 
                            </div>
                          
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        `
    },

    afterRender(id) {
        const formAdd = document.querySelector("#formedit");
        const imgView = document.querySelector("#imgView");
        const imgPost = document.querySelector("#file_upload");
        let imgLink = "";
        const CLOUDINARY_PRESET = "tsllkbbb";
        const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/cornyhung/image/upload";
    
        imgPost.addEventListener('change', function(e){
            imgPreview.src = URL.createObjectURL(e.target.files[0]);
        });
    
        formAdd.addEventListener("submit", async function (e) {
            e.preventDefault();
            const file = imgPost.files[0];
            if(file){
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_PRESET);
        
                // call api cloudinary
                const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
                    headers: {
                        "Content-Type": "application/form-data"
                    }
                })
                imgLink = data.url
            }
    
            
            // call api thêm bài viết
            edit({
                id: id,
                name: document.querySelector("#name").value,
                img: imgLink ? imgLink : imgView.src,
                price: document.querySelector("#price").value,
                quantity: document.querySelector("#quantity").value,
                cateId: document.querySelector("#cate").value,
                desc: document.querySelector("#desc").value,
                status: document.querySelector("#status").value
            }).then(function(){
              toastr.success("Update thành công chuyển sau 2s");
              setTimeout(() => {
                document.location.href = "/admin/products";
              }, 2000)
            });
        });
      },

}
export default updatePro