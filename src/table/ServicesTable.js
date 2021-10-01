import { Tabs, Table } from 'antd';
const { TabPane } = Tabs;

function ServicesTable(props) {
    const onTabChange = (tab, event) => {
        console.log('Test', tab, event);
    };

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            props.onCheckboxChange(selectedRows, selectedRowKeys);
        }
    };

    return (
        <Tabs onTabClick={onTabChange} type="card">
            {props.tabsArr && props.tabsArr.map((rec, index) => {
                return <TabPane tab={rec.typeName} key={index}>
                    <Table
                        dataSource={rec.types}
                        columns={props.columns}
                        pagination={false}
                        rowSelection={{
                            type: 'checkbox',
                            ...rowSelection,
                        }}
                    >

                    </Table>
                </TabPane>
            })}
        </Tabs>
    )
}
export default ServicesTable;