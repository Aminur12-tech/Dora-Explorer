const mongoose = require("mongoose");
const Experience = require("../models/Experience");
const Merchant = require("../models/Merchant");

// Set connection timeout
const mongoURI = "mongodb+srv://alexdyel1234_db_user:7bpXAjvyrRpujFB5@cluster0.d9gt9hv.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
});

mongoose.connection.on("connected", () => {
    console.log("✅ Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
});

async function seed() {
    try {
        // Clear existing data
        await Merchant.deleteMany({});
        await Experience.deleteMany({});
        console.log("🧹 Cleared existing data");

        // -------------------------
        // MERCHANTS
        // -------------------------
        const merchants = await Merchant.insertMany([
            {
                businessName: "Assam Heritage Walks",
                ownerName: "Priyanka Das",
                email: "priyanka@heritage.com",
                phone: "9876543210",
                businessType: "Culture",
                description: "Certified local heritage guide",
                address: {
                    street: "123 Temple Road",
                    city: "Guwahati",
                    state: "Assam",
                    country: "India"
                },
                isVerified: true,
                status: "approved"
            },
            {
                businessName: "Brahmaputra Trails",
                ownerName: "Rohit Sharma",
                email: "rohit@brahmaputra.com",
                phone: "9123456789",
                businessType: "Adventure",
                description: "Riverfront walks and sunset experiences",
                address: {
                    street: "456 River Lane",
                    city: "Guwahati",
                    state: "Assam",
                    country: "India"
                },
                isVerified: true,
                status: "approved"
            }
        ]);

        console.log("👩‍💼 Merchants added:", merchants.length);

        // -------------------------
        // EXPERIENCES
        // -------------------------
        const experiences = [
            {
                title: "Kamakhya Temple Heritage Walk",
                description:
                    "A guided walk through the sacred Kamakhya Temple complex with stories, rituals, and hilltop views.",
                image:
                    "https://images.unsplash.com/photo-1589182337358-32c89c7db5b5",
                duration: 90,
                category: "Temple",
                area: "Nilachal Hill",
                meetingPoint: "Kamakhya Temple Main Gate",
                price: 499,
                rating: 4.8,
                reviewCount: 45,
                highlights: [
                    "Ancient Shakti Peeth",
                    "Temple rituals explained",
                    "Hilltop views of Guwahati"
                ],
                included: ["Local guide", "Temple history booklet"],
                notIncluded: ["Temple donations"],
                minParticipants: 1,
                maxParticipants: 10,
                status: "active",
                timeSlots: ["09:00", "11:00", "14:00", "16:00"],
                merchantId: merchants[0]._id
            },
            {
                title: "Umananda Island Walk",
                description:
                    "Short ferry ride and walk through the smallest inhabited river island in the world.",
                image:
                    "https://images.unsplash.com/photo-1601121141461-9d6647f2d0db",
                duration: 60,
                category: "Temple",
                area: "Umananda Island",
                meetingPoint: "Umananda Ferry Ghat",
                price: 299,
                rating: 4.6,
                reviewCount: 32,
                highlights: ["River ferry ride", "Island temple visit"],
                included: ["Guide"],
                notIncluded: ["Ferry ticket"],
                minParticipants: 1,
                maxParticipants: 8,
                status: "active",
                merchantId: merchants[0]._id
            },
            {
                title: "Brahmaputra Sunset Ghat Walk",
                description:
                    "Peaceful evening walk along the Brahmaputra riverfront during sunset.",
                image:
                    "https://images.unsplash.com/photo-1561488111-5d9c6c3a20f5",
                duration: 45,
                category: "Riverfront",
                area: "Fancy Bazaar",
                meetingPoint: "Riverfront Jetty",
                price: 249,
                rating: 4.7,
                reviewCount: 28,
                highlights: ["Sunset views", "River breeze", "Photography"],
                included: ["Guide"],
                minParticipants: 1,
                maxParticipants: 12,
                status: "active",
                merchantId: merchants[1]._id
            },
            {
                title: "Assam Tea Café Trail",
                description:
                    "Taste authentic Assam tea across 3 local cafés with brewing stories.",
                image:
                    "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
                duration: 120,
                category: "Food",
                area: "Pan Bazaar",
                meetingPoint: "Pan Bazaar Tea Cafe",
                price: 599,
                rating: 4.9,
                reviewCount: 38,
                highlights: ["Tea tasting", "Local café stories"],
                included: ["Tea samples"],
                minParticipants: 2,
                maxParticipants: 6,
                status: "active",
                merchantId: merchants[0]._id
            },
            {
                title: "Local Handloom Craft Demo",
                description:
                    "Watch traditional Assamese weaving and interact with artisans.",
                image:
                    "https://images.unsplash.com/photo-1594729095022-e2f6d2eece9c",
                duration: 75,
                category: "Culture",
                area: "Sualkuchi",
                meetingPoint: "Sualkuchi Handloom Center",
                price: 399,
                rating: 4.8,
                reviewCount: 22,
                highlights: ["Live weaving", "Silk traditions"],
                included: ["Craft demo"],
                minParticipants: 1,
                maxParticipants: 8,
                status: "active",
                merchantId: merchants[0]._id
            },
            {
                title: "Morning River Yoga",
                description:
                    "Relaxing yoga session beside the Brahmaputra river.",
                image:
                    "https://images.unsplash.com/photo-1552196563-55cd4e45efb3",
                duration: 60,
                category: "Wellness",
                area: "Uzan Bazaar",
                meetingPoint: "Riverfront Yoga Deck",
                price: 349,
                rating: 4.5,
                reviewCount: 18,
                highlights: ["Morning calm", "Certified instructor"],
                included: ["Yoga mat"],
                minParticipants: 1,
                maxParticipants: 10,
                status: "active",
                merchantId: merchants[1]._id
            },
            {
                title: "Guwahati Street Food Walk",
                description:
                    "Explore local Assamese snacks and hidden street food joints.",
                image:
                    "https://images.unsplash.com/photo-1604908177522-3b7c71f4c8de",
                duration: 150,
                category: "Food",
                area: "Paltan Bazaar",
                meetingPoint: "Paltan Bazaar Clock Tower",
                price: 699,
                rating: 4.9,
                reviewCount: 52,
                highlights: ["Local snacks", "Hidden spots"],
                included: ["Food tasting"],
                notIncluded: ["Extra food orders"],
                minParticipants: 2,
                maxParticipants: 8,
                status: "active",
                merchantId: merchants[1]._id
            },
            {
                title: "Evening Cultural Folk Show",
                description:
                    "Traditional Assamese folk dance and music performance.",
                image:
                    "https://images.unsplash.com/photo-1584433144859-1fc3ab64a957",
                duration: 120,
                category: "Culture",
                area: "Srimanta Sankardev Kalakshetra",
                meetingPoint: "Kalakshetra Main Gate",
                price: 549,
                rating: 4.7,
                reviewCount: 41,
                highlights: ["Bihu dance", "Live music"],
                included: ["Entry ticket"],
                minParticipants: 1,
                maxParticipants: 15,
                status: "active",
                merchantId: merchants[0]._id
            }
        ];

        const insertedExperiences = await Experience.insertMany(experiences);
        console.log("🎉 Experiences seeded successfully:", insertedExperiences.length);

        // Print seeded data summary
        console.log("\n📋 Seeded Data Summary:");
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
        insertedExperiences.forEach((exp, index) => {
            console.log(`${index + 1}. ${exp.title} - ₹${exp.price}`);
        });
        console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

        console.log("✅ Seed completed successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed error:", err.message);
        console.error(err);
        process.exit(1);
    }
}

// Ensure connection is established before seeding
setTimeout(seed, 2000);
