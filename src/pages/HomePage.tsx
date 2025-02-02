import Container from "@/container/Container";
import { tableData } from "@/data";
import { useGetData } from "@/hooks/fetch-data";
import { CiMenuKebab } from "react-icons/ci";
import { Dropdown, Modal, Pagination, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useDeleteData } from "@/hooks/delete-data";
import Dialog from "@/components/modal/Modal";

interface Company {
  id: string;
  name: string;
  count: number;
}

const HomePage = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [editData, setEditData] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useGetData<Company[]>("companies/get-all");

  const total = data?.length || 0;
  const startIndex = (pageIndex - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = data?.slice(startIndex, endIndex) || [];

  const { mutate: deleteCompany } = useDeleteData();

  const createMenuItems = (companyId: string) => [
    {
      key: "edit",
      label: (
        <div
          className="flex items-center gap-2"
          onClick={() => {
            setEditData(companyId);
            setEditOpen(true);
          }}
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
          onClick={() => {
            setSelected(companyId);
            setDeleteOpen(true);
          }}
        >
          <DeleteOutlined />
          Удалить
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    if (selected) {
      deleteCompany(selected);
      setSelected(null);
      setDeleteOpen(false);
      message.success("Company deleted successfully");
    }
  };

  return (
    <div className="py-5">
      <Container>
        <table className="table-auto w-full border">
          <thead className="border">
            <tr>
              {tableData.map((item, index) => (
                <th
                  key={index}
                  className="p-4 text-left font-medium text-sm leading-[22px] text-titleColor"
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
              currentData.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50 border-b">
                  <td className="p-4 font-normal text-sm leading-[22px] text-titleColor">
                    {company.name}
                  </td>
                  <td className="p-4 font-normal text-sm leading-[22px] text-titleColor">
                    {company.count} человек
                  </td>
                  <td className="p-4 text-end font-normal text-sm leading-[22px] text-titleColor">
                    <Dropdown
                      menu={{ items: createMenuItems(company.id) }}
                      trigger={["click"]}
                    >
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

        <div className="flex justify-center mt-4">
          <Pagination
            current={pageIndex}
            pageSize={pageSize}
            total={total}
            onChange={(page, pageSize) => {
              setPageIndex(page);
              setPageSize(pageSize);
            }}
            showSizeChanger
            pageSizeOptions={["10", "20", "50", "100"]}
          />
        </div>
      </Container>
      {deleteOpen && (
        <Modal
          open={deleteOpen}
          onCancel={() => setDeleteOpen(false)}
          width={215}
          closeIcon={null}
          footer={null}
        >
          <div className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <ExclamationCircleOutlined className="text-2xl text-orange-500" />
              <h3 className="font-normal text-sm leading-[22px] text-titleColor">
                Вы хотите удалить?
              </h3>
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteOpen(false)}
                className="px-[7px] border border-orochimaru font-normal text-sm leading-[22px]"
              >
                Нет
              </button>
              <button
                onClick={handleDelete}
                className="border border-dangerColor px-[7px] font-normal text-sm leading-[22px]"
              >
                Да
              </button>
            </div>
          </div>
        </Modal>
      )}
      <Dialog
        isModalOpen={editOpen}
        handleOpen={() => setEditOpen(!editOpen)}
        editData={editData || undefined}
      />
    </div>
  );
};

export default HomePage;
