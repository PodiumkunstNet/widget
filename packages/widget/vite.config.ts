import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), "")

	return {
		plugins: [react(), svgr()],
		server: {
			port: 3001,
			proxy: {
				"/sparql": {
					target: env.SPARQL_ENDPOINT,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/sparql/, ""),
				},
			}
		},
		resolve: {
			alias: {
				// /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
				"@tabler/icons-react":
					"@tabler/icons-react/dist/esm/icons/index.mjs",
			},
		},
	}
})
