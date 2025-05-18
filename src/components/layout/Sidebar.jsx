import {
  FaHome,
  FaBuilding,
  FaBoxes,
  FaWarehouse,
  FaReceipt,
  FaUserTie,
  FaTable,
  FaDolly,
  FaFileExport,
  FaBoxOpen,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import SidebarItem from "./SidebarItem";
import { useSubscription } from "../../context/SubscriptionContext";

const Sidebar = ({ isMini }) => {
  const { userRole } = useAuth();
  const { subscription, loading, error } = useSubscription();
  
  if (userRole === null) {
    return <div>Loading...</div>;
  }

  const sidebarItems = {
    admin: [
      { icon: <FaHome />, text: "Statistika", link: "/dashboard" },
      { icon: <FaBuilding />, text: "Şirkətlər", link: "/companies" },
    ],
    boss: [
      {
        icon: <FaHome />,
        text: "Statistika",
        link: "/dashboard",
      },
      {
        icon: <FaUserTie />,
        text: "İşçilər",
        link: "/employees",
        visibleForPackages: ["Silver", "Gold"],
      },
      {
        icon: <FaReceipt />,
        text: "Sifarişlər",
        link: "/orders",
        visibleForPackages: ["Bronze", "Silver", "Gold"],
        subMenu: [
          { text: "Tamamlanmış", link: "/orders/shipped" },
          { text: "Hazırlanmış", link: "/orders/prepared" },
          { text: "Yoxlanılmış", link: "/orders/stockconfirmed" },
          { text: "Aktiv", link: "/orders/submitted" },
          { text: "İmtina", link: "/orders/cancelled" },
        ],
      },
      {
        icon: <FaBoxes />,
        text: "Məhsullar",
        link: "/products",
        //visibleForPackages: ["Gold"],
      },
      {
        icon: <FaUserTie />,
        text: "Müştərilər",
        link: "/customers",
      },
      {
        icon: <FaWarehouse />,
        text: "Anbarlar",
        link: "/warehouses",
      },
      { icon: <FaTable />, text: "Rəflər", link: "/shelves", visibleForPackages: ["Bronze"], },
      {
        icon: <FaDolly />,
        text: "Yerləşdirmə",
        link: "/deploy",
        visibleForPackages: ["Bronze"],
      },
      {
        icon: <FaBoxOpen />,
        text: "Yükləmə",
        link: "/unload",
        visibleForPackages: ["Bronze"],
      },
      {
        icon: <FaFileExport />,
        text: "Çıxarışlar",
        link: "/exports",
        visibleForPackages: ["Gold"],
      },
    ],
    warehouseman: [
      { icon: <FaTable />, text: "Rəflər", link: "/shelves" },
      { icon: <FaDolly />, text: "Yerləşdirmə", link: "/deploy" },
      {
        icon: <FaReceipt />,
        text: "Sifarişlər",
        link: "/orders",
        subMenu: [
          { text: "Tamamlanmış", link: "/orders/completed" },
          { text: "Aktiv", link: "/orders/stockconfirmed" },
        ],
      },
    ],
  };

  return (
    <aside className={isMini ? "mini-show" : ""}>
      <Link to="/dashboard" id="aside_head">
        <img src="/public/images/Logo.png" alt="" />
        <p>Sandal</p>
      </Link>
      <ul>
        {sidebarItems[userRole]
          .filter((item) => {
            if (!item.visibleForPackages) return true;
            return item.visibleForPackages.includes(subscription);
          })
          .map((item, index) => (
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
Sidebar.propTypes = {
  isMini: PropTypes.bool.isRequired,
};
Sidebar.defaultProps = {
  isMini: false,
};
export default Sidebar;
