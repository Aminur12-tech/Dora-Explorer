import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, X, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
    const [merchants, setMerchants] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'merchants' | 'bookings' | 'stats'>('merchants');

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                // Fetch merchants
                const merchantRes = await fetch('http://localhost:5000/api/merchant');
                const merchantData = await merchantRes.json();
                setMerchants(Array.isArray(merchantData) ? merchantData : []);

                // Fetch bookings
                const bookingRes = await fetch('http://localhost:5000/api/booking');
                const bookingData = await bookingRes.json();
                setBookings(Array.isArray(bookingData) ? bookingData : []);

                // Fetch stats
                const statsRes = await fetch('http://localhost:5000/api/experience/stats');
                const statsData = await statsRes.json();
                setStats(statsData);
            } catch (err) {
                console.error('Error loading admin data:', err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const handleApprove = async (merchantId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/merchant/${merchantId}/approve`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                setMerchants(merchants.map(m => m._id === merchantId ? { ...m, isVerified: true, status: 'approved' } : m));
            }
        } catch (err) {
            console.error('Error approving merchant:', err);
        }
    };

    const handleRejectBooking = async (bookingId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/booking/${bookingId}/reject`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: 'rejected' } : b));
            }
        } catch (err) {
            console.error('Error rejecting booking:', err);
        }
    };

    const handleConfirmBooking = async (bookingId: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/booking/${bookingId}/confirm`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }
            });
            if (res.ok) {
                setBookings(bookings.map(b => b._id === bookingId ? { ...b, status: 'confirmed' } : b));
            }
        } catch (err) {
            console.error('Error confirming booking:', err);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto p-6">
                <h1 className="text-4xl font-bold text-foreground mb-8">Admin Dashboard</h1>

                {/* Stats Cards */}
                {stats && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-card rounded-lg p-4 shadow-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm">Total Experiences</p>
                                    <p className="text-3xl font-bold text-foreground">{stats.total || 0}</p>
                                </div>
                                <TrendingUp className="w-8 h-8 text-primary" />
                            </div>
                        </div>

                        <div className="bg-card rounded-lg p-4 shadow-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm">Total Merchants</p>
                                    <p className="text-3xl font-bold text-foreground">{merchants.length}</p>
                                </div>
                                <Users className="w-8 h-8 text-primary" />
                            </div>
                        </div>

                        <div className="bg-card rounded-lg p-4 shadow-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm">Total Bookings</p>
                                    <p className="text-3xl font-bold text-foreground">{bookings.length}</p>
                                </div>
                                <Calendar className="w-8 h-8 text-primary" />
                            </div>
                        </div>

                        <div className="bg-card rounded-lg p-4 shadow-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-muted-foreground text-sm">Est. Revenue</p>
                                    <p className="text-3xl font-bold text-primary">₹{(bookings.reduce((sum, b) => sum + (b.amount || 0), 0) * 0.1).toFixed(0)}</p>
                                </div>
                                <DollarSign className="w-8 h-8 text-primary" />
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-border">
                    {(['merchants', 'bookings', 'stats'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 font-semibold transition ${activeTab === tab
                                    ? 'text-primary border-b-2 border-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>

                {/* Merchants Tab */}
                {activeTab === 'merchants' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Pending Merchant Approvals</h2>
                        {merchants.filter(m => !m.isVerified).length === 0 ? (
                            <p className="text-muted-foreground">All merchants verified! ✓</p>
                        ) : (
                            merchants.filter(m => !m.isVerified).map((merchant) => (
                                <motion.div
                                    key={merchant._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-card rounded-lg p-4 shadow-card"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-foreground">{merchant.businessName}</h3>
                                            <p className="text-sm text-muted-foreground">Owner: {merchant.ownerName}</p>
                                            <p className="text-sm text-muted-foreground">Email: {merchant.email}</p>
                                            <p className="text-sm text-muted-foreground">Phone: {merchant.phone}</p>
                                            <p className="text-sm text-muted-foreground mt-2">{merchant.bio}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleApprove(merchant._id)}
                                                className="bg-success text-white hover:bg-success/90"
                                            >
                                                <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Verified Merchants</h2>
                        {merchants.filter(m => m.isVerified).map((merchant) => (
                            <motion.div
                                key={merchant._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-card rounded-lg p-4 shadow-card border border-success/20"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-foreground flex items-center gap-2">
                                            {merchant.businessName}
                                            <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">✓ Verified</span>
                                        </h3>
                                        <p className="text-sm text-muted-foreground">Owner: {merchant.ownerName}</p>
                                        <p className="text-sm text-muted-foreground">Email: {merchant.email}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Bookings Tab */}
                {activeTab === 'bookings' && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Pending Booking Confirmations</h2>
                        {bookings.filter(b => b.status === 'pending').length === 0 ? (
                            <p className="text-muted-foreground">No pending bookings!</p>
                        ) : (
                            bookings.filter(b => b.status === 'pending').map((booking) => (
                                <motion.div
                                    key={booking._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-card rounded-lg p-4 shadow-card"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-foreground">Booking #{booking.bookingId}</h3>
                                            <p className="text-sm text-muted-foreground">Name: {booking.name}</p>
                                            <p className="text-sm text-muted-foreground">Email: {booking.email}</p>
                                            <p className="text-sm text-muted-foreground">Phone: {booking.phone}</p>
                                            <p className="text-sm text-muted-foreground">Slot: {booking.slot}</p>
                                            <p className="text-sm text-muted-foreground">Participants: {booking.participants}</p>
                                            <p className="text-sm font-semibold text-primary mt-2">Amount: ₹{booking.amount}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                onClick={() => handleConfirmBooking(booking._id)}
                                                className="bg-success text-white hover:bg-success/90"
                                            >
                                                <CheckCircle className="w-4 h-4 mr-2" /> Confirm
                                            </Button>
                                            <Button
                                                onClick={() => handleRejectBooking(booking._id)}
                                                variant="outline"
                                                className="text-destructive"
                                            >
                                                <X className="w-4 h-4 mr-2" /> Reject
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}

                        <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Confirmed Bookings</h2>
                        {bookings.filter(b => b.status === 'confirmed').map((booking) => (
                            <motion.div
                                key={booking._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-card rounded-lg p-4 shadow-card border border-success/20"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="font-bold text-foreground flex items-center gap-2">
                                            Booking #{booking.bookingId}
                                            <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">✓ Confirmed</span>
                                        </h3>
                                        <p className="text-sm text-muted-foreground">Name: {booking.name}</p>
                                        <p className="text-sm text-muted-foreground">Slot: {booking.slot}</p>
                                        <p className="text-sm font-semibold text-primary">₹{booking.amount}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Stats Tab */}
                {activeTab === 'stats' && stats && (
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-foreground mb-4">Experience Categories</h2>
                        {stats.byCategory?.map((cat: any) => (
                            <motion.div
                                key={cat._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-card rounded-lg p-4 shadow-card"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-bold text-foreground">{cat._id || 'Unknown'}</h3>
                                        <p className="text-sm text-muted-foreground">Count: {cat.count}</p>
                                        <p className="text-sm text-muted-foreground">Avg Price: ₹{cat.avgPrice?.toFixed(0)}</p>
                                        <p className="text-sm text-muted-foreground">Avg Rating: {cat.avgRating?.toFixed(1)}</p>
                                    </div>
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                        <p className="text-2xl font-bold text-primary">{cat.count}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default AdminDashboard;