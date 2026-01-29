import { useLocation } from 'react-router-dom';

const PdfViewer = () => {
    const location = useLocation();

    // Map URL path to file name
    const getFile = () => {
        if (location.pathname === '/privacy-policy') return '/BKX-Labs-Privacy-Policy.pdf';
        if (location.pathname === '/TOS') return '/BKX-Labs-Term-Of-Service.pdf';
        return '';
    };

    const file = getFile();

    if (!file) {
        return <div className="text-center mt-20">Document not found</div>;
    }

    return (
        <div className="fixed top-0 left-0 w-screen h-screen z-[99999] bg-white flex flex-col">
            <iframe
                src={file}
                className="w-full h-full border-0 block"
                title="Document Viewer"
                style={{ width: '100vw', height: '100vh' }}
            />
        </div>
    );
};

export default PdfViewer;
