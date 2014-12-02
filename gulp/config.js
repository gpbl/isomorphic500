var dest = './build';

module.exports = {
	clean: dest,
	sass: {
		src: './style/main.scss',
		dest: dest + '/public/css'
	},
	copy: {
		src: ['./app'],
		dest: dest
	},
	cachebust: {
		assets: dest + '/public', // Assets to collect
		src: [dest + '/public/css/*.css', dest + '/app/**/*.jsx'], // Where replace assets refs
		dest: dest
	}
};