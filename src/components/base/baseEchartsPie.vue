<script setup lang="ts">
onActivated(() => {
    resize();
})
onUnmounted(()=>{
    if(pie) pie.off("click");
    pie = null;
    window.removeEventListener("resize", resizeEv)
})
const props = withDefaults(defineProps<{
    modelValue: TsEchartsPie.Model,
    name?: TsEchartsPie.Name,
    sets?: TsEchartsPie.Sets,
}>(), {
    sets: () => {
        return {}
    }
})
watch(
	() => props.modelValue,
	() => setOption(),
	{
		deep: true,
	}
);
const pieRef = ref();
const emits = defineEmits(["click"]);
let pie: TsEcharts.ECharts | null;
const init = function () {
    nextTick(() => {
        pie = echarts.init(pieRef.value);
        window.addEventListener("resize", resizeEv)
        pie.on("click", function ({dataIndex}) {
            emits("click", props.modelValue[dataIndex]);
        })
    })
}
init();
const clear = function () {
    nextTick(()=>{
        if(!pie) return;
        pie.clear();
    })
}
const setOption = function() {
    nextTick(()=>{
        if(!pie) return;
        pie.setOption({
            title: {
                show: !!props.sets.title || !!props.sets.subTitle,
                text: props.sets.title,
                textStyle: {
                    color: props.sets.titleColor ?? "#303133",
                    fontStyle: props.sets.titleFontStyle,
                    fontWeight: props.sets.titleFontWeight ?? "bolder",
                    fontFamily: props.sets.titleFontFamily,
                    fontSize: props.sets.titleFontSize ?? 18,
                    lineHeight: props.sets.titleLineHeight,
                },
                textAlign: props.sets.titleAlign,
                subtext: props.sets.subTitle,
                subtextStyle: {
                    color: props.sets.subTitleColor ?? "#606266",
                    fontStyle: props.sets.subTitleFontStyle,
                    fontWeight: props.sets.subTitleFontWeight ?? "normal",
                    fontFamily: props.sets.subTitleFontFamily,
                    fontSize: props.sets.subTitleFontSize ?? 12,
                    align: props.sets.subTitleAlign ?? props.sets.titleAlign,
                    lineHeight: props.sets.subTitleLineHeight,
                },
                left: props.sets.titleLeft ?? "center",
                right: props.sets.titleRight,
                top: props.sets.titleTop,
                bottom: props.sets.titleBottom,
            },
            tooltip: {
                trigger: 'item'
            },
            legend: (() => {
                let res: TsGen.Object = {
                    show: props.sets.legend ?? true,
                    itemWidth: props.sets.legendWidth || 25,
                    itemHeight: props.sets.legendHeight || 14,
                    textStyle: {
                        color: props.sets.legendColor || "#303133",
                        fontSize: props.sets.legendSize || 12,
                    }
                }
                switch (props.sets.legendPosition) {
                    case "left":
                        res.left = "2%";
                        res.top = "center";
                        res.orient = "vertical";
                        break;
                    case "top":
                        res.left = "center";
                        res.top = "5%";
                        res.orient = "horizontal";
                        break;
                    case "right":
                        res.right = "2%";
                        res.top = "center";
                        res.orient = "vertical";
                        break;
                    case "bottom":
                        res.left = "center";
                        res.bottom = "5%";
                        res.orient = "horizontal";
                        break;
                    default:
                        res.left = "center";
                        res.top = "5%";
                        res.orient = "horizontal";
                        break;
                }
                return res;
            })(),
            series: [
                {
                    name: props.name,
                    type: 'pie',
                    radius: props.sets.radius || ['35%', '70%'],
                    color: props.sets.color,
                    avoidLabelOverlap: false,
                    roseType: props.sets.roseType ?? false,
                    left: props.sets.left ?? undefined,
                    right: props.sets.right ?? undefined,
                    top: props.sets.top ?? undefined,
                    bottom: props.sets.bottom ?? undefined,
                    center: props.sets.center ?? ["50%","50%"],
                    itemStyle: {
                        borderRadius: props.sets.borderRadius || 10,
                        borderColor: props.sets.borderColor || '#fff',
                        borderWidth: props.sets.borderWidth || 2,
                    },
                    label: {
                        show: props.sets.label ?? true,
                        position: props.sets.labelPosition || "outside",
                        color: props.sets.labelColor || "#303133",
                        fontStyle: props.sets.labelStyle || "normal",
                        fontWeight: props.sets.labelWeight || "bolder",
                        fontSize: props.sets.labelSize || 12,
                        formatter: props.sets.labelFormatter,
                    },
                    data: (() => {
                        return evRename({
                            data: props.modelValue,
                            keys: {
                                name: "label",
                                value: "value"
                            }
                        })
                    })()
                }
            ]
        })
    })
}
const resize = function () {
    if (!pie || !pieRef.value.offsetWidth) return;
    pie.resize();
}
const resizeEv = evDebounce({
    func: resize,
    wait: 300,
})
defineExpose({
    clear,
    resize,
    setOption,
})
</script>
<template>
    <div class="base-echarts-pie" ref="pieRef"></div>
</template>
<style scoped>
.base-echarts-pie {
    width: 100%;
    height: 100%;
}
</style>