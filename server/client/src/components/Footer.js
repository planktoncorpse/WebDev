import React from 'react';

function Footer() {
    return (
        <footer style={styles.footer}>

            <p> (づ ◕‿◕ )づ ©{ new Date().getFullYear()} UCF Parking: Student Edition. \(◕ ◡ ◕\)) </p>

        </footer>
    );
}

const styles = {
    footer: {
        backgroundColor: '#000', // UCF black
        color: '#fff',
        textAlign: 'center',
        padding: '20px',
    },
};

export default Footer;