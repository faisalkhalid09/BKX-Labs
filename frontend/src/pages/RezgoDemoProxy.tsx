import React from 'react';
import { useLocation } from 'react-router-dom';

const RezgoDemoProxy: React.FC = () => {
    const location = useLocation();
    // Strip the /dev-rezgo base from the URL and get the rest of the path
    const path = location.pathname.replace('/dev-rezgo', '');
    const search = location.search;

    // Change this URL if the backend API is hosted on a different subdomain (e.g., api.bkxlabs.com)
    const backendUrl = `https://api.bkxlabs.com/dev-rezgo${path}${search}`;

    return (
        <div className="w-full h-screen">
            <iframe
                src={backendUrl}
                className="w-full h-full border-0"
                title="Rezgo Demo"
                sandbox="allow-scripts allow-same-origin allow-forms"
            />
        </div>
    );
};

export default RezgoDemoProxy;
