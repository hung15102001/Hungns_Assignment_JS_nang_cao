import axios from "axios";
import { add } from "../../../api/user";
import headerAdmin from "../../../component/admin/headerAdmin";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import $ from "jquery";
import validate from "jquery-validation";
const userAminAdd = {
   async render(){
        return `
        ${headerAdmin.render()}
        <div>
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p class="mt-1 text-sm text-gray-600">Thêm thành viên</p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form id="formadd">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-3 sm:col-span-2">
                      <label for="company-website" class="block text-sm font-medium text-gray-700"> Email </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                    
                        <input type="text" name="email" id="email" class="email py-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="abc@gmail.com">
                      </div>
                    </div>
                  </div>
      
                  <div>
                    <label for="about" class="block text-sm font-medium text-gray-700">Full Name </label>
                    <div class="mt-1">
                      <input id="name" name="name" rows="3" class="fullname shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="Nguyễn văn A"></input>
                    </div>
                    <p class="mt-2 text-sm text-gray-500">Brief description for your profile. URLs are hyperlinked.</p>
                  </div>
                  <div>
                  <label for="about" class="block text-sm font-medium text-gray-700">Password </label>
                  <div class="mt-1">
                    <input id="password" name="password" type="password" rows="3" class="password shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="*********"></input>
                  </div>
                 
                </div>

                <div>
                <label for="about" class="block text-sm font-medium text-gray-700">Password comfirm </label>
                <div class="mt-1">
                  <input id="password" name="password_comfirm" type="password" rows="3" class="password shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" placeholder="*********"></input>
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
        const formAddUser = $("#formadd");
        const imgView = document.querySelector('#imgView');
        const imgPost = document.querySelector('#file-upload');
        let link = ""
        const CLOUDINARY_PRESET = "tsllkbbb";
        const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/cornyhung/image/upload";
        
        
        imgPost.addEventListener('change', function(e){
          imgView.src =URL.createObjectURL(e.target.file[0])
        })

        formAddUser.validate({
          rules:{
            "name":{
              required: true,
              minlength: 6
            },
            "email":{
              required: true,
              email: true
            }, 
            "password":{
              required: true,
              minlength: 6
            },
            "password_comfirm":{
              required: true,
              minlength: 6,
              equalTo: "#password"
            }

          },

          messages:{
            "name":{
              required: "Bạn không được bỏ trống!",
              minlength: "It nhất 6 ký tự"
            },
            "email":{
              required: "Bạn không được bỏ trống!",
              email: "Bạn phải nhập đúng đia chỉ email"
            }, 
            "password":{
              required: "Bạn không được bỏ trống!",
              minlength: "Ít nhất 6 ký tự"
            },
            "password_comfirm":{
              required: "Bạn không được bỏ trống!",
              minlength: "It nhất 6 ký tự",
              equalTo: "Mật khẩu không trùng"
            }
          },

          submitHandler: () => {
            async function handleAddUser(){

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
                    email: document.querySelector("#email").value,
                    password: document.querySelector("#password").value,
                    
                }, function(){
                  toastr.success("thêm thành công chuyển sau 2s");
                setTimeout(() => {
                  document.location.href = "/admin/users";
                }, 2000);
                });    
            }
            handleAddUser();
          }
        })

         
      
    },
}
export default userAminAdd