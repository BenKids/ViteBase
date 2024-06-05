<script setup lang="ts">
onActivated(() => {
    resize();
})
onUnmounted(()=>{
    if(line) line.getZr().off("click");
    line = null;
	window.removeEventListener("resize", resizeEv);
})
const props = withDefaults(defineProps<{
    modelValue: TsEchartsLine.Model,
    options: TsEchartsLine.Options,
    sets?: TsEchartsLine.Sets,
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
const emits = defineEmits(["click"]);
const color = {
    shaft: "#6e707a",
    item: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
}
const lineRef = ref();
let line: TsEcharts.ECharts | null;
const processLegend = function () {
    let res: string[] = [];
    for (const key in props.options) {
        res.push(props.options[key].label)
    }
    return {
        show: props.sets.legend ?? true,
		left: props.sets.legendLeft ?? "center",
		right: props.sets.legendRight ?? "auto",
		top: props.sets.legendTop ?? "auto",
		bottom: props.sets.legendBottom ?? "auto",
        textStyle: {
            color: props.sets.legendTextColor || color.shaft
        },
        data: res,
    };
}
const processValue = function () {
    return {
        type: 'value',
        axisLabel: {
            show: props.sets.valueLabel ?? true,
            color: props.sets.valueLabelColor || props.sets.valueColor || color.shaft,
            rotate: props.sets.valueRotate,
        },
        axisLine: {
            show: props.sets.valueLine ?? true,
            lineStyle: {
                color: props.sets.valueLineColor || props.sets.valueColor || color.shaft,
            }
        },
        axisTick: {
            show: props.sets.valueTick ?? true,
            lineStyle: {
                color: props.sets.valueTickColor || props.sets.valueColor || color.shaft,
            }
        },
        // interval: 1, // 强制显示所有y轴刻度文本
    }
}
const processAxis = function () {
    return {
        type: 'category',
        boundaryGap: props.sets.axisBoundaryGap ?? false,
        axisLabel: {
            show: props.sets.axisLabel ?? true,
            color: props.sets.axisLabelColor || props.sets.axisColor || color.shaft,
            rotate: props.sets.axisRotate,
        },
        axisLine: {
            show: props.sets.axisLine ?? true,
            lineStyle: {
                color: props.sets.axisLineColor || props.sets.axisColor || color.shaft,
            }
        },
        axisTick: {
            show: props.sets.axisTick ?? true,
            lineStyle: {
                color: props.sets.axisTickColor || props.sets.axisColor || color.shaft,
            }
        },
        data: props.modelValue.axis,
    }
}
const processMarkLine = function (index: number, markLine?: TsEchartsLine.MarkLine) {
    if (props.sets.markLine === undefined) {
        let res = {};
        switch (evTypeOf(markLine)) {
            case "string":
                res = { data: [{ type: markLine }] }
                break;
            case "number":
                res = { data: [{ [props.sets.vertical ? 'xAxis' : 'yAxis']: markLine }] }
                break;
            default:
                break;
        }
        return res;
    } else if (index === 0) {
        return {
            data: [{ [props.sets.vertical ? 'xAxis' : 'yAxis']: props.sets.markLine }],
            lineStyle: {
                color: props.sets.markLineColor,
            }
        }
    } else {
        return {}
    }
}
const processMarkPoint = function (param?: boolean) {
    let res = {
        data: [
            { type: 'max', name: 'Max' },
            { type: 'min', name: 'Min' }
        ]
    }
    if (props.sets.markPoint === false) {
        return {}
    } else if (props.sets.markPoint || param) {
        return res
    } else {
        return {}
    }
}
const processSearies = function () {
    if (!props.modelValue.data) return [];
    let res = [];
    let index = 0;
    for (const key in props.options) {
        const item = props.options[key];
        res.push({
            type: item.type ?? "line",
            name: item.label,
            data: props.modelValue.data[key],
            step: props.sets.step,
            stack: props.sets.stack ? "stack" : item.stack,
            smooth: props.sets.smooth ?? false,
            itemStyle: {
                color: item.color || undefined,
            },
            markLine: processMarkLine(index, item.markLine),
            markPoint: processMarkPoint(item.markPoint),
        });
        index++;
    }
    return res;
}
const init = function () {
    nextTick(() => {
        line = echarts.init(lineRef.value);
        window.addEventListener("resize", resizeEv)
        line.getZr().on("click", function (params) {
            let pointInPixel = [params.offsetX, params.offsetY];
            if (line!.containPixel('grid', pointInPixel)) {
                let pointInGrid = line!.convertFromPixel({
                    seriesIndex: 0
                }, pointInPixel);
                let xIndex = pointInGrid[0]; //索引
                let handleIndex = Number(xIndex);
                let seriesObj = line!.getOption() as any; //图表object对象
                let backObj: TsEchartsBar.ClickParams = {
                    axis: seriesObj.xAxis[0].data[handleIndex],
                    data: [],
                }
                let i = 0;
                for (const itemKey in props.options) {
                    backObj.data.push({
                        [itemKey]: {
                            label: props.options[itemKey].label,
                            value: seriesObj.series[i].data[handleIndex],
                        },
                    })
                    i++;
                }
                emits("click", handleIndex,backObj,params);
            }
        })
    })
}
init();
const setOption = function () {
    nextTick(()=>{
        if(!line) return;
        line.setOption({
            color: props.sets.color || color.item,
            title: {
                text: props.sets.title,
            },
            tooltip: {
                show: true,
                trigger: 'axis',
                axisPointer: {
                    type: "line"
                }
            },
            legend: processLegend(),
            grid: {
                left: props.sets.left ?? '3%',
                right: props.sets.right ?? '4%',
                top: props.sets.top ?? 60,
                bottom: props.sets.bottom ?? '3%',
                containLabel: true
            },
            xAxis: props.sets.vertical ? processValue() : processAxis(),
            yAxis: props.sets.vertical ? processAxis() : processValue(),
            series: processSearies(),
        })
    })
}
const clear = function () {
    nextTick(()=>{
        if(!line) return;
        line.clear();
    })
}
const resize = function () {
    nextTick(()=>{
        if(!line || !lineRef.value.offsetWidth) return;
        line.resize();
    })
}
const resizeEv = evDebounce({
    func: resize,
    wait: 300
})
defineExpose({
    clear,
    resize,
    setOption,
})
</script>
<template>
    <div class="base-echarts-line" ref="lineRef"></div>
</template>
<style scoped>
.base-echarts-line {
    width: 100%;
    height: 100%;
}
</style>