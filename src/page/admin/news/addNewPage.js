
import headerAdmin from "../../../component/admin/headerAdmin";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { add } from "../../../api/post";
import axios from "axios";
import $ from "jquery";
import validate from "jquery-validation";

const AdminAddPosts = {
    async render() {
        return `
           
                ${headerAdmin.render()}
                <div>
                <div class="md:grid md:grid-cols-3 md:gap-6">
                  <div class="md:col-span-1">
                    <div class="px-4 sm:px-0">
                      <h3 class="text-lg font-medium leading-6 text-gray-900">Post</h3>
                      <p class="mt-1 text-sm text-gray-600">Thêm Bài Viết</p>
                    </div>
                  </div>
                  <div class="mt-5 md:mt-0 md:col-span-2">
                    <form id="formAddPost">
                      <div class="shadow sm:rounded-md sm:overflow-hidden">
                        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                          <div class="grid grid-cols-3 gap-6">
                            <div class="col-span-3 sm:col-span-2">
                              <label for="company-website" class="block text-sm font-medium text-gray-700"> Title </label>
                              <div class="mt-1 flex rounded-md shadow-sm">
                            
                                <input type="text" name="title" id="title-post" class="name py-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="abc">
                              </div>
                            </div>
                          </div>
              
                          <div>
                            <label for="about" class="block text-sm font-medium text-gray-700">Description </label>
                            <div class="mt-1">
                              <textarea id="desc-post" name="desc" rows="3" class="desc shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="abcde"></textarea>
                            </div>
                           
                          </div>
                          <div>
                         
                        </div>
              
                   
                          <div>
                            <label class="block text-sm font-medium text-gray-700"> Photo </label>
                            <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                              <div class="space-y-1 text-center">
                               <img src="" id="imgView" width="100px">
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
        `;
    },
    afterRender() {
        const formAddPost = $("#formAddPost");
        const imgPreview = document.querySelector('#imgView');
       const imgPost = document.querySelector('#file-upload');
       let img = ""
        const CLOUDINARY_PRESET = "tsllkbbb";
        const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/cornyhung/image/upload";

        imgPost.addEventListener('change', function(e){
          imgPreview.src = URL.createObjectURL(e.target.file[0])
        })

        formAddPost.validate({
            rules:{
              "title":{
                required: true,
                minlength: 6
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
              "title":{
                required: "Bạn không được bỏ trống",
                minlength: "Qúa ngắn, ít nhất 6 ký tự"
              },
              "desc":{
                required: "Bạn không được bỏ trống",
                maxlength: "Không quá 100 ký tự"
              },
              "file-upload":{
                required: "Bạn phải chọn ảnh"
              }
            },

            submitHandler: () =>{
              async function handleAddPost(){
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
                img = data.url
              }
                add({
                    
                    title: document.querySelector("#title-post").value,
                    img: img || "",
                    desc: document.querySelector("#desc-post").value,
                }).then(function(){
                    toastr.success("thêm thành công chuyển sau 2s");
                    setTimeout(() => {
                      document.location.href = "/admin/news";
                    }, 2000)
                  });
           
              }
              handleAddPost();
            }
        });

      
          
    },
};
export default AdminAddPosts;