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
        margin: 0,
        fontSize: "18px",
        fontWeight: "700",
        color: "#1b4332",
        whiteSpace: "nowrap",
    },
    searchBox: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        backgroundColor: "#f0f7f2",
        border: "1.5px solid #d0e8d0",
        borderRadius: "8px",
        padding: "6px 14px",
        flex: 1,
        maxWidth: "320px",
    },
    searchInput: {
        border: "none",
        background: "transparent",
        outline: "none",
        fontSize: "14px",
        color: "#333",
        width: "100%",
    },
    searchIcon: {
        color: "#40916c",
        fontSize: "14px",
        cursor: "pointer",
    },

    // Content area
    contentArea: {
        padding: "24px 32px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },

    // Filter Bar
    filterBar: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap",
    },
    filterBtn: {
        padding: "7px 18px",
        borderRadius: "20px",
        border: "1.5px solid #d0e8d0",
        backgroundColor: "transparent",
        color: "#555",
        fontSize: "13px",
        fontWeight: "500",
        cursor: "pointer",
        transition: "all 0.2s",
    },
    filterBtnActive: {
        backgroundColor: "#1b4332",
        color: "#ffffff",
        border: "1.5px solid #1b4332",
        fontWeight: "600",
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
    statusConfirmed: {
        backgroundColor: "#d1fae5",
        color: "#065f46",
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        whiteSpace: "nowrap",
    },
    statusPending: {
        backgroundColor: "#fef3c7",
        color: "#92400e",
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        whiteSpace: "nowrap",
    },
    statusCanceled: {
        backgroundColor: "#fee2e2",
        color: "#991b1b",
        padding: "3px 12px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "600",
        whiteSpace: "nowrap",
    },

    // Action Buttons
    actionBtns: {
        display: "flex",
        gap: "8px",
    },
    editBtn: {
        backgroundColor: "#e8f5e9",
        color: "#2d6a4f",
        border: "none",
        borderRadius: "6px",
        padding: "6px 10px",
        cursor: "pointer",
        fontSize: "13px",
        transition: "background 0.2s",
    },
    editBtnHover: {
        backgroundColor: "#c8e6c9",
    },
    deleteBtn: {
        backgroundColor: "#fce8e8",
        color: "#b91c1c",
        border: "none",
        borderRadius: "6px",
        padding: "6px 10px",
        cursor: "pointer",
        fontSize: "13px",
        transition: "background 0.2s",
    },
    deleteBtnHover: {
        backgroundColor: "#fca5a5",
    },

    // Empty state
    emptyRow: {
        textAlign: "center",
        padding: "32px",
        color: "#aaa",
        fontSize: "14px",
    },
};

const navItems = [
    { label: "Dashboard", icon: "⊞", href: "/admin", active: false },
    { label: "Bookings Lists", icon: "📅", href: "/admin/bookings", active: true },
    { label: "Guests", icon: "👥", href: "/admin/guests", active: false },
    { label: "Reports", icon: "📈", href: "/admin/reports", active: false },
];

const initialBookings = [
    {
        id: "#BK-1024",
        name: "Chan Molika",
        tour: "River Bathing",
        date: "Mar 05, 2026",
        guests: 2,
        total: "$90.00",
        status: "Confirmed",
    },
    {
        id: "#BK-1025",
        name: "David Miller",
        tour: "Overnight Camping",
        date: "Mar 06, 2026",
        guests: 1,
        total: "$120.00",
        status: "Pending",
    },
    {
        id: "#BK-1026",
        name: "Sok Nimol",
        tour: "Full-Day Trek",
        date: "Mar 07, 2026",
        guests: 3,
        total: "$225.00",
        status: "Confirmed",
    },
];

const filters = ["All", "Confirmed", "Pending", "Canceled"];

const statusStyle = (status) => {
    if (status === "Confirmed") return styles.statusConfirmed;
    if (status === "Pending") return styles.statusPending;
    return styles.statusCanceled;
};

const statusEmoji = (status) => {
    if (status === "Confirmed") return "✅ ";
    if (status === "Pending") return "⏳ ";
    return "❌ ";
};

export default function BookingList() {
    const [hoveredNav, setHoveredNav] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [bookings, setBookings] = useState(initialBookings);
    const [hoveredEdit, setHoveredEdit] = useState(null);
    const [hoveredDelete, setHoveredDelete] = useState(null);

    const handleDelete = (id) => {
        if (window.confirm(`Delete booking ${id}?`)) {
            setBookings(bookings.filter((b) => b.id !== id));
        }
    };

    const filtered = bookings.filter((b) => {
        const matchFilter = activeFilter === "All" || b.status === activeFilter;
        const matchSearch =
            b.name.toLowerCase().includes(search.toLowerCase()) ||
            b.id.toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

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
                    <h2 style={styles.adminHeaderH2}>All Reservations</h2>
                    <div style={styles.searchBox}>
                        <input
                            type="text"
                            placeholder="Search by name or ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={styles.searchInput}
                        />
                        <span style={styles.searchIcon}>🔍</span>
                    </div>
                </header>

                {/* Content */}
                <div style={styles.contentArea}>
                    {/* Filter Bar */}
                    <div style={styles.filterBar}>
                        {filters.map((f) => (
                            <button
                                key={f}
                                style={{
                                    ...styles.filterBtn,
                                    ...(activeFilter === f ? styles.filterBtnActive : {}),
                                }}
                                onClick={() => setActiveFilter(f)}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    {/* Table */}
                    <div style={styles.tableContainer}>
                        <table style={styles.table}>
                            <thead>
                            <tr>
                                {["ID", "Guest Name", "Tour Type", "Date", "Guests", "Total", "Status", "Actions"].map(
                                    (col) => (
                                        <th key={col} style={styles.th}>
                                            {col}
                                        </th>
                                    )
                                )}
                            </tr>
                            </thead>
                            <tbody>
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={8} style={styles.emptyRow}>
                                        No bookings found.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((b, i) => (
                                    <tr key={b.id}>
                                        <td style={styles.td}>{b.id}</td>
                                        <td style={styles.td}>
                                            <strong style={styles.tdStrong}>{b.name}</strong>
                                        </td>
                                        <td style={styles.td}>{b.tour}</td>
                                        <td style={styles.td}>{b.date}</td>
                                        <td style={styles.td}>{b.guests}</td>
                                        <td style={styles.td}>{b.total}</td>
                                        <td style={styles.td}>
                        <span style={statusStyle(b.status)}>
                          {statusEmoji(b.status)}{b.status}
                        </span>
                                        </td>
                                        <td style={styles.td}>
                                            <div style={styles.actionBtns}>
                                                <button
                                                    style={{
                                                        ...styles.editBtn,
                                                        ...(hoveredEdit === i ? styles.editBtnHover : {}),
                                                    }}
                                                    onMouseEnter={() => setHoveredEdit(i)}
                                                    onMouseLeave={() => setHoveredEdit(null)}
                                                    title="Edit"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    style={{
                                                        ...styles.deleteBtn,
                                                        ...(hoveredDelete === i ? styles.deleteBtnHover : {}),
                                                    }}
                                                    onMouseEnter={() => setHoveredDelete(i)}
                                                    onMouseLeave={() => setHoveredDelete(null)}
                                                    onClick={() => handleDelete(b.id)}
                                                    title="Delete"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}