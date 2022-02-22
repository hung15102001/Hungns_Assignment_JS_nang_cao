import axios from "axios";
import { edit, get } from "../../../api/post";
import headerAdmin from "../../../component/admin/headerAdmin";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import $ from "jquery";
import validate from "jquery-validation";
const AdminEditnew = {
    async render(id) {
        const { data } = await get(id);
        return `
        ${headerAdmin.render()}
        <div>
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Post Update</h3>
              <p class="mt-1 text-sm text-gray-600">Update Post</p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form id="formEdit">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-3 sm:col-span-2">
                      <label for="company-website" class="block text-sm font-medium text-gray-700"> Title </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                    
                        <input type="text" name="name" id="name" class="name py-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="abc" value="${data.title}">
                      </div>
                    </div>
                  </div>
      
                  <div>
                    <label for="about" class="block text-sm font-medium text-gray-700">Description </label>
                    <div class="mt-1">
                      <textarea id="desc" name="name" rows="3" class="desc shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Abc">${data.desc}</textarea>
                    </div>
                  </div>
                 

                  <div>
                    <label class="block text-sm font-medium text-gray-700"> Photo </label>
                    <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div class="space-y-1 text-center">
                      <img src="${data.img}" id="imgView" width="300px">
                        <div class="flex text-sm text-gray-600">
                          <label for="file-upload" class="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <span>Upload a file</span>
                            <input id="file-upload" name="file-upload" type="file" class="">
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
        `;
    },
    afterRender(id) {
        const formEditPost = document.querySelector("#formEdit");
        const imgView = document.querySelector("#imgView")
        const imgFile = document.querySelector("#file-upload")
        let img = '';
        const CLOUDINARY_PRESET = "tsllkbbb";
        const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/cornyhung/image/upload";

        imgFile.addEventListener('change', function(e){
          imgView.src = URL.createObjectURL(e.target.files[0]);
        });
        formEditPost.addEventListener("submit", async function (e) {
          e.preventDefault();
          const file = imgFile.files[0];
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
              img = data.url
          }
  
          
          // call api thêm bài viết
          edit({
              id: id,
              title: document.querySelector("#name").value,
              img: img ? img : imgView.src,
              desc: document.querySelector("#desc").value,
          }).then(function(){
            toastr.success("Update thành công chuyển sau 2s");
            setTimeout(() => {
              document.location.href = "/admin/news";
            }, 2000)
          });
      });
    },
};
export default AdminEditnew;