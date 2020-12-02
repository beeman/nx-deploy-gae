import { readJsonSync, writeJsonSync } from 'fs-extra';
import { join } from 'path';

const targetFile = process.argv[2];
if (!targetFile) {
  console.log(`Please provide a target file (eg: dist/apps/api/package.json)`);
  process.exit(1);
}

// Read de package.json
const packageJson = readJsonSync(join(process.cwd(), 'package.json'));

// Copy these keys from package.json
const copyKeys = [
  'name',
  'version',
  'license',
  'private',
  'dependencies',
  'devDependencies',
];

// Create a copy
const copyJson = copyKeys.reduce(
  (acc, curr) => ({ ...acc, [curr]: packageJson[curr] }),
  {}
);

// Create the final package.json with the custom scripts
const finalJson = {
  ...copyJson,
  scripts: {
    start: 'node main.js',
    build: 'true',
  },
};

// Write final json to targetFile
writeJsonSync(targetFile, finalJson, { spaces: 2 });
console.log(`🚀 Generated ${targetFile}`);
