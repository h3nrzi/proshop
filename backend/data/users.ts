import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin",
    email: "admin@gamil.com",
    password: bcrypt.hashSync("test1234", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john@gamil.com",
    password: bcrypt.hashSync("test1234", 10),
    isAdmin: false,
  },
  {
    name: "Jane Doe",
    email: "jane@gamil.com",
    password: bcrypt.hashSync("test1234", 10),
    isAdmin: false,
  },
];

export default users;
