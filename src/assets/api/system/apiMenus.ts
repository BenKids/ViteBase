export default {
	permi: () =>
		useRequest(() => request.Get("/system/menu/treeselect",{
            transformData(rawdata:TsMenus.PermiRawdata) {
                return evRename({
                    data: rawdata.data,
                    keys: {
                        label: "label",
                        value: "id",
                        children: "children"
                    }
                })
            }
        }), {
			immediate: true,
		}),
};
