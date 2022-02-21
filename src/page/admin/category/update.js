import { edit, get } from "../../../api/categories";
import headerAdmin from "../../../component/admin/headerAdmin"
import toastr from "toastr";
import "toastr/build/toastr.min.css";

const updateCatePage = {
    async render(id){
        const {data} = await get(id);
        return `
        ${headerAdmin.render()}
        <div>
        <div class="md:grid md:grid-cols-3 md:gap-6">
          <div class="md:col-span-1">
            <div class="px-4 sm:px-0">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Profile</h3>
              <p class="mt-1 text-sm text-gray-600">Sửa Danh Mục</p>
            </div>
          </div>
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form id="formUpdateCate">
              <div class="shadow sm:rounded-md sm:overflow-hidden">
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-3 sm:col-span-2">
                      <label for="company-website" class="block text-sm font-medium text-gray-700"> Name  </label>
                      <div class="mt-1 flex rounded-md shadow-sm">
                    
                        <input type="text" name="email" id="name" class="name py-2 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300" placeholder="abc" value="${data.name}">
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
        const formUpdatePost = document.querySelector("#formUpdateCate");
        formUpdatePost.addEventListener("submit", async (e) => {
            e.preventDefault();
    
            edit({
                id: id,
                name: document.querySelector("#name").value,
            }).then(function(){
                toastr.success("Update thành công chuyển sau 2s");
                setTimeout(() => {
                  document.location.href = "/admin/categories";
                }, 2000)
              });;
        });
    },
}
export default updateCatePage