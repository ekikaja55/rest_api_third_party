const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const { contohRouter } = require("./src/routes");
app.use("/api/v1/contoh", contohRouter);




// dibawah ini adalah code untuk nembak third party service Yugioh API

//nomor 2
app.get("/api/card", async (req, res) => {
  const { name } = req.query;
  try {
    const dataMentah = await axios.get(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${name}`
    );
    const data = dataMentah.data.data[0];
    const result = {
      id: data.id,
      name: data.name,
      type: data.type,
      description: data.desc,
      image_url: data.card_images[0].image_url,
    };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(404).json({ message: "Card Tidak Ditemukan" });
  }
});

//nomor 1
app.get("/api/:index", async (req, res) => {
  const { index } = req.params;
  try {
    if (Number.isNaN(index)) {
      return res.status(404).json({ message: "Inputan Harus Angka" });
    }

    const dataMentah = await axios.get(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php "
    );

    const data = dataMentah.data.data[index];

    if (!data) {
      return res.status(404).json({ message: "Data Tidak Ditemukan" });
    }
    const result = {
      id: data.id,
      name: data.name,
      type: data.type,
      description: data.desc,
      image_url: data.card_images[0].image_url,
    };
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});

//nomor 3
app.get("/api/harga/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dataMentah = await axios.get(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`
    );
    const harga = `${dataMentah.data.data[0].card_prices[0].cardmarket_price} Euro, pada platform TCGPlayer Sebesar ${dataMentah.data.data[0].card_prices[0].tcgplayer_price} Euro, dan pada platform Amazon sebesar ${dataMentah.data.data[0].card_prices[0].amazon_price} Euro`;

    const deskripsi = dataMentah.data.data.map((item) => {
      return `Kartu ${item.name} dengan ID ${item.id} dijual pada CardMarket sebesar ${harga}`;
    });

    return res.status(200).json({
      message: deskripsi[0],
    });
  } catch (error) {
    return res
      .status(404)
      .json({ message: `Kartu Dengan ID ${id} Tidak Ditemukan` });
  }
});
