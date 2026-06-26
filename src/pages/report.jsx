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
    reportActions: {
        display: "flex",
        gap: "10px",
        flexShrink: 0,
    },
    btnOutline: {
        backgroundColor: "transparent",
        color: "#40916c",
        border: "1.5px solid #40916c",
        padding: "9px 18px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "background 0.2s, color 0.2s",
    },
    btnOutlineHover: {
        backgroundColor: "#40916c",
        color: "#fff",
    },
    ctaBtn: {
        backgroundColor: "#1b4332",
        color: "#fff",
        border: "none",
        padding: "9px 18px",
        borderRadius: "8px",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        transition: "background 0.2s",
    },
    ctaBtnHover: {
        backgroundColor: "#2d6a4f",
    },

    // Content
    contentArea: {
        padding: "24px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },

    // Stats
    adminStats: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
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
        fontSize: "30px",
        color: "#40916c",
    },
    statLabel: {
        margin: "0 0 4px 0",
        fontSize: "12px",
        color: "#888",
        fontWeight: "500",
        textTransform: "uppercase",
        letterSpacing: "0.4px",
    },
    statValue: {
        margin: 0,
        fontSize: "26px",
        fontWeight: "700",
        color: "#1b4332",
    },

    // Report Grid
    reportGrid: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: "20px",
    },

    // Detail Card
    detailCard: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
    },
    detailCardH3: {
        margin: "0 0 18px 0",
        fontSize: "16px",
        fontWeight: "700",
        color: "#1b4332",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        paddingBottom: "12px",
        borderBottom: "1px solid #e8f0e8",
    },

    // Table
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
    tdTotal: {
        fontWeight: "700",
        color: "#1b4332",
    },

    // Revenue bar background
    revenueBar: {
        height: "6px",
        borderRadius: "4px",
        backgroundColor: "#d8f3dc",
        marginTop: "6px",
        overflow: "hidden",
    },
    revenueBarFill: {
        height: "100%",
        borderRadius: "4px",
        backgroundColor: "#40916c",
    },
};

const navItems = [
    { label: "Dashboard", icon: "⊞", href: "/admin", active: false },
    { label: "Bookings Lists", icon: "📅", href: "/admin/bookings", active: false },
    { label: "Guests", icon: "👥", href: "/admin/guests", active: false },
    { label: "Reports", icon: "📈", href: "/admin/reports", active: true },
];

const stats = [
    { icon: "🎫", label: "Total Bookings", value: "62" },
    { icon: "👥", label: "Total Guests", value: "154" },
    { icon: "⭐", label: "Avg. Rating", value: "4.9 / 5" },
];

const tourData = [
    { name: "Total Booking", bookings: 62, revenue: "$5,750.00", pct: 100 },
    { name: "Full-Day Trek", bookings: 58, revenue: "$4,350.00", pct: 76 },
    { name: "Overnight", bookings: 34, revenue: "$1,100.00", pct: 19 },
];

export default function Report() {
    const [hoveredNav, setHoveredNav] = useState(null);
    const [hoveredExport, setHoveredExport] = useState(false);
    const [hoveredPdf, setHoveredPdf] = useState(false);

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
                        <h2 style={styles.adminHeaderH2}>Monthly Business Report</h2>
                        <p style={styles.currentDate}>📅 Period: March 2026</p>
                    </div>
                    <div style={styles.reportActions}>
                        <button
                            style={{
                                ...styles.btnOutline,
                                ...(hoveredExport ? styles.btnOutlineHover : {}),
                            }}
                            onMouseEnter={() => setHoveredExport(true)}
                            onMouseLeave={() => setHoveredExport(false)}
                        >
                            ⬇️ Export CSV
                        </button>
                        <button
                            style={{
                                ...styles.ctaBtn,
                                ...(hoveredPdf ? styles.ctaBtnHover : {}),
                            }}
                            onMouseEnter={() => setHoveredPdf(true)}
                            onMouseLeave={() => setHoveredPdf(false)}
                            onClick={() => window.print()}
                        >
                            📄 Generate PDF
                        </button>
                    </div>
                </header>

                {/* Content */}
                <div style={styles.contentArea}>
                    {/* Stats */}
                    <section style={styles.adminStats}>
                        {stats.map((s, i) => (
                            <div key={i} style={styles.statCard}>
                                <span style={styles.statIcon}>{s.icon}</span>
                                <div>
                                    <p style={styles.statLabel}>{s.label}</p>
                                    <p style={styles.statValue}>{s.value}</p>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Report Grid */}
                    <div style={styles.reportGrid}>
                        <section style={styles.detailCard}>
                            <h3 style={styles.detailCardH3}>🥧 Tour Popularity</h3>
                            <table style={styles.table}>
                                <thead>
                                <tr>
                                    {["Package Name", "Bookings", "Revenue"].map((col) => (
                                        <th key={col} style={styles.th}>
                                            {col}
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {tourData.map((row, i) => (
                                    <tr key={i}>
                                        <td style={{ ...styles.td, ...(i === 0 ? styles.tdTotal : {}) }}>
                                            {row.name}
                                        </td>
                                        <td style={{ ...styles.td, ...(i === 0 ? styles.tdTotal : {}) }}>
                                            {row.bookings}
                                        </td>
                                        <td style={styles.td}>
                                            <div style={{ ...(i === 0 ? styles.tdTotal : {}) }}>
                                                {row.revenue}
                                            </div>
                                            {i > 0 && (
                                                <div style={styles.revenueBar}>
                                                    <div
                                                        style={{
                                                            ...styles.revenueBarFill,
                                                            width: `${row.pct}%`,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}