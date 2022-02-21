import toastr from "toastr";
import "toastr/build/toastr.min.css";
import { signup } from "../api/user";
import $ from "jquery";
import validate from 'jquery-validation'
import header from "../component/header";

const SignupPage = {
    render() {
      localStorage.removeItem('cart');
        return `
      
        <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
          <div>
            <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Signup to your account
            </h2>
         
          </div>
          <form class="mt-8 space-y-6" id="formSignup" method="POST">
            <input type="hidden" name="remember" value="true">
            <div class="rounded-md shadow-sm space-y-2x">
              <div>
                <label for="email-address" class="text-green-500">Email address</label>
                <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" requied>
              </div>
              <div class="my-4">
                <label for="email" class="text-green-500">Account</label>
                <input id="name" name="name" type="text" autocomplete="name" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Account" requied>
              </div>
              <div>
              <label for="password" class="text-red-500">Password</label>
              <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="********" requied>
            </div>

            <div>
              <label for="password" class="text-red-500">Password Comfirm</label>
              <input id="password_comfirm" name="password_comfirm" type="password" autocomplete="current-password" required class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="********" requied>
            </div>
            </div>
      
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
                <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div class="text-sm">
                <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </a>
              </div>
            </div>
      
            <div class="flex">
              <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                  <!-- Heroicon name: solid/lock-closed -->
                  <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                  </svg>
                </span>
                Sign up
              </button>
              <button type="button" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                <!-- Heroicon name: solid/lock-closed -->
               
              </span>
              <a href="/signin">Sign in</a>
            </button>
  


            </div>
          </form>
        </div>
      </div>
        `;
    },
    afterRender() {
        const signupForm = document.querySelector("#formSignup");

        signupForm.validate({
          rules:{
            "email":{
              required: true,
              email: true
            },

            "name":{
              required: true,
              minlength: 3
            },
            "password":{
              required: true,
              minlength: 6
            },
            "password_comfirm":{
              required: true,
              minlength: 6,
              equalTo: "password"
            }

          },
          messages:{
            "email":{
              required: "Bạn không được bỏ trống trường này!",
              email: "Bạn phải nhập đúng định dạng email"
            },

            "name":{
              required: "Bạn không được bỏ trống trường này!",
              minlength: "Nhập ít nhất 3 ký tự"
            },
            "password":{
              required: "Bạn không được bỏ trống trường này!",
              minlength: "Mật khẩu quá ngắn, ít nhất 6 ký tư"
            },
            "password_comfirm":{
              required: "Bạn không được bỏ trống trường này!",
              minlength: "Mật khẩu quá ngắn, ít nhất 6 ký tư",
              equalTo: "Password không trùng"
            }
          },

          submitHandler : () => {
            async function handleSignup(){
              try {
                const { data } = await signup({
                    email: document.querySelector("#email").value,
                    name: document.querySelector("#name").value,
                    password: document.querySelector("#password").value,
                    
                });
                if (data) {
                    toastr.success("Đăng ký thành công chuyển sau 2s");
                    setTimeout(() => {
                        document.location.href = "/signin";
                    }, 2000);
                }
            } catch (error) {
                toastr.error(error.response.data);
            }
      
            }
            handleSignup();
          }
          
        })

     
        
    },
};

export default SignupPage;