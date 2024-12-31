import bcrypt from "bcrypt";

export const encryptPassword = (password: string) => {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};
