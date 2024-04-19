import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
const Timestamp = new Date().getTime();//随机时间戳

export default ({ mode }) => {
	const env = loadEnv(mode, process.cwd());
	return defineConfig({
		base: "./",
		server: {
			host: "0.0.0.0",
			port: 8080,
			hmr: true,
			open: false,
			proxy: {
				[env.VITE_BASE_API]: {
					target: env.VITE_BASE_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(env.VITE_BASE_API, ""),
				},
			},
		},
		resolve: {
			alias: [
				{
					find: "@",
					replacement: resolve(__dirname, "src"),
				}
			],
		},
		plugins: [
			vue(),
			Icons({
				autoInstall: true,
				compiler: "vue3",
				// scale: 1,
				// defaultClass: '', // 默认类名
				// defaultStyle: '', // 默认样式
				// jsx: 'react' // jsx支持
			}),
			AutoImport({
				imports: [
					"vue",
					"vue-router",
					{
						"js-cookie": [["default", "cookies"]],
						echarts: [["*", "echarts"]],
						pinia: [["*", "pinia"]],
						alova: [
							["useRequest", "useRequest"],
							["useWatcher", "useWatcher"],
							["invalidateCache", "invalidateCache"],
						],
						"@vueuse/core": [
							["*", "vueuse"],
							["useDraggable", "useDraggable"],
							["useVModel","useVModel"],
							["useDateFormat","useDateFormat"],
							["useWindowSize","useWindowSize"],
							["useElementSize","useElementSize"],
							["useUrlSearchParams","useUrlSearchParams"],
							["useWebNotification","useWebNotification"],
							["useStorage","useStorage"],
						],
						"@alova/scene-vue": [
							["usePagination", "usePagination"],
							["useSQRequest", "useSQRequest"],
							["useAutoRequest", "useAutoRequest"],
							["accessAction", "accessAction"],
							["actionDelegationMiddleware", "actionDelegationMiddleware"],
							["useForm", "useForm"],
							["updateStateEffect","updateStateEffect"]
						]
					},
				],
				dirs: ["./src/assets/api/*", "./src/assets/ts", "./src/router/*", "./src/request", "./src/store/*"],
				resolvers: [
					ElementPlusResolver(),
					IconsResolver({
						prefix: "Icon",
					}),
				],
			}),
			Components({
				resolvers: [
					ElementPlusResolver(),
					IconsResolver({
						prefix: "icon", // 自动引入的Icon组件统一前缀，默认为 i，设置false为不需要前缀
						enabledCollections: ["solar","line-md"], // 这是可选的，默认启用 Iconify 支持的所有集合['mdi']
					}),
				],
			}),
		],
		build: {
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					chunkFileNames: `static/js/[name].[hash]${Timestamp}.js`,
					entryFileNames: `static/js/[name].[hash]${Timestamp}.js`,
					assetFileNames: `static/[ext]/[name].[hash]${Timestamp}.[ext]`,
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return id.toString().split("node_modules/")[1].split("/")[0].toString();
						}
					},
				},
			},
		},
	});
};
