const { default: mongoose, Schema } = require("mongoose");

const MovieSchema = new Schema(
  {
    _id: Number,
    nama: String,
    tahun_terbit: Number,
    kategori: { type: Number, ref: "kategori_movie" }, // Berikan option ref, untuk menunjukkan nanti data kategori ini, di cek di collection apa
    publisher: String,
    deskripsi: String,
    img: String,
    // release: [{ _id: mongoose.Types.ObjectId, tipe: String, airing: Number }],
    release: [{ _id: Number, tipe: String, airing: Number }],
    deleted_at: { type: Date, default: null }, // Optional: Soft delete field
  },
  {
    timestamps: true, // This will create 'created_at' and 'updated_at' automatically
  }
);

MovieSchema.virtual("keterangan").get(function () {
  let keterangantahun = "Movie Lama";
  if (this.tahun_terbit > 2010) {
    keterangantahun = "Movie Baru";
  }
  // disini kita bisa pakai this.namakolom
  return (
    this.nama + " di publish oleh " + this.publisher + " = " + keterangantahun
  );
});

// supaya virtual kolom bisa muncul ketika di get, maka wajib pasang ini!
MovieSchema.set("toJSON", {
  virtuals: true,
});

/**
 * Parameter ketiga model adalah nama collection di mongodb mu
 */
const Movie = mongoose.model("movie", MovieSchema, "movie");

module.exports = Movie;









