import useStore from "@/context/store";

const Header = () => {
  const { logout } = useStore();
  const handleLogout = () => logout();
  return (
    <header className="bg-offBlack text-white py-4 px-[15px] flex justify-between items-center">
      <h3>Компании</h3>
      <div className="flex items-center gap-5">
        <button onClick={handleLogout}>Logout</button>
        <button className="w-[166px] py-1.5 bg-[#08979C] font-normal text-sm leading-[22px] rounded-[4px]">
          Добавить компания
        </button>
      </div>
    </header>
  );
};

export default Header;
