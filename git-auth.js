/**
 * 1. Hack stdin/stdout to interact with the git prompts and provide the username and password when requested.
 * 2. Figure out setting up SSH on the server and use Deploy keys (single repo access) or account SSH keys for auth.
 * The code below is a snippet that could potentially interface with stdin/stdout as described in #1 above.
 */


const { execSync, spawn } = require('child_process');
const path = require('path');

const repoLocation = path.join(process.cwd(), 'webapp-tips-content');
// const repoLocation = process.cwd();
console.log({ repoLocation });

module.exports = (initCommand) => new Promise((resolve, reject) => {
	// git config --local --add credential.helper B
	execSync("git init webapp-tips-content", { cwd: process.cwd(), stdio: 'inherit' });
	execSync("git config --local credential.helper ''", { cwd: repoLocation, stdio: 'inherit' });
	// execSync("git config --local --add credential.helper 'cache --timeout=900'", { cwd: repoLocation, stdio: 'inherit' });
	console.log('Called git credential helper.');

	const { GITHUB_USERNAME, GITHUB_ACCESS_TOKEN } = process.env;

	console.log(`Running init command: ${initCommand}`);
	const childProcess = spawn(initCommand, [], { shell: true, cwd: repoLocation });

	// Start by simply writing some input since the prompts aren't captured by stdout
	// We have to use a manual delay to wait for each prompt, since we cannot detect when the child process is ready for input.
	setTimeout(() => {
		console.log({ input: 'Username' });
		childProcess.stdin.write(`${GITHUB_USERNAME}\n`);

		setTimeout(() => {
			console.log({ input: 'Password' });
			childProcess.stdin.write(`${GITHUB_ACCESS_TOKEN}\n`);
		}, 1500);
	}, 2000);

	let data_line = '';
	childProcess.stdout.setEncoding('utf8');

	childProcess.stdout.on("data", function(data) {
		// Outputs may come in batches, so we merge them together.
		// This means we need to examine the string to determine when the output for a command ends.
		data_line += data;

		// You can examine the output from each command to guess when it's time for the next input,
		// and also to decide what input should come next.
		// Here we're assuming that a newline marks the end of an output,
		// So we start reacting only when a newline shows up at the end of the cummulative output.
		if (data_line.endsWith('\n')) {
			// Capture the data and reset data_line
			const newOutput = data_line;
			data_line = '';

			console.log(newOutput);

			// Pass new input based on the last output
			// if (newOutput.includes('Not connected')) {
			// 	console.log({ input: 'quit' });
			// 	childProcess.stdin.write('quit\n');
			// 	return;
			// }
		}
	});

	childProcess.stderr.on('data', (data) => {
	  console.error(`stderr: ${data}`);
	});

	childProcess.on('close', (code) => {
		if (code !== 0) {
			reject(code);
			console.log('Failed to connect to GitHub.');
			console.log(`Command ${initCommand} failed with exit code ${code}.`);
			return;
		}

		console.log('Successfully connected to GitHub.');
		console.log('We should be good for the next 15 minutes');
		console.log(`Command ${initCommand} ran successfully; exited with code ${code}.`);
		resolve();
	});
});
