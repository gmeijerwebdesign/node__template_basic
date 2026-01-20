import bcrypt from "bcryptjs";
const password = "tester";

const hashedPassword = bcrypt.hashSync(password, 10);

console.log(hashedPassword);
