
import { MapPin, Download } from 'lucide-react';

export const MapDownloadSection = () => {
    return (
        <div className="bg-white py-12 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Map Section */}
                <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex flex-col">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Experiences near you</h3>
                        <span className="text-primary text-sm font-medium cursor-pointer">Expand Map</span>
                    </div>
                    <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center bg-gray-100 relative">
                        {/* Abstract Map Background Placeholder */}
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]"></div>

                        <div className="z-10 flex flex-col items-center">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
                                <MapPin className="w-6 h-6 text-green-600" />
                            </div>
                            <p className="text-gray-500 text-sm mb-4">Interactive map</p>
                            <button className="bg-white text-gray-900 px-4 py-2 rounded-md shadow-sm border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors">
                                Show Map
                            </button>
                        </div>
                    </div>
                </div>

                {/* Download Guide Section */}
                <div className="bg-white rounded-lg border border-gray-100 p-8 flex flex-col justify-center h-full min-h-[300px] shadow-sm">
                    <div className="max-w-md">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">New to Guwahati?</h3>
                        <p className="text-gray-500 mb-8">
                            Get our free guide to the top 10 heritage spots you can visit in under 3 hours.
                        </p>
                        <button className="w-full bg-white border border-gray-200 text-gray-700 font-medium py-3 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <Download className="w-4 h-4 mr-2" />
                            Download Guide
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
