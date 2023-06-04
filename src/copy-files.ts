import fs from 'fs';
import path from 'path';

const basePath = "../src";
const destinationPath = '.';

const sourcePaths: string[] = [
  `${basePath}/assets`,
  `${basePath}/.well-known`,
  `${basePath}/openapi.yaml`
];

sourcePaths.forEach((sourcePath) => {
  const resolvedSourcePath = path.resolve(__dirname, sourcePath);
  const resolvedDestinationPath = path.resolve(__dirname, destinationPath, path.basename(sourcePath));

  if (fs.existsSync(resolvedSourcePath)) {
    if (fs.lstatSync(resolvedSourcePath).isDirectory()) {
      copyDirectory(resolvedSourcePath, resolvedDestinationPath);
    } else {
      copyFile(resolvedSourcePath, resolvedDestinationPath);
    }
    console.log(`Copied ${resolvedSourcePath} to ${resolvedDestinationPath}`);
  } else {
    console.error(`Source path ${resolvedSourcePath} does not exist.`);
  }
});

function copyFile(source: string, destination: string): void {
  fs.copyFileSync(source, destination);
}

function copyDirectory(source: string, destination: string) {
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  const files = fs.readdirSync(source);
  files.forEach((file) => {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    if (fs.lstatSync(sourcePath).isDirectory()) {
      copyDirectory(sourcePath, destinationPath);
    } else {
      copyFile(sourcePath, destinationPath);
    }
  });
}

