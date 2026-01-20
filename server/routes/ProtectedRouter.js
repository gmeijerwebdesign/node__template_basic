import express from "express";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "You are authenticated",
    user: req.user,
  });
});

export default router;
