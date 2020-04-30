
//================== GANTI DENGAN NILAI INPUT SENDIRI =======================
// ***************** 	 MENGAMBIL NILAI ELEMENT      ***********************
var setData = $("#setData_input");
var tabel_a = $("#tabel_a");
var tabel_b = $("#tabel_b");
var tabel_c = $("#tabel_c");
//==================++++++++++++++++++++++++++++++++++=======================

 	$("#validasiData").click( e=> {
 	if (setData.val() == "" || setData.val() == null) {
 		$("#validasiData").show();
 		$("#lihatData").hide();
 		console.log("Ops database Kosong!");
 	}  else if (setData.val() != "" || setData.val() != null){
 		console.log("Ok nama data siap!");
 		$("#validasiData").hide();
 		$("#lihatData").show();
 		$("#setData_input").prop("disable", true);

	 	var setFix = setData.val();
		const namaData = "/" + setFix;
		const db = firebase.database();
		const dbRef = db.ref("/users");
		const skopRef = dbRef.child(namaData);

	$("#tulisData").click(e=> {
		e.preventDefault();
		var cekUlangNamaData = $("#setData_input").val();
		if(cekUlangNamaData == "" || cekUlangNamaData == null){
			console.log("Ops! Nama data kosong!");
		} if(cekUlangNamaData != setFix) {
			console.log("Ops! Nama data kamu berubah!");
		} else {

			if(setFix == "" || setFix == null) {
				console.log("Nama data wajib diisi!");
			} else {
			// GANTI STRUKTUR DATABASE
		  skopRef.push(
		      {
		      a : tabel_a.val(),
		      b : tabel_b.val(),
		      c : tabel_c.val()
		      }
		  );
		  console.log("Data "+ setFix +" berhasil disimpan!");
			}
		}

	}); // tombol Tulis Data

	$("#lihatData").click(e=>{
		var cekUlangNamaData = $("#setData_input").val();
		if(cekUlangNamaData == "" || cekUlangNamaData == null){
			console.log("Nama data kosong!");
		} if(cekUlangNamaData != setFix) {
			console.log("Nama data berubah!");
		} else {

		 if (setFix == "" || setFix == null){
		 	console.log("Nama data kosong tekan refresh untuk ulangi!");
		 		$("#lihatData").hide();
		 		} if (setFix != "" || setFix != null){
		 			$("#lihatData").show();
				dbRef.child(setFix).on("value", persiapan => {
						 var cekData = persiapan.val();
					 
						if (cekData == null){
							console.log("Tidak ditemukan data");
							$("#data").html("");

						} if (cekData != null) {
							console.log("Data ditemukan!");
							// console.log(cekData);
						} 
						$("#headTab").html("");
						$("#bodyTab").html("");
					
						persiapan.forEach(baca =>{
							const kunci = baca.key;
							const nilai = baca.val();
							//kode eksekusi
							var tableHead = "<tr><th>A</th><th>B</th><th>C</th></tr>";
							var tableData = "<tr><td data-id="+kunci+">"+nilai.a+"</td><td>"+nilai.b+"</td><td>"+nilai.c+"</td></tr>";
							console.log(nilai);
							$("#headTab").html(tableHead);
							$("#bodyTab").append(tableData);


						});
					});
				}

			} // else

			}); // Tombol Lihat Data
	}

}); // Tombol Validasi

 	$("#refreshData").click(e=>{
 		e.preventDefault();
 		location.reload();

 	});// Tombol Refresh