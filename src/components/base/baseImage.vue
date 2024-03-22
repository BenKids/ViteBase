<script setup lang="ts">
    withDefaults(defineProps<{
        modelValue: TsImage.Model,
        sets?: TsImage.Sets,
        options?: TsImage.Options,
    }>(),{
        sets: () => {
            return {}
        }
    })
</script>
<template>
    <el-image class="base-image" :src="modelValue" :fit="sets.fit" :lazy="sets.lazy ?? true" :preview-src-list="options" :initial-index="sets.initialIndex" :hide-on-click-modal="sets.hideOnClickModal">
        <template #placeholder>
            <div class="image-placeholder loading">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0.9 0.9 10.2 10.2">
                    <path
                        d="M 1 9 L 1 10 A 1 1 0 0 0 2 11 L 10 11 A 1 1 0 0 0 11 10 L 11 2 A 1 1 0 0 0 10 1 L 2 1 A 1 1 0 0 0 1 2 L 1 9 L 3 6 L 5 9 L 8 4 L 11 8"
                        stroke="#000000" stroke-width="0.1" fill="none" stroke-linecap="round"
                        stroke-dasharray="20, 40">
                        <animate attributeName="stroke-dashoffset" attributeType="stroke" from="0" to="-60" begin="0s"
                            dur="2s" repeatCount="indefinite"></animate>
                    </path>
                    <path d="M 3 4 A 1 1 0 0 0 5 4 A 1 1 0 0 0 3 4" stroke="#000000" stroke-width="0.1" fill="none"
                        stroke-linecap="round" stroke-dasharray="3, 5">
                        <animate attributeName="stroke-dashoffset" attributeType="stroke" from="0" to="-8" begin="0s"
                            dur="1s" repeatCount="indefinite"></animate>
                    </path>
                </svg>
            </div>
        </template>
        <template #error>
            <div class="image-placeholder error">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M320 896H242.166667l273.753333-273.746667a21.333333 21.333333 0 0 0 3.16-26.133333L429.653333 447.066667l165.426667-330.86A21.333333 21.333333 0 0 0 576 85.333333H96a53.393333 53.393333 0 0 0-53.333333 53.333334v746.666666a53.393333 53.393333 0 0 0 53.333333 53.333334h224a21.333333 21.333333 0 0 0 0-42.666667zM96 128h445.48L386.253333 438.46a21.333333 21.333333 0 0 0 0.786667 20.513333L474 603.86l-69.333333 69.333333-89.62-89.653333a53.333333 53.333333 0 0 0-75.426667 0L85.333333 737.826667V138.666667a10.666667 10.666667 0 0 1 10.666667-10.666667z m-10.666667 757.333333v-87.166666l184.46-184.453334a10.666667 10.666667 0 0 1 15.08 0L374.5 703.333333l-192.666667 192.666667H96a10.666667 10.666667 0 0 1-10.666667-10.666667z m192-458.666666c58.813333 0 106.666667-47.853333 106.666667-106.666667s-47.853333-106.666667-106.666667-106.666667-106.666667 47.853333-106.666666 106.666667 47.853333 106.666667 106.666666 106.666667z m0-170.666667a64 64 0 1 1-64 64 64.073333 64.073333 0 0 1 64-64z m650.666667-128H661.333333a21.333333 21.333333 0 0 0-19.08 11.793333l-0.046666 0.086667c-0.04 0.086667-0.086667 0.173333-0.126667 0.253333L535.586667 353.126667a21.333333 21.333333 0 1 0 38.16 19.08L674.52 170.666667H928a10.666667 10.666667 0 0 1 10.666667 10.666666v471.166667l-154.953334-154.96a53.333333 53.333333 0 0 0-75.426666 0L571.08 634.746667a21.333333 21.333333 0 0 0-3.153333 26.153333l24.666666 41.08-203.646666 244.36A21.333333 21.333333 0 0 0 405.333333 981.333333h522.666667a53.393333 53.393333 0 0 0 53.333333-53.333333V181.333333a53.393333 53.393333 0 0 0-53.333333-53.333333z m0 810.666667H450.88l184.173333-221.006667a21.333333 21.333333 0 0 0 1.906667-24.666667l-23.933333-39.886666 125.433333-125.426667a10.666667 10.666667 0 0 1 15.08 0L938.666667 712.833333V928a10.666667 10.666667 0 0 1-10.666667 10.666667z"
                        stroke="#000000"
                        stroke-width="0.1"
                        fill="var(--el-text-color-placeholder)"
                    ></path>
                </svg>
            </div>
        </template>
    </el-image>
</template>

<style scoped>
.base-image {
    border-radius: var(--el-border-radius-base);
}
.image-placeholder {
    color: var(--el-text-color-placeholder);
    background-color: var(--el-fill-color-light);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.base-image svg {
    width: var(--base-icon-size);
}
</style>