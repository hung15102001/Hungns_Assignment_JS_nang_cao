import { getAll, remove } from "../../../api/comment"
import headerAdmin from "../../../component/admin/headerAdmin"
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const commentPage = {
    async render(){
      const response = await getAll(); 
        return `
            ${headerAdmin.render()}
            <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                      <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    ${response.data.map((cmt, index) => `
                    <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${index+1}</div>
                  </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">${cmt.name}</div>
                  </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">${cmt.email}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">${cmt.message}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                   <div data-id="${cmt.id}" class="btn text-indigo-600 hover:text-red-900">delete</div>
                  </td>
                  </tr>
                   
                    `)}
                     
          
                      <!-- More people... -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        `
    },

    afterRender(){
      const btns =  document.querySelectorAll('.btn');
      btns.forEach(btn =>{
        const id = btn.dataset.id;
        btn.addEventListener('click', function(){
          const confirm = window.confirm("Bạn có chắc muốn xóa  không?");
          if(confirm){
            remove(id).then(function(){
              toastr.success("Xóa thành công");
              document.location.href="/admin/comments";
            })
          }
        })
      });
    }
}


export default commentPage