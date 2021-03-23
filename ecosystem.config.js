const commonDeploy = {
	user: 'xo',
	host: '165.227.220.113',
	key: '~/.ssh/deploy.key',
	ref: 'origin/main',
	repo: 'https://github.com/lunabot/landing-page',
	path: '/home/xo/code/lunabot/landing-page/dev',
	'pre-deploy': 'git reset --hard',
	'post-deploy': 'pm2 startOrGracefulReload ecosystem.config.js --env dev'
};

module.exports = {
	apps: [
		{
			name: 'lunabot.org',
			script: 'serve',
			time: true,
			// eslint-disable-next-line
			append_env_to_name: true,
			instances: 1,
			autorestart: true,
			// eslint-disable-next-line
			max_restarts: 50,
			watch: true,
			env: {
				PM2_SERVE_PATH: '.',
				PM2_SERVE_PORT: 8080,
				PM2_SERVE_SPA: 'true',
				PM2_SERVE_HOMEPAGE: './index.html'
			}
		}
	],
	deploy: {
		production: {
			...commonDeploy,
			path: '/home/xo/code/lunabot/landing-page/production',
			'post-deploy': 'pm2 startOrGracefulReload ecosystem.config.js --env production'
		}
	}
};
