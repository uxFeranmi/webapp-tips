// require('dotenv').config();

const gitAuth = require('./git-auth');
const { execSync } = require('child_process');

const { GITHUB_USERNAME } = process.env;
const githubRepoUrl = `https://github.com/${GITHUB_USERNAME}/webapp-tips-content.git`;
// const githubRepoUrl = `https://github.com/${GITHUB_USERNAME}/fake-repo.git`;
gitAuth(`git clone --progress --single-branch ${githubRepoUrl}`)
	.then(() => execSync("ls webapp-tips-content", { stdio: 'inherit' }))
	.catch(() => {});
// gitAuth(`git --version`);
// gitAuth(`which git`);
// git clone --progress --single-branch https://github.com/fakeuser/fake-repo-content.git
