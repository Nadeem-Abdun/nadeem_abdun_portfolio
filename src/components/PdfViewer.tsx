import React from "react";
import { SecureHttp } from "../utils/SecureHttp";

interface Props {
    pdfUrl: string;
    height?: string;
    width?: string;
}

const PdfViewer: React.FC<Props> = (props) => {
    const { pdfUrl, height, width } = props
    const securePdfUrl = SecureHttp(pdfUrl);
    return (
        <>
            {securePdfUrl ? (
                <iframe
                    title="PDF Viewer"
                    src={securePdfUrl}
                    frameBorder="0"
                    scrolling="auto"
                    style={{ height, width }}
                />
            ) : (
                <p>Loading PDF...</p>
            )}
        </>
    );
};

export default PdfViewer;
