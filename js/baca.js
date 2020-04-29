// SETTING DATABASE
const namaData = "/" + setData;

// REFERENSI DATABASE
// ==============================
const db = firebase.database();
const dbRef = db.ref("/users");
const skopRef = dbRef.child(namaData);
// ==================================

$(document).ready(function(){
	skopRef.on("value", persiapan => {
		persiapan.forEach(baca =>{
			const kunci = baca.key;
			const nilai = baca.val();

			// MEMBACA DATA FIREBASE REALTIME
			// ========================================================
			// ********* CONTOH DATA **********
			// users : [{

			// 	a : nama,
			// 	b : alamat,
			// 	c : email
			// }]
			// ********************************

			//MEMBACA NILAI KUNCI NODE
			//console.log(kunci);

			//MEMBACA NILAI DATA TANPA KUNCI NODE
			//console.log(nilai);

			//MEMBACA NILAI DATA DENGAN KUNCI NODE
			//console.log(kunci+ " " nilai);

			//MEMBACA STRUKTUR DATA
			//console.log(nilai.a+" "+nilai.b+" "+nilai.c);

			//MEMBACA STRUKTUR DATA DENGAN KUNCI NODE
			//console.log(kunci+" "+nilai.a+" "+nilai.b+" "+nilai.c);

			// =========================================================
		});
	});
});