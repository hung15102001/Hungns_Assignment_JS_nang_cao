
var sum

function TongTien(){
	var mn =  document.querySelectorAll("#mn")
	var tong_tien=0;
	for(var i=0;i<list_tr.length;i++){
		var the_tr=list_tr[i];
		if(the_tr.style.display="table-row"){
			var the_th=the_tr.lastElementChild.innerHTML;
			console.log(the_th);
			tong_tien=tong_tien+Number(the_th);
		}

		document.getElementById("tong_tien").innerHTML=tong_tien;
	}
}
