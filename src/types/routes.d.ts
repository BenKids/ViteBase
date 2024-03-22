namespace TsRoutes {
    interface Meta {
        label: string;
        hidden?: () => boolean;
        disabled?: () => boolean;
        blank?: boolean;
        menu?: string;
        icon?: string;
        keepAlive?: boolean;
    }
    interface MenuSub<T> {
        path: T;
        name: T;
        redirect: string;
        meta: Meta;
        children: RoutesMenus;
        component?: never;
    }
    interface Menu<T> {
        path: T;
        name: T;
        component: TsRouter.RouteRecordSingleView['component'];
        meta: Meta;
        children?: never;
        redirect?: never;
    }
    type RoutesMenu = MenuSub<string> | Menu<string>
    type RoutesMenus = RoutesMenu[];
}