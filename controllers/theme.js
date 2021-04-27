const Theme = require("../models/theme");

exports.postCreate = async (req, res) => {
  if (req.user.type != "admin")
    return res
      .status(401)
      .send({ message: "Only admins are able to create theme" });
  const {
    primary_background,
    secondary_background,
    primary_text,
    secondary_text,
  } = req.body;
  try {
    await Theme.create({
      primary_background,
      secondary_background,
      primary_text,
      secondary_text,
    });
    return res.status(201).send({ message: "Theme created.", status: 322 });
  } catch (error) {
    res.status(400).send({
      message: "Failed to create Theme",
      status: 300,
      data: error.errors,
    });
  }
};

exports.getAll = async (req, res) => {
  try {
    const themes = await Theme.findAll();
    return res.status(200).send(themes);
  } catch (error) {
    res.status(500).send({
      message: "Failed to get Themes",
      status: 300,
      data: error.errors,
    });
  }
};

exports.deleteById = async (req, res) => {
  if (req.user.type != "admin")
    return res
      .status(401)
      .send({ message: "Only admins are able to delete theme" });

  try {
    const afectedRows = await Theme.destroy({ where: { theme_id: req.params.id } });
    if(afectedRows != 1) throw new Error("Nothing to delete")
    return res.status(200).send({ message: "Theme deleted.", status: 322 });
  } catch (error) {
    res.status(400).send({
      message: "Failed to delete theme",
      status: 300,
      data: error.errors,
    });
  }
};
