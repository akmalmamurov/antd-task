import type { FormProps } from "antd";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import * as API from "@/constants/api";
import { useCreateData } from "@/hooks/createData";
import useStore from "@/context/store";

type FieldType = {
  login?: string;
  password?: string;
};

const SignIn = () => {
  const { mutate, isPending } = useCreateData<FieldType>(API.SIGN_IN);
  const navigate = useNavigate();
  const { setAuth } = useStore();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(
      { newData: values, key: API.SIGN_IN },
      {
        onSuccess: (response) => {
          message.success("Successfully login!");
          navigate("/");
          localStorage.setItem("token", response as string);
          setAuth(true);
        },
        onError: (error) => {
          message.error("Login failed.");
          console.error(error);
        },
      }
    );
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-white flex flex-col justify-center pt-6 font-roboto rounded-sm">
      <h3 className="font-bold text-[36px] text-black leading-[22px] mb-[21px] text-left pl-6">
        Вход
      </h3>

      <Form
        layout="vertical"
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <div className="pl-6 pr-[42px]">
          <Form.Item<FieldType>
            label="Логин"
            name="login"
            rules={[{ required: true, message: "Please input your login!" }]}
            className="text-sm text-black leading-[22px]"
          >
            <Input
              placeholder="Введите логин"
              className="rounded-none border border-orochimaru"
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
              className="rounded-none border border-orochimaru"
            />
          </Form.Item>
          <div>
            <Link
              to="/auth/signup"
              className=" text-linkColor font-normal text-sm leading-[22px]"
            >
              Регистрация
            </Link>
          </div>
        </div>

        <Form.Item
          label={null}
          className="mb-0 border-t flex justify-center py-[15px]"
        >
          <Button
            loading={isPending}
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

export default SignIn;
