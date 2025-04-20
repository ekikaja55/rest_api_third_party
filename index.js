const { default: axios } = require("axios");
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

//nomor 1
app.get("/api/:index", async (req, res) => {
  //aku pake req.params.index soalnya kalo langsung pake req.params kembalian index nya dihitung object
  //aku ga ngerti kalo pake req.params tok, di parse in pake Number() juga gabisa jadi aku pakenya req.params.index langsung manggil datanya, asumsiin aja inputan user gamungkin NaN

  const index = req.params.index;
  const dataMentah = await axios.get(
    "https://db.ygoprodeck.com/api/v7/cardinfo.php "
  );
  const data = dataMentah.data.data[index];
  const result = {
    id: data.id,
    name: data.name,
    type: data.type,
    description: data.desc,
    image_url: data.card_images[0].image_url,
  };
  res.send(result);
});
