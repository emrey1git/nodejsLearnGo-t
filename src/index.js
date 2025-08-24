// // // Basit bir mesaj tanımlama ve konsola yazdırma
// // const message = 'Hello world';
// // console.log(message);
// // console.log("object");

// // //  Path modülünü dahil etme (Node.js core module)
// // const path = require("node:path");

// // // Dosya ve dizin yollarını görüntüleme
// // console.log("__filename:", __filename); // Şu anki dosyanın tam yolu
// // console.log("__dirname:", __dirname);   // Bulunduğu klasör yolu

// // //  Verilen bir yolun parçalanması (parse)
// // const parsed = path.parse("/users/emre/deneme.txt");
// // console.log("Parsed path:", parsed);
// // /*
// // {
// //   root: '/',
// //   dir: '/users/emre',
// //   base: 'deneme.txt',
// //   ext: '.txt',
// //   name: 'deneme'
// // }
// // */

// // // 🔗 Parçaları birleştirerek tam bir yol oluşturma (join)
// // const joined = path.join("/users", "emre", "deneme.txt");
// // console.log("Joined path:", joined); // /users/emre/deneme.txt

// // //FS MODÜLÜ
// // const fs = require("node:fs");

// // //DOSYA OKUMA
// // try {
// //   const data = fs.readFileSync("deneme.txt", "utf8");
// //   console.log(data);
// // } catch (error) {
// //   console.log(error.message);
// // }

// // //dosya okumanın farklı methodu
// // fs.readFile("deneme.txt", "utf8", (err,data)=>{
// //   if(err){
// //     console.log(err.message);
// //     return;
// //   }
// //   console.log(data);
// // });

// // //dosya yazma
// // try {
// //   fs.writeFileSync("goit.txt", "fullstack Devoloper");
// //   console.log("dosya yazıldı");
// // } catch (error) {
// //   console.log(error.message);
// // }

// // //dosya yazdırma 2
// // fs.writeFile("goit2.txt", "frontend devoloper",(err)=>{
// //   if(err){
// //     console.log(err.message);
// //     return;
// //   }
// //   console.log("dosya yazıldı 2");
// // });

// // //dosya kontrolu
// // const check = fs.existsSync("goit.txt");
// // console.log(check);

// // //klasör oluşturma
// // try {
// //   fs.mkdirSync("yeni klasör");
// // } catch (error) {
// //   console.log(error.message);
// // }

// // //dosya silme
// // try {
// //   fs.unlinkSync("goit.txt");
// // } catch (error) {
// //     console.log(error.message);
// // }

// // //klasör silme
// // try {
// //   fs.rmdirSync("yeni klasör");
// // } catch (error) {
// //     console.log(error.message);
// // }

// // //dosya bilgisi istmee
// // try {
// //   const stats = fs.statSync("goit2.txt");
// //     console.log(stats);
// // } catch (error) {
// //     console.log(error.message);
// // }

// // //promises yapısı ile dosya yazma
// // const fsPromises = require("node:fs/promises");

// // (
// //   async()=>{
// //     const data ="Bu dosyaya yazı yazaıyorum";
// //     try {
// //       await fsPromises.writeFile("deneme.txt", data, "utf8");
// //       console.log("veriler başarıyla yazıldı");
// //     } catch (error) {
// //         console.log(error.message);
// //     }
// //   }
// // )();

// // EXPRESS
// import express from 'express';
// import cors from 'cors';
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// // const PORT = 3000;
// const PORT = Number(process.env.PORT) || 3000;

// app.use(express.json());
// app.use.(cors());

// let users=[
//   {id: 1, name:"Emre", email:"emre@gmail.com"},
//   {id: 2, name:"ato", email:"atakan @gmail.com"}
// ];

// // app.get('/', (req, res)=>{
// //   res.json({
// //     message: "Hello world"
// //   });
// // });

// //GET
// app.get("/users", (req, res)=>{
//   res.json(users);
// });
// app.get('/users/:id', (req, res)=>{
//   const user = users.find((user => user.id===parseInt(req.params.id)));
//   if(!user){
//     return res.status(404).json({message: "Kullanıcı Bulunamadı"});
//   }
//   res.json(user);
// });

// //POST
// app.post('/users', (req, res)=>{
//   const {name, email} = req.body;
//   if(!name || !email){
//     return res.status(400).json({message:"İsim veya email girmediniz"});

//   }
//   const newUser={
//     id: users.length +1,
//     name,
//     email
//   };

//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// //PUT
// app.put("/users/:id", (req, res)=>{
//   const {name,email} =req.body;
//   const userId = parseInt(req.params.id);
//   const userIndex = users.findIndex(u => u.id === userId);

//   if(userIndex === -1){
//     return res.status(404).json({message: "kullanıcı bylunamadı"});
//   }
//   users[userIndex] = {
//     ...users[userIndex],
//     name: name || users[userIndex].name,
//     email: email || users[userIndex].email
//   };
//   res.json(users[userIndex]);
// });

// //DELETE
// app.delete("/users/:id", (req, res)=>{
//   const userId= parseInt(req.params.id);
//     const userIndex = users.findIndex(u => u.id === userId);
//  if(userIndex === -1){
//   return res.status(404).json({message:"kullanıcı bulunamadı"});
//  }
//  const deletedUser = users.splice(userIndex,1)[0];
//  res.json({message: "kullancıı silindi", user: deletedUser});
// });
// //DİNLEME
// app.listen(PORT, ()=>{
//   console.log(`Server ${PORT} portunda çalışmaktadır.`);
// });

//MONGO DB

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoutes from './routes/userRoutes.js';
import creditCardRoutes from './routes/creditCardRoutes.js';
import balanceRoutes from './routes/balanceRoutes.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) =>
  res.json({
    message: 'Node.js mongoDB çalışıyor',
    status: 'success',
    endpoints: {
      users: '/users',
      creditCards: '/credit-card',
      balance: '/balance',
    },
  }),
);
app.use('/users', userRoutes);
app.use('/credit-card', creditCardRoutes);
app.use('/balance', balanceRoutes);
app.use("/auth",authRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route bulunamadı',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
