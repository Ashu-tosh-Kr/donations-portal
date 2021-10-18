import { AppBar, Box, Tabs, Tab, Button, Typography } from "@mui/material";
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
        <Typography
          sx={{
            backgroundColor: "#FFE699",
            margin: "-2rem -1rem",
            padding: "1rem",
            color: "#2E5292",
            fontWeight: "bold",
            fontSize: [16, 18, 20],
          }}
          variant="h6"
        >
          Service Name
        </Typography>
      ),
      dataIndex: "itemName",
      key: "donationType",
      render: (text) => (
        <Typography sx={{ fontSize: { xs: 14, md: 20 } }}>{text}</Typography>
      ),
    },
    {
      title: (
        <Typography
          sx={{
            backgroundColor: "#FFE699",
            margin: "-2rem -1rem",
            padding: "1rem",
            color: "#2E5292",
            fontWeight: "bold",
            fontSize: [16, 18, 20],
          }}
          variant="h6"
        >
          Amount
        </Typography>
      ),
      dataIndex: "amount",
      key: "amount",
      align: "center",
      // width: 300,
      render: (text) => (
        <Typography
          sx={{ fontSize: { xs: 14, md: 20 } }}
        >{`$ ${text.toLocaleString("en", {
          useGrouping: true,
        })}`}</Typography>
      ),
    },
    {
      title: (
        <Typography
          sx={{
            backgroundColor: "#FFE699",
            margin: "-2rem -1rem",
            padding: "1rem",
            color: "#2E5292",
            fontWeight: "bold",
            fontSize: [16, 18, 20],
          }}
          variant="h6"
        >
          Action
        </Typography>
      ),
      dataIndex: "",
      key: "",
      align: "center",
      // width: 300,
      render: (item) => (
        <Button
          onClick={() => addToCart(item)}
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          sx={{ fontSize: { xs: 0, md: "inherit" } }}
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
          sx={{
            "& .MuiTabs-indicator": {
              height: 0,
            },
          }}
        >
          {options.map((option, index) => (
            <Tab
              sx={{
                fontSize: [13, 14, 17],
                opacity: 1,
                "&.Mui-selected": {
                  backgroundColor: "secondary.main",
                  borderRadius: 2,
                  color: "black",
                },
              }}
              key={index}
              label={option.categoryName}
            />
          ))}
        </Tabs>
      </AppBar>

      {options.map((option, index) => {
        return (
          <TabPanel key={index} value={selectedTab} index={index}>
            <Table
              dataSource={option.categoryItems}
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
