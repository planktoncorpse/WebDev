//import React, { useEffect, useState } from 'react';



// import io from 'socket.io-client'; // Import the socket.io client
//
// // Connect to the backend server
// const socket = io('http://localhost:3000'); // Adjust this URL if needed
//
// const ParkingGarages = () => {
//   const [garages, setGarages] = useState([]);
  //
  // useEffect(() => {
  //   // Fetch initial data from the backend
  //   fetch('/api/garages')
  //     .then(response => response.json())
  //     .then(data => setGarages(data))
  //     .catch(err => console.log("Error fetching data:", err));
  //
  //   // Listen for real-time parking updates from the server
  //   socket.on('parkingUpdate', (updatedGarage) => {
  //     setGarages(prevGarages =>
  //       prevGarages.map(garage =>
  //         garage._id === updatedGarage._id ? updatedGarage : garage
  //       )
  //     );
  //   });
  //
  //   // Cleanup the socket connection when the component is unmounted
  //   return () => socket.off('parkingUpdate');
  // }, []);

  // return (
  //     <div>
  //       <h2>Parking Garages</h2>
  //       <h1>THIS TEXT IS HERE </h1>
  //       <ul>
  //         {garages.map(garage => (
  //             <li key={garage._id}>
  //               <h3>{garage.name}</h3>
  //               <p>Available Spots: {garage.availableSpots}</p>
  //             </li>
  //         ))}
  //       </ul>
  //     </div>
  // );
//};
//FIXME------------------------------------------>
//export default ParkingGarages;
import React from 'react';
import Header from './Header';
import Footer from './Footer';

const ParkingGarages = () => {
    // Static mock data for demonstration
    const garages = [
        { letter: 'A', capacity: 1300, used: 700 },
        { letter: 'B', capacity: 1000, used: 1000 },
        { letter: 'C', capacity: 1500, used: 600 },
        { letter: 'D', capacity: 1200, used: 400 },
        { letter: 'H', capacity: 1300, used: 1100 },
        { letter: 'I', capacity: 900, used: 300 },
    ];

    // Function to determine the color based on garage fullness
    const getFullnessColor = (fullness) => {
        if (fullness < 50) return '#21ba45'; // Green if less than 50% full
        if (fullness < 80) return '#f2c037'; // Gold for 50%-80% full
        return '#db2828';                   // Red if 80%+ full
    };

    return (
        <div style={styles.pageContainer}>
            <Header />
            <main style={styles.mainContent}>
                <h1 style={styles.title}>Garage Capacity</h1>
                <div style={styles.cardContainer}>
                    {garages.map((garage) => {
                        const fullness = Math.round((garage.used / garage.capacity) * 100);
                        const fullnessColor = getFullnessColor(fullness);

                        return (
                            <div key={garage.letter} style={styles.card}>
                                <div style={{ ...styles.cardHeader, backgroundColor: fullnessColor }}>
                                    <h2 style={styles.cardTitle}>Garage {garage.letter}</h2>
                                </div>
                                <div style={styles.cardBody}>
                                    <p style={styles.infoLine}>
                                        <strong>Available:</strong> {garage.capacity - garage.used}
                                    </p>
                                    <p style={styles.infoLine}>
                                        <strong>Total:</strong> {garage.capacity}
                                    </p>
                                    <p style={styles.infoLine}>
                                        <strong>Fullness:</strong> {fullness}%
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ParkingGarages;

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f7f7f7',
        fontFamily: 'Arial, sans-serif',
    },
    mainContent: {
        flex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '40px',
        color: '#000',
    },
    cardContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 2fr)',
        gap: '20px',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
    },
    cardHeader: {
        padding: '10px',
        color: '#fff',
    },
    cardTitle: {
        margin: 0,
        fontSize: '1.25rem',
    },
    cardBody: {
        padding: '20px',
    },
    infoLine: {
        margin: '8px 0',
        color: '#333',
    },
};

