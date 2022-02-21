
var inputValue = document.querySelector("#inputValue");
const minus = ()=>{
    if(parseInt(inputValue)>1){
        document.querySelector("#inputValue").value = parseInt(inputValue)-1;
    }
}

const plus = () =>{
    document.querySelector("#inputValue").value = parseInt(inputValue)+1
}