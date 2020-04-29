  var stamp = new Date();
  var orderID = stamp.getDay()+""+stamp.getHours()+""+stamp.getMilliseconds();
  // KONFIGURASI NAMA DATA 
  var setData = "judul" + "/" + orderID;
// SETTING DATABASE
	const namaData = "/" + setData;

// REFERENSI DATABASE
// ==================================
const db = firebase.database();
const dbRef = db.ref("/users");
const skopRef = dbRef.child(namaData);
// ==================================

// ADA 2 CARA MEMBUAT ID KUNCI NODE DATABASE :
// ************* => MEMBUAT ORDER ID UNIK MANUAL <= **************
// var stamp = new Date();
// var orderID = stamp.getDay()+""+stamp.getHours()+""+stamp.getMilliseconds();
// ===========================================

// ************* => MEMBUAT ORDER ID UNIK OTOMATIS <= **************
// var autoId = dbRef.push().key; atau dengan metode .push(variable_data);
// ===========================================


// MENGAMBIL NILAI ELEMENT INPUT
//===============================================
var nama = $("#nama_input");
var alamat = $("#alamat_input");
var email = $("#email_input");

// MEMBUAT STRUKTUR DATA DIDALAM VARIABLE
// const dataSet = {

// 	a : nama.val(),
// 	b : alamat.val(),
// 	c : email.val()
// };

// MENGGUNAKAN DATA DENGAN AUTO ID
// ========================================
// const dataSet = {
// 	autoId : {

// 		a : nama.val(),
// 		b : alamat.val(),
// 		c : email.val()
// 	}
// };
// ========================================

//  MENULIS DATA DENGAN METODE SET DIAWAL DOCUMENT
// $(document).ready(function(){
// 	skopRef.set(dataSet);

// });

// 	MENULIS DATA DENGAN MEMANFAATKAN EVENT LISTENER CLICK PADA TOMBOL TULIS DATA
$("#tulisData").click(e=> {
	skopRef.set(
		
		
			{
			a : nama.val(),
			b : alamat.val(),
			c : email.val()
			}
		

	);
	console.log(orderID+ " Berhasil!");
});






