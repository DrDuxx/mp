const express = require("express");
const app = express();
const fs = require("fs");

app.get("/json/:jsonNumber", async (req, res) => {
  try {
    const { jsonNumber } = req.params;
    if (jsonNumber < 0 || jsonNumber > 6000)
      return res.status(404).json({ message: "Not found" });
    const json = await fs.readFileSync(`./json/${jsonNumber}.json`);
    const jsonObject = JSON.parse(json)
    return res.status(200).json(jsonObject);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Connected on port ${PORT}`);
});
