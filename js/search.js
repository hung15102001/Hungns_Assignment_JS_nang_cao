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

const filter = (type, element) => {
    
  
    const product = document.querySelectorAll('#product-filter');
   
    switch(type){
        case 'price-all':
            for(var i=0; i< product.length ; i++){
                product[i].style.display = 'block'
            }
            
        break;
        case 'price-1':
         
            for(var i=0; i< product.length ; i++){
                var priceFilter=product[i].children[1].innerHTML;
                
                if(Number(priceFilter) <= 100){
                    product[i].style.display = 'block'
                }else{
                    product[i].style.display = 'none'
                }
            }
            
        break;
        case 'price-2':
            for(var i=0; i< product.length ; i++){

                if(Number(priceFilter) > 100  && Number(priceFilter) <= 200 ){
                    product[i].style.display = 'block'
                }else{
                    product[i].style.display = 'none'
                }
            }
          
        break;
        case 'price-3':
            for(var i=0; i< product.length ; i++){

                if(Number(priceFilter) > 200  && Number(priceFilter) <= 300 ){
                    product[i].style.display = 'block'
                }else{
                    product[i].style.display = 'none'
                }
            }
        break;
        case 'price-4':
            for(var i=0; i< product.length ; i++){

                if(Number(priceFilter) > 300  && Number(priceFilter) <= 400 ){
                    product[i].style.display = 'block'
                }else{
                    product[i].style.display = 'none'
                }
            }
        break;
        case 'price-5':
            for(var i=0; i< product.length ; i++){

                if(Number(priceFilter) > 400  && Number(priceFilter) <= 500 ){
                    product[i].style.display = 'block'
                }else{
                    product[i].style.display = 'none'
                }
            }
        break;

        default:
            for(var i=0; i< product.length ; i++){
                product[i].style.display = 'block'
            }
    }
}



