import { MapPin, Download } from 'lucide-react';

import guidePdf from '../assets/Pdf.pdf';
import Map from './Map';

export const MapDownloadSection = () => {
    return (
        <div className="bg-white py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">



                {/* Map Section */}
                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex flex-col h-[400px]">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                        <h3 className="font-bold text-gray-900">Experiences near you</h3>
                        <span className="text-primary text-sm font-medium cursor-pointer">View Larger</span>
                    </div>
                    <div className="flex-1 relative z-0">
                        <Map latitude={26.1445} longitude={91.7362} title="Meeting Point" />
                    </div>
                </div>

                {/* Download Guide Section */}
                <div className="bg-white rounded-lg border border-gray-100 p-8 flex flex-col justify-center h-full min-h-[300px] shadow-sm">
                    <div className="max-w-md">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">New to Guwahati?</h3>
                        <p className="text-gray-500 mb-8">
                            Get our free guide to the top 10 heritage spots you can visit in under 3 hours.
                        </p>
                        <a
                            href={guidePdf}
                            download="Guwahati_Heritage_Guide.pdf"
                            className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download Guide
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};
