import { Button, Input, Modal, Table, message } from "antd";
import Form, { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

function StudentManagement() {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const fetchStudent = async () => {
    const response = await axios.get(
      "https://6627a8d6b625bf088c092f0e.mockapi.io/Student"
    );
    console.log(response.data);
    setDataSource(response.data);
  };
  useEffect(fetchStudent, []);

  // tạo ra 1 biến đại diện cho cái form
  const [formVariable] = useForm();

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      key: "name",
    },
  ];

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleHideModal = () => {
    // hide modal
    setVisible(false);
  };

  const handleOk = () => {
    // ???????????
    formVariable.submit();
  };

  const handleSubmit = async (values) => {
    // add xuong back-end
    const response = await axios.post(
      "https://6627a8d6b625bf088c092f0e.mockapi.io/Student",
      values
    );
    setDataSource([...dataSource, values]);
    //  biến giá trị ô input thành rỗng
    formVariable.resetFields("");
    handleHideModal();
  };
  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        Add new student
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Basic Modal"
        open={visible}
        onCancel={handleHideModal}
        onOk={handleOk}
      >
        {/* set up: khi bấm OK => submit form */}
        <Form form={formVariable} onFinish={handleSubmit}>
          <Form.Item
            name={"name"} //  tên biến
            label={"Student name"}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default StudentManagement;
