import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../services/api";

export default function ResetPassword() {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract Supabase tokens from URL hash or query parameters
    const getTokensFromLocation = () => {
        // Check URL hash first (Supabase typically uses this)
        const hash = location.hash;
        if (hash) {
            const hashParams = new URLSearchParams(hash.substring(1));
            const access_token = hashParams.get('access_token');
            const refresh_token = hashParams.get('refresh_token');
            if (access_token && refresh_token) {
                return { access_token, refresh_token };
            }
        }
        
        // Check query parameters as fallback
        const searchParams = new URLSearchParams(location.search);
        const access_token = searchParams.get('access_token');
        const refresh_token = searchParams.get('refresh_token');
        
        return { access_token, refresh_token };
    };

    const [tokens] = useState(getTokensFromLocation());
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!tokens.access_token || !tokens.refresh_token) {
            setError("Reset tokens not found. Check your link.");
        }
    }, [tokens]);

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
        if (!tokens.access_token || !tokens.refresh_token) {
            setError("Missing reset tokens.");
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
            const data = await resetPassword(tokens.access_token, tokens.refresh_token, password);
            setSuccess(data.message || "Password has been reset. Redirecting to login...");
            setLoading(false);

            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to reset password. Please try again.");
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

            {/* <div style={{ marginTop: 12, fontSize: 13, color: "#666" }}>
                Already have an account?{" "}
                <button
                    onClick={() => navigate("/")}
                    style={{ color: "#0366d6", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
                >
                    Sign in
                </button>
            </div> */}
        </div>
    );
}
