import React, { useState } from "react";
import type { Item } from "../types";
import { Form, Table, Button, Flex, Space, Input, notification } from "antd";
import type { SearchProps } from "antd/es/input";
import EditableCell from "../components/EditableCell";
import { getOriginData, mergeColumns, getAddress } from "../utils";
import useColumns from "../hooks/useColumns";

const { Search } = Input;

const originData = getOriginData();

const UserManagement: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [fullData, setFullData] = useState(originData);

  const [editingKey, setEditingKey] = useState<number | undefined>();

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key);
  };

  const deleteItem = (record: Partial<Item> & { key: React.Key }) => {
    const newData = data.filter((item) => item.key !== record.key);
    const newFullData = fullData.filter((item) => item.key !== record.key);
    setData(newData);
    setFullData(newFullData);
  };
  const cancel = () => {
    setEditingKey(undefined);
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey(undefined);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(undefined);
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const [columns] = useColumns({ isEditing, save, cancel, deleteItem, edit });
  const mergedColumns = mergeColumns(columns, isEditing);

  const handleAdd = () => {
    const key = fullData.length + 1;
    const newData: Item = {
      key,
      name: `亚历山大 ${key} 世`,
      age: 32,
      address: getAddress(key),
    };
    setData([...data, newData]);
    setFullData([...fullData, newData]);
  };

  const onSearch: SearchProps["onSearch"] = (value) => {
    const filterData = fullData.filter(
      (item) => item.name.indexOf(value.trim()) !== -1
    );
    setData(filterData);
  };

  const openNotificationWithIcon = () => {
    notification.success({
      message: "感谢您花时间浏览我的作品",
      description: "一句先苦后甜 苦了我一年又一年下句. 那请问下一句是神马呢？",
    });
  };

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
        background: "#fff",
        height: "100vh",
      }}
    >
      <div style={{ width: "80vw" }}>
        <Flex justify="space-between">
          <Button
            onClick={handleAdd}
            type="primary"
            style={{ marginBottom: 16 }}
          >
            新增用户
          </Button>
          <Space style={{ marginBottom: 16 }}>
            <Button onClick={openNotificationWithIcon}>Click Me</Button>
            <Search
              placeholder="输入人名搜索"
              allowClear
              enterButton="人名搜索"
              onSearch={onSearch}
            />
          </Space>
        </Flex>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </main>
  );
};

export default UserManagement;
