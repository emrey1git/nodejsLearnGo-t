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
