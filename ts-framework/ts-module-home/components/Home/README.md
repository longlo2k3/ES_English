function Home() {
const columns: ColumnProps<any>[] = [
{
title: "Tên",
dataIndex: "name",
key: "name",
ellipsis: true,
},
{
title: "Email",
dataIndex: "email",
key: "email",
ellipsis: true,
},
{
title: "Tuổi",
dataIndex: "age",
key: "age",
width: 100,
ellipsis: true,
},
{
title: "Địa chỉ",
dataIndex: "address",
key: "address",
ellipsis: true,
},
{
title: "Số điện thoại",
dataIndex: "phone",
key: "phone",
width: 150,
ellipsis: true,
},
{
title: "Hành động",
key: "actions",
width: 150,
ellipsis: true,
render: (_, record) => (
<Space>
<Button size="small" type="primary">
Sửa
</Button>
<Button size="small" danger>
Xóa
</Button>
</Space>
),
},
];

const { hookApis, dataSource, tableProps, loading, refresh } = useHookTable({
// apiFunction: fetchUsers,
columns,
initialParams: { status: "active" },
pagination: {
current: 1,
pageSize: 20,
showSizeChanger: true,
},
});
