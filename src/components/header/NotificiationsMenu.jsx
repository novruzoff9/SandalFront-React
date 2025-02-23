import { FaCog, FaCommentDots, FaHistory } from "react-icons/fa";

function NotificiationsMenu() {
  return (
    <div id="notficiations-menu">
      <div className="header">
        <p className="title">Bildirişlər</p>
        <p className="new">4 yeni</p>
      </div>
      <div className="content">
        <div className="alert">
          <FaCog className="settings-alert"/>
          <div className="alert-content">
            <p className="message">Hesabınızın şifrəsi uğurla dəyişdirildi</p>
            <p className="time">
              <FaHistory /> 2 saat əv.
            </p>
          </div>
        </div>
        <div className="alert">
          <FaCommentDots className="message-alert"/>
          <div className="alert-content">
            <p className="message">Oxunamamış mesajlarınız var</p>
            <p className="time">
              <FaHistory /> 5 saat əv.
            </p>
          </div>
        </div>
        <a className="seeall" href="#">
          Hamısına bax <i className="fas fa-long-arrow-alt-right"></i>
        </a>
      </div>
    </div>
  );
}

export default NotificiationsMenu;
