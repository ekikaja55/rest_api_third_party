// controller
// /api/v1/contoh/query?nama=mimi&umur=60
const contohquery = async (req, res) => {
  // kalau di URL ada ? maka pasti req.query
  const { nama, umur } = req.query;
  return res.status(200).json(`nama ${nama} berumur ${umur}`);
};

// /api/v1/contoh/param/nama/mimi/umur/33
// /api/v1/contoh/param/nama/jojo/umur/66
const contohparam = async (req, res) => {
  const { nama, umur } = req.params;
  return res.status(200).json(`nama ${nama} berumur ${umur}`);
};

// /api/v1/contoh/post
const contohbody = async (req, res) => {
  const { nama, umur } = req.body;
  return res.status(200).json(`nama ${nama} berumur ${umur}`);
};

// abc.com/mahasiswa
module.exports = {
  contohquery,
  contohparam,
  contohbody,
};
