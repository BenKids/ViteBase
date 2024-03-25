namespace TsAlert {
    type Title = string;

    interface Sets {
        type?: "success" | "warning" | "error" | "info";
        closable?: boolean;
        align?: TsGen.Align;
        closeText?: string;
        showIcon?: boolean;
        effect?: "light" | "dark";
        noBackground?: boolean;
    }
}
namespace TsAvatar {
    type Model = string;
    type Label = string | number;

    interface Sets {
        icon?: TsGen.Icon;
        size?: TsGen.Size;
        fit?: TsGen.Fit;
        shape?: "circle" | "square";
        type?: "black" | TsGen.Types;
    }
}
namespace TsBadge {
    type Model = string | number;

    interface Sets {
        max?: number;
        isDot?: boolean;
        hidden?: () => boolean;
        type?: TsGen.Types;
    }
}
namespace TsBreadcrumb {
    interface Option {
        toName: string;
        label: string;
    }

    type Options = Option[];

    interface Sets {
        separator?: string;
        separatorIcon?: string;
    }
}
namespace TsButton {
    type Label = string;

    interface Sets {
        icon?: TsGen.Icon;
        type?: "primary" | TsGen.Types;
        plain?: boolean;
        text?: boolean;
        loading?: boolean;
        block?: boolean;
        link?: boolean;
        circle?: boolean;
        round?: boolean;
        disabled?: boolean;
        size?: TsGen.Size;
        color?: string;
    }
}
namespace TsCarousel {
    type Model = TsGen.Object[];

    interface Sets {
        initialIndex?: number;
        height?: number;
        trigger?: "hover" | "click";
        autoplay?: boolean;
        interval?: string;
        indicatorPosition?: "outside" | "none";
        arrow?: "always" | "hover" | "never";
        type?: "card";
        loop?: boolean;
        direction?: "horizontal" | "vertical";
        pauseOnHover?: boolean;
    }
}
namespace TsCheckbox {
    type Model = string[] | number[];

    interface Option {
        label: string;
        value: string | number;
        disabled?: boolean;
        border?: boolean;
    }

    type Options = Option[];

    interface Sets {
        size?: TsGen.Size;
        disabled?: boolean;
        textColor?: string;
        type?: "button";
    }
}
namespace TsDatePicker {
    type Model = string | string[];
    type Type = "year" | "month" | "monthrange" | "datetime" | "datetimerange" | "date" | "dates" | "daterange";

    interface Sets {
        type?: Type;
        format?: TsGen.Fmt;
        readonly?: boolean;
        disabled?: boolean;
        size?: TsGen.Size;
        editable?: boolean;
        clearable?: boolean;
        placeholder?: string;
        startPlaceholder?: string;
        endPlaceholder?: string;
        prefixIcon?: string;
    }
}
namespace TsDescriptions {
    type Title = string;
    type Model = TsGen.Object;

    interface Option {
        prop: string;
        label?: string | number;
        align?: TsGen.Align;
        labelAlign?: TsGen.Align;
        span?: number;
        labelWidth?: string | number;
        minWidth?: string | number;
        icon?: TsGen.Icon;
    }

    type Options = Option[];

    interface Sets {
        column?: number;
        direction?: "vertical" | "horizontal";
        size?: TsGen.Size;
        border?: boolean;
        align?: TsGen.Align;
        labelAlign?: TsGen.Align;
    }
}
namespace TsDialog {
    type Model = boolean;
    type Title = string;

    interface Sets {
        width?: string | number;
        fullscreen?: boolean;
        top?: string;
        modal?: boolean;
        closeOnClickModal?: boolean;
        closeOnPressEscape?: boolean;
        showClose?: boolean;
        beforeClose?: (done) => void;
        draggable?: boolean;
        center?: boolean;
        alignCenter?: boolean;
    }

    type Done = () => void;
}
namespace TsEchartsBar {
    interface Model {
        data: Data;
        axis: Axis;
    }

    type Click = WithThisType<(index: number, params: ClickParams) => boolean | void, TsEcharts.EChartsType>;

    interface ClickParams {
        axis: number;
        data: {
            [p: string]: {
                label: string;
                value: number;
            }
        }[]
    }

    type MarkLine = "min" | "max" | "average" | "median" | number;
    type Axis = string[];

    interface Data {
        [propName: string]: number[];
    }

    interface Options {
        [propName: string]: {
            label: string;
            stack?: string;
            color?: string;
            markLine?: MarkLine;
            markPoint?: boolean;
        };
    }

    interface Sets {
        title?: string;
        vertical?: boolean;
        color?: string[];
        axisColor?: string;
        axisRotate?: number;
        axisLabel?: boolean;
        axisLabelColor?: string;
        axisLine?: boolean;
        axisLineColor?: string;
        axisTick?: boolean;
        axisTickColor?: string;
        valueColor?: string;
        valueRotate?: number;
        valueLabel?: boolean;
        valueLabelColor?: string;
        valueLine?: boolean;
        valueLineColor?: string;
        valueTick?: boolean;
        valueTickColor?: string;
        legend?: boolean;
        legendTextColor?: string;
        legendLeft?: "auto" | "left" | "center" | "right" | string | number;
        legendRight?: "auto" | string | number;
        legendTop?: "auto" | "top" | "middle" | "bottom" | string | number;
        legendBottom?: "auto" | string | number;
        stack?: boolean;
        markPoint?: boolean;
        markLine?: MarkLine;
        markLineColor?: string;
        left?: string | number;
        right?: string | number;
        top?: string | number;
        bottom?: string | number;
    }
}
namespace TsEchartsLine {
    interface Model {
        data: Data;
        axis: Axis;
    }

    type Click = WithThisType<(params: ClickParams) => boolean | void, TsEcharts.EChartsType>;

    interface ClickParams {
        axis: number;
        data: {
            [p: string]: {
                label: string;
                value: number;
            }
        }[]
    }

    type MarkLine = "min" | "max" | "average" | "median" | number;
    type Axis = string[];

    interface Data {
        [propName: string]: number[];
    }

    interface Options {
        [propName: string]: {
            label: string;
            stack?: string;
            color?: string;
            markLine?: MarkLine;
            markPoint?: boolean;
        };
    }

    interface Sets {
        title?: string;
        vertical?: boolean;
        color?: string[];
        axisColor?: string;
        axisRotate?: number;
        axisLabel?: boolean;
        axisLabelColor?: string;
        axisLine?: boolean;
        axisLineColor?: string;
        axisTick?: boolean;
        axisTickColor?: string;
        valueColor?: string;
        valueRotate?: number;
        valueLabel?: boolean;
        valueLabelColor?: string;
        valueLine?: boolean;
        valueLineColor?: string;
        valueTick?: boolean;
        valueTickColor?: string;
        legend?: boolean;
        legendTextColor?: string;
        legendLeft?: string | number;
        legendRight?: string | number;
        legendTop?: string | number;
        legendBottom?: string | number;
        stack?: boolean;
        markPoint?: boolean;
        markLine?: MarkLine;
        markLineColor?: string;
        step?: "start" | "middel" | "end";
        smooth?: boolean;
        left?: string | number;
        right?: string | number;
        top?: string | number;
        bottom?: string | number;
    }
}
namespace TsEchartsMap {
    type Model = number;

    interface Data {
        [propName: number]: TsGen.Object;
    }

    interface Options {
        [propName: string]: string;
    }

    type Done = () => void;

    interface ClickParams {
        adcode: number;
        name: string;
        value?: TsGen.Object;
    }

    interface Sets {
        tooltip?: boolean;
        tooltipBgColor?: string;
        tooltipBorColor?: string;
        tooltipRadius?: number;
        tooltipBorWidth?: number;
        tooltipPadding?: number[];
        tooltipTextColor?: string;
        tooltipTextAlign?: TsGen.Align;
        tooltipTextBaseline?: "top" | "bottom" | "middle";
        tooltipTextFontFamily?: string;
        tooltipTextFontSize?: number;
        tooltipTextFontStype?: "normal" | "italic" | "oblique";
        tooltipTextFontWeight?: "normal" | "bold" | "bolder" | "lighter" | number;
        dataRange?: boolean;
        dataRangeText?: [string, string];
        dataRangeTextColor?: string;
        dataRangeWidth?: number;
        dataRangeHeight?: number;
        dataRangeColor?: string[];
        scaleLimitMin?: number;
        scaleLimitMax?: number;
        singleColor?: boolean;
        selectDisabled?: boolean;
    }
}
namespace TsEchartsMap3d {
    type Model = number;
    type Data = TsGen.Object;
    type Active = string;
    type Done = () => void;

    interface Sets {
        alpha?: number;
        beta?: number;
        center?: [number, number, number];
        distance?: number;
        autoRotate?: boolean;
        autoRotateDirection?: "ccw" | "cw";
        loop?: boolean;
        minBeta?: number;
        maxBeta?: number;
        tooltipBgColor?: string;
        tooltipBorColor?: string;
        tooltipRadius?: number;
        tooltipBorWidth?: number;
        tooltipPadding?: number | [number, number] | [number, number, number] | [number, number, number, number];
        tooltipTextColor?: string;
        tooltipTextAlign?: TsGen.Align;
        tooltipTextBaseline?: "top" | "bottom" | "middle";
        tooltipTextFontFamily?: string;
        tooltipTextFontSize?: number;
        tooltipTextFontStype?: "normal" | "italic" | "oblique";
        tooltipTextFontWeight?: "normal" | "bold" | "bolder" | "lighter" | number;
    }

    interface Options {
        [propName: string]: {
            name: string;
            map: boolean;
            tooltip: boolean;
        };
    }

    interface ClickParams {
        adcode: number;
        name: string;
        value?: TsGen.Object;
    }

    interface MapOptions {
        [propsName: number]: {
            adcode: number;
            name: string;
            level: "province" | "city" | "district";
            parent: {
                adcode: number;
            };
            centroid: [number, number];
            center: [number, number];
            acroutes: number[];
            distance: number;
            beta: number;
            alpha: number;
            offset: [number, number, number];
            regionColor: string;
            linesColor: string;
            symbol: [number, number];
            label: [number, number];
            regions: number[];
        };
    }

    interface MapJson {
        [propsName: number]: any;
    }
}
namespace TsEchartsPie {
    interface ModelItem extends TsGen.Object {
        label: string;
        value: number;
    }

    type Model = ModelItem[];
    type Name = string;
    type Click = WithThisType<(params: ClickParams) => boolean | void, TsEcharts.EChartsType>;
    type ClickParams = ModelItem;

    interface Sets {
        roseType?: false | "radius" | "area";
        radius?: [number, number] | [string, string];
        borderRadius?: number;
        borderColor?: string;
        borderWidth?: number;
        label?: boolean;
        labelPosition?: "outside" | "inside" | "inner" | "center";
        labelColor?: string;
        labelStyle?: "normal" | "italic" | "oblique";
        labelWeight?: "normal" | "bold" | "bolder" | "lighter";
        labelSize?: number;
        legend?: boolean;
        legendColor?: string;
        legendSize?: number;
        legendWidth?: number;
        legendHeight?: number;
        legendPosition?: "left" | "top" | "right" | "bottom";
        left?: string | number;
        right?: string | number;
        top?: string | number;
        bottom?: string | number;
        center?: [(string | number), (string | number)];
    }
}
namespace TsEmpty {
    type Label = string;

    interface Sets {
        image?: string;
        imageSize?: number;
    }
}
namespace TsEdit {
    type Model = string;
    interface Sets {
        placeholder?: string;
        mode?: "default" | "simple";
        readOnly?: boolean;
    }
}
namespace TsForm {
    type Model = TsGen.Object;
    type Ref = TsElement.FormInstance;
    type Rules = TsElement.FormRules;

    interface Err {
        [x: string]: {
            field: string;
            fieldValue: string;
            message: string;
        }[];
    }

    type ErrField = {
        message: string;
    }[];

    interface Sets {
        inline?: boolean;
        labelWidth?: string | number;
        labelPosition?: "left" | "right" | "top";
        size?: TsGen.Size;
        disabled?: boolean;
        errorAlert?: boolean;
    }
}
namespace TsFormItem {
    type Label = string;
    type Prop = string;

    interface Sets {
        disabled?: boolean;
        hidden?: boolean;
        required?: TsElement.FormItemRule[] | TsElement.FormItemRule['validator'] | boolean;
    }
}
namespace TsFormInput {
    type Label = TsFormItem.Label;
    type Prop = TsFormItem.Prop;

    interface Sets extends TsFormItem.Sets, TsInput.Sets {
        required?: TsFormItem.Sets['required'] | 'phone' | 'email';
    }
}
namespace TsFormNumber {
    type Label = TsFormItem.Label;
    type Prop = TsFormItem.Prop;

    interface Sets extends TsFormItem.Sets, TsNumber.Sets {
    }
}
namespace TsFormDatePicker {
    type Label = TsFormItem.Label;
    type Prop = TsFormItem.Prop;

    interface Sets extends TsFormItem.Sets, TsDatePicker.Sets {
    }
}
namespace TsFormRadio {
    type Label = TsFormItem.Label;
    type Prop = TsFormItem.Prop;

    interface Options extends TsRadio.Options {
    }

    interface Sets extends TsFormItem.Sets, TsRadio.Sets {
    }
}
namespace TsFormSelect {
    type Label = TsFormItem.Label;
    type Prop = TsFormItem.Prop;

    interface Options extends TsSelect.Options {
    }

    interface Sets extends TsFormItem.Sets, TsSelect.Sets {
    }
}
namespace TsFormTreeSelect {
    type Label = TsFormItem.Label;
    type Prop = TsFormItem.Prop;

    interface Options extends TsTreeSelect.Options {
    }

    interface Sets extends TsFormItem.Sets, TsTreeSelect.Sets {
    }
}
namespace TsFormUpload {
    type Label = TsFormItem.Label;
    type Prop = TsFormItem.Prop;

    interface Sets extends TsFormItem.Sets, TsUpload.Sets {
    }
}
namespace TsIcons {
    type Icon = string;
    interface Sets {
        color?: string;
        size?: number;
    }
}
namespace TsImage {
    type Model = string | null;

    interface Sets {
        fit?: TsGen.Fit;
        lazy?: boolean;
        initialIndex?: number;
        hideOnClickModal?: boolean;
    }

    type Options = string[];
}
namespace TsImageViewer {
    type Model = boolean;
    type Options = string[];

    interface Sets {
        initialIndex?: number;
        infinite?: boolean;
        hideOnClickModal?: boolean;
        zoomRate?: number;
    }
}
namespace TsInfiniteScroll {
    type Model = TsGen.Object[];

    interface Sets {
        disabled?: boolean;
        height?: string;
        delay?: number;
        distance?: number;
        immediate?: boolean;
        loadingText?: string;
        finishText?: string;
    }

    type Stop = () => void;
    type Finish = () => void;
}
namespace TsInput {
    type Model = string | number;
    type Edit = boolean;
    type Type = "text" | "textarea" | "search" | "number" | "password";

    interface Sets {
        type?: Type;
        maxlength?: number;
        minlength?: number;
        showWordLimit?: boolean;
        placeholder?: string;
        showPassword?: boolean;
        clearable?: boolean;
        disabled?: boolean;
        prefixIcon?: string;
        suffixIcon?: string;
        rows?: number;
        autosize?: boolean | {
            minRows?: number;
            maxRows?: number;
        };
        readonly?: boolean;
        readonlyPlaceholder?: string;
        resize?: "none" | "both" | "horizontal" | "vertical";
        autofocus?: boolean;
        min?: number;
        max?: number;
        size?: TsGen.Size;
        showTooltip?: boolean;
    }
}
namespace TsNumber {
    type Model = number;

    interface Sets {
        readonly?: boolean;
        min?: number;
        max?: number;
        placeholder?: string;
        size?: TsGen.Size;
        controlsPosition?: "" | "right";
        precision?: number;
        step?: number;
        stepStrictly?: boolean;
    }
}
namespace TsLink {
    type Href = string;

    interface Sets {
        type?: TsGen.Types;
        underline?: boolean;
        disabled?: boolean;
        icon?: TsGen.Icon;
        target?: '_blank' | '_parent' | '_self' | '_top';
    }
}
namespace TsLayout {
    interface Sets {
        menu?: boolean;
        header?: boolean;
        tabs?: boolean;
        view?: boolean;
        left?: boolean;
        form?: boolean;
        handle?: boolean;
        handleLeft?: boolean;
        handleLeftExtra?: boolean;
        handleRight?: boolean;
        handleRightExtra?: boolean;
        handleBtnSearch?: boolean;
        handleBtnRefresh?: boolean;
        handleBtnLeft?: boolean;
        handleBtnRight?: boolean;
        table?: boolean;
        pagination?: boolean;
        right?: boolean;
        entire?: boolean;
    }
}
namespace TsMenu {
    type Model = TsRoutes.RoutesMenu;
    type Collapse = boolean;

    interface Sets {
        uniqueOpened?: boolean;
        backgroundColor?: string;
        textColor?: string;
        activeTextColor?: string;
    }

    type Option = TsRoutes.RoutesMenu;
    type Options = Option[];
}
namespace TsPagination {
    type Current = number;
    type Size = 5 | 10 | 20 | 50 | 100 | 200 | number;
    type Total = number;

    interface Change {
        type: "size" | "current";
        value: number;
    }

    interface Sets {
        pageSizes?: number[];
        small?: boolean;
        background?: string;
        layout?: string;
        pagerCount?: number;
        prevText?: string;
        prevIcon?: string;
        nextIcon?: string;
        nextText?: string;
        disabled?: boolean;
        hideOnSinglePage?: boolean;
    }
}
namespace TsPopover {
    interface Sets {
        trigger?: "click" | "focus" | "hover" | "contextmenu";
        title?: string;
        width?: string | number;
        placement?: "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
        disabled?: boolean;
        popperClass?: string;
        autoClose?: number;
        load?: boolean;
        loadingText?: string;
    }
    type Stop = () => void;
}
namespace TsPrint {
    interface Model extends TsGen.Object {}
    interface Sets {
        empty?: string;
        type?: "A4" | "A5";
        direction?: "portrait" | "landscape";
        mark?: boolean;
    }
}
namespace TsRadio {
    type Model = string | number;

    interface Sets {
        type?: "button";
        size?: TsGen.Size;
        disabled?: boolean;
        textColor?: string;
        border?: boolean;
        fill?: string;
    }

    interface Option {
        label: string | number;
        value: string | number | boolean;
        badge?: number;
        disabled?: boolean;
        sets?: SetsBadge;
    }

    type Options = Option[];
}
namespace TsSelect {
    type Model = string | number | string[] | number[];

    interface Sets {
        [x: string]: any;

        showTooltip?: boolean;
        placeholder?: string;
        multiple?: boolean;
        disabled?: boolean;
        size?: TsGen.Size;
        clearable?: boolean;
        collapseTags?: boolean;
        collapseTagsTooltip?: boolean;
        multipleLimit?: number;
        maxCollapseTags?: number;
        filterable?: boolean;
        loading?: boolean;
        loadingText?: string;
        noMatchText?: string;
        noDataText?: string;
        tagType?: TsGen.Types;
        readonly?: boolean;
    }

    interface Option {
        label: string | number;
        value: string | number;
        disabled?: boolean;

        [x: string]: any;
    }

    type Options = Option[];
}
namespace TsSteps {
    type Model = number;
    type Type = "wait" | "process" | "finish" | "error" | "success";

    interface Sets {
        click?: "prev" | true;
        space?: number | string;
        direction?: "vertical" | "horizontal";
        processStatus?: Type;
        finishStatus?: Type;
        alignCenter?: boolean;
        simple?: boolean;
    }

    interface Option {
        icon?: TsGen.Icon;
        title?: string;
        description?: string;
    }

    type Options = Option[];
}
namespace TsSwitch {
    type Model = boolean | string | number;

    interface Sets {
        size?: "large" | "small" | "default";
        colorOn?: string;
        colorOff?: string;
        width?: number | string;
        activeText?: string;
        inactiveText?: string;
        activeIcon?: string;
        inactiveIcon?: string;
        activeValue?: Model;
        inactiveValue?: Model;
        inlinePrompt?: boolean;
    }

    type Change = TsGen.StatusIs;
}
namespace TsTable {
    interface Row extends TsGen.Object {
    }

    type Model = Row[];
    type Loading = boolean;

    interface Sets<T = TsGen.Object> {
        height?: string | number;
        maxHeight?: string | number;
        stripe?: boolean;
        border?: boolean;
        size?: TsGen.Size;
        showHeader?: boolean;
        highlightCurrentRow?: boolean;
        currentRowKey?: string | number;
        rowKey?: keyof T | ((row: T) => keyof T);
        emptyText?: string;
        tooltipEffect?: "dark" | "light";
        align?: TsGen.Align;
        headerAlign?: TsGen.Align;
        showOverflowTooltip?: boolean;
        emptyCell?: string;
        showSummary?: boolean;
        sumText?: string;
        summaryMethod?: {
            prop: keyof T;
            fmt: `${string}{v}${string}`;
        }[];
        spanMethod?: (param: SpanMethodProps) => { rowspan: number; colspan: number };
        lazy?: boolean;
        load?: (row: TsDept.TableItem, resolve: (date: TsDept.Table) => void) => void;
    }

    interface SummaryParams<T = TsGen.Object> {
        columns: TableColumnCtx<T>[];
        data: T[];
    }
}
namespace TsTableColumn {
    type Label = string;
    type Prop = string;

    interface Sets {
        children?: Option[];
        className?: string;
        labelClassName?: string;
        width?: string | number;
        minWidth?: string | number;
        fixed?: "left" | "right";
        align?: TsGen.Align;
        emptyCell?: string;
        hidden?: () => boolean;
        formatter?: (row, column, cellValue, index) => string;
        showOverflowTooltip?: boolean;
        headerAlign?: TsGen.Align;
    }
}
namespace TsTableDatePicker {
    type Label = TsTableColumn.Label;
    type Prop = TsTableColumn.Prop;

    interface Sets extends TsTableColumn.Sets, TsDatePicker.Sets {
    }
}
namespace TsTableInput {
    type Label = TsTableColumn.Label;
    type Prop = TsTableColumn.Prop;

    interface Sets extends TsTableColumn.Sets, TsInput.Sets {
    }
}
namespace TsTableNumber {
    type Label = TsTableColumn.Label;
    type Prop = TsTableColumn.Prop;

    interface Sets extends TsTableColumn.Sets, TsNumber.Sets {
        max?: number | string;
    }
}
namespace TsTableSwitch {
    type Label = TsTableColumn.Label;
    type Prop = TsTableColumn.Prop;

    interface Sets extends TsTableColumn.Sets, TsSwitch.Sets {
    }
}
namespace TsTableSelect {
    type Label = TsTableColumn.Label;
    type Prop = TsTableColumn.Prop;
    type Options = TsSelect.Options | string;

    interface Sets extends TsTableColumn.Sets, TsSelect.Sets {
    }

    interface ChangeParams {
        val: TsSelect.Model;
        row: TsGen.Object;
    }
}
namespace TsTableSpecial {
    type Type = "selection" | "index" | "expand" | "handle";
    type Label = TsTableColumn.Label;

    interface Sets extends TsTableColumn.Sets {
    }
}
namespace TsTableTag {
    type Label = TsTableColumn.Label;
    type Prop = TsTableColumn.Prop;
    type Options = TsTag.Options;

    interface Sets extends TsTableColumn.Sets, TsTag.Sets {
    }

    interface Modality extends TsTag.Modality {
    }
}
namespace TsTabs {
    type Model = string | number;

    interface Sets {
        type?: "card" | "border-card";
        icon?: boolean;
        closable?: boolean;
        tabPosition?: "top" | "right" | "bottom" | "left";
    }

    interface Option {
        label: string | number;
        value: string;
        icon?: string;
        disabled?: boolean;
        closable?: boolean;
    }

    type Options = Option[];
}
namespace TsTag {
    type Model = string | number;

    interface Modality {
        [param: string]: Sets["type"];
    }

    interface Sets {
        type?: TsGen.Types | "text";
        closable?: boolean;
        size?: TsGen.Size;
        effect?: "dark" | "light" | "plain";
        color?: string;
        hit?: boolean;
        round?: boolean;
    }

    interface Option {
        label: string;
        value: string | number | boolean;
        type?: TsGen.Types;
    }

    type Options = Option[];
}
namespace TsTree {
    type Model = string[] | number[] | string | number;
    type ModelValue = string;

    interface Sets {
        accordion?: boolean;
        checkOnClickNode?: boolean;
        checkStrictly?: boolean;
        emptyText?: string;
        expandOnClickNode?: boolean;
        handleBtn?: boolean;
        highlightCurrent?: boolean;
        indent?: number;
        icon?: TsGen.Icon;
        lazy?: boolean;
        placeholder?: string;
        search?: boolean;
        showCheckbox?: boolean;
    }

    interface Option {
        label: string;
        value: string | number;
        isLeaf?: boolean;
        disabled?: boolean;
        children?: OptTree[];
    }

    type Options = Option[];
    type Node = TsElement.TreeNode & {
        data: Option & TsGen.Object;
    };
    type Resolve = (data: TsTree.Options) => void;
}
namespace TsTreeSelect {
    type Model = TsTree.Model;
    type Options = TsTree.Options;

    interface Sets {
        showTooltip?: boolean;
        renderAfterExpand?: boolean;
        showCheckbox?: boolean;
        checkStrictly?: boolean;
        checkOnClickNode?: boolean;
        multiple?: boolean;
        multipleLimit?: number;
        filterable?: boolean;
        placeholder?: string;
        disabled?: boolean;
        size?: TsGen.Size;
        clearable?: boolean;
        collapseTags?: boolean;
        collapseTagsTooltip?: boolean;
        loading?: boolean;
        loadingText?: string;
        noDataText?: string;
        emptyText?: string;
        tagType?: TsGen.Types;
        lazy?: boolean;
        accordion?: boolean;
        indent?: number;
        icon?: TsGen.Icon;
        nodeKey?: string;
        defaultExpandedKeys?: string[] | number[];
        readonly?: boolean;
        expandOnClickNode?: boolean;
    }
}
namespace TsUpload {
    type Model = string[];

    interface Sets {
        limit?: number;
        beforeSelect?: boolean;
        action?: string;
        drag?: boolean;
        multiple?: boolean;
        accept?: string[];
        showFileList?: boolean;
        disabled?: boolean;
        listType?: "text" | "picture-card" | "picture";
        autoUpload?: boolean;
        placeholder?: string;
        readonly?: boolean;
    }
}
