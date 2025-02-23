import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('Nov2005!!');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        const clientId = "MVCUserApiClient";
        const clientSecret = "49C1A7E1-0C79-4A89-A3D6-A37998FB86B0";
        const grantType = "password";

        const body = new URLSearchParams();
        body.append("grant_type", grantType);
        body.append("client_id", clientId);
        body.append("client_secret", clientSecret);
        body.append("username", email);
        body.append("password", password);

        try {
            const response = await fetch("http://104.248.36.17:5001/connect/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: body.toString(),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error_description || "Login failed");
            }

            const data = await response.json();
            const token = data.access_token;
            localStorage.setItem("token", token);

            const decodedToken = jwtDecode(token);
            const roles = decodedToken.roles;

            if (roles.includes("admin") || roles.includes("boss") || roles.includes("warehouseman")) {
                navigate("/dashboard");
            } else {
                console.log("Rol tapılmadı!");
            }
        } catch (error) {
            console.log("Error: " + error.message);
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
                    <button type="submit" className="btn-login">Daxil Ol</button>
                    <p className="signup-link">
                        Hesabınız yoxdur? <a href="/register">Qeydiyyatdan keçin</a>
                    </p>
                    <button type="button" id="guest-login" className="btn-guest" onClick={handleGuestLogin}>
                        Qonaq kimi daxil ol
                    </button>
                </form>
            </div>
        </section>
    );
}

export default LoginForm;