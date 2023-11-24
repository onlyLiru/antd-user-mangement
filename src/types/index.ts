export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: string;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

export interface Item {
  key: number;
  name: string;
  age: number;
  address: string;
}
