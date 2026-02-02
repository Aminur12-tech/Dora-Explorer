const mongoose = require("mongoose");
const Experience = require("../models/Experience");
const Merchant = require("../models/Merchant");

mongoose.connect("mongodb+srv://alexdyel1234_db_user:7bpXAjvyrRpujFB5@cluster0.d9gt9hv.mongodb.net/?appName=Cluster0");

async function seed() {
    await Experience.deleteMany();
    await Merchant.deleteMany();

    const merchant = await Merchant.create({
        name: "Priyanka Das",
        bio: "Certified local heritage guide",
        languages: ["Assamese", "Hindi"],
        verified: true
    });

    await Experience.create([
        {
            title: "Kamakhya Temple Heritage Walk",
            duration: 90,
            category: "Temple",
            area: "Nilachal Hill",
            price: 499,
            rating: 4.8,
            meetingPoint: "Temple Gate",
            merchantId: merchant._id
        },
        {
            title: "Brahmaputra Sunset Ghat Walk",
            duration: 60,
            category: "Riverfront",
            area: "Umananda",
            price: 299,
            rating: 4.6,
            meetingPoint: "Riverfront Jetty",
            merchantId: merchant._id
        }
    ]);

    console.log("Seed Done");
    process.exit();
}

seed();
