// import { TabPanel } from "@mui/lab";
import { AppBar, Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
// import { DataGrid } from "@mui/x-data-grid";
import { Table } from "antd";
// const columns = [
//   { field: "name", headerName: "Service Name", width: 400 },
//   { field: "amount", headerName: "Amount", width: 400 },
// ];
const COLUMNS = [
  {
    title: (
      <h2>
        <a>Service Name</a>
      </h2>
    ),
    dataIndex: "name",
    key: "donationType",
    render: (text) => <h4>{text}</h4>,
  },
  {
    title: (
      <h2>
        <a>Amount</a>
      </h2>
    ),
    dataIndex: "amount",
    key: "amount",
    // align: "right",
    render: (text) => <h4>{`$ ${text}.00`}</h4>,
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Services = ({ options }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  // const [selectionModel, setSelectionModel] = useState([]);
  // console.log(selectionModel);
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar position="static">
        <Tabs
          value={selectedTab}
          onChange={(e, newVal) => setSelectedTab(newVal)}
          indicatorColor="secondary"
          textColor="inherit"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="donations table tabs"
        >
          {options.map((option, index) => (
            <Tab key={index} label={option.typeName} />
          ))}
        </Tabs>
      </AppBar>

      {options.map((option, index) => {
        return (
          <TabPanel key={index} value={selectedTab} index={index}>
            <Table
              dataSource={option.types}
              columns={COLUMNS}
              pagination={false}
              bordered
              scroll={{ y: 240 }}
              rowSelection={{
                type: "checkbox",
                // ...rowSelection,
              }}
            />
          </TabPanel>
        );
      })}
    </Box>
  );
};

export default Services;
