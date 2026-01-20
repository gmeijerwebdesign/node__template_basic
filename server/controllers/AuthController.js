import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { writeJSON, readJSON } from "../utils/ReadFile.js";
import { v4 as uuidv4 } from "uuid";
export function login(req, res) {
  try {
    const { username, password } = req.body;

    // 1️⃣ input validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username en password verplicht" });
    }

    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "ongeldige input" });
    }

    // 2️⃣ users ophalen
    const users = readJSON("./json_files/users.json") || [];

    const invalidCredentialsError = "username or password is invalid";

    // 3️⃣ user zoeken
    const user = users.find((u) => u.username === username);
    if (!user) {
      return res.status(401).json({ message: invalidCredentialsError });
    }

    // 4️⃣ password check
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: invalidCredentialsError });
    }

    // 5️⃣ env check
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET missing" });
    }

    // 6️⃣ token maken
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    // 7️⃣ response
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export function register(req, res) {
  try {
    const { username, password } = req.body;

    // 1️⃣ Input validation
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "username en password verplicht" });
    }

    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({ message: "ongeldige input" });
    }

    // 2️⃣ Users ophalen
    const users = readJSON("./json_files/users.json") || [];

    // 3️⃣ Controleren of username al bestaat
    if (users.some((u) => u.username === username)) {
      return res.status(409).json({ message: "username bestaat al" });
    }

    // 4️⃣ Password hashen
    const hashedPassword = bcrypt.hashSync(password, 10);

    // 5️⃣ Nieuwe user aanmaken
    const newUser = {
      id: uuidv4(),
      username,
      password: hashedPassword,
      role: "user", // default role
    };

    users.push(newUser);

    // 6️⃣ Users opslaan
    writeJSON("./json_files/users.json", users);

    // 7️⃣ Response
    res.status(201).json({ message: "User succesvol geregistreerd" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
