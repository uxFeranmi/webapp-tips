// require('dotenv').config();

// const gitAuth = require('./git-auth');
const { execSync } = require('child_process');

console.log({ platform: process.platform });
console.log("> git --version");
execSync("git --version", { stdio: 'inherit' });

// console.log("> git config --local credential.helper 'cache --timeout=900'");
// execSync("git config --local credential.helper 'cache --timeout=900'", { cwd: process.cwd(), stdio: 'inherit' });

// console.log("> git config --local credential.helper");
// execSync("git config --local credential.helper", { cwd: process.cwd(), stdio: 'inherit' });

// console.log("> git config --local --unset credential.helper");
// execSync("git config --local --unset credential.helper", { cwd: process.cwd(), stdio: 'inherit' });

const { GITHUB_USERNAME, GITHUB_ACCESS_TOKEN } = process.env;
const githubRepoUrl = `https://${GITHUB_USERNAME}:${GITHUB_ACCESS_TOKEN}@github.com/${GITHUB_USERNAME}/webapp-tips-content.git`;

execSync(`git clone --progress --single-branch ${githubRepoUrl}`, { stdio: 'inherit' })
execSync("ls webapp-tips-content", { stdio: 'inherit' });

// execSync(`which git`);
