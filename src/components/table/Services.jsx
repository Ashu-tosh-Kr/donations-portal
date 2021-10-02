// import { TabPanel } from "@mui/lab";
import { AppBar, Box, Tabs, Tab, Typography } from "@mui/material";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "name", headerName: "Service Name", width: 400 },
  { field: "amount", headerName: "Amount", width: 400 },
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
  const [selectionModel, setSelectionModel] = useState([]);
  console.log(selectionModel);
  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <AppBar position="static">
        <Tabs
          value={selectedTab}
          onChange={(e, newVal) => setSelectedTab(newVal)}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="donations table tabs"
        >
          {options.map((option, index) => (
            <Tab key={index} label={option.typeName} />
          ))}
        </Tabs>
      </AppBar>

      {options.map((option, index) => {
        const mutatedOptions = option.types.map((item) => ({
          ...item,
          id: item.key,
        }));

        return (
          <TabPanel key={index} value={selectedTab} index={index}>
            <DataGrid
              autoHeight
              rows={mutatedOptions}
              columns={columns}
              checkboxSelection
              onSelectionModelChange={(newSelectionModel) => {
                setSelectionModel((prev) => newSelectionModel);
              }}
              selectionModel={selectionModel}
            />
          </TabPanel>
        );
      })}
    </Box>
  );
};

export default Services;
