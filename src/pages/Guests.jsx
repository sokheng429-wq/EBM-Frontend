import { useState } from "react";

const styles = {
    adminBody: {
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#f4f6f4",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        margin: 0,
        padding: 0,
        color: "#2d2d2d",
    },

    // Sidebar
    sidebar: {
        width: "230px",
        backgroundColor: "#1b4332",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        position: "sticky",
        top: 0,
        height: "100vh",
        flexShrink: 0,
    },
    logo: {
        fontSize: "22px",
        fontWeight: "700",
        color: "#ffffff",
        padding: "0 24px 28px 24px",
        letterSpacing: "1px",
    },
    logoSpan: { color: "#52b788" },
    adminNav: {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        flex: 1,
        padding: "0 12px",
    },
    navLink: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "11px 14px",
        borderRadius: "8px",
        textDecoration: "none",
        color: "#b7e4c7",
        fontSize: "14px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
    },
    navLinkActive: {
        backgroundColor: "#2d6a4f",
        color: "#ffffff",
        fontWeight: "600",
    },
    navLinkLogout: {
        color: "#f87171",
        marginTop: "32px",
    },

    // Main
    adminMain: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
    },

    // Header
    adminHeader: {
        backgroundColor: "#ffffff",
        padding: "18px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid #e2ece2",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        gap: "16px",
    },
    adminHeaderH2: {
        margin: "0 0 4px 0",
        fontSize: "18px",
        fontWeight: "700",
        color: "#1b4332",
    },
    currentDate: {
        margin: 0,
        fontSize: "13px",
        color: "#888",
    },
    printBtn: {
        backgroundColor: "#1b4332",
        color: "#fff",
        border: "none",
        padding: "10px 22px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: "600",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "background 0.2s",
        flexShrink: 0,
    },
    printBtnHover: {
        backgroundColor: "#2d6a4f",
    },

    // Content
    contentArea: {
        padding: "24px 32px",
    },

    // Table
    tableContainer: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        overflow: "hidden",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "14px",
    },
    th: {
        textAlign: "left",
        padding: "12px 16px",
        backgroundColor: "#f0f7f2",
        color: "#2d6a4f",
        fontWeight: "600",
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        whiteSpace: "nowrap",
    },
    td: {
        padding: "14px 16px",
        borderBottom: "1px solid #eef3ee",
        color: "#444",
        verticalAlign: "middle",
    },
    tdStrong: {
        fontWeight: "600",
        color: "#1b4332",
    },

    // Dietary Tags
    tagVegetarian: {
        backgroundColor: "#d1fae5",
        color: "#065f46",
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
    },
    tagNone: {
        backgroundColor: "#f3f4f6",
        color: "#6b7280",
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
    },
    tagAllergy: {
        backgroundColor: "#fee2e2",
        color: "#991b1b",
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
    },

    // View Detail Button
    viewDetailBtn: {
        backgroundColor: "#e8f5e9",
        color: "#2d6a4f",
        border: "1.5px solid #a7d7b8",
        borderRadius: "6px",
        padding: "6px 14px",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        textDecoration: "none",
        display: "inline-block",
        transition: "background 0.2s",
    },
    viewDetailBtnHover: {
        backgroundColor: "#c8e6c9",
    },
};

const navItems = [
    { label: "Dashboard", icon: "⊞", href: "/admin", active: false },
    { label: "Bookings Lists", icon: "📅", href: "/admin/bookings", active: false },
    { label: "Guests", icon: "👥", href: "/admin/guests", active: true },
    { label: "Reports", icon: "📈", href: "/admin/reports", active: false },
];

const dietaryStyle = (note) => {
    if (note === "Vegetarian") return styles.tagVegetarian;
    if (note === "None") return styles.tagNone;
    return styles.tagAllergy;
};

const dietaryEmoji = (note) => {
    if (note === "Vegetarian") return "🥦 ";
    if (note === "None") return "";
    return "⚠️ ";
};

const guests = [
    {
        name: "Chan Molika",
        groupSize: "2 Adults",
        pickup: "Nature Lodge",
        tour: "River Bathing",
        dietary: "Vegetarian",
    },
    {
        name: "David Miller",
        groupSize: "1 Adult",
        pickup: "Green House Hostel",
        tour: "Overnight",
        dietary: "None",
    },
    {
        name: "Sok Nimol",
        groupSize: "3 Adults",
        pickup: "Sen Monorom Center",
        tour: "Full-Day",
        dietary: "Peanut Allergy",
    },
];

export default function Guests() {
    const [hoveredNav, setHoveredNav] = useState(null);
    const [hoveredPrint, setHoveredPrint] = useState(false);
    const [hoveredView, setHoveredView] = useState(null);

    return (
        <div style={styles.adminBody}>
            {/* Sidebar */}
            <aside style={styles.sidebar}>
                <div style={styles.logo}>
                    Mondul<span style={styles.logoSpan}>Kiri</span>
                </div>
                <nav style={styles.adminNav}>
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
                    <a
                        href="/"
                        style={{
                            ...styles.navLink,
                            ...styles.navLinkLogout,
                            ...(hoveredNav === "logout" ? { backgroundColor: "#3b1212" } : {}),
                        }}
                        onMouseEnter={() => setHoveredNav("logout")}
                        onMouseLeave={() => setHoveredNav(null)}
                    >
                        <span>🚪</span>
                        Logout
                    </a>
                </nav>
            </aside>

            {/* Main */}
            <main style={styles.adminMain}>
                {/* Header */}
                <header style={styles.adminHeader}>
                    <div>
                        <h2 style={styles.adminHeaderH2}>Daily Guest Manifest</h2>
                        <p style={styles.currentDate}>📅 Date: March 15, 2026</p>
                    </div>
                    <button
                        style={{
                            ...styles.printBtn,
                            ...(hoveredPrint ? styles.printBtnHover : {}),
                        }}
                        onMouseEnter={() => setHoveredPrint(true)}
                        onMouseLeave={() => setHoveredPrint(false)}
                        onClick={() => window.print()}
                    >
                        🖨️ Print List
                    </button>
                </header>

                {/* Content */}
                <div style={styles.contentArea}>
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                {[
                                    "Guest Name",
                                    "Group Size",
                                    "Pickup Location",
                                    "Tour Type",
                                    "Dietary Notes",
                                    "Action",
                                ].map((col) => (
                                    <th key={col} style={styles.th}>
                                        {col}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {guests.map((g, i) => (
                                <tr key={i}>
                                    <td style={styles.td}>
                                        <strong style={styles.tdStrong}>{g.name}</strong>
                                    </td>
                                    <td style={styles.td}>{g.groupSize}</td>
                                    <td style={styles.td}>{g.pickup}</td>
                                    <td style={styles.td}>{g.tour}</td>
                                    <td style={styles.td}>
                      <span style={dietaryStyle(g.dietary)}>
                        {dietaryEmoji(g.dietary)}{g.dietary}
                      </span>
                                    </td>
                                    <td style={styles.td}>
                                        <a
                                            href="/admin/guests/detail"
                                            style={{
                                                ...styles.viewDetailBtn,
                                                ...(hoveredView === i ? styles.viewDetailBtnHover : {}),
                                            }}
                                            onMouseEnter={() => setHoveredView(i)}
                                            onMouseLeave={() => setHoveredView(null)}
                                        >
                                            View Detail
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}