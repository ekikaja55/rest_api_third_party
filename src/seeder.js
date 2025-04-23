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

//bikin supaya data random sama
faker.seed(42);

const dataKategori = [];

for (let i = 1; i <= 5; i++) {
  dataKategori.push({
    _id: i,
    nama: faker.book.genre(),
  });
}

const dataMovie = [];
for (let i = 1; i <= 10; i++) {
  dataMovie.push({
    _id: i,
    nama: faker.commerce.productName(), // Random product name as movie title
    tahun_terbit: faker.date.past({ years: 20 }).getFullYear(), // Random release year (past 20 years)
    kategori: faker.helpers.arrayElement([1, 2, 3, 4, 5]), // Random category reference
    publisher: faker.company.name(), // Random publisher
    deskripsi: faker.lorem.sentence(), // Random description
    img: faker.image.urlLoremFlickr({ category: "cat" }), // Random image URL
    release: [
      {
        _id: 1,
        tipe: faker.helpers.arrayElement(["HD", "SD", "4K"]), // Random release type
        airing: faker.date.past({ years: 5 }).getFullYear(), // Random airing year (past 5 years)
      },
    ],
  });
}

const dataPengguna = [];
for (let i = 1; i <= 5; i++) {
  dataPengguna.push({
    nama: faker.person.firstName().toLowerCase(), // Random name
    jk: faker.helpers.arrayElement(["Male", "Female"]), // Random gender
    password: "$2b$10$ObQPU6nH19QG8w6e7Mx4pe.4jllh4yleiY3gPmFRk9ZEUiNIvKy4S", // Random password
    refresh_token: "", // Random refresh token
    roles: faker.helpers.arrayElement([
      ["admin", "manager", "visitor"],
      ["manager", "visitor"],
      ["visitor"],
    ]), // Random roles
  });
}

// step 3 : masukan data kedalam database(seeder)

const seedData = async () => {
  // step 3.1 : hapus dulu data sebelumnya
  // sangat hati2, langkah ini sangat berbahaya
  // jangan pernah lakukan seeder di hostingan atau di production
  try {
    await KategoriMovie.deleteMany();
    await Movie.deleteMany();
    await Pengguna.deleteMany();

    // step 3.2 : isikan ke database
    await KategoriMovie.insertMany(dataKategori);
    console.log("Data kategori masuk ");

    await Movie.insertMany(dataMovie);
    console.log("Data movie masukkk");

    await Pengguna.insertMany(dataPengguna);
    console.log("Data pengguna masukkk");
  } catch (error) {
    console.log(error.message);
  } finally {
    mongoose.disconnect();
  }
};

//step 4 : jalankan function seed data

seedData();
