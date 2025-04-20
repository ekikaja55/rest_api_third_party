const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//nomor 2
app.get("/api/card", async (req, res) => {
  try {
    const { name } = req.query;
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
    return res.send(result);
  } catch (error) {
    return res.status(404).json({ message: "Card Tidak Ditemukan" });
  }
});

//nomor 1
app.get("/api/:index", async (req, res) => {
  try {
    const { index } = req.params;

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
    return res.send(result);
  } catch (error) {
    return res.status(500).json(error.message);
  }
});
