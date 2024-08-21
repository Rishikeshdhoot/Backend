exports.Config = {
    PORT: process.env.PORT || 5000,
    EMAIL_USER : process.env["EMAIL_USER"],
    EMAIL_PASSWORD : process.env["EMAIL_PASSWORD"],
    DB_URL : process.env["DB_URL"],
    JWT_SECRET : process.env["JWT_SECRET"],
    S3_REGION : process.env["S3_REGION"],
    AWS_ACCESS_KEY : process.env["AWS_ACCESS_KEY"],
    AWS_ACCESS_SECRET : process.env["AWS_ACCESS_SECRET"],
}