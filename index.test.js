const gitAuth = require('./git-auth');

const { GITHUB_USERNAME } = process.env;
const githubRepoUrl = `https://github.com/${GITHUB_USERNAME}/webapp-tips.git`;
gitAuth(`git clone ${githubRepoUrl}`);
