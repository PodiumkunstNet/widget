import path from "path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, path.resolve(process.cwd(), "../widget"), "")

	return {
		plugins: [react(), svgr(), tailwindcss()],
		server: {
			port: 3002,
			proxy: {
				"/sparql": {
					target: env.SPARQL_ENDPOINT,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/sparql/, ""),
				},
			},
		},
		resolve: {
			alias: {
				// /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
				"@tabler/icons-react":
					"@tabler/icons-react/dist/esm/icons/index.mjs",
				"@widget": path.resolve(__dirname, "../widget/src"),
			},
		},
		base: mode === "production" ? "/configurator/" : undefined,
	}
})
