import useStore from "@/context/store";
import Container from "@/container/Container";
import { useState } from "react";
import Dialog from "../modal/Modal";
import { RiLogoutCircleLine } from "react-icons/ri";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpen = () => setIsModalOpen(!isModalOpen);

  const { logout } = useStore();
  const handleLogout = () => logout();
  return (
    <header className="bg-offBlack text-white py-4 ">
      <Container className="flex items-center justify-between">
        <h3>Компании</h3>
        <div className="flex items-center gap-5">
          <button onClick={handleLogout}>
            <RiLogoutCircleLine className="text-2xl" />
          </button>
          <button
            onClick={handleOpen}
            className="w-[166px] py-1.5 bg-buttonColor hover:bg-buttonColor/80 font-normal text-sm leading-[22px] rounded-[4px]"
          >
            Добавить компания
          </button>
        </div>
      </Container>
      <Dialog isModalOpen={isModalOpen} handleOpen={handleOpen} />
    </header>
  );
};

export default Header;
