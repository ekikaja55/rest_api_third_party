// untuk menjelaskan struktur database kita ke progam kita saat ini

const { Schema, default: mongoose } = require("mongoose");

//step 1: buat skema jelaskan collection ini punya kolom apa aja

const KategoriMovieSchema = new Schema(
  {
    _id: Number,
    nama: String,
    deleted_at: { type: Date, default: null },
  },
  {
    timestamps: true, //created_at dan deleted_at
  }
);

//step 2 : buat modelnya

//parameter 1 : nama model yang dipakai oleh mongoose itu sendiri
//parameter 2 : skema yang telah kita buat diatas
//paramter 3 : nama tabel/collection yang kita muncul di mongoDb compass

const KategoriMovie = mongoose.model(
  "kategori_movie",
  KategoriMovieSchema,
  "kategori_movie"
);

//step 3 : export

module.exports = KategoriMovie;
