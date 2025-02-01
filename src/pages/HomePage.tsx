import Container from "@/container/Container";
import { tableData } from "@/data";
import { useGetData } from "@/hooks/fetch-data";
import { CiMenuKebab } from "react-icons/ci";
import { Dropdown, Menu } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface Company {
  id: string;
  name: string;
  count: number;
}

const HomePage = () => {
  const { data, isLoading } = useGetData<Company[]>(`companies/get-all`);

  // Dropdown menyu uchun elementlar
  const menu = (companyId: string) => (
    <Menu
      items={[
        {
          key: "edit",
          label: (
            <div
              className="flex items-center gap-2"
              onClick={() => console.log(`Edit company: ${companyId}`)}
            >
              <EditOutlined />
              Изменить
            </div>
          ),
        },
        {
          key: "delete",
          label: (
            <div
              className="flex items-center gap-2 text-red-500"
              onClick={() => console.log(`Delete company: ${companyId}`)}
            >
              <DeleteOutlined />
              Удалить
            </div>
          ),
        },
      ]}
    />
  );

  return (
    <div className="py-5">
      <Container>
        <table className="table-auto w-full border ">
          <thead className="border">
            <tr>
              {tableData.map((item, index) => (
                <th
                  key={index}
                  className="p-4 text-left font-medium text-sm leadin-[22px] text-titleColor"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={3} className="text-center py-4">
                  Загрузка...
                </td>
              </tr>
            ) : (
              data?.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 border-b">
                  <td className="p-4 font-normal text-sm leading-[22px] text-titleColor">
                    {company.name}
                  </td>
                  <td className=" p-4 font-normal text-sm leading-[22px] text-titleColor">
                    {company.count} человек
                  </td>
                  <td className="p-4 text-end font-normal text-sm leading-[22px] text-titleColor">
                    <Dropdown overlay={menu(company.id)} trigger={["click"]}>
                      <button className="text-black">
                        <CiMenuKebab className="text-xl" />
                      </button>
                    </Dropdown>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Container>
    </div>
  );
};

export default HomePage;
