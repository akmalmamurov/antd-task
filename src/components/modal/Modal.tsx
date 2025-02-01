import { Button, Form, Input, message, Modal } from "antd";
import { IoMdClose } from "react-icons/io";
import "./modal.css";
import { useCreateData } from "@/hooks/createData";
import * as API from "@/constants/api";
import { useQueryClient } from "@tanstack/react-query";
interface Props {
  isModalOpen: boolean;
  handleOpen: () => void;
}

type FieldType = {
  name: string;
  count: number;
};

const Dialog = ({ isModalOpen, handleOpen }: Props) => {
  const queryClient = useQueryClient();
  const { mutate: createCompany } = useCreateData(API.CREATE_COMPANY);
  const onFinish = (values: FieldType) => {
    createCompany(
      { newData: values, key: API.CREATE_COMPANY },
      {
        onSuccess: () => {
          message.success("Successfully created!");
          queryClient.invalidateQueries({ queryKey: ["companies/get-all"] });
          handleOpen();
        },
      }
    );
    console.log("Success:", values);
  };

  return (
    <Modal
      open={isModalOpen}
      onCancel={handleOpen}
      footer={null}
      closeIcon={null}
      style={{ padding: 0 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center py-4 border-b px-6">
        <h2 className="font-bold text-xl text-black leading-[28px]">
          Добавить компания
        </h2>
        <button onClick={handleOpen}>
          <IoMdClose className="text-2xl text-[#00000073]" />
        </button>
      </div>

      {/* Form */}
      <Form
        layout="horizontal"
        name="companyForm"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        onFinish={onFinish}
        autoComplete="off"
        requiredMark={false}
      >
        <div className="px-6 py-4">
          <Form.Item<FieldType>
            label="Названия компании"
            name="name"
            rules={[{ required: true, message: "Введите название компании!" }]}
            className="text-sm font-normal leading-[22px] text-black"
          >
            <Input
              placeholder="Введите название"
              className="rounded-none border border-orochimaru  "
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Количество сотрудников"
            name="count"
            rules={[
              { required: true, message: "Введите количество сотрудников!" },
            ]}
            className="text-sm font-normal leading-[22px] text-black"
          >
            <Input
              placeholder="Введите количество"
              type="number"
              className="rounded-none border border-orochimaru  "
            />
          </Form.Item>
        </div>

        {/* Submit button */}
        <Form.Item
          wrapperCol={{ span: 24 }}
          className="mb-0 border-t flex justify-center py-[10px]"
        >
          <Button
            type="primary"
            htmlType="submit"
            className="w-fit py-2 px-6 text-sm rounded"
            style={{
              backgroundColor: "#007BFF",
              borderColor: "#007BFF",
            }}
          >
            Добавить компания
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Dialog;
