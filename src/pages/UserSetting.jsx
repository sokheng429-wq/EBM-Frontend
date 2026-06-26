import { useState } from "react";

const styles = {
    body: {
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        backgroundColor: "#f0f4f0",
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        color: "#2d2d2d",
    },

    // Header
    header: {
        backgroundColor: "#1b4332",
        padding: "12px 0",
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
    },
    headerContainer: {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    logo: {
        fontSize: "24px",
        fontWeight: "700",
        color: "#ffffff",
        letterSpacing: "1px",
    },
    logoSpan: { color: "#52b788" },
    userProfileTop: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "#d8f3dc",
        fontSize: "14px",
    },
    avatarSm: {
        backgroundColor: "#52b788",
        color: "#fff",
        borderRadius: "50%",
        width: "36px",
        height: "36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "700",
        fontSize: "13px",
    },
    logoutLink: {
        color: "#d8f3dc",
        textDecoration: "none",
        fontSize: "18px",
        cursor: "pointer",
    },

    // Layout
    dashboardGrid: {
        maxWidth: "1200px",
        margin: "32px auto",
        padding: "0 24px",
        display: "grid",
        gridTemplateColumns: "220px 1fr",
        gap: "28px",
        alignItems: "start",
    },

    // Sidebar
    sidebar: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "16px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    },
    sideMenu: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
    },
    navLink: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "11px 14px",
        borderRadius: "8px",
        textDecoration: "none",
        color: "#4a4a4a",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
    },
    navLinkActive: {
        backgroundColor: "#d8f3dc",
        color: "#1b4332",
        fontWeight: "600",
    },

    // Content
    dashboardContent: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },

    // Content Header
    contentHeader: {
        borderBottom: "2px solid #d8f3dc",
        paddingBottom: "16px",
    },
    contentH2: {
        margin: "0 0 6px 0",
        fontSize: "22px",
        fontWeight: "700",
        color: "#1b4332",
    },
    contentP: {
        margin: 0,
        fontSize: "14px",
        color: "#777",
    },

    // Settings Container
    settingsContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },

    // Detail Card
    detailCard: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
    },
    cardH3: {
        margin: "0 0 20px 0",
        fontSize: "16px",
        fontWeight: "700",
        color: "#1b4332",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        paddingBottom: "12px",
        borderBottom: "1px solid #e8f0e8",
    },

    // Form
    inputRow: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "16px",
        marginBottom: "16px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "6px",
        marginBottom: "16px",
    },
    label: {
        fontSize: "13px",
        fontWeight: "600",
        color: "#555",
    },
    input: {
        padding: "10px 14px",
        borderRadius: "8px",
        border: "1.5px solid #d0e8d0",
        fontSize: "14px",
        color: "#333",
        outline: "none",
        transition: "border-color 0.2s",
        backgroundColor: "#f8faf8",
    },
    inputFocus: {
        borderColor: "#40916c",
        backgroundColor: "#fff",
    },

    // Buttons
    ctaBtn: {
        backgroundColor: "#1b4332",
        color: "#fff",
        border: "none",
        padding: "11px 28px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        marginTop: "4px",
        transition: "background 0.2s",
    },
    ctaBtnHover: {
        backgroundColor: "#2d6a4f",
    },
    btnOutline: {
        backgroundColor: "transparent",
        color: "#40916c",
        border: "1.5px solid #40916c",
        padding: "10px 28px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        marginTop: "4px",
        transition: "background 0.2s, color 0.2s",
    },
    btnOutlineHover: {
        backgroundColor: "#40916c",
        color: "#fff",
    },

    // Toggle Group
    toggleGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
    },
    toggleItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 16px",
        backgroundColor: "#f8faf8",
        borderRadius: "8px",
        border: "1px solid #e8f0e8",
    },
    toggleLabel: {
        fontSize: "14px",
        color: "#444",
    },
    checkbox: {
        width: "18px",
        height: "18px",
        accentColor: "#40916c",
        cursor: "pointer",
    },
};

const navItems = [
    { label: "My Dashboard", icon: "🏠", href: "/customer", active: false },
    { label: "New Booking", icon: "➕", href: "/booking", active: false },
    { label: "My History", icon: "🕐", href: "/customer/history", active: false },
    { label: "Settings", icon: "⚙️", href: "/customer/settings", active: true },
];

const notifications = [
    { id: "bookingUpdates", label: "Email me about booking updates" },
    { id: "sanctuaryNews", label: "Send me sanctuary news and elephant updates" },
];

export default function UserSetting() {
    const [hoveredNav, setHoveredNav] = useState(null);
    const [focusedInput, setFocusedInput] = useState(null);
    const [hoveredSaveBtn, setHoveredSaveBtn] = useState(false);
    const [hoveredPwBtn, setHoveredPwBtn] = useState(false);

    // Personal Info
    const [personal, setPersonal] = useState({
        fullName: "Chan Molika",
        email: "molika.chan@email.com",
        phone: "+855 12 345 678",
        nationality: "Cambodian",
    });

    // Password
    const [password, setPassword] = useState({
        current: "",
        newPw: "",
        confirm: "",
    });

    // Notifications
    const [notifState, setNotifState] = useState({
        bookingUpdates: true,
        sanctuaryNews: true,
    });

    const handlePersonalChange = (e) => {
        setPersonal({ ...personal, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleToggle = (id) => {
        setNotifState({ ...notifState, [id]: !notifState[id] });
    };

    const handleSavePersonal = (e) => {
        e.preventDefault();
        alert("Personal information saved!");
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        if (password.newPw !== password.confirm) {
            alert("New passwords do not match!");
            return;
        }
        alert("Password updated successfully!");
        setPassword({ current: "", newPw: "", confirm: "" });
    };

    return (
        <div style={styles.body}>
            {/* Header */}
            <header style={styles.header}>
                <div style={styles.headerContainer}>
                    <div style={styles.logo}>
                        Mondul<span style={styles.logoSpan}>Kiri</span>
                    </div>
                    <div style={styles.userProfileTop}>
                        <span>Chan Molika</span>
                        <div style={styles.avatarSm}>CM</div>
                        <a href="/" style={styles.logoutLink} title="Logout">
                            🚪
                        </a>
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <main style={styles.dashboardGrid}>
                {/* Sidebar */}
                <aside style={styles.sidebar}>
                    <nav style={styles.sideMenu}>
                        {navItems.map((item, i) => (
                            <a
                                key={i}
                                href={item.href}
                                style={{
                                    ...styles.navLink,
                                    ...(item.active || hoveredNav === i ? styles.navLinkActive : {}),
                                }}
                                onMouseEnter={() => setHoveredNav(i)}
                                onMouseLeave={() => setHoveredNav(null)}
                            >
                                <span>{item.icon}</span>
                                {item.label}
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Content */}
                <div style={styles.dashboardContent}>
                    {/* Header */}
                    <div style={styles.contentHeader}>
                        <h2 style={styles.contentH2}>⚙️ Account Settings</h2>
                        <p style={styles.contentP}>
                            Manage your profile information and security preferences.
                        </p>
                    </div>

                    <div style={styles.settingsContainer}>
                        {/* Personal Information */}
                        <section style={styles.detailCard}>
                            <h3 style={styles.cardH3}>✏️ Personal Information</h3>
                            <form onSubmit={handleSavePersonal}>
                                <div style={styles.inputRow}>
                                    {[
                                        { label: "Full Name", name: "fullName", type: "text" },
                                        { label: "Email Address", name: "email", type: "email" },
                                    ].map((field) => (
                                        <div key={field.name} style={styles.inputGroup}>
                                            <label style={styles.label}>{field.label}</label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                value={personal[field.name]}
                                                onChange={handlePersonalChange}
                                                onFocus={() => setFocusedInput(field.name)}
                                                onBlur={() => setFocusedInput(null)}
                                                style={{
                                                    ...styles.input,
                                                    ...(focusedInput === field.name ? styles.inputFocus : {}),
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div style={styles.inputRow}>
                                    {[
                                        { label: "Phone Number", name: "phone", type: "text" },
                                        { label: "Nationality", name: "nationality", type: "text" },
                                    ].map((field) => (
                                        <div key={field.name} style={styles.inputGroup}>
                                            <label style={styles.label}>{field.label}</label>
                                            <input
                                                type={field.type}
                                                name={field.name}
                                                value={personal[field.name]}
                                                onChange={handlePersonalChange}
                                                onFocus={() => setFocusedInput(field.name)}
                                                onBlur={() => setFocusedInput(null)}
                                                style={{
                                                    ...styles.input,
                                                    ...(focusedInput === field.name ? styles.inputFocus : {}),
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    style={{
                                        ...styles.ctaBtn,
                                        ...(hoveredSaveBtn ? styles.ctaBtnHover : {}),
                                    }}
                                    onMouseEnter={() => setHoveredSaveBtn(true)}
                                    onMouseLeave={() => setHoveredSaveBtn(false)}
                                >
                                    Save Changes
                                </button>
                            </form>
                        </section>

                        {/* Password & Security */}
                        <section style={styles.detailCard}>
                            <h3 style={styles.cardH3}>🔒 Password & Security</h3>
                            <form onSubmit={handleUpdatePassword}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Current Password</label>
                                    <input
                                        type="password"
                                        name="current"
                                        value={password.current}
                                        placeholder="••••••••"
                                        onChange={handlePasswordChange}
                                        onFocus={() => setFocusedInput("current")}
                                        onBlur={() => setFocusedInput(null)}
                                        style={{
                                            ...styles.input,
                                            ...(focusedInput === "current" ? styles.inputFocus : {}),
                                        }}
                                    />
                                </div>
                                <div style={styles.inputRow}>
                                    {[
                                        { label: "New Password", name: "newPw", placeholder: "Enter new password" },
                                        { label: "Confirm New Password", name: "confirm", placeholder: "Confirm new password" },
                                    ].map((field) => (
                                        <div key={field.name} style={styles.inputGroup}>
                                            <label style={styles.label}>{field.label}</label>
                                            <input
                                                type="password"
                                                name={field.name}
                                                value={password[field.name]}
                                                placeholder={field.placeholder}
                                                onChange={handlePasswordChange}
                                                onFocus={() => setFocusedInput(field.name)}
                                                onBlur={() => setFocusedInput(null)}
                                                style={{
                                                    ...styles.input,
                                                    ...(focusedInput === field.name ? styles.inputFocus : {}),
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <button
                                    type="submit"
                                    style={{
                                        ...styles.btnOutline,
                                        ...(hoveredPwBtn ? styles.btnOutlineHover : {}),
                                    }}
                                    onMouseEnter={() => setHoveredPwBtn(true)}
                                    onMouseLeave={() => setHoveredPwBtn(false)}
                                >
                                    Update Password
                                </button>
                            </form>
                        </section>

                        {/* Notifications */}
                        <section style={styles.detailCard}>
                            <h3 style={styles.cardH3}>🔔 Notifications</h3>
                            <div style={styles.toggleGroup}>
                                {notifications.map((n) => (
                                    <div key={n.id} style={styles.toggleItem}>
                                        <span style={styles.toggleLabel}>{n.label}</span>
                                        <input
                                            type="checkbox"
                                            checked={notifState[n.id]}
                                            onChange={() => handleToggle(n.id)}
                                            style={styles.checkbox}
                                        />
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}