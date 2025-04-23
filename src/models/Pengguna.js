const { default: mongoose, Schema } = require("mongoose");

const PenggunaSchema = new Schema(
  {
    // ObjectId('1234khjasdgoij235lkjgaj53')
    // diingat2 bahwa _id adalah mongoose.Types.ObjectId
    // _id: mongoose.Types.ObjectId,
    nama: String,
    jk: String,
    password: String,
    refresh_token: String,
    roles: [String],
    deleted_at: { type: Date, default: null }, // Optional: Soft delete field
  },
  {
    timestamps: true, // This will create 'created_at' and 'updated_at' automatically
  }
);

/**
 * Parameter ketiga model adalah nama collection di mongodb mu
 * Karena kalau tidak nanti dia mengasumsikan collection di mongodb mu adalah penggunas
 */
const Pengguna = mongoose.model("pengguna", PenggunaSchema, "pengguna");

module.exports = Pengguna;
