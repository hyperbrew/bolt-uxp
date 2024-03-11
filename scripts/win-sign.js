import { execSync } from "child_process";
import dotenv from "dotenv";
dotenv.config();

const {
  AZURE_CERT_NAME,
  AZURE_URL,
  AZURE_CLIENT_ID,
  AZURE_TENANT_ID,
  AZURE_SECRET_VALUE,
} = process.env;

if (
  !AZURE_CERT_NAME ||
  !AZURE_URL ||
  !AZURE_CLIENT_ID ||
  !AZURE_TENANT_ID ||
  !AZURE_SECRET_VALUE
) {
  console.log({
    AZURE_CERT_NAME,
    AZURE_URL,
    AZURE_CLIENT_ID,
    AZURE_TENANT_ID,
    AZURE_SECRET_VALUE,
  });
  console.error("Please provide all required environment variables");
  process.exit(1);
}

const sign = (binPath) => {
  console.log(`Signing ${binPath}`);
  const res = execSync(
    `azuresigntool sign -kvu "${AZURE_URL}" -kvi "${AZURE_CLIENT_ID}" -kvt "${AZURE_TENANT_ID}"  -kvs "${AZURE_SECRET_VALUE}" -kvc "${AZURE_CERT_NAME}" -tr http://timestamp.digicert.com -v "${binPath}"`,
    {
      encoding: "utf-8",
    }
  );
  console.log("Win Sign result:");
  console.log(res);
  return;
};

const main = async () => {
  await sign("./public-hybrid/win/x64/bolt-uxp-hybrid.uxpaddon");
};
main();
