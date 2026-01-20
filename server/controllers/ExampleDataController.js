import { readJSON, writeJSON } from "../utils/ReadFile.js";

export function getExampleData(req, res) {
  try {
    const response = readJSON("./json_files/example_data.json");
    if (!Array.isArray(response)) {
      return res.status(404).json({ message: "No data could be found" });
    }
    res.status(200).json({ data: response });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export function insertExampleData(req, res) {
  try {
    const { id, data } = req.body;
    if (!id || !data) return res.status(400).json({ message: "No data set" });

    if (typeof data !== "string") {
      return res.status(400).json({ message: "data has to be text" });
    }

    const currentData = readJSON("./json_files/example_data.json") || [];
    currentData.push({ id, data });

    writeJSON("./json_files/example_data.json", currentData);
    res.status(200).json({ data: { id, data } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export function deleteExampleData(req, res) {
  try {
    const { id } = req.body;

    const currentData = readJSON("./json_files/example_data.json") || [];

    const filtered = currentData.filter((u) => u.id !== id);

    if (filtered.length === currentData.length) {
      return res.status(404).json({ message: "No post found" });
    }

    writeJSON("./json_files/example_data.json", filtered);

    res.status(200).json({
      message: "succesfully deleted post",
      deletedId: id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export function editExampleData(req, res) {
  try {
    const { id, data } = req.body;

    // 1️⃣ validation
    if (!id || !data) {
      return res.status(400).json({ message: "id en data zijn verplicht" });
    }

    if (typeof data !== "string") {
      return res
        .status(400)
        .json({ message: "id en data moeten strings zijn" });
    }

    // 2️⃣ data ophalen
    const currentData = readJSON("./json_files/example_data.json") || [];

    // 3️⃣ post zoeken
    const index = currentData.findIndex((u) => u.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Post niet gevonden" });
    }

    // 4️⃣ aanpassen
    currentData[index].data = data;

    writeJSON("./json_files/example_data.json", currentData);

    res.status(200).json({
      message: "succesfully updated",
      data: currentData[index],
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
