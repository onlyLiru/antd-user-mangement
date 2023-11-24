import type { ColumnsType } from "antd/es/table";
import type { Item } from "../types";

const getRandom = () => {
  return Math.floor(Math.random() * 100);
};

export const getAddress = (key: number) => {
  return `后宫 ${key} 院, 左转第二间房, 直走然后右转 ${key + getRandom()}`;
};

export const getOriginData = () => {
  const originData: Item[] = [];
  for (let i = 0; i < 2; i++) {
    originData.push({
      key: i,
      name: `亚历山大 ${i + 1} 世`,
      age: 32,
      address: getAddress(i),
    });
  }
  return originData;
};

export const mergeColumns = (
  columns: ColumnsType<Item>,
  isEditing: Function
) => {
  return columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
};
