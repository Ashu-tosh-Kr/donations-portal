import { useEffect, useState } from "react";
//Styles
import "./Donation.styles.scss";
import "antd/dist/antd.css";

//Components
import Header from "../components/header/Header";
import ServicesTable from "../components/table/ServicesTable";

//Antd
import { Input, Form, Button, Modal, Table } from "antd";

//API
import { GET_USER_DETAILS, useGetAllDonationOptions } from "../api/api";

//Constants
import { COLUMNS } from "../utils/Constants";
import PaymentModal from "../components/modals/PaymentModal";

const initialUserValues = {
  refDataName: "",
  dob: "",
  gender: "",
  gotraName: "",
  nakshatraName: "",
  entrpAddressLine1: "",
  entrpCityName: "",
  entrpStateName: "",
  entrpZIPCode: "",
};

function Donation() {
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openPayModal, setOpenPayModal] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [fetchBtnDisabled, setFetchBtnDisabled] = useState(true);

  const { donationOptions, isLoading, isError } = useGetAllDonationOptions();

  /**
   * Triggers on top form submit button click
   * @param {*} values - form values
   */
  const onTopFormFinish = async (values) => {
    const userDetails = await GET_USER_DETAILS(values);
    setUserDetails(userDetails);
  };

  /**
   * Triggers on table check box change
   * @param {*} selectedRows
   * @param {*} selectedRowKeys
   */
  const onCheckboxChange = (selectedRows) => {
    setCartItems([...cartItems, ...selectedRows]);
  };

  /**
   * Triggers on inputs value change
   * @param {*} event
   */
  const handleInputChange = (event) => {
    setUserDetails({ ...userDetails, [event.target.name]: event.target.value });
  };

  /**
   * Triggers on email or phone input blur input
   * @param {*} event
   */
  const onEmailPhoneBlur = (event) => {
    if (event.target.value) setFetchBtnDisabled(false);
  };

  return (
    <>
      <PaymentModal
        openPayModal={openPayModal}
        setOpenPayModal={setOpenPayModal}
      />
      <div className="App">
        <Header />
        <div className="h-center donations-title">Donations</div>
        <Form layout="vertical" onFinish={onTopFormFinish}>
          <div className="h-center-inputs">
            <Form.Item
              name="prsnEmail"
              style={{ marginRight: 20 }}
              label="Enter EMAIL"
            >
              <Input type="email" onBlur={onEmailPhoneBlur} />
            </Form.Item>
            <Form.Item name="mobile" label="Enter PHONE">
              <Input type="text" onBlur={onEmailPhoneBlur} />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={fetchBtnDisabled}
              style={{ margin: 20 }}
              className="btn-cls"
              size="large"
            >
              Get Details
            </Button>
          </div>
        </Form>
        <Form layout="vertical">
          <fieldset>
            <legend>Donor Profile</legend>
            <div className="h-center-inputs">
              <Form.Item style={{ marginRight: 20 }} label="Name">
                <Input
                  name="refDataName"
                  value={userDetails.refDataName}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item style={{ marginRight: 20 }} label="Day">
                <Input
                  name="dob"
                  value={userDetails.dob}
                  onChange={handleInputChange}
                  type="text"
                />
              </Form.Item>
              <Form.Item style={{ marginRight: 20 }} label="Gender">
                <Input
                  name="gender"
                  value={userDetails.gender}
                  onChange={handleInputChange}
                  type="text"
                />
              </Form.Item>
              <Form.Item style={{ marginRight: 20 }} label="Gotra">
                <Input
                  name="gotraName"
                  value={userDetails.gotraName}
                  onChange={handleInputChange}
                  type="text"
                />
              </Form.Item>
              <Form.Item style={{ marginRight: 20 }} label="Nakshatra">
                <Input
                  name="nakshatraName"
                  value={userDetails.nakshatraName}
                  onChange={handleInputChange}
                  type="text"
                />
              </Form.Item>
            </div>
            <div className="h-center-inputs">
              <Form.Item style={{ marginRight: 20 }} label="Address">
                <Input
                  name="entrpAddressLine1"
                  value={userDetails.entrpAddressLine1}
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item style={{ marginRight: 20 }} label="City">
                <Input
                  name="entrpCityName"
                  value={userDetails.entrpCityName}
                  type="text"
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item style={{ marginRight: 20 }} label="State">
                <Input
                  name="entrpStateName"
                  value={userDetails.entrpStateName}
                  type="text"
                  onChange={handleInputChange}
                />
              </Form.Item>
              <Form.Item label="Zip">
                <Input
                  name="entrpZIPCode"
                  value={userDetails.entrpZIPCode}
                  type="text"
                  onChange={handleInputChange}
                />
              </Form.Item>
            </div>
          </fieldset>
          {false ? (
            <>
              <ServicesTable
                onCheckboxChange={(rows, keys) => onCheckboxChange(rows, keys)}
                columns={COLUMNS}
                tabsArr={donationOptions}
              ></ServicesTable>
              <div className="h-center-inputs">
                <Button
                  type="primary"
                  onClick={() => setOpenCartModal(true)}
                  style={{ margin: 20 }}
                  className="btn-cls"
                  size="large"
                >
                  Cart
                </Button>
                <Button
                  type="primary"
                  className="btn-cls"
                  style={{ margin: 20 }}
                  size="large"
                >
                  Checkout
                </Button>
              </div>
            </>
          ) : isError ? (
            "Oops! There was an error!"
          ) : null}
        </Form>
        <Modal
          title="Cart Items"
          centered
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={() => setOpenCartModal(false)}
            >
              OK
            </Button>,
          ]}
          visible={openCartModal}
        >
          <Table dataSource={cartItems} columns={COLUMNS}></Table>
        </Modal>
        <Button onClick={() => setOpenPayModal(true)}>Open</Button>
      </div>
    </>
  );
}

export default Donation;
