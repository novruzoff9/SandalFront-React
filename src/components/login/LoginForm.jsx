import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../../services/axiosConfig";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("Nov2005!!");
  const [roles, setRoles] = useState("");
  const [error, setError] = useState(""); // setError metodu üçün state əlavə edildi
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    try {
      const response = await axiosInstance.post("/get-token", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 200) {
        throw new Error(response.data || "Login failed");
      }

      const data = await response.data;
      const token = data.access_token;
      localStorage.setItem("token", token);

      const decodedToken = await jwtDecode(token);
      console.log(decodedToken);
      

      Redirect(decodedToken.roles);
    } catch (error) {
      let errorMessage = "Giriş zamanı xəta baş verdi.";
      if (error.response && error.response.data && error.response.data.Message) {
        errorMessage = error.response.data.Message;
      }
      setError(errorMessage); // Xətanı ekrana çıxarmaq üçün setError istifadə olunur
    }
  };

  const Redirect = (role) => {
    if (role === "admin" || role === "boss" || role === "warehouseman") {
      window.location.href = "/dashboard";
    } else {
      console.error("Rol tapılmadı!");
    }
  };

  const handleGuestLogin = () => {
    navigate("/views/user/Companies.html");
  };

  return (
    <section className="login-container">
      <div className="login-box">
        <h2>Xoş Gəlmisiniz</h2>
        <form id="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">İstifadəçi Adı</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Şifrə</label>
            <input
              type="text"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
              {error}
            </div>
          )}
          <button type="submit" className="btn-login">
            Daxil Ol
          </button>
          <p className="signup-link">
            Hesabınız yoxdur? <a href="/register">Qeydiyyatdan keçin</a>
          </p>
          <button
            type="button"
            id="guest-login"
            className="btn-guest"
            onClick={handleGuestLogin}
          >
            Qonaq kimi daxil ol
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginForm;
