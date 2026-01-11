STEP 1:  npm init playwright@latest

STEP 2:  npm install --save-dev @types/node
Advantage: Without it, TypeScript doesn’t know the types of Node.js built-ins, so you’ll get errors like:
example :
      Cannot find name 'require'
      Cannot find module 'fs'

STEP 3: npm install --save-dev typescript
Advantage: TO initialize tsconfig.json file : npx tsc --init

STEP 4: npm install --save-dev cross-env
Advantage:Use to configure env from package.json

STEP 5: npm install --save-dev ts-node
Advantage: ts-node lets you run TypeScript files directly, without needing to compile them into JavaScript first. It’s like running .js files with node, but for .ts.

STEP 6 : npm install --save-dev rimraf
Advantage: It’s especially useful in Node.js projects to clean up dist/, build/, or other temporary folders before rebuilding.


TO GET LIST OF TEST IN ONE FILE
npx playwright test --list

TO RUN A SINGLE TEST AMONG GROUP OF TEST IN ONE FILE
npx playwright test -g "TEST DESCRIPTION"

EX: npx playwright test -g "two way trip"


allure installation :  npm install allure-playwright
npm install --save-dev @playwright/test allure-playwright
npm install -D allure-playwright allure-commandline


npm run test:specific -g "@round1" --reporter=line,allure-playwright

//To enter Env and Tag from cmd
npm run test:tag -g "@round1" --env "aci"