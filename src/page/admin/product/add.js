import axios from "axios";
import { add } from "../../../api/product";
import headerAdmin from "../../../component/admin/headerAdmin"
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { getAll } from "../../../api/categories";
import $ from "jquery";
import validate from "jquery-validation";
const addProPage = {
     
   async render(){
       const cate = await getAll();
        return `
            ${headerAdmin.render()}
            <div>
            <div class="md:grid md:grid-cols-3 md:gap-6">
              <div class="md:col-span-1">
                <div class="px-4 sm:px-0">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">Products</h3>
                  <p class="mt-1 text-sm text-gray-600">Thêm Sản phẩm</p>
                </div>
              </div>
              <div class="mt-5 md:mt-0 md:col-span-2">
                <form id="formadd">
                  <div class="shadow sm:rounded-md sm:overflow-hidden">
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div class="grid grid-cols-3 gap-6">
                        <div class="col-span-3 sm:col-span-2">
                          <label for="company-website" class="block text-sm font-medium text-gray-700"> Name </label>
                          <div class="mt-1 flex rounded-md shadow-sm">
                        
                            <input type="text" name="name" id="name" class="name py-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Abc" requied>
                          </div>
                        </div>
                      </div>
          
                      <div>
                        <label for="about" class="block text-sm font-medium text-gray-700">Price</label>
                        <div class="mt-1">
                          <input id="price" name="price" rows="3" class="price py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="100$" required></input>
                        </div>
                        <label for="about" class="block text-sm font-medium text-gray-700">Quantity</label>
                        <div class="mt-1">
                        <input id="quantity" name="quantity" rows="3" class="quantity py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="100" requied></input>
                      </div>
                     
                      </div>
                      <div>
                      <label for="about" class="block text-sm font-medium text-gray-700">Category</label>
                      <div class="mt-1">
                   
                        <select id="cate">
                        ${cate.data.map(cate=>`
                         <option value="${cate.id}">${cate.name}</option>
                        `).join("")}
                           
                        </select>
                      </div>

                      <div class="mt-1">
                      <label for="about" class="block text-sm font-medium text-gray-700 mt-2">Color</label>
 
                      <select id="color">
                   
                       <option value="1">red</option>
                       <option value="2">blue</option>
                       <option value="3">green</option>
                       <option value="4">white</option>
                       <option value="5">black</option>
                    
                      </select>
                    </div>
                  
                    </div>
                    <div class="mt-1">
                    <label for="about" class="block text-sm font-medium text-gray-700">Status</label>
                    <select id="color">
                 
                     <option value="1">Còn hàng</option>
                     <option value="2">Hết hàng</option>
                
                    </select>

                  </div>
                    <div>
                    <label for="about" class="block text-sm font-medium text-gray-700">Description</label>
                    <div class="mt-1">
                      <textarea id="desc" name="desc" rows="3" class="desc py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Chuối hột" requied></textarea>
                    </div>
                  </div>
               
                      <div>
                        <label class="block text-sm font-medium text-gray-700"> Photo </label>
                        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div class="space-y-1 text-center">
                            <img src="" id="imgView" width="150px">
                            <div class="flex text-sm text-gray-600">
                              <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" class="file sr-only">
                              </label>
                              <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
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

    afterRender() {
        const formAddPro = $("#formadd");
        const imgView = document.querySelector('#imgView');
        const imgPost = document.querySelector('#file-upload');
        let link = "";
        const CLOUDINARY_PRESET = "tsllkbbb";
        const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/cornyhung/image/upload";

        imgPost.addEventListener('change', function(e){
          imgView.src = URL.createObjectURL(e.target.file[0])
        })
        
        formAddPro.validate({
          rules:{
            "name":{
              required: true,
              minlength:6
            },
            "price":{
              required: true,
              number: true
            },
            "quantity":{
              required: true,
              number: true
            },
            "desc":{
              required: true,
              maxlength: 100
            },
            "file-upload":{
              required: true
            }
          },
          messages:{
            "name":{
              required: "Trường này là bắt buộc",
              minlength:"It nhất là 6 ký tự"
            },
            "price":{
              required: "Trường này là bắt buộc",
              number: "Bạn phải nhập số"
            },
            "quantity":{
              required: "Trường này là bắt buộc",
              number: "Bạn phải nhập số"
            },
            "desc":{
              required: "Trường này là bắt buộc",
              maxlength: "Không được quá 100 ký tự"
            },
            "file-upload":{
              required: "Trường này là bắt buộc"
            },

          },

            submitHandler: ()=>{
              async function handleAddPro(){
                const file = document.querySelector("#file-upload").files[0];
                if(file){
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", CLOUDINARY_PRESET);
                  const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
                    headers: {
                        "Content-Type": "application/form-data",
                    },
                });
                link = data.url
              }
                add({
                    name: document.querySelector("#name").value,
                    img: link || "",
                    price: document.querySelector("#price").value,
                    quantity: document.querySelector('#quantity').value,
                    cateId: document.querySelector("#cate").value,
                    desc: document.querySelector("#desc").value,
                    status: document.querySelector("#status").value,
                    color: document.querySelector('#color').value,
                }).then(function(){
                  toastr.success("thêm thành công chuyển sau 2s");
                  setTimeout(() => {
                    document.location.href = "/admin/products";
                  }, 2000)
                });
                 
              }
              handleAddPro();
            }

         

        })
      

            
          
               
       
    },
}
export default addProPage