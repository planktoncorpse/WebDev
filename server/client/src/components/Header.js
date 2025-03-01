import React from 'react';

function Header() {
    return (
        <header style={styles.header}>
            <div style={styles.headerLogo}>
                {/* Placeholder logo/title (replace with actual UCF logo if they promise not to sue us, lol) */}
                <h2 style={{ color: '#fff', margin: 0 }}>UCF Parking Student Edition</h2>
            </div>
            <nav style={styles.nav}>
                <ul style={styles.navList}>
                    <li style={styles.navItem}>
                        <a style={styles.navLink} href="#home">Home</a>
                    </li>
                    <li style={styles.navItem}>
                        <a style={styles.navLink} href="#parking">Parking</a>
                    </li>
                    <li style={styles.navItem}>
                        <a style={styles.navLink} href="#contact">Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#000', // UCF black
        color: '#fff',
        padding: '10px 20px',
    },
    headerLogo: {
        display: 'flex',
        alignItems: 'center',
    },
    nav: {
        // Additional styling if needed
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
        gap: '20px',
    },
    navItem: {
        // Additional styling if needed
    },
    navLink: {
        color: '#fff',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default Header;