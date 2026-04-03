import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { EventCard } from "@/components/EventCard";
import { CampusEvent, EventCategory } from "../../../types";

export default function EventsScreen() {
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<EventCategory | "All">("All");

  // Example Data
  const categories: (EventCategory | "All")[] = [
    "All",
    "Academic",
    "Tech",
    "Social",
    "Career",
    "Sports",
  ];

  const [events] = useState<CampusEvent[]>([
    // TECH (6 Events)
    {
      _id: "t1",
      title: "GDG Douala: Build with AI",
      location: "IUT Douala, Salle d'Actes",
      coordinate: { latitude: 4.0483, longitude: 9.7043 },
      time: "Sat, 14 Feb • 10:00 AM",
      description:
        "A deep dive into integrating Gemini into your Node.js and React Native apps.",
      category: "Tech",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1591115765373-520b7a3d72b7?w=500",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "t2",
      title: "Bun vs Node.js Workshop",
      location: "Lab 4, GEII Department",
      coordinate: { latitude: 4.0484, longitude: 9.7044 },
      time: "Wed, 18 Feb • 02:00 PM",
      description:
        "Learn why Bun is the future of JavaScript runtimes. Speed benchmarks and setup guide.",
      category: "Tech",
      author: {
        _id: "a2",
        fullName: "Software Club",
        avatarUrl: "https://i.pravatar.cc/101",
        role: "Student",
        email: "sc@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 611 222 333",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "t3",
      title: "CyberSecurity Capture The Flag",
      location: "Block C, Room 12",
      coordinate: { latitude: 4.0485, longitude: 9.7045 },
      time: "Fri, 20 Feb • 09:00 AM",
      description:
        "Compete in teams to solve security puzzles and find hidden flags. Prizes for the winners!",
      category: "Tech",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500",
      ],
      isFree: false,
      price: 1500,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "t4",
      title: "Intro to Arduino & IoT",
      location: "Robotics Lab",
      coordinate: { latitude: 4.0486, longitude: 9.7046 },
      time: "Mon, 23 Feb • 11:00 AM",
      description:
        "Build your first smart device using Arduino sensors and Wi-Fi modules.",
      category: "Tech",
      author: {
        _id: "a3",
        fullName: "Tech Society",
        avatarUrl: "https://i.pravatar.cc/102",
        role: "Student",
        email: "tech@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
      ],
      isFree: false,
      price: 2000,
      phoneNumber: "+237 622 333 444",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "t5",
      title: "Flutter UI Challenge",
      location: "GEI Hall",
      coordinate: { latitude: 4.0487, longitude: 9.7047 },
      time: "Thu, 26 Feb • 03:00 PM",
      description:
        "Can you build a Netflix clone UI in 2 hours? Come test your mobile dev skills.",
      category: "Tech",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "t6",
      title: "AI Ethics Debate",
      location: "Amphi 500",
      coordinate: { latitude: 4.0488, longitude: 9.7048 },
      time: "Fri, 27 Feb • 01:00 PM",
      description:
        "Discussion on the impact of LLMs on the Cameroonian education system.",
      category: "Tech",
      author: {
        _id: "a4",
        fullName: "Prof. Ndong",
        avatarUrl: "https://i.pravatar.cc/103",
        role: "Lecturer",
        email: "ndong@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 633 444 555",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    // ACADEMIC (6 Events)
    {
      _id: "ac1",
      title: "Thesis Defense Prep 101",
      location: "Conference Room B",
      coordinate: { latitude: 4.0489, longitude: 9.7049 },
      time: "Mon, 2 Mar • 08:00 AM",
      description:
        "Tips on how to structure your final year project presentation and handle Q&A.",
      category: "Academic",
      author: {
        _id: "a4",
        fullName: "Prof. Ndong",
        avatarUrl: "https://i.pravatar.cc/103",
        role: "Lecturer",
        email: "ndong@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "ac2",
      title: "Advanced Calculus Seminar",
      location: "Amphi 250",
      coordinate: { latitude: 4.049, longitude: 9.705 },
      time: "Wed, 4 Mar • 10:00 AM",
      description:
        "Deep dive into partial differential equations for engineering students.",
      category: "Academic",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "ac3",
      title: "Library Research Day",
      location: "Main Library",
      coordinate: { latitude: 4.0491, longitude: 9.7051 },
      time: "Fri, 6 Mar • 09:00 AM",
      description:
        "Learn how to access international journals and cite your sources correctly.",
      category: "Academic",
      author: {
        _id: "a5",
        fullName: "Ms. Bella",
        avatarUrl: "https://i.pravatar.cc/104",
        role: "Staff",
        email: "bella@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 644 555 666",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "ac4",
      title: "GCE Prep Mock Exam",
      location: "Block B Hall",
      coordinate: { latitude: 4.0492, longitude: 9.7052 },
      time: "Sat, 7 Mar • 08:30 AM",
      description: "Simulated exam conditions for upcoming local certificates.",
      category: "Academic",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500",
      ],
      isFree: false,
      price: 500,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "ac5",
      title: "English for Engineers",
      location: "Language Center",
      coordinate: { latitude: 4.0493, longitude: 9.7053 },
      time: "Tue, 10 Mar • 04:00 PM",
      description:
        "Improve your technical report writing and professional communication skills.",
      category: "Academic",
      author: {
        _id: "a6",
        fullName: "Dr. Smith",
        avatarUrl: "https://i.pravatar.cc/105",
        role: "Lecturer",
        email: "smith@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500",
      ],
      isFree: false,
      price: 1000,
      phoneNumber: "+237 655 666 777",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "ac6",
      title: "Thermodynamics Open Study",
      location: "Student Square",
      coordinate: { latitude: 4.0494, longitude: 9.7054 },
      time: "Thu, 12 Mar • 02:00 PM",
      description:
        "Peer-to-peer study group session for GIM and GEII students.",
      category: "Academic",
      author: {
        _id: "a7",
        fullName: "Samuel E.",
        avatarUrl: "https://i.pravatar.cc/106",
        role: "Student",
        email: "sam@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 666 777 888",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    // SOCIAL (6 Events)
    {
      _id: "s1",
      title: "Freshers Welcome Party",
      location: "IUT Parking Lot",
      coordinate: { latitude: 4.0495, longitude: 9.7055 },
      time: "Fri, 13 Mar • 07:00 PM",
      description:
        "Music, food, and networking for all new students. Come meet your peers!",
      category: "Social",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500",
      ],
      isFree: false,
      price: 2000,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "s2",
      title: "Campus Cultural Day",
      location: "Amphi 700 Square",
      coordinate: { latitude: 4.0496, longitude: 9.7056 },
      time: "Sat, 14 Mar • 10:00 AM",
      description:
        "Showcasing the diverse cultures of Cameroon through food, dance, and dress.",
      category: "Social",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "s3",
      title: "Talent Show Night",
      location: "Salle des Actes",
      coordinate: { latitude: 4.0497, longitude: 9.7057 },
      time: "Fri, 20 Mar • 06:00 PM",
      description:
        "Can you sing, dance, or perform comedy? Register now for the talent hunt.",
      category: "Social",
      author: {
        _id: "a8",
        fullName: "Arts Club",
        avatarUrl: "https://i.pravatar.cc/107",
        role: "Student",
        email: "arts@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1514525253361-bee0483307a0?w=500",
      ],
      isFree: false,
      price: 1000,
      phoneNumber: "+237 677 888 999",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "s4",
      title: "Movie Night: Interstellar",
      location: "Amphi 1000",
      coordinate: { latitude: 4.0498, longitude: 9.7058 },
      time: "Tue, 24 Mar • 06:30 PM",
      description:
        "Grab your popcorn! We are screening a sci-fi classic for all students.",
      category: "Social",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "s5",
      title: "Gala Dinner 2026",
      location: "Hotel Akwa Palace",
      coordinate: { latitude: 4.05, longitude: 9.71 },
      time: "Sat, 28 Mar • 08:00 PM",
      description:
        "An elegant night to celebrate our achievements. Formal attire required.",
      category: "Social",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500",
      ],
      isFree: false,
      price: 15000,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "s6",
      title: "Gaming Tournament (FIFA)",
      location: "Student Lounge",
      coordinate: { latitude: 4.0499, longitude: 9.7059 },
      time: "Wed, 1 Apr • 02:00 PM",
      description:
        "Think you are the best at FIFA? Come prove it and win the campus trophy.",
      category: "Social",
      author: {
        _id: "a9",
        fullName: "Kevin G.",
        avatarUrl: "https://i.pravatar.cc/108",
        role: "Student",
        email: "kevin@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500",
      ],
      isFree: false,
      price: 500,
      phoneNumber: "+237 688 999 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    // CAREER (6 Events)
    {
      _id: "c1",
      title: "CV Writing Masterclass",
      location: "Conference Hall A",
      coordinate: { latitude: 4.0501, longitude: 9.7061 },
      time: "Mon, 6 Apr • 09:00 AM",
      description:
        "Stand out to employers. Learn how to write a tech-focused CV that gets noticed.",
      category: "Career",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "c2",
      title: "IUT Job Fair 2026",
      location: "IUT Sports Field",
      coordinate: { latitude: 4.0502, longitude: 9.7062 },
      time: "Wed, 8 Apr • 08:00 AM",
      description:
        "Meet top companies from Douala looking for interns and full-time engineers.",
      category: "Career",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "c3",
      title: "LinkedIn for Students",
      location: "IT Center B",
      coordinate: { latitude: 4.0503, longitude: 9.7063 },
      time: "Fri, 10 Apr • 02:00 PM",
      description:
        "Optimize your profile and learn how to network with industry professionals.",
      category: "Career",
      author: {
        _id: "a10",
        fullName: "Hiring Hub",
        avatarUrl: "https://i.pravatar.cc/109",
        role: "Staff",
        email: "jobs@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 699 000 111",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "c4",
      title: "Entrepreneurship Summit",
      location: "Amphi 500",
      coordinate: { latitude: 4.0504, longitude: 9.7064 },
      time: "Mon, 13 Apr • 10:00 AM",
      description:
        "Learn how to launch your own startup in Cameroon. Insights from local founders.",
      category: "Career",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1522071823991-b96c71f7c4ad?w=500",
      ],
      isFree: false,
      price: 1000,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "c5",
      title: "Mock Interview Day",
      location: "Department Offices",
      coordinate: { latitude: 4.0505, longitude: 9.7065 },
      time: "Wed, 15 Apr • 09:00 AM",
      description:
        "Practice your interview skills with real HR managers and get feedback.",
      category: "Career",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1560439514-4e9645039924?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "c6",
      title: "Study Abroad Info Session",
      location: "Conference Room C",
      coordinate: { latitude: 4.0506, longitude: 9.7066 },
      time: "Fri, 17 Apr • 11:00 AM",
      description:
        "Scholarship opportunities for Masters and PhD programs in Europe and Canada.",
      category: "Career",
      author: {
        _id: "a11",
        fullName: "Global Desk",
        avatarUrl: "https://i.pravatar.cc/110",
        role: "Staff",
        email: "global@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1523050335392-9bc5675e097d?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 611 111 222",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },

    // SPORTS (6 Events)
    {
      _id: "sp1",
      title: "Inter-Dept Football Finals",
      location: "Campus Stadium",
      coordinate: { latitude: 4.0507, longitude: 9.7067 },
      time: "Sat, 18 Apr • 03:00 PM",
      description:
        "The big match: GI vs GIM. Come support your favorite department!",
      category: "Sports",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "sp2",
      title: "Campus Marathon",
      location: "Start at Main Gate",
      coordinate: { latitude: 4.0508, longitude: 9.7068 },
      time: "Sun, 19 Apr • 06:30 AM",
      description:
        "A 5km run around the campus and Ndogbong area. Get your running shoes ready.",
      category: "Sports",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "sp3",
      title: "Basketball 3x3 Tournament",
      location: "Outdoor Courts",
      coordinate: { latitude: 4.0509, longitude: 9.7069 },
      time: "Wed, 22 Apr • 04:00 PM",
      description:
        "Fast-paced basketball action. Register your team of three today.",
      category: "Sports",
      author: {
        _id: "a12",
        fullName: "Hoop Club",
        avatarUrl: "https://i.pravatar.cc/111",
        role: "Student",
        email: "hoops@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500",
      ],
      isFree: false,
      price: 1500,
      phoneNumber: "+237 622 222 333",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "sp4",
      title: "Morning Yoga Session",
      location: "Gym Center",
      coordinate: { latitude: 4.051, longitude: 9.707 },
      time: "Sat, 25 Apr • 07:00 AM",
      description:
        "Relieve exam stress with a guided yoga and meditation class.",
      category: "Sports",
      author: {
        _id: "a13",
        fullName: "Wellness Unit",
        avatarUrl: "https://i.pravatar.cc/112",
        role: "Staff",
        email: "health@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 633 333 444",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "sp5",
      title: "Table Tennis Open",
      location: "Block A Lounge",
      coordinate: { latitude: 4.0511, longitude: 9.7071 },
      time: "Tue, 28 Apr • 12:30 PM",
      description:
        "Quick matches during the lunch break. All skill levels welcome.",
      category: "Sports",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1534158914592-062992fbe900?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      _id: "sp6",
      title: "Campus Fitness Bootcamp",
      location: "IUT Front Lawn",
      coordinate: { latitude: 4.0512, longitude: 9.7072 },
      time: "Fri, 1 May • 06:00 AM",
      description:
        "High-intensity interval training to start your May Day holiday right.",
      category: "Sports",
      author: {
        _id: "a1",
        fullName: "Admin",
        avatarUrl: "https://i.pravatar.cc/100",
        role: "Admin",
        email: "a@iut.cm",
      },
      images: [
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500",
      ],
      isFree: true,
      phoneNumber: "+237 600 000 000",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]);

  const filteredEvents = useMemo(() => {
    return activeTab === "All"
      ? events
      : events.filter((e) => e.category === activeTab);
  }, [activeTab, events]);

  return (
    <View className="flex-1 bg-black">
      {/* Sticky Header */}
      <View
        style={{ paddingTop: insets.top + 10 }}
        className="px-4 pb-4 bg-black/90 z-10"
      >
        <View className="flex-row justify-between items-end mb-6">
          <View>
            <Text className="text-zinc-500 font-bold uppercase tracking-widest text-xs">
              IUT Douala
            </Text>
            <Text className="text-white text-5xl font-black mt-1">Events</Text>
          </View>
        </View>

        {/* Category Selector */}
        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setActiveTab(item)}
              className={`mr-2 px-6 py-2.5 rounded-full border ${activeTab === item ? "bg-accent border-accent" : "bg-transparent border-zinc-800"}`}
            >
              <Text
                className={`font-bold text-xs ${activeTab === item ? "text-black" : "text-zinc-500"}`}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <EventCard event={item} />}
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    backgroundColor: "#121212",
    borderRadius: 16,
    padding: 16,
    color: "white",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#27272a",
  },
});
