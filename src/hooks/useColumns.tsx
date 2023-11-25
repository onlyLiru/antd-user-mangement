"use client";

import { MouseEvent } from "react";
import type { ColumnsType } from "antd/es/table";

import { Popconfirm, Typography, Space } from "antd";
import type { Item } from "../types";

interface IProps {
  isEditing: Function;
  save: Function;
  cancel: (e?: MouseEvent<HTMLElement, MouseEvent> | undefined) => void;
  deleteItem: Function;
  edit: Function;
}

const useColumns = ({ isEditing, save, cancel, deleteItem, edit }: IProps) => {
  const columns: ColumnsType<Item> = [
    {
      title: "姓名",
      dataIndex: "name",
      width: "25%",
      editable: true,
      filters: [
        {
          text: "大 1 世",
          value: "1",
        },
        {
          text: "大 3 世",
          value: "3",
        },
      ],
      onFilter: (value: string, record) => record.name.indexOf(value) !== -1,
    },
    {
      title: "年龄",
      dataIndex: "age",
      width: "15%",
      editable: true,
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "地址",
      dataIndex: "address",
      width: "40%",
      editable: true,
      filters: [
        {
          text: "后宫 1 院",
          value: "后宫 1 院",
        },
        {
          text: "后宫 3 院",
          value: "后宫 3 院",
        },
      ],
      onFilter: (value: string, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "操作",
      dataIndex: "operation",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              保存
            </Typography.Link>
            <Popconfirm
              title="确定取消吗?"
              okText="确定"
              cancelText="返回"
              onConfirm={cancel as any}
            >
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <Space>
            <Typography.Link onClick={() => edit(record)}>编辑</Typography.Link>
            <Popconfirm
              title="确定删除吗?"
              okText="确定"
              cancelText="取消"
              onConfirm={() => deleteItem(record)}
            >
              <Typography.Link>删除</Typography.Link>
            </Popconfirm>
          </Space>
        );
      },
    },
  ] as ColumnsType<Item>;

  return [columns];
};

export default useColumns;
