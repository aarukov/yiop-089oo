const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const npmToken = '';
const npmUsername = '';
const npmEmail = '';
const numPackages = 110;
const npmPackageName = '';

async function publishPackage(i) {
  const packageName = `m${Math.random().toString(36).substr(2, 100)}`;

  const packageJson = {
    name: packageName,
    version: '1.0.0',
    description: '',
    main: 'index.js',
    scripts: {
      test: 'echo "Error: no test specified" && exit 1'
    },
    keywords: [],
    author: npmUsername,
    license: 'ISC',
    dependencies: {
      axios: '^0.25.0',
      [npmPackageName]: 'latest'
    }
  };

  fs.mkdirSync(packageName);
  fs.writeFileSync(path.join(packageName, 'package.json'), JSON.stringify(packageJson, null, 2));
  fs.writeFileSync(path.join(packageName, 'index.js'), `const ${npmPackageName} = require('${npmPackageName}');\n\n// ваш код, использующий ${npmPackageName}`);

  exec(`cd ${packageName} && npm install && npm config set //registry.npmjs.org/:_authToken=${npmToken} && npm publish`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Exec error for package ${packageName}: ${error}`);
      return;
    }
    console.log(`stdout for package ${packageName}: ${stdout}`);
    console.error(`stderr for package ${packageName}: ${stderr}`);
  });
}

for (let i = 100; i < numPackages; i++) {
  setTimeout(async () => {
    await publishPackage(i);
  }, (i - 100) * 10000);
}