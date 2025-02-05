import { FaBell, FaChevronDown, FaBars, FaPlus } from "react-icons/fa";
function Header({isMini, toggleSidebar}) {
  return (
    <header className={isMini ? "show-more" : ""}>
      <div id="header-left">
        <FaBars id="menubtn" onClick={toggleSidebar}/>
        <input type="text" placeholder="Axtar..." />
      </div>
      <div id="header-right">
        <a href="#" className="addrow" id="adddata">
          <FaPlus />  
          <p>Yeni işçi</p>
        </a>
        <FaBell id="notficiationsbtn" className="hasnot" />
        <div id="user-data">
          <img
            src="/public/Images/ProfilePictures/Yagmur_Novruzov.jpg"
            alt=""
          />
          <p>Yagmur N.</p>
          <FaChevronDown />
        </div>
      </div>

      <div id="notficiations-menu">
        <div className="header">
          <p className="title">Bildirişlər</p>
          <p className="new">4 yeni</p>
        </div>
        <div className="content">
          <div className="alert">
            <i className="fas fa-cog settings-alert"></i>
            <div className="alert-content">
              <p className="message">Hesabınızın şifrəsi uğurla dəyişdirildi</p>
              <p className="time">
                <i className="fas fa-history"></i> 2 saat əv.
              </p>
            </div>
          </div>
          <div className="alert">
            <i className="fas fa-comment-dots message-alert"></i>
            <div className="alert-content">
              <p className="message">Oxunamamış mesajlarınız var</p>
              <p className="time">
                <i className="fas fa-history"></i> 5 saat əv.
              </p>
            </div>
          </div>
          <a className="seeall" href="#">
            Hamısına bax <i className="fas fa-long-arrow-alt-right"></i>
          </a>
        </div>
      </div>
      <div id="profile-menu">
        <div className="header">
          <p className="title">Profil menyu</p>
        </div>
        <div className="content">
          <a href="#">
            <i className="fas fa-user"></i>
            <p>Profilim</p>
          </a>
          <a href="#">
            <i className="fas fa-cog"></i>
            <p>Parametrlər</p>
          </a>
          <a className="logout" href="#">
            <i className="fas fa-sign-out-alt"></i>
            <p>Çıxış</p>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
