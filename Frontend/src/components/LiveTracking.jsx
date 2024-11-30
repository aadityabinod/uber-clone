import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523
};

const LiveTracking = () => {
    const [ currentPosition, setCurrentPosition ] = useState(center);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                console.log('Position updated:', latitude, longitude);
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
            });
        };

        updatePosition(); // Initial position update

        const intervalId = setInterval(updatePosition, 1000); // Update every 10 seconds

    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    )
}

export default LiveTracking

// import React, { useState, useEffect } from 'react';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const LiveTracking = () => {
//     const [currentPosition, setCurrentPosition] = useState({
//         lat: -3.745,
//         lng: -38.523,
//     });

//     useEffect(() => {
//         navigator.geolocation.getCurrentPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             setCurrentPosition({
//                 lat: latitude,
//                 lng: longitude,
//             });
//         });

//         const watchId = navigator.geolocation.watchPosition((position) => {
//             const { latitude, longitude } = position.coords;
//             setCurrentPosition({
//                 lat: latitude,
//                 lng: longitude,
//             });
//         });

//         return () => navigator.geolocation.clearWatch(watchId);
//     }, []);

//     return (
//         <MapContainer center={currentPosition} zoom={15} style={{ width: '100%', height: '100%' }}>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <Marker
//                 position={currentPosition}
//                 icon={new Icon({ iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Map_marker_icon.png', iconSize: [32, 32] })}
//             >
//                 <Popup>You are here!</Popup>
//             </Marker>
//         </MapContainer>
//     );
// };

// export default LiveTracking;
