import {
  FaUser,
  FaHome,
  FaBuilding,
  FaBoxes,
  FaWarehouse,
  FaReceipt,
  FaUserTie,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import SidebarItem from "./SidebarItem";


const Sidebar = ({ isMini }) => {
  const { userRole } = useAuth();

  if (userRole === null) {
    return <div>Loading...</div>;
  }

  const sidebarItems = {
    admin: [
      { icon: <FaHome />, text: "Statistika", link: "/dashboard" },
      { icon: <FaHome />, text: "İşçilər", link: "/workers" },
      { icon: <FaBuilding />, text: "Şirkətlər", link: "/companies" },
    ],
    boss: [
      { icon: <FaHome />, text: "Statistika", link: "/dashboard" },
      { icon: <FaUserTie />, text: "İşçilər", link: "/employees" },
      {
        icon: <FaReceipt />,
        text: "Sifarişlər",
        link: "/orders",
        subMenu: [
          { text: "Tamamlanmış", link: "/orders/completed" },
          { text: "Aktiv", link: "/orders/active" },
        ],
      },
      { icon: <FaBoxes />, text: "Məhsullar", link: "/products" },
      { icon: <FaWarehouse />, text: "Anbarlar", link: "/warehouses" },
    ],
    warehouseman: [
      { icon: <FaHome />, text: "Statistika", link: "/dashboard" },
      { icon: <FaUser />, text: "İstifadəçilər", link: "/users" },
      { icon: <FaHome />, text: "İşçilər", link: "/workers" },
      { icon: <FaWarehouse />, text: "Anbarlar", link: "/warehouses" },
    ],
  };

  return (
    <aside className={isMini ? "mini-show" : ""}>
      <Link to="/dashboard" id="aside_head">
        <img src="/src/assets/images/Logo.png" alt="" />
        <p>Sandal</p>
      </Link>
      <ul>
        {sidebarItems[userRole].map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            link={item.link}
            subMenu={item.subMenu}
          />
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
