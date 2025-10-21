import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();

    // Token can come from route param (/reset/:token) or query string (?token=...)
    const getTokenFromLocation = () => {
        if (params && params.token) return params.token;
        const q = new URLSearchParams(location.search);
        return q.get("token") || "";
    };

    const [token] = useState(getTokenFromLocation());
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!token) {
            setError("Reset token not found. Check your link.");
        }
    }, [token]);

    const validate = () => {
        setError("");
        if (!password || !confirm) {
            setError("Please fill in both fields.");
            return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return false;
        }
        if (password !== confirm) {
            setError("Passwords do not match.");
            return false;
        }
        if (!token) {
            setError("Missing reset token.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.message || "Failed to reset password.");
                setLoading(false);
                return;
            }

            setSuccess(data.message || "Password has been reset. Redirecting to login...");
            setLoading(false);

            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError("Network error. Try again.");
            setLoading(false);
        }
    };

    const containerStyle = {
        maxWidth: 420,
        margin: "48px auto",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        fontFamily: "Segoe UI, Roboto, sans-serif",
    };

    const inputStyle = {
        width: "100%",
        padding: "10px 12px",
        marginTop: 6,
        marginBottom: 12,
        borderRadius: 6,
        border: "1px solid #ccc",
        fontSize: 14,
    };

    const btnStyle = {
        width: "100%",
        padding: "10px 12px",
        borderRadius: 6,
        border: "none",
        backgroundColor: "#0366d6",
        color: "#fff",
        fontSize: 15,
        cursor: "pointer",
    };

    return (
        <div style={containerStyle}>
            <h2 style={{ margin: 0, marginBottom: 8 }}>Reset Password</h2>
            <p style={{ color: "#555", marginTop: 0, marginBottom: 18 }}>
                Enter a new password for your account.
            </p>

            {error && (
                <div style={{ color: "#b00020", marginBottom: 12, fontSize: 14 }}>{error}</div>
            )}
            {success && (
                <div style={{ color: "#056608", marginBottom: 12, fontSize: 14 }}>{success}</div>
            )}

            <form onSubmit={handleSubmit}>
                <label style={{ fontSize: 13, color: "#333" }}>New password</label>
                <div style={{ position: "relative" }}>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={inputStyle}
                        placeholder="Enter new password"
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        style={{
                            position: "absolute",
                            right: 8,
                            top: 10,
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: "#0366d6",
                            fontSize: 13,
                        }}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>

                <label style={{ fontSize: 13, color: "#333" }}>Confirm password</label>
                <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    style={inputStyle}
                    placeholder="Confirm new password"
                    autoComplete="new-password"
                />

                <button type="submit" style={btnStyle} disabled={loading}>
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </form>

            <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
                Already have an account?{" "}
                <button
                    onClick={() => navigate("/login")}
                    style={{ color: "#0366d6", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                >
                    Sign in
                </button>
            </div>
        </div>
    );
}