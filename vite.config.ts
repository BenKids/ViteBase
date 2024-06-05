import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import viteCompression from "vite-plugin-compression";
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
							["useToggle","useToggle"],
							["useDark","useDark"],
							["useMouse","useMouse"]
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
			// 文件打包压缩，页面访问时加载压缩过的文件，提高访问速度
			viteCompression({
				filter: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i, // 需要压缩的文件
				threshold: 1024, // 文件容量大于这个值进行压缩
				algorithm: 'gzip', // 压缩方式
				ext: 'gz', // 后缀名
				deleteOriginFile: false, // 压缩后是否删除压缩源文件，开启后访问时403，暂没有找到解决办法
			})
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
