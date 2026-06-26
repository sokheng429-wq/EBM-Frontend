import { useState } from "react";

const styles = {
    // Base
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
    logoSpan: {
        color: "#52b788",
    },
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
        transition: "color 0.2s",
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
    sideMenuLink: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "11px 14px",
        borderRadius: "8px",
        textDecoration: "none",
        color: "#4a4a4a",
        fontSize: "14px",
        fontWeight: "500",
        transition: "background 0.2s, color 0.2s",
        cursor: "pointer",
    },
    sideMenuLinkActive: {
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

    // Welcome Banner
    welcomeBanner: {
        background: "linear-gradient(135deg, #1b4332, #40916c)",
        borderRadius: "12px",
        padding: "28px 32px",
        color: "#fff",
    },
    welcomeH2: {
        margin: "0 0 6px 0",
        fontSize: "22px",
        fontWeight: "700",
    },
    welcomeP: {
        margin: 0,
        opacity: 0.85,
        fontSize: "14px",
    },

    // Booking Card
    bookingCard: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        overflow: "hidden",
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 24px",
        backgroundColor: "#f8faf8",
        borderBottom: "1px solid #e8f0e8",
    },
    bookingId: {
        fontSize: "13px",
        color: "#666",
        fontWeight: "500",
    },
    statusBadge: {
        backgroundColor: "#d1fae5",
        color: "#065f46",
        padding: "4px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
    },
    cardMain: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "24px",
        gap: "16px",
    },
    tourInfo: {
        flex: 1,
    },
    tourInfoH3: {
        margin: "0 0 12px 0",
        fontSize: "18px",
        fontWeight: "700",
        color: "#1b4332",
    },
    tourInfoP: {
        margin: "6px 0",
        fontSize: "14px",
        color: "#555",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    tourQr: {
        textAlign: "center",
        color: "#40916c",
    },
    qrIcon: {
        fontSize: "56px",
        lineHeight: 1,
    },
    qrText: {
        margin: "6px 0 0 0",
        fontSize: "11px",
        color: "#888",
    },
    cardFooter: {
        display: "flex",
        gap: "12px",
        padding: "16px 24px",
        borderTop: "1px solid #e8f0e8",
        backgroundColor: "#f8faf8",
    },
    btnOutline: {
        padding: "9px 20px",
        border: "1.5px solid #40916c",
        borderRadius: "8px",
        color: "#40916c",
        backgroundColor: "transparent",
        fontSize: "13px",
        fontWeight: "600",
        cursor: "pointer",
        textDecoration: "none",
        transition: "background 0.2s, color 0.2s",
    },

    // Safety Box
    safetyBox: {
        backgroundColor: "#ffffff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
        borderLeft: "4px solid #52b788",
    },
    safetyH3: {
        margin: "0 0 16px 0",
        fontSize: "16px",
        fontWeight: "700",
        color: "#1b4332",
        display: "flex",
        alignItems: "center",
        gap: "8px",
    },
    safetyList: {
        listStyle: "none",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    safetyListItem: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "14px",
        color: "#444",
    },
    checkIcon: {
        color: "#40916c",
        fontWeight: "700",
    },
};

const navItems = [
    { label: "My Dashboard", icon: "🏠", href: "/customer", active: true },
    { label: "New Booking", icon: "➕", href: "/booking", active: false },
    { label: "My History", icon: "🕐", href: "/customer/history", active: false },
    { label: "Settings", icon: "⚙️", href: "/customer/settings", active: false },
];

const checklist = [
    "Wear comfortable trekking shoes",
    "Bring a refillable water bottle",
    "Pack eco-friendly sunscreen",
];

export default function Customer() {
    const [hoveredNav, setHoveredNav] = useState(null);
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
                        <span>Hello, Chan Molika!</span>
                        <div style={styles.avatarSm}>CM</div>
                        <a
                            href="/"
                            style={styles.logoutLink}
                            title="Logout"
                        >
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
                                    ...styles.sideMenuLink,
                                    ...(item.active || hoveredNav === i
                                        ? styles.sideMenuLinkActive
                                        : {}),
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
                    {/* Welcome Banner */}
                    <section style={styles.welcomeBanner}>
                        <h2 style={styles.welcomeH2}>Your Upcoming Adventure</h2>
                        <p style={styles.welcomeP}>
                            We are excited to see you in the jungle soon!
                        </p>
                    </section>

                    {/* Booking Card */}
                    <div style={styles.bookingCard}>
                        <div style={styles.cardHeader}>
                            <span style={styles.bookingId}>Booking ID: #BK-1024</span>
                            <span style={styles.statusBadge}>✅ Confirmed &amp; Paid</span>
                        </div>

                        <div style={styles.cardMain}>
                            <div style={styles.tourInfo}>
                                <h3 style={styles.tourInfoH3}>River Bathing &amp; Forest Trek</h3>
                                <p style={styles.tourInfoP}>
                                    📅 March 15, 2026
                                </p>
                                <p style={styles.tourInfoP}>
                                    📍 Pickup: Nature Lodge (08:30 AM)
                                </p>
                            </div>
                            <div style={styles.tourQr}>
                                <div style={styles.qrIcon}>⬛</div>
                                <p style={styles.qrText}>Show at Check-in</p>
                            </div>
                        </div>

                        <div style={styles.cardFooter}>
                            {["Download Ticket", "Contact Support"].map((label, i) => (
                                <button
                                    key={i}
                                    style={{
                                        ...styles.btnOutline,
                                        ...(hoveredBtn === i
                                            ? { backgroundColor: "#40916c", color: "#fff" }
                                            : {}),
                                    }}
                                    onMouseEnter={() => setHoveredBtn(i)}
                                    onMouseLeave={() => setHoveredBtn(null)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Safety / Checklist */}
                    <section style={styles.safetyBox}>
                        <h3 style={styles.safetyH3}>
                            🌿 Jungle Ready Checklist
                        </h3>
                        <ul style={styles.safetyList}>
                            {checklist.map((item, i) => (
                                <li key={i} style={styles.safetyListItem}>
                                    <span style={styles.checkIcon}>✔</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
        </div>
    );
}