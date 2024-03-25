import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admindemo@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Customer Doe',
    email: 'customerdemo@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Steven Universe',
    email: 'steven@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
