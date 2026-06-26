import { useState } from "react";

const styles = {
    // Layout
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
    logoSpan: {
        color: "#52b788",
    },
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
    navLinkHover: {
        backgroundColor: "#2d6a4f",
        color: "#ffffff",
    },
    navLinkLogout: {
        color: "#f87171",
        marginTop: "auto",
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
    },
    adminHeaderH2: {
        margin: 0,
        fontSize: "18px",
        fontWeight: "700",
        color: "#1b4332",
    },
    adminUser: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        color: "#555",
        fontWeight: "500",
    },
    userIcon: {
        fontSize: "28px",
        color: "#40916c",
    },

    // Content area
    contentArea: {
        padding: "28px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "28px",
    },

    // Stats
    adminStats: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
    },
    statCard: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "22px 24px",
        display: "flex",
        alignItems: "center",
        gap: "18px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        borderLeft: "4px solid #52b788",
    },
    statIcon: {
        fontSize: "32px",
        color: "#40916c",
    },
    statLabel: {
        margin: "0 0 4px 0",
        fontSize: "13px",
        color: "#888",
        fontWeight: "500",
    },
    statValue: {
        margin: 0,
        fontSize: "28px",
        fontWeight: "700",
        color: "#1b4332",
    },

    // Table section
    tableContainer: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    },
    tableSectionH3: {
        margin: "0 0 18px 0",
        fontSize: "16px",
        fontWeight: "700",
        color: "#1b4332",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        fontSize: "14px",
    },
    th: {
        textAlign: "left",
        padding: "10px 14px",
        backgroundColor: "#f0f7f2",
        color: "#2d6a4f",
        fontWeight: "600",
        fontSize: "12px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
    },
    td: {
        padding: "13px 14px",
        borderBottom: "1px solid #eef3ee",
        color: "#444",
    },
    statusPaid: {
        backgroundColor: "#d1fae5",
        color: "#065f46",
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
    },
    statusPending: {
        backgroundColor: "#fef3c7",
        color: "#92400e",
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
    },
};

const navItems = [
    { label: "Dashboard", icon: "⊞", href: "/admin", active: true },
    { label: "Bookings Lists", icon: "📅", href: "/admin/bookings", active: false },
    { label: "Guests", icon: "👥", href: "/admin/guests", active: false },
    { label: "Reports", icon: "📈", href: "/admin/reports", active: false },
];

const stats = [
    { icon: "🎫", label: "Total Bookings", value: 128 },
    { icon: "🐘", label: "Active Tours", value: 12 },
];

const reservations = [
    {
        name: "Sok Sophea",
        date: "March 15, 2026",
        package: "Full-Day Trek",
        guests: 2,
        status: "Paid",
    },
    {
        name: "John Smith",
        date: "March 16, 2026",
        package: "River Bathing",
        guests: 4,
        status: "Pending",
    },
];

export default function Admin() {
    const [hoveredNav, setHoveredNav] = useState(null);

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

                    {/* Logout at bottom */}
                    <a
                        href="/"
                        style={{
                            ...styles.navLink,
                            ...styles.navLinkLogout,
                            marginTop: "32px",
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
                    <h2 style={styles.adminHeaderH2}>Welcome, Sanctuary Manager</h2>
                    <div style={styles.adminUser}>
                        <span>Admin User</span>
                        <span style={styles.userIcon}>👤</span>
                    </div>
                </header>

                {/* Content */}
                <div style={styles.contentArea}>
                    {/* Stats */}
                    <section style={styles.adminStats}>
                        {stats.map((stat, i) => (
                            <div key={i} style={styles.statCard}>
                                <span style={styles.statIcon}>{stat.icon}</span>
                                <div>
                                    <p style={styles.statLabel}>{stat.label}</p>
                                    <p style={styles.statValue}>{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Table */}
                    <section style={styles.tableContainer}>
                        <h3 style={styles.tableSectionH3}>Recent Reservations</h3>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                {["Guest Name", "Tour Date", "Package", "Guests", "Status"].map(
                                    (col) => (
                                        <th key={col} style={styles.th}>
                                            {col}
                                        </th>
                                    )
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {reservations.map((row, i) => (
                                <tr key={i}>
                                    <td style={styles.td}>{row.name}</td>
                                    <td style={styles.td}>{row.date}</td>
                                    <td style={styles.td}>{row.package}</td>
                                    <td style={styles.td}>{row.guests}</td>
                                    <td style={styles.td}>
                      <span
                          style={
                              row.status === "Paid"
                                  ? styles.statusPaid
                                  : styles.statusPending
                          }
                      >
                        {row.status === "Paid" ? "✅ " : "⏳ "}
                          {row.status}
                      </span>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            </main>
        </div>
    );
}