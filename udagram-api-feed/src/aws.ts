import AWS = require("aws-sdk");
import { config } from "./config/config";

const c = config.dev;

//Configure AWS
if (c.aws_profile !== "DEPLOYED") {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  });
}

export const s3 = new AWS.S3({
  signatureVersion: "v4",
  region: c.aws_region,
  params: { Bucket: c.AWS_BUCKET },
});

/* getGetSignedUrl generates an aws signed url to retreive an item
 * @Params
 *    key: string - the filename to be put into the s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getGetSignedUrl(key: string): string {
  const signedUrlExpireSeconds = 60 * 5;
  const url = s3.getSignedUrl("getObject", {
    Bucket: c.AWS_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
  return url;
}

/* getPutSignedUrl generates an aws signed url to put an item
 * @Params
 *    key: string - the filename to be retreived from s3 bucket
 * @Returns:
 *    a url as a string
 */
export function getPutSignedUrl(key: string) {
  const signedUrlExpireSeconds = 60 * 5;
  const url = s3.getSignedUrl("putObject", {
    Bucket: c.AWS_BUCKET,
    Key: key,
    Expires: signedUrlExpireSeconds,
  });
  return url;
}
