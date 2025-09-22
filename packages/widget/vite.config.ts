import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
// import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	server: {
		port: 3001,
	},
	resolve: {
		alias: {
			// /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
			'@tabler/icons-react': '@tabler/icons-react/dist/esm/icons/index.mjs',
		},
	},

})
