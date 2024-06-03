export const routesBase: TsRoutes.RoutesMenus = [
    {
        path: "/Base",
        name: "Base",
        redirect: "/Base/Alert",
        meta: {
            label: "组件手册",
            icon: IconSolarNotebookMinimalisticLinear,
        },
        children: [
            {
                path: "Alert",
                name: "Alert",
                component: () => import("@/views/base/alert.vue"),
                meta: {
                    label: "提示",
                    keepAlive: true,
                    icon: IconSolarNotificationRemoveLinear,
                },
            },
            {
                path: "Avatar",
                name: "Avatar",
                component: () => import("@/views/base/avatar.vue"),
                meta: {
                    label: "头像",
                    keepAlive: true,
                    icon: IconSolarAccessibilityLinear,
                },
            },
            {
                path: "Badge",
                name: "Badge",
                component: () => import("@/views/base/badge.vue"),
                meta: {
                    label: "徽章",
                    keepAlive: true,
                    icon: IconSolarNotificationUnreadLinear,
                },
            }, {
                path: "Breadcrumb",
                name: "Breadcrumb",
                component: () => import("@/views/base/breadcrumb.vue"),
                meta: {
                    label: "面包屑",
                    keepAlive: true,
                    icon: IconSolarAlignHorizontaSpacingLinear,
                },
            }, {
                path: "Button",
                name: "Button",
                component: () => import("@/views/base/button.vue"),
                meta: {
                    label: "按钮",
                    keepAlive: true,
                    icon: IconSolarPasswordMinimalisticLinear,
                },
            }, {
                path: "Carousel",
                name: "Carousel",
                component: () => import("@/views/base/carousel.vue"),
                meta: {
                    label: "走马灯",
                    keepAlive: true,
                    icon: IconSolarPostsCarouselHorizontalOutline,
                },
            }, {
                path: "Checkbox",
                name: "Checkbox",
                component: () => import("@/views/base/checkbox.vue"),
                meta: {
                    label: "多选框",
                    keepAlive: true,
                    icon: IconSolarCheckSquareLinear,
                },
            }, {
                path: "DatePicker",
                name: "DatePicker",
                component: () => import("@/views/base/datePicker.vue"),
                meta: {
                    label: "日期选择器",
                    keepAlive: true,
                    icon: IconSolarCalendarLinear,
                },
            }, {
                path: "Descriptions",
                name: "Descriptions",
                component: () => import("@/views/base/descriptions.vue"),
                meta: {
                    label: "描述列表",
                    keepAlive: true,
                    icon: IconSolarClapperboardTextLinear,
                },
            }, {
                path: "Dialog",
                name: "Dialog",
                component: () => import("@/views/base/dialog.vue"),
                meta: {
                    label: "对话框",
                    keepAlive: true,
                    icon: IconSolarNotificationLinesRemoveLinear,
                },
            }, {
                path: "Draggable",
                name: "Draggable",
                component: () => import("@/views/base/draggable.vue"),
                meta: {
                    label: "自由拖拽",
                    keepAlive: true,
                    icon: IconSolarHandShakeLinear,
                },
            }, {
                path: "EchartsBar",
                name: "EchartsBar",
                component: () => import("@/views/base/echartsBar.vue"),
                meta: {
                    label: "柱状图",
                    keepAlive: true,
                    icon: IconSolarChartLinear,
                },
            }, {
                path: "EchartsLine",
                name: "EchartsLine",
                component: () => import("@/views/base/echartsLine.vue"),
                meta: {
                    label: "折线图",
                    keepAlive: true,
                    icon: IconSolarDiagramUpBold,
                },
            }, {
                path: "EchartsPie",
                name: "EchartsPie",
                component: () => import("@/views/base/echartsPie.vue"),
                meta: {
                    label: "饼图",
                    keepAlive: true,
                    icon: IconSolarPieChart2Linear,
                },
            }, {
                path: "EchartsMap",
                name: "EchartsMap",
                component: () => import("@/views/base/echartsMap.vue"),
                meta: {
                    label: "地图",
                    keepAlive: true,
                    icon: IconSolarMapLinear,
                },
            }, {
                path: "EchartsMap3d",
                name: "EchartsMap3d",
                component: () => import("@/views/base/echartsMap3d.vue"),
                meta: {
                    label: "3d地图",
                    keepAlive: true,
                    icon: IconSolarMapPointRotateLinear,
                },
            }, {
                path: "EchartsGetJson",
                name: "EchartsGetJson",
                component: () => import("@/views/base/echartsMapGetJson.vue"),
                meta: {
                    label: "地图数据生成",
                    keepAlive: true,
                    icon: IconSolarStreetsMapPointLinear,
                },
            }, {
                path: "Edit",
                name: "Edit",
                component: () => import("@/views/base/edit.vue"),
                meta: {
                    label: "富文本编辑器",
                    keepAlive: true,
                    icon: IconSolarClapperboardEditBroken,
                },
            }, {
                path: "Empty",
                name: "Empty",
                component: () => import("@/views/base/empty.vue"),
                meta: {
                    label: "空状态",
                    keepAlive: true,
                    icon: IconSolarAirbudsCaseMinimalisticLinear,
                },
            }, {
                path: "Form",
                name: "Form",
                component: () => import("@/views/base/form.vue"),
                meta: {
                    label: "表单",
                    keepAlive: true,
                    icon: IconSolarAlignLeftLinear,
                },
            }, {
                path: "Icon",
                name: "Icon",
                component: () => import("@/views/base/icon.vue"),
                meta: {
                    label: "图标",
                    keepAlive: true,
                    icon: IconSolarFullScreenSquareLinear,
                },
            }, {
                path: "Image",
                name: "Image",
                component: () => import("@/views/base/image.vue"),
                meta: {
                    label: "图片",
                    keepAlive: true,
                    icon: IconSolarGalleryLinear,
                },
            }, {
                path: "ImageViewer",
                name: "ImageViewer",
                component: () => import("@/views/base/imageViewer.vue"),
                meta: {
                    label: "图片预览",
                    keepAlive: true,
                    icon: IconSolarAlbumLinear,
                },
            }, {
                path: "infiniteScroll",
                name: "infiniteScroll",
                component: () => import("@/views/base/infiniteScroll.vue"),
                meta: {
                    label: "无限滚动",
                    keepAlive: true,
                    icon: IconSolarBillListLinear,
                },
            }, {
                path: "Input",
                name: "Input",
                component: () => import("@/views/base/input.vue"),
                meta: {
                    label: "输入框",
                    keepAlive: true,
                    icon: IconSolarPasswordMinimalisticInputLinear,
                },
            }, {
                path: "Layout",
                name: "Layout",
                component: () => import("@/views/base/layout.vue"),
                meta: {
                    label: "布局",
                    keepAlive: true,
                    icon: IconSolarWidget4Linear,
                },
            }, {
                path: "Lock",
                name: "Lock",
                component: () => import("@/views/base/lock.vue"),
                meta: {
                    label: "锁屏",
                    keepAlive: true,
                    icon: IconSolarLockKeyholeLinear,
                },
            }, {
                path: "Menu",
                name: "Menu",
                component: () => import("@/views/base/menu.vue"),
                meta: {
                    label: "菜单导航",
                    keepAlive: true,
                    icon: IconSolarWidget5Linear,
                },
            }, {
                path: "Notification",
                name: "Notification",
                component: () => import("@/views/base/notification.vue"),
                meta: {
                    label: "桌面消息通知",
                    keepAlive: true,
                    icon: IconSolarNotificationUnreadLinesLinear,
                },
            }, {
                path: "Pagination",
                name: "Pagination",
                component: () => import("@/views/base/pagination.vue"),
                meta: {
                    label: "分页",
                    keepAlive: true,
                    icon: IconSolarRewind10SecondsForwardBold,
                },
            }, {
                path: "Popover",
                name: "Popover",
                component: () => import("@/views/base/popover.vue"),
                meta: {
                    label: "气泡弹出框",
                    keepAlive: true,
                    icon: IconSolarChatDotsLinear,
                },
            }, {
                path: "Print",
                name: "Print",
                component: () => import("@/views/base/print.vue"),
                meta: {
                    label: "打印",
                    keepAlive: true,
                    icon: IconSolarPrinterMinimalisticLinear,
                },
            }, {
                path: "Progress",
                name: "Progress",
                component: () => import("@/views/base/progress.vue"),
                meta: {
                    label: "进度条",
                    keepAlive: true,
                    icon: IconSolarSlashSquareLinear,
                },
            }, {
                path: "Radio",
                name: "Radio",
                component: () => import("@/views/base/radio.vue"),
                meta: {
                    label: "单选",
                    keepAlive: true,
                    icon: IconSolarCheckCircleLinear,
                },
            }, {
                path: "Select",
                name: "Select",
                component: () => import("@/views/base/select.vue"),
                meta: {
                    label: "下拉框",
                    keepAlive: true,
                    icon: IconSolarArchiveDownMinimlisticLinear,
                },
            }, {
                path: "Steps",
                name: "Steps",
                component: () => import("@/views/base/steps.vue"),
                meta: {
                    label: "步骤条",
                    keepAlive: true,
                    icon: IconSolarAlignLeftLinear,
                },
            }, {
                path: "Switch",
                name: "Switch",
                component: () => import("@/views/base/switch.vue"),
                meta: {
                    label: "开关",
                    keepAlive: true,
                    icon: IconSolarRefreshSquareLinear,
                },
            }, {
                path: "Table",
                name: "Table",
                component: () => import("@/views/base/table.vue"),
                meta: {
                    label: "表格",
                    keepAlive: true,
                    icon: IconSolarClapperboardLinear,
                },
            }, {
                path: "Tabs",
                name: "Tabs",
                component: () => import("@/views/base/tabs.vue"),
                meta: {
                    label: "标签页",
                    keepAlive: true,
                    icon: IconSolarAlignVerticalSpacingBold,
                },
            }, {
                path: "Tag",
                name: "Tag",
                component: () => import("@/views/base/tag.vue"),
                meta: {
                    label: "标签",
                    keepAlive: true,
                    icon: IconSolarBookmarkOpenedLinear,
                },
            }, {
                path: "Tour",
                name: "Tour",
                component: () => import("@/views/base/tour.vue"),
                meta: {
                    label: "漫游式引导",
                    keepAlive: true,
                    icon: IconSolarSignpost2Linear,
                },
            }, {
                path: "Tree",
                name: "Tree",
                component: () => import("@/views/base/tree.vue"),
                meta: {
                    label: "树",
                    keepAlive: true,
                    icon: IconSolarSuspensionLinear,
                },
            }, {
                path: "TreeSelect",
                name: "TreeSelect",
                component: () => import("@/views/base/treeSelect.vue"),
                meta: {
                    label: "下拉树",
                    keepAlive: true,
                    icon: IconSolarSuspensionCrossLinear,
                },
            }, {
                path: "Upload",
                name: "Upload",
                component: () => import("@/views/base/upload.vue"),
                meta: {
                    label: "上传图片",
                    keepAlive: true,
                    icon: IconSolarCloudUploadLinear,
                },
            }, {
                path: "Video",
                name: "Video",
                component: () => import("@/views/base/video.vue"),
                meta: {
                    label: "视频播放器",
                    keepAlive: true,
                    icon: IconSolarVideoFramePlayVerticalLinear,
                },
            }
        ],
    },
];
