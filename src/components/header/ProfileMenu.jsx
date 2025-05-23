import { FaCog, FaSignOutAlt, FaUser } from "react-icons/fa"
import Cookies from "js-cookie";


function ProfileMenu() {
  const logout = () => {
    localStorage.removeItem("token");
    Cookies.remove("subscription");
    window.location.href = "/login";
  };
  return (
    <div id="profile-menu">
        <div className="header">
          <p className="title">Profil menyu</p>
        </div>
        <div className="content">
          <a href="#">
            <FaUser />
            <p>Profilim</p>
          </a>
          <a href="#">
            <FaCog />
            <p>Parametrlər</p>
          </a>
          <button className="logout" onClick={logout}>
            <FaSignOutAlt />
            <p>Çıxış</p>
          </button>
        </div>
      </div>
  )
}

export default ProfileMenu