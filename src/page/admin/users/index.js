import { getAll, remove } from "../../../api/user"
import headerAdmin from "../../../component/admin/headerAdmin"

const userAminpage = {
   async render(){
        const response = await getAll()
        return `
        ${headerAdmin.render()}
        <div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><a class="border-2 p-2 rounded text-green-500 hover:bg-orange-500 font-bold hover:text-gray-200"href="/admin/users/add">ADD new</a></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            ${response.data.map((user)=> `
            <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img class="h-10 w-10 rounded-full" src="https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-dark-gray-simple-avatar-png-image_3418404.jpg" alt="">
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">${user.name}</div>
                  <div class="text-sm text-gray-500">${user.email}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">${user.fullname}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              ${user.status == 1 ? '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800"> Active </span>' : '<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-green-800"> Locked </span>'}
            </td>
           ${ user.id ==1 ? '<td class="px-6 py-4 whitespace-nowrap text-sm text-red-500">Admin</td>' : '<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Member</td>'}
            
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <a href="" data-id="${user.id}" class="btn text-indigo-600 hover:text-indigo-900">delete</a>
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
        `
    },
    afterRender(){
     
        const btns = document.querySelectorAll('.btn');
        btns.forEach(btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', function(){
                const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?")
                if(confirm){
                    remove(id).then(document.location.href="/admin/users")
                }
            })
        })
    }
}
export default userAminpage