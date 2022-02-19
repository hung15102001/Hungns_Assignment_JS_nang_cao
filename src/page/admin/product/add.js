import axios from "axios";
import { add } from "../../../api/product";
import headerAdmin from "../../../component/admin/headerAdmin"
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { getAll } from "../../../api/categories";
const addProPage = {
     
   async render(){
       const cate = await getAll();
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
                <form id="formadd">
                  <div class="shadow sm:rounded-md sm:overflow-hidden">
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div class="grid grid-cols-3 gap-6">
                        <div class="col-span-3 sm:col-span-2">
                          <label for="company-website" class="block text-sm font-medium text-gray-700"> Name </label>
                          <div class="mt-1 flex rounded-md shadow-sm">
                        
                            <input type="text" name="email" id="name" class="py-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="Abc" requied>
                          </div>
                        </div>
                      </div>
          
                      <div>
                        <label for="about" class="block text-sm font-medium text-gray-700">Price</label>
                        <div class="mt-1">
                          <input id="price" name="name" rows="3" class="py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="100$" requied></input>
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
                      <input id="desc" name="desc" rows="3" class="py-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Chuối hột" requied></input>
                    </div>
                  </div>
               
                      <div>
                        <label class="block text-sm font-medium text-gray-700"> Photo </label>
                        <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                          <div class="space-y-1 text-center">
                            <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <div class="flex text-sm text-gray-600">
                              <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                <span>Upload a file</span>
                                <input id="file-upload" name="file-upload" type="file" class="sr-only">
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
        const formAddUser = document.querySelector("#formadd");
        const CLOUDINARY_PRESET = "tsllkbbb";
        const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/cornyhung/image/upload";

        formAddUser.addEventListener("submit", async (e) => {
            e.preventDefault();

            const file = document.querySelector("#file-upload").files[0];
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", CLOUDINARY_PRESET);

              const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
                headers: {
                    "Content-Type": "application/form-data",
                },
            });
            add({
                name: document.querySelector("#name").value,
                img: data.url,
                price: document.querySelector("#price").value,
                cateId: document.querySelector("#cate").value,
                desc: document.querySelector("#desc").value,
                status: document.querySelector("#status").value
                
            }).then(function(){
              toastr.success("thêm thành công chuyển sau 2s");
              setTimeout(() => {
                document.location.href = "/admin/products";
              }, 2000)
            });
             
            
          
               
        });
    },
}
export default addProPage