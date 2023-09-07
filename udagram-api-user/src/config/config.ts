export const config = {
  dev: {
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
    aws_region: process.env.AWS_REGION,
    aws_profile: process.env.AWS_PROFILE,
    AWS_BUCKET: process.env.AWS_BUCKET,
  },
  prod: {
    username: "",
    password: "",
    database: "udagram_prod",
    host: "",
    dialect: "postgres",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};
