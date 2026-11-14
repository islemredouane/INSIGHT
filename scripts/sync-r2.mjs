/**
 * Cloudflare R2 Sync Script for INSIGHT Website
 *
 * Reads R2 credentials from .env.local or process.env:
 *   R2_ACCOUNT_ID=f3a05fcfad7f066dcee41b351a186282
 *   R2_BUCKET_NAME=insight-images
 *   R2_ACCESS_KEY_ID=...
 *   R2_SECRET_ACCESS_KEY=...
 *   PUBLIC_CDN_URL=https://pub-554f8a45acb54090af55ec98805e7e60.r2.dev
 *
 * Usage:
 *   npm run sync-r2
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';
import mime from 'mime-types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Load .env.local if present
const envLocalPath = path.join(rootDir, '.env.local');
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf-8');
  for (const line of envContent.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
      if (val) {
        process.env[key] = val;
      }
    }
  }
}

const accountId = process.env.R2_ACCOUNT_ID || 'f3a05fcfad7f066dcee41b351a186282';
const bucketName = process.env.R2_BUCKET_NAME || 'insight-images';
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const publicCdnUrl = (process.env.PUBLIC_CDN_URL || 'https://pub-554f8a45acb54090af55ec98805e7e60.r2.dev').replace(/\/+$/, '');

if (!accessKeyId || !secretAccessKey) {
  console.error('\n❌ Missing R2 API Credentials!');
  console.error('Please provide R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY.');
  console.error('You can add them to your .env.local file or pass them as environment variables:\n');
  console.error('  R2_ACCESS_KEY_ID="your_access_key_id"');
  console.error('  R2_SECRET_ACCESS_KEY="your_secret_access_key"\n');
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId,
    secretAccessKey,
  },
});

async function getLocalFiles(dir, baseDir = dir) {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(await getLocalFiles(fullPath, baseDir));
    } else if (entry.isFile()) {
      const relKey = path.relative(baseDir, fullPath).replace(/\\/g, '/');
      results.push({ fullPath, key: relKey });
    }
  }
  return results;
}

async function uploadFile(fullPath, r2Key) {
  const fileBuffer = fs.readFileSync(fullPath);
  const contentType = mime.lookup(fullPath) || 'application/octet-stream';
  const sizeMb = (fileBuffer.length / (1024 * 1024)).toFixed(2);

  // Check if object exists with same size
  try {
    const head = await s3.send(new HeadObjectCommand({ Bucket: bucketName, Key: r2Key }));
    if (head.ContentLength === fileBuffer.length) {
      console.log(`  ⏭️  [Cached]  ${r2Key} (${sizeMb} MB)`);
      return;
    }
  } catch {
    // Doesn't exist, proceed to upload
  }

  process.stdout.write(`  ⬆️  [Upload]  ${r2Key} (${sizeMb} MB)... `);
  await s3.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: r2Key,
      Body: fileBuffer,
      ContentType: contentType,
      CacheControl: 'public, max-age=31536000, immutable',
    })
  );
  console.log('✅ Done');
}

async function main() {
  console.log(`\n🚀 Syncing assets to Cloudflare R2: ${bucketName}`);
  console.log(`   Endpoint: https://${accountId}.r2.cloudflarestorage.com`);
  console.log(`   Public CDN: ${publicCdnUrl}\n`);

  const mediaDirs = ['events', 'crew', 'researchers', 'labs', 'brand', 'og'];
  const publicDir = path.join(rootDir, 'public');
  let files = [];

  for (const dirName of mediaDirs) {
    const dirPath = path.join(publicDir, dirName);
    if (fs.existsSync(dirPath)) {
      const dirFiles = await getLocalFiles(dirPath, publicDir);
      files = files.concat(dirFiles);
    }
  }

  console.log(`Found ${files.length} website media assets to sync:\n`);

  let uploadedCount = 0;
  for (const file of files) {
    try {
      await uploadFile(file.fullPath, file.key);
      uploadedCount++;
    } catch (err) {
      console.error(`\n❌ Failed to upload ${file.key}:`, err.message);
    }
  }

  console.log(`\n✨ Successfully synced ${uploadedCount} / ${files.length} assets to R2!`);
  console.log(`🔗 Verify e.g.: ${publicCdnUrl}/events/spark-2026/cover.webp\n`);
}

main().catch((err) => {
  console.error('\n❌ Fatal error syncing with R2:', err);
  process.exit(1);
});
