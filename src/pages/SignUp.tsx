import { Form, Input, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useCreateData } from "@/hooks/createData";
import * as API from "@/constants/api";
type FieldType = {
  fullName: string;
  login: string;
  password: string;
  isLoading: boolean;
};

const SignUp = () => {
  const navigate = useNavigate();
  const { mutate: createData, isLoading } = useCreateData<FieldType>(
    API.SIGN_UP
  );

  const onFinish = (values: FieldType) => {
    createData(
      { newData: values, key: API.SIGN_UP },
      {
        onSuccess: () => {
          message.success("Successfully registered!");
          setTimeout(() => navigate("/auth/signin"), 2000);
        },
        onError: (error) => {
          message.error("Registration failed.");
          console.error(error);
        },
      }
    );
  };

  return (
    <div className=" bg-white flex flex-col justify-center  pt-6 font-roboto rounded-sm">
    <h3 className="font-bold text-[36px] text-black leading-[22px] mb-[21px] text-left pl-6">
    Регистрация
    </h3>

    <Form
      layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
      requiredMark={false}
    >
      <div className="pl-6 pr-[42px]">
        <Form.Item<FieldType>
          label="Ф.И.О"
          name="fullName"
          rules={[{ required: true, message: "Please input your login!" }]}
          className="text-sm text-black leading-[22px]"
        >
          <Input
            placeholder="Введите Ф.И.О"
            className="rounded-none border border-orochimaru  "
          />
        </Form.Item>
        <Form.Item<FieldType>
          label="Логин"
          name="login"
          rules={[{ required: true, message: "Please input your login!" }]}
          className="text-sm text-black leading-[22px]"
        >
          <Input
            placeholder="Введите логин"
            className="rounded-none border border-orochimaru  "
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Пароль"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
          className="text-sm text-black leading-[22px]"
        >
          <Input.Password
            placeholder="Введите пароль"
            className="rounded-none border border-orochimaru  "
          />
        </Form.Item>
        <div className="mb-4">
          <Link to="/auth/signup" className=" text-linkColor font-normal text-sm leading-[22px]">Вход</Link>
        </div>
      </div>

      <Form.Item
        label={null}
        className="mb-0 border-t flex justify-center py-[15px]"
      >
        <Button
          type="primary"
          htmlType="submit"
          className="w-fit font-roboto py-[5px] px-4 text-sm leading-[22px] rounded-none text-white"
          style={{
            backgroundColor: "#7CB305",
            borderColor: "#8BC34A",
            color: "white",
          }}
        >
          Вход
        </Button>
      </Form.Item>
    </Form>
  </div>
  );
};

export default SignUp;
