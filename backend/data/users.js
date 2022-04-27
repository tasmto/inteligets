import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Customer Doe',
    email: 'customer@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Steven Universe',
    email: 'steven@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
