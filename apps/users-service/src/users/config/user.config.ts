import { registerAs } from '@nestjs/config';

export default registerAs('user', () => {
  return {
    uri: `${process.env.MONGODB_URI}/talabat-users`,
  };
});
