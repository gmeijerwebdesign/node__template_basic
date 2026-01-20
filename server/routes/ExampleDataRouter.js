import express from "express";
import {
  deleteExampleData,
  editExampleData,
  getExampleData,
  insertExampleData,
} from "../controllers/ExampleDataController.js";

const router = express.Router();

router.get("/example", getExampleData);
router.post("/example", insertExampleData);
router.delete("/example", deleteExampleData);
router.put("/example", editExampleData);

export default router;
