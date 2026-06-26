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

    // Stats Bar
    statsBar: {
        display: "flex",
        gap: "20px",
    },
    hStat: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "18px 28px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        borderLeft: "4px solid #52b788",
        minWidth: "120px",
    },
    hStatStrong: {
        fontSize: "26px",
        fontWeight: "700",
        color: "#1b4332",
    },
    hStatSpan: {
        fontSize: "12px",
        color: "#888",
        fontWeight: "500",
    },

    // History List
    historyList: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
    },

    // History Item Card
    historyCard: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: "24px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
        transition: "box-shadow 0.2s",
    },
    historyCardHover: {
        boxShadow: "0 4px 18px rgba(0,0,0,0.12)",
    },

    // Date block
    dateBlock: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#1b4332",
        color: "#fff",
        borderRadius: "10px",
        padding: "10px 16px",
        minWidth: "60px",
        gap: "2px",
        flexShrink: 0,
    },
    dateMonth: {
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "1px",
        color: "#52b788",
    },
    dateDay: {
        fontSize: "26px",
        fontWeight: "700",
        lineHeight: 1,
    },
    dateYear: {
        fontSize: "11px",
        color: "#b7e4c7",
    },

    // Item Info
    itemInfo: {
        flex: 1,
    },
    itemInfoH3: {
        margin: "0 0 8px 0",
        fontSize: "16px",
        fontWeight: "700",
        color: "#1b4332",
    },
    statusBadge: {
        display: "inline-block",
        backgroundColor: "#d1fae5",
        color: "#065f46",
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        marginBottom: "8px",
    },
    itemGuests: {
        margin: 0,
        fontSize: "13px",
        color: "#666",
        display: "flex",
        alignItems: "center",
        gap: "6px",
    },

    // Actions
    itemActions: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: "8px",
        flexShrink: 0,
    },
    price: {
        margin: 0,
        fontSize: "18px",
        fontWeight: "700",
        color: "#1b4332",
    },
    btnText: {
        color: "#40916c",
        textDecoration: "none",
        fontSize: "13px",
        fontWeight: "600",
        border: "1.5px solid #40916c",
        padding: "5px 14px",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
    },
};

const navItems = [
    { label: "My Dashboard", icon: "🏠", href: "/customer", active: false },
    { label: "New Booking", icon: "➕", href: "/booking", active: false },
    { label: "My History", icon: "🕐", href: "/customer/history", active: true },
    { label: "Settings", icon: "⚙️", href: "/customer/settings", active: false },
];

const stats = [
    { value: "03", label: "Total Trips" },
    { value: "$285", label: "Total Contributed" },
];

const bookings = [
    {
        month: "MAR",
        day: "15",
        year: "2026",
        title: "River Bathing & Forest Trek",
        status: "Completed",
        guests: "2 Adults",
        price: "$90.00",
    },
    {
        month: "NOV",
        day: "12",
        year: "2025",
        title: "Full-Day Deep Jungle Trek",
        status: "Completed",
        guests: "1 Adult",
        price: "$75.00",
    },
    {
        month: "AUG",
        day: "20",
        year: "2025",
        title: "Overnight Bunong Experience",
        status: "Completed",
        guests: "1 Adult",
        price: "$120.00",
    },
];

export default function CustomerHistory() {
    const [hoveredNav, setHoveredNav] = useState(null);
    const [hoveredCard, setHoveredCard] = useState(null);
    const [hoveredBtn, setHoveredBtn] = useState(null);

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
                    {/* Content Header */}
                    <div style={styles.contentHeader}>
                        <h2 style={styles.contentH2}>🐘 My Elephant Adventures</h2>
                        <p style={styles.contentP}>
                            A record of your journey with the giants of Mondulkiri.
                        </p>
                    </div>

                    {/* Stats Bar */}
                    <div style={styles.statsBar}>
                        {stats.map((s, i) => (
                            <div key={i} style={styles.hStat}>
                                <strong style={styles.hStatStrong}>{s.value}</strong>
                                <span style={styles.hStatSpan}>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* History List */}
                    <div style={styles.historyList}>
                        {bookings.map((b, i) => (
                            <div
                                key={i}
                                style={{
                                    ...styles.historyCard,
                                    ...(hoveredCard === i ? styles.historyCardHover : {}),
                                }}
                                onMouseEnter={() => setHoveredCard(i)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Date Block */}
                                <div style={styles.dateBlock}>
                                    <span style={styles.dateMonth}>{b.month}</span>
                                    <span style={styles.dateDay}>{b.day}</span>
                                    <span style={styles.dateYear}>{b.year}</span>
                                </div>

                                {/* Info */}
                                <div style={styles.itemInfo}>
                                    <h3 style={styles.itemInfoH3}>{b.title}</h3>
                                    <span style={styles.statusBadge}>✅ {b.status}</span>
                                    <p style={styles.itemGuests}>👥 {b.guests}</p>
                                </div>

                                {/* Actions */}
                                <div style={styles.itemActions}>
                                    <p style={styles.price}>{b.price}</p>
                                    <a
                                        href="#"
                                        style={{
                                            ...styles.btnText,
                                            ...(hoveredBtn === i
                                                ? { backgroundColor: "#40916c", color: "#fff" }
                                                : {}),
                                        }}
                                        onMouseEnter={() => setHoveredBtn(i)}
                                        onMouseLeave={() => setHoveredBtn(null)}
                                    >
                                        View Invoice
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}