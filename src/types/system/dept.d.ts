namespace TsDept {
    type Dwdm = string;
    type DeptId = TsStore.User["deptId"];
    type DeptName = TsTree.ModelValue;
    interface TreeItem {
        dwdm: Dwdm;
        id: number;
        label: string;
        children?: TreeItem[];
    }
	type Node = TsElement.TreeNode & {
		data: TreeItem;
	};
    type TreeData = TreeItem[];
    interface DeptObj {
        deptId: TsStore.User["deptId"];
        deptName: DeptName;
        email: string;
    }
    interface TreeLazyChild {
    }
    interface TreeLazySearch {
        deptName: DeptName;
    }
    interface TreeLazyValueItem {
        deptId: number;
        deptName: DeptName;
    }
    type TreeLazyValue = TreeLazyValueItem[];
    interface ModelValue extends TsGen.FormPage {
        deptName: DeptName;
    }
    interface FormModel {
        deptName: DeptName;
        status: TsGen.Status;
    }
    interface TableItem {
        deptId: number;
        deptName: DeptName;
        orderNum: number;
        status: TsGen.StatusIs;
        createTime: string;
        hasChildren?: boolean;
        children?: TableItem[];
    }
    type Table = TableItem[];
    type TableRawdata = Table;
    interface TreeRoleIdDepts {
        label: string;
        id: number;
        children?: TreeRoleIdDepts[];
    }
    interface TreeRoleIdResponse {
        code: number;
        msg: string;
        checkedKeys: number[];
        depts: TreeRoleIdDepts[];
    }
    interface Msg {

    }
}
namespace TsDeptAdd {
    interface FormModel {
        parentId: TsDept.DeptId;
        deptName: TsDept.DeptName;
        orderNum: number;
        leader: string;
        phone: string | number;
        email: string;
        status: TsGen.Status;
    }
}
namespace TsDeptUpdate {
    interface FormModel extends TsDeptAdd.FormModel {
        deptId: TsDept.DeptId;
    }
}