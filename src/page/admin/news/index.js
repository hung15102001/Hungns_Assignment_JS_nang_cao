
import { getAll, remove } from "../../../api/post";
import headerAdmin from "../../../component/admin/headerAdmin";
import toastr from "toastr";
import "toastr/build/toastr.min.css";
const newListAdmin = {
    async render() {
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

                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Img</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><a class="border-2 p-2 rounded text-green-500 hover:bg-orange-500 font-bold hover:text-gray-200"href="/admin/news/add">ADD new</a></th>
                      </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                    ${response.data.map((post)=> `
                    <tr>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                      <div class="flex-shrink-0  w-24">
                      <img class="h-24 w-24 rounded" src="${post.img}" alt="" width="150px">
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="text-sm text-gray-900">${post.title}</div>
                  
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full "> ${post.desc} </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div data-id="${post.id}" class="btn text-indigo-600 text-red-600 hover:text-indigo-900">delete</div>
                     </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="/admin/news/edit/${post.id}" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                    </td>
                  </tr>
                   
                    `).join("")}
                     
                     
          
                      <!-- More people... -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
         `;
    },
    afterRender() {
        // Lấy danh sách button
        const btns = document.querySelectorAll('.btn');
        btns.forEach(btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', function(){
                const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?")
                if(confirm){
                    remove(id).then(function(){
                      toastr.success("Xóa thành công")
                      document.location.href="/admin/news"
                    })
                }
            })
        })
    },
};
export default newListAdmin;