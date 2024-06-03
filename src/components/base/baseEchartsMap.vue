<script setup lang="ts">
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
    if (mapEcharts) mapEcharts.off("click");
    mapEcharts = null;
    window.removeEventListener("resize", resizeEv);
});
const props = withDefaults(
    defineProps<{
        modelValue: TsEchartsMap.Model;
        data: TsEchartsMap.Data;
        sets?: TsEchartsMap.Sets;
        mapOptions?: TsEchartsMap.MapOptions;
        mapJson?: TsEchartsMap.MapJson;
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
const box = ref();
const adcode = computed({
    get: () => props.modelValue,
    set: (val) => emits("update:modelValue", val),
});
let mapEcharts: TsEcharts.ECharts | null;
const mapName = "Map";

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
                level: element.level,
                parent: element.parent,
                acroutes: element.acroutes,
                center: element.center,
                centroid: element.centroid,
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

const resize = function () {
    nextTick(() => {
        if (!mapEcharts || !box.value || !box.value.offsetWidth) return;
        mapEcharts.resize();
    });
};
const resizeEv = evDebounce({
    func: resize,
    wait: 300,
});
const clear = function () {
    nextTick(() => {
        if (!mapEcharts) return;
        mapEcharts.clear();
    });
};
const adcodeInit = props.modelValue;
let clickItem = ref(false);
const init = function () {
    nextTick(() => {
        mapEcharts = echarts.init(box.value);
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
                    value: props.data[data.adcode] ? JSON.parse(JSON.stringify(props.data[data.adcode])) : undefined,
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
};

function maxFn() {
    let max = 0;
    for (const key in props.data) {
        let item = props.data[key];
        if (item && item[0] && Number(item[0].value) > max) {
            max = Number(item[0].value);
        }
    }
    return max;
}

const setOption = function () {
    nextTick(() => {
        if (!mapEcharts) return;
        echarts.registerMap(mapName, fearures());
        mapEcharts.setOption(
            {
                // 工具提示
                tooltip: {
                    // 显示策略，可选为
                    show: props.sets.tooltip ?? true,
                    // 触发类型，默认数据触发
                    trigger: "item",
                    // 提示背景颜色，默认为透明度为0.7的黑色
                    backgroundColor: props.sets.tooltipBgColor || "white",
                    // 提示边框颜色
                    borderColor: props.sets.tooltipBorColor || "rgba(0,0,0,1)",
                    // 提示边框圆角
                    borderRadius: props.sets.tooltipRadius || 4,
                    // 提示边框线宽
                    borderWidth: props.sets.tooltipBorWidth || 0,
                    // 提示内边距，单位px，默认各方向内边距为5，接受数组分别设定上右下左边距，同css
                    padding: props.sets.tooltipPadding || [15, 15, 15, 15],
                    // 文本样式，默认为白色字体
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
                    // 回调函数
                    formatter: (res: { data: { data: TsGen.Object }; name: string }) => {
                        const value = res.data.data;
                        let texts = "<span class='tooltip-name'>" + `${res.name}` + "</span>";
                        if (!value) return texts;
                        value.forEach((item:TsGen.LvItem) => {
                            texts += "<div class='tooltip-content'>";
                            texts += "<span class='tooltip-label'>" + item.label + "</span>";
                            texts += "<span class='tooltip-value'>" + item.value + "</span>";
                            texts += "</div>";
                        })
                        return texts;
                    },
                },
                // 值域选择，每个图表最多仅有一个值域控件
                dataRange: {
                    // 显示
                    show: props.sets.dataRange ?? true,
                    // 是否启用值域漫游，启用后无视splitNumber和splitList，值域显示为线性渐变
                    calculable: true,
                    // 指定的最小值，eg: 0，默认无，必须参数，唯有指定了splitList时可缺省min。
                    min: 0,
                    // 指定的最大值，eg: 100，默认无，必须参数，唯有指定了splitList时可缺省max
                    max: maxFn(),
                    // 	值域文字显示，splitNumber生效时默认以计算所得数值作为值域文字显示，可指定长度为2的文本数组显示简介的值域文本，如['高', '低']，'\n'指定换行
                    text: props.sets.dataRangeText || ["高", "低"],
                    // 默认只设定了值域控件文字颜色
                    textStyle: {
                        color: props.sets.dataRangeTextColor || "#303133",
                    },
                    // 值域控件宽度
                    itemWidth: props.sets.dataRangeWidth || 20,
                    // 值域控件高度
                    itemHeight: props.sets.dataRangeHeight || 60,
                    // 值域颜色标识，颜色数组长度必须>=2，颜色代表从数值高到低的变化，即颜色数组低位代表数值高的颜色标识 ，支持Alpha通道上的变化（rgba）
                    color: props.sets.dataRangeColor || ["#00a99a", "#a3ddd8"],
                },
                series: [
                    {
                        // 图表类型，必要参数！
                        type: "map",
                        // 要和echarts.registerMap()中第一个参数一致
                        map: mapName,
                        // 是否开启滚轮缩放和拖拽
                        roam: true,
                        // 缩放倍数范围
                        scaleLimit: {
                            min: props.sets.scaleLimitMin || 0.3,
                            max: props.sets.scaleLimitMax || 3,
                        },
                        // 地图显示文本
                        label: {
                            show: true,
                        },
                        select: {
                            disabled: props.sets.selectDisabled ?? true,
                        },
                        // 数据：
                        data: (() => {
                            let res = [];
                            for (let index = 0; index < mapData.mapOptions[adcode.value].regions.length; index++) {
                                const item = mapData.mapOptions[adcode.value].regions[index];
                                let obj = {
                                    name: mapData.mapOptions[item].name,
                                    adcode: mapData.mapOptions[item].adcode,
                                    value: props.data[item] && props.data[item][0].value != undefined ? props.data[item][0].value : 0,
                                    data: props.data[item],
                                    itemStyle: {
                                        color: props.sets.singleColor ? mapData.mapOptions[item].regionColor : undefined,
                                    },
                                };
                                res.push(obj);
                            }
                            return res;
                        })(),
                    },
                ],
            },
            true
        );
        resize();
    });
};
defineExpose({
    clear,
    resize,
    setOption,
});
</script>
<template>
    <div class="base-map" ref="box"></div>
</template>
<style scoped>
.base-map {
    width: 100%;
    height: 100%;
}

.base-map :deep(.tooltip-name) {
    font: bold 14px Microsoft Yahei;
    color: #0b3a58;
}

.base-map :deep(.tooltip-content) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.base-map :deep(.tooltip-label) {
    color: #606266;
}

.base-map :deep(.tooltip-value) {
    color: #303133;
    margin-left: 16px;
}
</style>
