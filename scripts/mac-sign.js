import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const appleId = process.env.APPLE_ID;
const teamId = process.env.APPLE_TEAM_ID;
const applePassword = process.env.APPLE_PASSWORD;
const appleSigningIdentity = process.env.APPLE_SIGNING_IDENTITY;

if (!appleId || !teamId || !applePassword || !appleSigningIdentity) {
    console.error('Please provide all required environment variables');
    process.exit(1);
}

const notarize = async (binPath, id, project) => {
    const dir = path.dirname(binPath);
    const ext = path.extname(binPath);
    const base = path.basename(binPath, ext);
    const name = base.replace(ext, '')
    // Codesign the binary
    try {
        const signStr = `codesign --sign "${appleSigningIdentity}" --timestamp --options runtime "${binPath}"`;
        console.log({ signStr });
        const res1 = execSync(signStr, { encoding: 'utf-8' });
        console.log(res1);
    } catch (e) {
        console.error(e);
    }

    // Zip for upload
    const zipStr = `zip "../../../${name}.zip" "bolt-uxp-hybrid.uxpaddon"`
    console.log({ zipStr });
    const res2 = execSync(zipStr, { cwd: dir }, { encoding: 'utf-8' }); // TODO fix relative path
    console.log(res2);

    // Store Credentials
    const credName = `notarytool-password`;
    const credStr = `xcrun notarytool store-credentials "${credName}" --apple-id "${appleId}" --team-id "${teamId}" --password "${applePassword}"`;
    console.log({ credStr });
    const res3 = execSync(credStr, { encoding: 'utf-8' });
    console.log(res3);

    // Upload for Notarization
    const notarizeStr = `xcrun notarytool submit ${name}.zip --keychain-profile "${credName}" --team-id "${teamId}" --wait`;
    console.log({ notarizeStr });
    const res4 = execSync(notarizeStr, { encoding: 'utf-8' });
    console.log(res4);

    // Create app structure
    const appPath = path.join(process.cwd(), `${project}.app`);
    const contents = path.join(appPath, 'Contents');
    const macOS = path.join(contents, 'MacOS');
    fs.mkdirSync(macOS, { recursive: true });
    const plistPath = path.join(contents, 'Info.plist');
    const plist = `<?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
    <dict>
        <key>CFBundleExecutable</key>
        <string>${project}</string>
        <key>CFBundleIdentifier</key>
        <string>${id}</string>
        <key>CFBundleVersion</key>
        <string>1.0.0</string>
        <key>CFBundleShortVersionString</key>
        <string>1.0</string>
        <key>CFBundleName</key>
        <string>${project}</string>
    </dict>
    </plist>`;
    fs.writeFileSync(plistPath, plist);
    const tmpBinPath = path.join(macOS, project);
    fs.copyFileSync(binPath, tmpBinPath);
    console.log(`Created app structure at ${appPath}`);

    // staple the binary
    const stapleStr = `xcrun stapler staple "./${project}.app"`;
    console.log({ stapleStr });
    const res5 = execSync(stapleStr, { encoding: 'utf-8' });
    console.log(res5);

    // verify staple
    // const res6 = execSync(`xcrun stapler validate "./${project}.app"`, { encoding: 'utf-8' });
    // console.log(res6)

    // verify signature
    // const res7 = execSync(`spctl -a -v "${appPath}"`, { encoding: 'utf-8' });
    // console.log(res7);

    // move bin back
    const res8 = fs.copyFileSync(tmpBinPath, binPath);

    fs.rmSync(appPath, { recursive: true });
    console.log(`SIGNATURE AND NOTARIZATION COMPLETED FOR: ${binPath}`);
}

const main = async () => {
    await notarize("./public-hybrid/mac/arm64/bolt-uxp-hybrid.uxpaddon", 'com.bolt.uxp', 'BoltUXPHybrid');
    await notarize("./public-hybrid/mac/x64/bolt-uxp-hybrid.uxpaddon", 'com.bolt.uxp', 'BoltUXPHybrid');
}
main();