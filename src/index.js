// Basit bir mesaj tanımlama ve konsola yazdırma
const message = 'Hello world';
console.log(message);
console.log("object");

//  Path modülünü dahil etme (Node.js core module)
const path = require("node:path");

// Dosya ve dizin yollarını görüntüleme
console.log("__filename:", __filename); // Şu anki dosyanın tam yolu
console.log("__dirname:", __dirname);   // Bulunduğu klasör yolu

//  Verilen bir yolun parçalanması (parse)
const parsed = path.parse("/users/emre/deneme.txt");
console.log("Parsed path:", parsed);
/*
{
  root: '/',
  dir: '/users/emre',
  base: 'deneme.txt',
  ext: '.txt',
  name: 'deneme'
}
*/

// 🔗 Parçaları birleştirerek tam bir yol oluşturma (join)
const joined = path.join("/users", "emre", "deneme.txt");
console.log("Joined path:", joined); // /users/emre/deneme.txt


//FS MODÜLÜ
const fs = require("node:fs");

//DOSYA OKUMA
try {
  const data = fs.readFileSync("deneme.txt", "utf8");
  console.log(data);
} catch (error) {
  console.log(error.message);
}

//dosya okumanın farklı methodu
fs.readFile("deneme.txt", "utf8", (err,data)=>{
  if(err){
    console.log(err.message);
    return;
  }
  console.log(data);
});



//dosya yazma
try {
  fs.writeFileSync("goit.txt", "fullstack Devoloper");
  console.log("dosya yazıldı");
} catch (error) {
  console.log(error.message);
}


//dosya yazdırma 2
fs.writeFile("goit2.txt", "frontend devoloper",(err)=>{
  if(err){
    console.log(err.message);
    return;
  }
  console.log("dosya yazıldı 2");
});

//dosya kontrolu
const check = fs.existsSync("goit.txt");
console.log(check);


//klasör oluşturma
try {
  fs.mkdirSync("yeni klasör");
} catch (error) {
  console.log(error.message);
}

//dosya silme
try {
  fs.unlinkSync("goit.txt");
} catch (error) {
    console.log(error.message);
}

//klasör silme
try {
  fs.rmdirSync("yeni klasör");
} catch (error) {
    console.log(error.message);
}

//dosya bilgisi istmee
try {
  const stats = fs.statSync("goit2.txt");
    console.log(stats);
} catch (error) {
    console.log(error.message);
}

//promises yapısı ile dosya yazma
const fsPromises = require("node:fs/promises");


(
  async()=>{
    const data ="Bu dosyaya yazı yazaıyorum";
    try {
      await fsPromises.writeFile("deneme.txt", data, "utf8");
      console.log("veriler başarıyla yazıldı");
    } catch (error) {
        console.log(error.message);
    }
  }
)();
