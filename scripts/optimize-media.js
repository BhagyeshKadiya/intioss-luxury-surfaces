const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('ffmpeg-static');

console.log('Using ffmpeg from:', ffmpeg);

const heroDir = path.join(__dirname, '..', 'public', 'hero');

function optimizeVideo(inputFile, outputFile) {
  console.log(`\n--- Optimizing Video: ${inputFile} -> ${outputFile} ---`);
  const initialSize = fs.existsSync(inputFile) ? (fs.statSync(inputFile).size / (1024 * 1024)).toFixed(2) : 0;
  console.log(`Original size: ${initialSize} MB`);

  // Target: 1080p, CRF 24, +faststart, 30fps, fast web-streaming profile
  const args = [
    '-y',
    '-i', inputFile,
    '-vf', 'scale=trunc(iw*min(1920/iw\\,1)/2)*2:trunc(ih*min(1080/ih\\,1)/2)*2',
    '-c:v', 'libx264',
    '-profile:v', 'main',
    '-level', '4.0',
    '-pix_fmt', 'yuv420p',
    '-preset', 'slow',
    '-crf', '24',
    '-r', '30',
    '-an', // remove audio from background video to reduce weight and prevent conflicts with violin audio
    '-movflags', '+faststart',
    outputFile
  ];

  const res = spawnSync(ffmpeg, args, { stdio: 'inherit' });
  if (res.status === 0) {
    const finalSize = (fs.statSync(outputFile).size / (1024 * 1024)).toFixed(2);
    console.log(`Optimization succeeded! Final size: ${finalSize} MB (${((finalSize / initialSize) * 100).toFixed(1)}% of original)`);
  } else {
    console.error('Error optimizing video:', res.error || res.status);
  }
}

function optimizeImage(inputFile, outputFile) {
  const initialSize = (fs.statSync(inputFile).size / (1024 * 1024)).toFixed(2);
  console.log(`Optimizing image: ${path.basename(inputFile)} (${initialSize} MB) -> ${path.basename(outputFile)}`);
  
  // Convert PNG to WebP with 85% quality & max 2000px dimension
  const args = [
    '-y',
    '-i', inputFile,
    '-vf', 'scale=trunc(iw*min(2000/iw\\,1)/2)*2:trunc(ih*min(2000/ih\\,1)/2)*2',
    '-c:v', 'libwebp',
    '-quality', '85',
    outputFile
  ];

  const res = spawnSync(ffmpeg, args, { stdio: 'pipe' });
  if (res.status === 0 && fs.existsSync(outputFile)) {
    const finalSize = (fs.statSync(outputFile).size / 1024).toFixed(1);
    console.log(`  Done: ${finalSize} KB`);
  } else {
    console.error('  Failed to optimize image:', inputFile);
  }
}

// 1. Optimize the two hero videos
const video1In = path.join(heroDir, 'website_hero_1.mp4');
const video1Out = path.join(heroDir, 'website_hero_1_opt.mp4');

const video2In = path.join(heroDir, 'website_hero_2.mp4');
const video2Out = path.join(heroDir, 'website_hero_2_opt.mp4');

optimizeVideo(video1In, video1Out);
optimizeVideo(video2In, video2Out);

// 2. Optimize hero PNG images to WebP
const files = fs.readdirSync(heroDir);
const pngFiles = files.filter(f => f.endsWith('.png') && !f.includes('symbol') && !f.includes('logo'));

for (const png of pngFiles) {
  const input = path.join(heroDir, png);
  const webpName = png.replace(/\.png$/, '.webp');
  const output = path.join(heroDir, webpName);
  optimizeImage(input, output);
}

console.log('\n--- ALL MEDIA OPTIMIZATION COMPLETE ---');
