
import { Check, Star, ArrowRight } from 'lucide-react';
import bikashPhoto from '@/assets/Bikash.jpeg';
import priyankaPhoto from '@/assets/Priyanka.jpeg';
import aminurPhoto from '@/assets/Aminur.jpeg';
import dipankarPhoto from '@/assets/Dipankar.jpeg';

const hosts = [
    {
        id: 1,
        name: 'Bikash',
        role: 'History Buff',
        rating: 4.8,
        image: bikashPhoto,
    },
    {
        id: 2,
        name: 'Priyanka',
        role: 'Nature Lover',
        rating: 4.9,
        image: priyankaPhoto,
    },
    {
        id: 3,
        name: 'Dipankar',
        role: 'Foodie',
        rating: 4.7,
        image: dipankarPhoto,
    },
    {
        id: 4,
        name: 'Aminur',
        role: 'Artist',
        rating: 5,
        image: aminurPhoto,
    },
];

export const LocalHosts = () => {
    return (
        <div className="bg-gray-50 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Meet Your Local Hosts</h2>
                        <p className="text-gray-600 mt-1">Passionate Guwahatians ready to show you their city.</p>
                    </div>
                    <button className="hidden md:flex items-center text-primary font-medium hover:underline">
                        View all hosts <ArrowRight className="w-4 h-4 ml-1" />
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {hosts.map((host) => (
                        <div key={host.id} className="flex flex-col items-center text-center">
                            <div className="relative mb-3">
                                <img
                                    src={host.image}
                                    alt={host.name}
                                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-white shadow-sm"
                                />
                                <div className="absolute bottom-0 right-0 bg-green-500 text-white p-0.5 rounded-full border-2 border-white">
                                    <Check className="w-3 h-3 md:w-4 md:h-4" />
                                </div>
                            </div>
                            <h3 className="font-semibold text-gray-900">{host.name}</h3>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <span>{host.role}</span>
                                <span className="mx-1">•</span>
                                <span className="flex items-center">
                                    {host.rating} <Star className="w-3 h-3 text-green-500 fill-current ml-0.5" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="md:hidden w-full mt-6 flex justify-center items-center text-primary font-medium">
                    View all hosts <ArrowRight className="w-4 h-4 ml-1" />
                </button>
            </div>
        </div>
    );
};
