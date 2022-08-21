import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      port: parseInt(process.env.PORT, 10),
      host: process.env.HOST,
      username: process.env.USERNAME_DB,
      password: process.env.PASSWORD,
      nameDatabase: process.env.DATABASE_NAME,
      url: process.env.DATABASE_URL,
    },
  };
});
