<script setup lang="ts">
import "echarts-gl";
import {imageBg, imageSymbol} from "@/assets/map/echarts.image";
console.log("imageBg",imageBg)
onActivated(() => {
    resize();
});
onMounted(() => {
    if(props.mapJson && props.mapOptions) {
        mapData.mapJson = props.mapJson;
        mapData.mapOptions = props.mapOptions;
        init();
    } else {
        apiGen.mapJson(adcode.value).then(({options,jsons}) => {
            mapData.mapJson = jsons;
            mapData.mapOptions = options;
            init();
        })
    }
});
onUnmounted(() => {
    if (mapEcharts) {
        mapEcharts.off("click");
        mapEcharts.getZr().off("click");
    }
    mapEcharts = null;
    window.removeEventListener("resize", resizeEv);
});
const props = withDefaults(
    defineProps<{
        modelValue: TsEchartsMap3d.Model;
        data: TsEchartsMap3d.Data;
        options: TsEchartsMap3d.Options;
        mapJson?: TsEchartsMap3d.MapJson;
        mapOptions?: TsEchartsMap3d.MapOptions;
        sets?: TsEchartsMap3d.Sets;
    }>(),
    {
        sets: () => {
            return {};
        },
    }
);
let mapData = reactive<TsEchartsMap3d.MapData>({
    mapJson: [],
    mapOptions: [],
})
const emits = defineEmits(["click", "back", "update:modelValue"]);
const adcodeInit = props.modelValue;
const adcode = computed({
    get: () => props.modelValue,
    set: (val) => emits("update:modelValue", val),
});
let mapEcharts: TsEcharts.ECharts | null;
const mapName = "3D地图";
const box = ref();
function fearures(): any {
    let res = [];
    for (let index = 0; index < mapData.mapOptions[adcode.value].regions.length; index++) {
        const item = mapData.mapOptions[adcode.value].regions[index];
        const element = mapData.mapOptions[mapData.mapOptions[adcode.value].regions[index]];
        res.push({
            type: "Feature",
            properties: {
                adcode: element.adcode,
                name: element.name,
                // cp: element.cp,
                // center: element.center,
                // centroid: element.centroid,
                // childrenNum: element.childrenNum,
                level: element.level,
                parent: element.parent,
                // subFeatureIndex: element.subFeatureIndex,
                acroutes: element.acroutes,
            },
            geometry: {
                type: "MultiPolygon",
                coordinates: mapData.mapJson[item],
            },
        });
    }
    return {
        type: "FeatureCollection",
        features: res,
    };
}
let clickItem = ref(false);
function init() {
    nextTick(() => {
        mapEcharts = echarts.init(box.value);
        mapEcharts.showLoading();
        window.addEventListener("resize", resizeEv);
        mapEcharts.on("click", function (params) {
            clickItem.value = true;
            const data = params.data as TsEchartsMap3d.ClickParams;
            if (data.adcode === adcode.value) return;
            adcode.value = data.adcode;
            emits(
                "click",
                {
                    adcode: data.adcode,
                    name: data.name,
                    value: data.value,
                },
                setOption
            );
        });
        // 此处利用防抖函数解决点击事件冲突问题
        mapEcharts.getZr().on(
            "click",
            evDebounce({
                func: () => {
                    if (clickItem.value || adcode.value === adcodeInit) {
                        clickItem.value = false;
                        return;
                    }
                    adcode.value = mapData.mapOptions[adcode.value].parent.adcode;
                    emits(
                        "back",
                        {
                            adcode: adcode.value,
                            name: mapData.mapOptions[adcode.value].name,
                            value: props.data[adcode.value],
                        },
                        setOption
                    );
                },
                wait: 200,
                immediate: false,
            })
        );
    });
}
const setOption = function () {
    nextTick(() => {
        if (!mapEcharts) return;
        mapEcharts.clear();
        // 用于鼠标的旋转，缩放等视角控制，坐标系和地图保持一致
        const viewControl = {
            // x轴旋转角度
            alpha: props.sets.alpha || mapData.mapOptions[adcode.value].alpha || 50,
            // y轴旋转角度
            beta: props.sets.beta || mapData.mapOptions[adcode.value].beta || 0,
            // 中心点位置
            center: props.sets.center || mapData.mapOptions[adcode.value].offset || [0, 0, 0],
            // 视距控制
            distance: props.sets.distance || mapData.mapOptions[adcode.value].distance || 105,
            // 是否开启自动旋转
            autoRotate: props.sets.autoRotate ?? false,
            // 旋转方向 cw | ccw
            autoRotateDirection: props.sets.autoRotateDirection || "ccw",
            // 循环旋转
            loop: props.sets.loop ?? true,
            // y轴最小旋转角度
            minBeta: props.sets.minBeta || -180,
            // y轴最大旋转角度
            maxBeta: props.sets.maxBeta || 180,
        };
        echarts.registerMap(mapName, fearures());
        mapEcharts.setOption({
            // tooltip展示内容
            tooltip: {
                // 显示
                show: true,
                // 触发类型
                trigger: "item",
                // 提示背景颜色
                backgroundColor: props.sets.tooltipBgColor || "white",
                // 提示边框颜色
                borderColor: props.sets.tooltipBorColor || "white",
                // 提示边框圆角
                borderRadius: props.sets.tooltipRadius || 4,
                // 提示边框线宽
                borderWidth: props.sets.tooltipBorWidth || 0,
                // 提示内边距
                padding: props.sets.tooltipPadding || [10, 15],
                // 文本样式
                textStyle: {
                    // 颜色
                    color: props.sets.tooltipTextColor || "#323233",
                    // 水平对齐方式
                    align: props.sets.tooltipTextAlign || "left",
                    // 垂直对齐方式
                    baseline: props.sets.tooltipTextBaseline || "bottom",
                    // 字体系列
                    fontFamily: props.sets.tooltipTextFontFamily || "Microsoft Yahei",
                    // 字号
                    fontSize: props.sets.tooltipTextFontSize || 14,
                    // 样式
                    fontStyle: props.sets.tooltipTextFontStype || "normal",
                    // 粗细
                    fontWeight: props.sets.tooltipTextFontWeight || "normal",
                },
                // 自定义内容
                formatter: (res: { data: { value: TsGen.Object }; name: string }) => {
                    const value = res.data.value;
                    let texts = "<span class=' tooltip-name'>" + `${res.name}` + "</span>";
                    if (!value) return texts;
                    for (const key in value) {
                        const option = props.options[key];
                        if (!option || !option.tooltip) continue;
                        texts += "<div class='tooltip-content'>";
                        texts += "<span class='tooltip-label'>" + option.name + "</span>";
                        texts += "<span class='tooltip-value'>" + value[key] + "</span>";
                        texts += "</div>";
                    }
                    return texts;
                },
            },
            // 地图坐标系
            geo3D: {
                // 是否显示
                show: false,
                // 关联地图
                map: mapName,
                // 坐标系大小-宽
                boxWidth: 100,
                // 坐标系大小-高
                boxHeight: 10,
                // 用于鼠标的旋转，缩放等视角控制
                viewControl: viewControl,
                // 区域的高度
                regionHeight: 4,
            },
            series: [
                {
                    // 地图
                    type: "map3D",
                    // 地图名称
                    name: "map3DName",
                    // 关联地图
                    map: mapName,
                    // 环境贴图
                    environment: imageBg,
                    // 区域的高度
                    regionHeight: 4,
                    // 不在地图展示数据，改用scatter3D展示
                    emphasis: {
                        label: {
                            show: false,
                        },
                    },
                    // 地图着色效果
                    shading: "lambert",
                    // 光照相关的设置
                    light: {
                        // 主光源设置
                        main: {
                            // 主光源的颜色
                            // color: "#fdffe8",
                            // 主光源的强度
                            intensity: 1,
                            // 主光源是否投射阴影
                            shadow: true,
                            // 主光源绕 x 轴，即上下旋转的角度
                            alpha: 50,
                            // 主光源绕 y 轴，即左右旋转的角度
                            beta: 40,
                        },
                        // 全局的环境光设置
                        ambient: {
                            // 环境光的颜色
                            color: "#fff",
                            // 环境光的强度
                            intensity: 0,
                        },
                    },
                    // 地图放置平台
                    groundPlane: {
                        // 是否显示
                        show: false,
                        // 颜色
                        color: "rgba(255,255,255,1)",
                    },
                    // 地图块配置
                    itemStyle: {
                        // 地图默认颜色
                        color: [1, 1, 1, 1],
                        // 描边宽度
                        borderWidth: 1,
                        // 描边颜色
                        borderColor: "#53dfde",
                        // 透明度
                        opacity: 1,
                    },
                    // 地图数据
                    data: (() => {
                        let res = [];
                        for (let index = 0; index < mapData.mapOptions[adcode.value].regions.length; index++) {
                            const item = mapData.mapOptions[adcode.value].regions[index];
                            res.push({
                                name: mapData.mapOptions[item].name,
                                adcode: mapData.mapOptions[item].adcode,
                                value: props.data[item],
                                itemStyle: {
                                    color: mapData.mapOptions[item].regionColor,
                                },
                            });
                        }
                        return res;
                    })(),
                },
                {
                    // 线条
                    type: "lines3D",
                    // 线条名称
                    name: "lines3DName",
                    // 关联地图
                    coordinateSystem: "geo3D",
                    // 线条样式
                    lineStyle: {
                        // 线条宽度
                        width: 1,
                    },
                    // 线条的尾迹特效
                    effect: {
                        // 特效开关
                        show: true,
                        // 尾迹特效的周期
                        period: 4,
                        // 是否是固定速度,设置为非 null 的值后会忽略 period
                        constantSpeed: null,
                        // 尾迹的宽度
                        trailWidth: 4,
                        // 尾迹的长度 0-1百分比
                        trailLength: 0.1,
                    },
                    // 数据(位置、高度)
                    data: (() => {
                        let res = [];
                        for (let index = 0; index < mapData.mapOptions[adcode.value].regions.length; index++) {
                            const item = mapData.mapOptions[adcode.value].regions[index];
                            res.push({
                                name: mapData.mapOptions[item].name,
                                lineStyle: {
                                    color: mapData.mapOptions[item].linesColor,
                                },
                                coords: [[...mapData.mapOptions[item].symbol, 0], adcode.value === mapData.mapOptions[item].adcode ? [...mapData.mapOptions[item].symbol, 0] : [...mapData.mapOptions[item].label, 0.6]],
                            });
                        }
                        return res;
                    })(),
                },
                {
                    // 图标
                    type: "scatter3D",
                    // 图标名称
                    name: "scatter3DName",
                    // 关联地图
                    coordinateSystem: "geo3D",
                    // 标记层级
                    zlevel: 2,
                    // 自定义图标
                    symbol: "path://" + imageSymbol,
                    // 图标大小
                    symbolSize: 20,
                    // 图标样式
                    itemStyle: {
                        // 颜色
                        color: "#f7d794",
                    },
                    // 图形是否不响应和触发鼠标事件，true为不影响
                    silent: true,
                    // 标签
                    label: {
                        // 不展示标签内容
                        show: false,
                    },
                    // 数据(位置、高度)
                    data: (() => {
                        let res = [];
                        for (let index = 0; index < mapData.mapOptions[adcode.value].regions.length; index++) {
                            const item = mapData.mapOptions[adcode.value].regions[index];
                            res.push({
                                name: mapData.mapOptions[item].name,
                                value: [...mapData.mapOptions[item].symbol, 0],
                            });
                        }
                        return res;
                    })(),
                },
                {
                    // 标签
                    type: "bar3D",
                    // 标签名称
                    name: "bar3DName",
                    // 关联地图
                    coordinateSystem: "geo3D",
                    // 标签层级
                    zlevel: 1,
                    // 柱子样式
                    itemStyle: {
                        color: [1, 1, 1, 0],
                    },
                    // 标签
                    label: {
                        // 是否显示标签
                        show: true,
                        // 颜色
                        color: "#256463",
                        // 字号
                        fontSize: 16,
                        // 描边宽度
                        borderWidth: 0,
                        // 描边颜色
                        borderColor: "#000000",
                        // 背景颜色
                        backgroundColor: "#0cf8f5",
                        // 内边距
                        padding: 10,
                        // 圆角
                        borderRadius: 4,
                        // 自定义内容
                        formatter: (params: { name: string }) => {
                            let res = "";
                            res += `{name|${params.name}}`;
                            const option = evKeyObj({
                                obj: mapData.mapOptions,
                                param: params.name,
                                key: "name",
                            });
                            const item = props.data[option.adcode];
                            for (const key in item) {
                                if (!props.options[key] || !props.options[key].map) continue;
                                res += `\n{option|${props.options[key].name + "："}}` + `{option|${item[key]}}`;
                            }
                            return res;
                        },
                        // 自定义内容样式
                        rich: {
                            name: {
                                fontWeight: "bold",
                                padding: 0,
                                fontSize: 14,
                            },
                            option: {
                                padding: [10, 0, 0, 0],
                                fontSize: 14,
                            },
                        },
                    },
                    // 数据
                    data: (() => {
                        let res = [];
                        for (let index = 0; index < mapData.mapOptions[adcode.value].regions.length; index++) {
                            const item = mapData.mapOptions[adcode.value].regions[index];
                            res.push({
                                name: mapData.mapOptions[item].name,
                                value: adcode.value === mapData.mapOptions[item].adcode ? [...mapData.mapOptions[item].symbol, 0] : [...mapData.mapOptions[item].label, 0],
                            });
                        }
                        return res;
                    })(),
                },
            ],
        });
        mapEcharts.hideLoading();
    });
};
const clear = function () {
    nextTick(() => {
        if (!mapEcharts) return;
        mapEcharts.clear();
    });
};
const resize = function () {
    nextTick(() => {
        if (!mapEcharts || !box.value.offsetWidth) return;
        mapEcharts.resize();
    });
};
const resizeEv = evDebounce({
    func: resize,
    wait: 300,
});
defineExpose({
    clear,
    resize,
    setOption,
});
</script>
<template>
    <div class="base-map3d" ref="box"></div>
</template>
<style scoped>
.base-map3d {
    width: 100%;
    height: 100%;
}

.base-map3d :deep(.tooltip-name) {
    font: bold 14px Microsoft Yahei;
    color: #0b3a58;
}

.base-map3d :deep(.tooltip-content) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.base-map3d :deep(.tooltip-label) {
    color: #606266;
}

.base-map3d :deep(.tooltip-value) {
    color: #303133;
    margin-left: 16px;
}
</style>
