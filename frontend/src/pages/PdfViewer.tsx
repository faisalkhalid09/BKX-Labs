import { useParams } from 'react-router-dom';

const PdfViewer = () => {
    const { type } = useParams();

    // Map URL param to file name
    const getFile = () => {
        if (type === 'privacy-policy') return '/BKX-Labs-Privacy-Policy.pdf';
        if (type === 'TOS') return '/BKX-Labs-Term-Of-Service.pdf';
        return '';
    };

    const file = getFile();

    if (!file) {
        return <div className="text-center mt-20">Document not found</div>;
    }

    return (
        <div className="h-screen w-full flex flex-col">
            <iframe
                src={file}
                className="w-full h-full border-0"
                title="Document Viewer"
            />
        </div>
    );
};

export default PdfViewer;
