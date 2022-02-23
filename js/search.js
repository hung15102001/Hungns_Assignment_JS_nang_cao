const tk = () =>{
    const search =  document.getElementById("form_control").value.toUpperCase();
    const items = document.getElementById("item_list");
    const product = document.querySelectorAll('#product-filter');
    const sname = items.getElementsByTagName("h6");

    for(var i=0; i<sname.length; i++){
        let match = product[i].getElementsByTagName("h6")[0];
        
        if(match){
            let textValue =  match.textContent || match.innerHTML

            if(textValue.toUpperCase().indexOf(search)> -1){
                product[i].style.display = ""
            }else{
                product[i].style.display = "none"
            }
        }
    }

}



