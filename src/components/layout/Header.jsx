import { FaBell, FaChevronDown, FaBars, FaPlus } from "react-icons/fa";
import NotificiationsMenu from "../header/NotificiationsMenu";
import ProfileMenu from "../header/ProfileMenu";
import { useAuth } from "../../context/AuthContext";
function Header({ isMini, toggleSidebar }) {

  const {userName} = useAuth();

  function handleNotificationsClick(event) {
    event.stopPropagation();
    const profileMenu = document.getElementById("profile-menu");
    const notificationsMenu = document.getElementById("notficiations-menu");
    if (profileMenu) profileMenu.style.display = "none";
    if (notificationsMenu) {
      notificationsMenu.style.display =
        notificationsMenu.style.display === "none" ? "block" : "none";
    }
  }

  function handleUserDataClick(event) {
    event.stopPropagation();
    const notificationsMenu = document.getElementById("notficiations-menu");
    const profileMenu = document.getElementById("profile-menu");
    if (notificationsMenu) notificationsMenu.style.display = "none";
    if (profileMenu) {
      profileMenu.style.display =
        profileMenu.style.display === "none" ? "block" : "none";
    }
  }

  return (
    <header className={isMini ? "show-more" : ""}>
      <div id="header-left">
        <FaBars id="menubtn" onClick={toggleSidebar} />
        <input type="text" placeholder="Axtar..." />
      </div>
      <div id="header-right">
        <a href="#" className="addrow" id="adddata">
          <FaPlus />
          <p>Yeni işçi</p>
        </a>
        <FaBell
          id="notficiationsbtn"
          className="hasnot"
          onClick={handleNotificationsClick}
        />
        <div id="user-data" onClick={handleUserDataClick}>
          <img
            src="/public/Images/ProfilePictures/Yagmur_Novruzov.jpg"
            alt=""
          />
          <p>{userName}</p>
          <FaChevronDown />
        </div>
      </div>

      <NotificiationsMenu />
      <ProfileMenu />
    </header>
  );
}

export default Header;
