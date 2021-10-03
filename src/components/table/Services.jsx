import { AppBar, Box, Tabs, Tab, Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import Table from "antd/es/table";

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

const Services = ({ options, addToCart }) => {
  const [selectedTab, setSelectedTab] = useState(0);
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
      align: "right",
      render: (text) => <h4>{`$ ${text}.00`}</h4>,
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      align: "center",
      render: (item) => (
        <Button
          onClick={() => addToCart(item)}
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
        >
          Add to cart
        </Button>
      ),
    },
  ];
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
              // rowSelection={{
              // type: "checkbox",
              //   ...rowSelection,
              // }}
            />
          </TabPanel>
        );
      })}
    </Box>
  );
};

export default Services;
