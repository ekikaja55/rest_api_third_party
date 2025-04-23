/**
 * Migration : buat struktur
 * Seeder : insert data awal
 * Factory : data dalam jumlah banyak
 * Faker : memalsukan datanya
 */

//step 1 : connect ke db
const { faker } = require("@faker-js/faker");
const { default: mongoose } = require("mongoose");
const { KategoriMovie, Movie, Pengguna } = require("./models");

require("dotenv").config();

mongoose.connect(process.env.DB_URL);

//step 2 : membuat dan menciptakan data dummy banyak (factory + faker)

const dataKategori = [];

for (let i = 1; i <= 5; i++) {
  dataKategori.push({
    _id: i,
    nama: faker.book.genre(),
  });
}

// step 3 : masukan data kedalam database(seeder)

const seedData = async () => {
  // step 3.1 : hapus dulu data sebelumnya
  // sangat hati2, langkah ini sangat berbahaya
  // jangan pernah lakukan seeder di hostingan atau di production
  try {
    await KategoriMovie.deleteMany();

    // step 3.2 : isikan ke database
    await KategoriMovie.insertMany(dataKategori);
    console.log("Data kategori masuk ");
  } catch (error) {
    console.log(error.message);
  } finally {
    mongoose.disconnect();
  }
};

//step 4 : jalankan function seed data

seedData();
