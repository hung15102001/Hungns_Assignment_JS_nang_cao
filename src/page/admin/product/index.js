import { getAll, remove } from "../../../api/product"
import headerAdmin from "../../../component/admin/headerAdmin"

const proAdminPage = {
   async render(){
       const {data} = await getAll()
        return `
            ${headerAdmin.render()}
            <div class="flex flex-col">
  <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"><a class="border-2 p-2 rounded text-green-500 hover:bg-orange-500 font-bold hover:text-gray-200"href="/admin/products/add">ADD new</a></th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            ${data.map((pro)=> `
            <tr>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0  w-24">
                <img class="h-24 w-24 rounded" src="${pro.img}" alt="" width="150px">
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">${pro.name}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
            ${pro.status == 1 ? '<div class="text-sm text-green-600">Còn hàng</div>' : '<div class="text-sm text-red-600">Hết hàng</div>'}
              
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  text-green-800"> ${pro.price}$ </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  text-green-800"> ${pro.quantity} </span>
          </td>

            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full  text-green-800"> ${pro.cateId} </span>
            </td>
            
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div data-id="${pro.id}" class="btns text-indigo-600 hover:text-indigo-900">delete</div>
             </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <a href="/admin/products/edit/${pro.id}" class="text-indigo-600 hover:text-indigo-900">Edit</a>
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
    afterRender() {
        // Lấy danh sách button
        const btns = document.querySelectorAll('.btns');
        btns.forEach(btn => {
            const id = btn.dataset.id;
            btn.addEventListener('click', function(){
                const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?")
                if(confirm){
                    remove(id).then(document.location.href="/admin/products")
                }
            })
        })
    },
}
export default proAdminPage