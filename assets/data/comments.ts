import { Author, Comment } from "../../types";

export const MOCK_COMMENTS: (Omit<Comment, "userId"> & { author: Author })[] = [
  // --- 1 COMMENT PER POST (Posts 1-20) ---
  {
    _id: "c1",
    postId: "1",
    content: "AC is freezing on the 3rd floor! ❄️",
    author: {
      _id: "u2",
      fullName: "Mystic Mango",
      username: "mysticmango",
      email: "anon2@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 12 * 3600000).toISOString(),
  },
  {
    _id: "c2",
    postId: "2",
    content: "I think I know whose ID this is. DMing!",
    author: {
      _id: "u12",
      fullName: "Digital Nomad",
      username: "digitalnomad",
      email: "anon12@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 20 * 3600000).toISOString(),
  },
  {
    _id: "c3",
    postId: "3",
    content: "The sky is purple right now. Insane. 🌅",
    author: {
      _id: "u5",
      fullName: "Blue Falcon",
      username: "bluefalcon",
      email: "anon5@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 5 * 3600000).toISOString(),
  },
  {
    _id: "c4",
    postId: "4",
    content: "Finally! The beans are actually soft today.",
    author: {
      _id: "u8",
      fullName: "Shadow Wolf",
      username: "shadowwolf",
      email: "anon8@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 8 * 3600000).toISOString(),
  },
  {
    _id: "c5",
    postId: "5",
    content: "It's the guys in Room 204. So annoying.",
    author: {
      _id: "u1",
      fullName: "Shinny Squirrel",
      username: "shinnysquirrel",
      email: "anon1@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 3 * 3600000).toISOString(),
  },
  {
    _id: "c6",
    postId: "6",
    content: "Bun is elite. Never going back to npm.",
    author: {
      _id: "u15",
      fullName: "Pixel Pirate",
      username: "pixelpirate",
      email: "anon15@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 18 * 3600000).toISOString(),
  },
  {
    _id: "c7",
    postId: "7",
    content: "Stuck at Ndokoti for 2 hours already. Save yourselves.",
    author: {
      _id: "u18",
      fullName: "Code Cracker",
      username: "codecracker",
      email: "anon18@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 6 * 3600000).toISOString(),
  },
  {
    _id: "c8",
    postId: "8",
    content: "Time to live on energy drinks and prayer.",
    author: {
      _id: "u4",
      fullName: "Swift Cheetah",
      username: "swiftcheetah",
      email: "anon4@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 23 * 3600000).toISOString(),
  },
  {
    _id: "c9",
    postId: "9",
    content: "I have one! Meet me at the cafeteria at 1pm.",
    author: {
      _id: "u10",
      fullName: "Neon Cobra",
      username: "neoncobra",
      email: "anon10@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 4 * 3600000).toISOString(),
  },
  {
    _id: "c10",
    postId: "10",
    content: "What AI model did you use for this?",
    author: {
      _id: "u19",
      fullName: "Lunar Lynx",
      username: "lunarlynx",
      email: "anon19@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 14 * 3600000).toISOString(),
  },
  {
    _id: "c11",
    postId: "11",
    content: "I'm down for the 5am session. Let's get it! 💪",
    author: {
      _id: "u16",
      fullName: "Tech Titan",
      username: "techtitan",
      email: "anon16@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 2 * 3600000).toISOString(),
  },
  {
    _id: "c12",
    postId: "12",
    content: "Is the coffee actually good though?",
    author: {
      _id: "u14",
      fullName: "Cloud Walker",
      username: "cloudwalker",
      email: "anon14@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 11 * 3600000).toISOString(),
  },
  {
    _id: "c13",
    postId: "13",
    content: "Dark mode is the only mode for 3am sessions.",
    author: {
      _id: "u13",
      fullName: "Night Owl",
      username: "nightowl",
      email: "anon13@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 7 * 3600000).toISOString(),
  },
  {
    _id: "c14",
    postId: "14",
    content: "Buea weather is so unpredictable.",
    author: {
      _id: "u7",
      fullName: "Urban Eagle",
      username: "urbaneagle",
      email: "anon7@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 20 * 3600000).toISOString(),
  },
  {
    _id: "c15",
    postId: "15",
    content: "Too accurate. My rectangles are currently crying.",
    author: {
      _id: "u20",
      fullName: "Storm Seeker",
      username: "stormseeker",
      email: "anon20@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 15 * 3600000).toISOString(),
  },
  {
    _id: "c16",
    postId: "16",
    content: "I'll be there! Hope they have stickers.",
    author: {
      _id: "u6",
      fullName: "Silent Panda",
      username: "silentpanda",
      email: "anon6@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 19 * 3600000).toISOString(),
  },
  {
    _id: "c17",
    postId: "17",
    content: "Where exactly? I want to see this.",
    author: {
      _id: "u17",
      fullName: "Velvet Fox",
      username: "velvetfox",
      email: "anon17@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 9 * 3600000).toISOString(),
  },
  {
    _id: "c18",
    postId: "18",
    content: "Big W! Welcome to the open source community.",
    author: {
      _id: "u11",
      fullName: "Iron Rhino",
      username: "ironrhino",
      email: "anon11@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 3600000).toISOString(),
  },
  {
    _id: "c19",
    postId: "19",
    content: "Samsung S24 Ultra zoom would've killed this.",
    author: {
      _id: "u9",
      fullName: "Hyper Hare",
      username: "hyperhare",
      email: "anon9@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1 * 3600000).toISOString(),
  },
  {
    _id: "c20",
    postId: "20",
    content: "Too late, my clothes are already soaked. ⛈️",
    author: {
      _id: "u3",
      fullName: "Golden Lion",
      username: "goldenlion",
      email: "anon3@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 2 * 3600000).toISOString(),
  },

  // --- 10 ADDITIONAL COMMENTS (Total 30) ---
  {
    _id: "c21",
    postId: "8",
    content: "Anyone have the past questions for Stats?",
    author: {
      _id: "u2",
      fullName: "Mystic Mango",
      username: "mysticmango",
      email: "anon2@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 20 * 3600000).toISOString(),
  },
  {
    _id: "c22",
    postId: "8",
    content: "Good luck everyone. We're going to need it.",
    author: {
      _id: "u5",
      fullName: "Blue Falcon",
      username: "bluefalcon",
      email: "anon5@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 18 * 3600000).toISOString(),
  },
  {
    _id: "c23",
    postId: "1",
    content: "Floor 4 AC is also out. Don't go up there.",
    author: {
      _id: "u12",
      fullName: "Digital Nomad",
      username: "digitalnomad",
      email: "anon12@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 5 * 3600000).toISOString(),
  },
  {
    _id: "c24",
    postId: "18",
    content: "What repo was it? Looking for things to contribute to.",
    author: {
      _id: "u13",
      fullName: "Night Owl",
      username: "nightowl",
      email: "anon13@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 22 * 3600000).toISOString(),
  },
  {
    _id: "c25",
    postId: "4",
    content: "The plantains were also actually good for once.",
    author: {
      _id: "u20",
      fullName: "Storm Seeker",
      username: "stormseeker",
      email: "anon20@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1506863530036-1efeddceb993?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 4 * 3600000).toISOString(),
  },
  {
    _id: "c26",
    postId: "7",
    content: "Is the road open now? Need to head home.",
    author: {
      _id: "u11",
      fullName: "Iron Rhino",
      username: "ironrhino",
      email: "anon11@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1500048993953-d23a436266cf?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1 * 3600000).toISOString(),
  },
  {
    _id: "c27",
    postId: "16",
    content: "GDG meetups are always 10/10.",
    author: {
      _id: "u15",
      fullName: "Pixel Pirate",
      username: "pixelpirate",
      email: "anon15@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 12 * 3600000).toISOString(),
  },
  {
    _id: "c28",
    postId: "13",
    content: "Sleep is for people who don't have bugs.",
    author: {
      _id: "u1",
      fullName: "Shinny Squirrel",
      username: "shinnysquirrel",
      email: "anon1@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 2 * 3600000).toISOString(),
  },
  {
    _id: "c29",
    postId: "20",
    content: "Douala rain hits different.",
    author: {
      _id: "u9",
      fullName: "Hyper Hare",
      username: "hyperhare",
      email: "anon9@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 1 * 3600000).toISOString(),
  },
  {
    _id: "c30",
    postId: "8",
    content: "Checking my notes for the 50th time today.",
    author: {
      _id: "u17",
      fullName: "Velvet Fox",
      username: "velvetfox",
      email: "anon17@wall.com",
      role: "user",
      avatarUrl:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    },
    createdAt: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 23 * 3600000).toISOString(),
  },
];
