<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue: TsPrint.Model,
    sets?: TsPrint.Sets,
}>(),{
    sets: () => {
        return {}
    }
})
const preRef = ref();
const empty = computed(() => {
    return props.sets.empty ?? "    "
});
const onInput = (ev:TsGen.Object) => {
    const edit = ev.dataset.edit;
    if (String(ev.innerHTML).length == 0) {
        ev.innerHTML = empty.value;
    }
    if (edit == "true") {
        return;
    }
    props.modelValue[edit] = ev.innerText;
}
const print = () => {
    const body = document.getElementsByTagName("body")[0];
    const demo = preRef.value.cloneNode(true);
    body.classList.add("print")
    body.appendChild(demo);
    window.print();
    body.removeChild(demo);
    body.classList.remove("print");
}
defineExpose({
    print
})
onMounted(() => {
    const els = preRef.value.getElementsByTagName("*");
    for (let index = 0; index < els.length; index++) {
        const el = els[index];
        if (el.dataset.edit) {
            el.contentEditable = true;
            el.oninput = evDebounce({
                func: () => {
                    onInput(el)
                },
                wait: 1000,
                immediate: false
            });
            el.classList.add("edit");
        }
    }
})
</script>

<template>
    <div ref="preRef" :class="{
        'base-print': true,
        'mark': sets.mark ?? true,
        [sets.type || 'A4']: true,
        [sets.direction || 'portrait']: true,
    }">
        <pre>
        <slot></slot>
        </pre>
    </div>
</template>

<style>
.base-print {
    line-height: 2em;
}
.base-print *[data-edit] {
    border-bottom: 1px solid var(--base-text-color-secondary);
}
.base-print.mark *[data-edit]::before {
    content: "";
    display: inline-block;
    border: 3px solid var(--base-color-primary);
    border-right-color: transparent;
    border-top-color: transparent;
}
.base-print {
    white-space: break-spaces;
    word-break: break-word;
    box-sizing: border-box;
}
.base-print pre {
    white-space: initial;
}

.base-print.A4.portrait {
    width: calc(210mm - 20mm);
    min-height: calc(297mm - 20mm);
}

.base-print.A4.landscape {
    width: calc(297mm - 20mm);
    min-height: calc(210mm - 20mm);
}

.base-print.A5.portrait {
    width: calc(148mm - 20mm);
    min-height: calc(210mm - 20mm);
}

.base-print.A5.landscape {
    width: calc(210mm - 20mm);
    min-height: calc(148mm - 20mm);
}

.base-print :deep(.edit) {
    border-bottom: 1px solid #000;
}
@page {
    margin: 10mm;
}
@media print {
    body.print>*:not(.base-print) {
        display: none;
    }
    .base-print.mark *[data-edit]::before {
        display: none;
    }
}
</style>