export default {
	// 字典获取
	dicts: (params: TsDicts.Params) =>
		useRequest(
			() =>
				request.Get("/system/dict/data/type/" + params, {
					name: "apiDicts",
					transformData(rawdata: TsDicts.Rawdata): TsDicts.Res {
						return evRename({
							data: rawdata.data,
							keys: {
								label: "dictLabel",
								value: "dictValue",
								type: "listClass",
							},
						}) as TsDicts.Res;
					},
				}),
			{
                force: isForce => isForce,
                initialData: [],
                middleware: actionDelegationMiddleware("apiDicts"),
			}
		),
	// 状态选择数据
	status: ():TsSelect.Options => {
		return [
			{
				tagType: "info",
				value: "info",
				label: "默认"
			},
			{
				tagType: "primary",
				value: "primary",
				label: "主要"
			},
			{
				tagType: "success",
				value: "success",
				label: "成功"
			},
			{
				tagType: "warning",
				value: "warning",
				label: "警告"
			},
			{
				tagType: "danger",
				value: "danger",
				label: "危险"
			}
		]
	},
	// 地图数据获取
	mapJson: async (adcode: string | number) => {
		const response = await fetch("https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=" + adcode + "_full");
		const mapJsonssssssss = await response.json();
		let options: TsGen.Object = {};
		let jsons: TsGen.Object = {};
		options[adcode] = {
			adcode: adcode,
			name: "",
			level: "",
			parent: {adcode: ""},
			acroutes: [],
			distance: 105,
			beta: 0,
			alpha: 50,
			offset: [0, 0, 0],
			regionColor: "",
			linesColor: "",
			center: [],
			centroid: [],
			symbol: [],
			label: [],
			regions: [],
		}
		for (let index = 0; index < mapJsonssssssss.features.length; index++) {
			const item = mapJsonssssssss.features[index];
			options[adcode].regions.push(item.properties.adcode);
			options[item.properties.adcode] = {
				...item.properties,
				distance: 105,
				beta: 0,
				alpha: 50,
				offset: [0, 0, 0],
				regionColor: "#63cdda",
				linesColor: "#f7d794",
				symbol: item.properties.centroid,
				label: item.properties.centroid,
				regions: [item.properties.adcode]
			};
			jsons[item.properties.adcode] = item.geometry.coordinates
		}
		return {
			options,
			jsons,
		}
	}
};
