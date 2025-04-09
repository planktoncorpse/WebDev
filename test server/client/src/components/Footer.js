
import React from 'react';


const Footer = () => {
    // List of social media icons with their image paths and names
    const socialMedias = [
        { name: 'Facebook', img: '/images/facebook.png' },
        { name: 'Twitter', img: '/images/twitter.png' },
        { name: 'Instagram', img: '/images/instagram.png' },
        { name: 'Bluesky', img: '/images/bluesky.png' },
        { name: 'Reddit', img: '/images/reddit.png' },
        { name: 'Tumblr', img: '/images/tumblr.png' },
        { name: 'Discord', img: '/images/discord.png' },
        { name: 'SoundCloud', img: '/images/soundcloud.png' },
        { name: 'Steam', img: '/images/steam.png' },
        { name: 'OnlyFans', img: '/images/onlyfans.png' }
    ];

    return (
        <footer className="footer">
            <p>Follow Us:</p>
            <div className="social-icons">
                {socialMedias.map((social, index) => (
                    <a
                        key={index}
                        href="/not-affiliated"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={social.img} alt={social.name} />
                    </a>
                ))}
            </div>
            <p className="disclaimer">This is not an official or sanctioned UCF site</p>
        </footer>
    );
};

export default Footer;