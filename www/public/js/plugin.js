
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
 		console.log("Ops Nama_Database Kosong!");
 		$(".statusMsg").html("Masukan nama database!");
 	}  else if (setData.val() != "" || setData.val() != null){
 		$("#lihatData").show();
 		console.log("Ok nama data siap!");
 		$(".statusMsg").html("Nama database siap digunakan!");
 		$("#validasiData").hide();
 		$("#setData_input").prop("disabled", true);

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
			$(".statusMsg").html("Ops! Nama data kosong!");
		} if(cekUlangNamaData != setFix) {
			console.log("Ops! data berubah silahkan tekan refresh!");
			$(".statusMsg").html("Silahkan tekan refresh!");
			$("#buatData").hide();
			$("#displayData").hide();
		} else {

			if(setFix == "" || setFix == null) {
				console.log("Data wajib diisi!");
				$(".statusMsg").html("Data wajib diisi!");
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
		  $(".statusMsg").html("Data "+setFix+" berhasil disimpan!");
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
		 	console.log("Data kosong refresh untuk ulangi!");
		 		} if (setFix != "" || setFix != null){
		 			
				dbRef.child(setFix).on("value", persiapan => {
						 var cekData = persiapan.val();
						 //console.log(cekData);
					 	
						if (cekData == null){
							console.log("Tidak ditemukan data");
							$(".statusMsg").html("Tidak ada data!");
							$("#data").html("");
							$("#tulisData").html("Buat Data");


						} if (cekData != null) {
							console.log("Data ditemukan!");
							$(".statusMsg").html("Data lama ditemukan!");
							// console.log(cekData);
							$("#tulisData").html("Tambah Data");
							
						} 
						$("#headTab").html("");
						$("#bodyTab").html("");
					
						persiapan.forEach(baca =>{
							const kunci = baca.key;
							const nilai = baca.val();
							//kode eksekusi
							var tableHead = "<tr><th>A</th><th>B</th><th>C</th><th></th></tr>";
							var tableData = "<tr><td id='k' data-id="+kunci+">"+nilai.a+"</td><td>"+nilai.b+"</td><td>"+nilai.c+"</td><td id='hapusData'>X</td</tr>";
							console.log(nilai);
							$("#headTab").html(tableHead);
							$("#bodyTab").append(tableData);

						}); // parameter baca =>

						$("#hapusData").click(e=>{
						e.preventDefault();

						var data_key = $("#k").attr("data-id");
						alert(data_key);

						dbRef.child(setFix+"/"+data_key).remove();

						}); // Tombol Hapus data

					}); // Parameter Persiapan =>
				}

			} // else

			}); // Tombol Lihat Data
	}

}); // Tombol Validasi

 	$("#refreshData").click(e=>{
 		e.preventDefault();
 		location.reload();

 	});// Tombol Refresh