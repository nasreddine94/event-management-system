export interface Event {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    image: string;
    price: number;
    currency: string;
    category: string;
    attendeesCount: number;
    badge: 'Free' | 'Paid';
    status?: 'Registered' | 'Pending OTP' | 'Upcoming' | 'Attended';
}

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    jobTitle: string;
    company: string;
    bio: string;
    avatar: string;
    role: 'Visitor' | 'User' | 'Attendee';
}

export interface Session {
    id: string;
    day: number;
    date: string;
    title: string;
    time: string;
    speaker: string;
    company: string;
    location: string;
    isSaved: boolean;
}

export interface Exhibitor {
    id: string;
    name: string;
    category: string;
    tier: 'Gold' | 'Silver';
    booth: string;
    zone: string;
    logo: string;
}

export interface Connection {
    id: string;
    name: string;
    role: string;
    company: string;
    avatar: string;
    isConnected: boolean;
    canBookMeeting?: boolean;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    text: string;
    timestamp: string;
}

export interface ChatThread {
    id: string;
    participant: Connection;
    lastMessage: string;
    time: string;
    unreadCount: number;
    messages: ChatMessage[];
}

export interface Speaker {
    id: string;
    name: string;
    role: string;
    company: string;
    bio: string;
    avatar: string;
    social: { twitter?: string; linkedin?: string; web?: string };
}

export interface WallPost {
    id: string;
    author: string;
    avatar: string;
    content: string;
    image?: string;
    likes: number;
    time: string;
    comments: number;
}

export interface Poll {
    id: string;
    question: string;
    options: { text: string; votes: number }[];
    totalVotes: number;
    isActive: boolean;
}

export interface ForumPost {
    id: string;
    author: string;
    title: string;
    content: string;
    category: string;
    replies: number;
    views: number;
    likes: number;
    time: string;
}

export const MOCK_EVENTS: Event[] = [
    {
        id: 'e1',
        title: 'Algeria Startup Summit 2026',
        description: 'The biggest networking event for entrepreneurs in Algeria.',
        date: 'March 15, 2026',
        location: 'Palais de la Culture, Alger',
        image: 'https://picsum.photos/seed/summit/800/400',
        price: 0,
        currency: 'DZD',
        category: 'Business',
        attendeesCount: 1200,
        badge: 'Free'
    },
    {
        id: 'e2',
        title: 'DevConf Maghreb 2026',
        description: 'Specialized conference for developers and AI engineers.',
        date: 'April 3, 2026',
        location: 'Oran, Algeria',
        image: 'https://picsum.photos/seed/devconf/800/400',
        price: 2500,
        currency: 'DZD',
        category: 'Tech',
        attendeesCount: 800,
        badge: 'Paid'
    },
    {
        id: 'e3',
        title: 'Design Week Sétif',
        description: 'Exploring the future of UX and product design.',
        date: 'May 10, 2026',
        location: 'Sétif, Algeria',
        image: 'https://picsum.photos/seed/design/800/400',
        price: 0,
        currency: 'DZD',
        category: 'Design',
        attendeesCount: 350,
        badge: 'Free'
    },
    {
        id: 'e4',
        title: 'EdTech Forum MENA',
        description: 'Innovations in educational technology.',
        date: 'June 20, 2026',
        location: 'Constantine, Algeria',
        image: 'https://picsum.photos/seed/edtech/800/400',
        price: 5000,
        currency: 'DZD',
        category: 'Education',
        attendeesCount: 600,
        badge: 'Paid'
    }
];

export const MOCK_USER: UserProfile = {
    id: 'u1',
    firstName: 'Alex',
    lastName: 'Benali',
    email: 'alex@eventdemo.com',
    phone: '+213 555 123 456',
    jobTitle: 'Product Designer',
    company: 'TechCorp DZ',
    bio: 'Passionate about creating digital experiences that impact the community.',
    avatar: 'https://picsum.photos/seed/alex/200',
    role: 'User'
};

export const MOCK_SESSIONS: Session[] = [
    {
        id: 's1',
        day: 1,
        date: 'Saturday March 15',
        title: 'Opening Keynote: The Future of Algerian Tech',
        time: '09:00 AM',
        speaker: 'Karim Meziane',
        company: 'Yassir',
        location: 'Main Stage',
        isSaved: true
    },
    {
        id: 's2',
        day: 1,
        date: 'Saturday March 15',
        title: 'AI in Africa: Opportunities and Challenges',
        time: '10:30 AM',
        speaker: 'Sara Hamida',
        company: 'Google Africa',
        location: 'Hall B',
        isSaved: false
    },
    {
        id: 's3',
        day: 1,
        date: 'Saturday March 15',
        title: 'Lunch and Networking Break',
        time: '12:00 PM',
        speaker: 'N/A',
        company: 'Community',
        location: 'Rooftop Terrace',
        isSaved: false
    },
    {
        id: 's4',
        day: 1,
        date: 'Saturday March 15',
        title: 'Fundraising in MENA: What Investors Want',
        time: '02:00 PM',
        speaker: 'Aymen Boudali',
        company: '212 Founders',
        location: 'Hall A',
        isSaved: true
    },
    {
        id: 's5',
        day: 2,
        date: 'Sunday March 16',
        title: 'Product-Led Growth for Algerian Startups',
        time: '09:30 AM',
        speaker: 'Nadia Cherif',
        company: 'Masroufi',
        location: 'Hall B',
        isSaved: false
    }
];

export const MOCK_EXHIBITORS: Exhibitor[] = [
    { id: 'ex1', name: 'Djezzy', category: 'Telecom', tier: 'Gold', booth: 'A1', zone: 'Entrance Zone', logo: 'https://picsum.photos/seed/djezzy/200' },
    { id: 'ex2', name: 'BNA Bank', category: 'Finance', tier: 'Gold', booth: 'A2', zone: 'Entrance Zone', logo: 'https://picsum.photos/seed/bna/200' },
    { id: 'ex3', name: 'Yassir', category: 'Tech', tier: 'Silver', booth: 'B5', zone: 'Tech Zone', logo: 'https://picsum.photos/seed/yassir/200' },
    { id: 'ex4', name: 'Ooredoo DZ', category: 'Telecom', tier: 'Silver', booth: 'B8', zone: 'Tech Zone', logo: 'https://picsum.photos/seed/ooredoo/200' }
];

export const MOCK_CONNECTIONS: Connection[] = [
    { id: 'c1', name: 'Mehdi Aouadi', role: 'CEO', company: 'PAYMEE', avatar: 'https://picsum.photos/seed/mehdi/200', isConnected: true },
    { id: 'c2', name: 'Yasmine Ait Ali', role: 'Product Manager', company: 'NEXAGATE', avatar: 'https://picsum.photos/seed/yasmine/200', isConnected: false },
    { id: 'c3', name: 'Omar Benali', role: 'UX Designer', company: 'STUDIO DZ', avatar: 'https://picsum.photos/seed/omar/200', isConnected: false },
    { id: 'c4', name: 'Fatima Zerrouk', role: 'Investor', company: 'FLAT6LABS', avatar: 'https://picsum.photos/seed/fatima/200', isConnected: false },
    { id: 'c5', name: 'Amine Mansouri', role: 'CTO', company: 'YASSIR', avatar: 'https://picsum.photos/seed/amine/200', isConnected: false, canBookMeeting: true },
    { id: 'c6', name: 'Rania Hadj', role: 'Marketing Lead', company: 'OOREDOO DZ', avatar: 'https://picsum.photos/seed/rania/200', isConnected: false }
];

export const MOCK_LEADERBOARD = [
    { id: 'l1', name: 'Mehdi Aouadi', points: 1240, rank: 1 },
    { id: 'l2', name: 'Yasmine Ait Ali', points: 980, rank: 2 },
    { id: 'l3', name: 'Omar Benali', points: 740, rank: 3 },
    { id: 'l4', name: 'Fatima Zerrouk', points: 620, rank: 4 },
    { id: 'l5', name: 'Amine Mansouri', points: 590, rank: 5 },
    { id: 'u1', name: 'Alex Benali', points: 340, rank: 12 }
];

export const MOCK_GAMES = [
    { id: 'g1', name: 'Booth Hunt', description: 'Scan QR codes at exhibitor booths', points: 50, total: 20, completed: 5 },
    { id: 'g2', name: 'Scavenger Hunt', description: 'Find hidden clues around the venue', points: 100, total: 8, completed: 2 },
    { id: 'g3', name: 'Live Polls', description: 'Vote in session polls', points: 10, total: 10, completed: 4 },
    { id: 'g4', name: 'Knowledge Quiz', description: 'Test what you learned', points: 200, total: 1, completed: 0 },
    { id: 'g5', name: 'Networking Challenge', description: 'Connect with attendees', points: 20, total: 10, completed: 8 },
    { id: 'g6', name: 'Session Feedback', description: 'Rate and review sessions', points: 15, total: 5, completed: 3 }
];

export const MOCK_CHATS: ChatThread[] = [
    {
        id: 'ch1',
        participant: MOCK_CONNECTIONS[0],
        lastMessage: "See you at the keynote!",
        time: "10:45 AM",
        unreadCount: 0,
        messages: [
            { id: 'm1', senderId: 'c1', text: "Hey Alex, are you coming to the main hall?", timestamp: "10:40 AM" },
            { id: 'm2', senderId: 'u1', text: "Yes, just finishing a coffee.", timestamp: "10:42 AM" },
            { id: 'm3', senderId: 'c1', text: "See you at the keynote!", timestamp: "10:45 AM" }
        ]
    },
    {
        id: 'ch2',
        participant: MOCK_CONNECTIONS[4],
        lastMessage: "Can we reschedule our meeting?",
        time: "Yesterday",
        unreadCount: 2,
        messages: []
    }
];

export const MOCK_SPEAKERS: Speaker[] = [
    { id: 'sp1', name: 'Karim Meziane', role: 'CEO', company: 'Yassir', bio: 'Tech visionary leading the mobility revolution in Maghreb.', avatar: 'https://picsum.photos/seed/karim/200', social: { linkedin: '#' } },
    { id: 'sp2', name: 'Sara Hamida', role: 'AI Researcher', company: 'Google Africa', bio: 'Expert in large scale machine learning and its application in developing markets.', avatar: 'https://picsum.photos/seed/sara/200', social: { twitter: '#' } }
];

export const MOCK_WALL_POSTS: WallPost[] = [
    { id: 'p1', author: 'Mehdi Aouadi', avatar: 'https://picsum.photos/seed/mehdi/200', content: 'Incredible energy at the opening session today! #AlgeriaTech', image: 'https://picsum.photos/seed/crowd/800/400', likes: 24, time: '2h ago', comments: 5 },
    { id: 'p2', author: 'Rania Hadj', avatar: 'https://picsum.photos/seed/rania/200', content: 'Just visited the Djezzy booth, some great innovations being shown.', likes: 12, time: '4h ago', comments: 2 }
];

export const MOCK_POLLS: Poll[] = [
    { id: 'pol1', question: 'Which tech stack are you most excited about in 2026?', options: [{ text: 'React/Next.js', votes: 120 }, { text: 'Flutter', votes: 45 }, { text: 'Rust/Wasm', votes: 30 }], totalVotes: 195, isActive: true },
    { id: 'pol2', question: 'Will AI replace entry-level coding jobs?', options: [{ text: 'Yes', votes: 80 }, { text: 'No', votes: 150 }, { text: 'Partially', votes: 200 }], totalVotes: 430, isActive: false }
];

export const MOCK_FORUM_POSTS: ForumPost[] = [
    { id: 'f1', author: 'Alex Benali', title: 'Best hotels near Palais de la Culture?', content: 'Hey everyone, looking for recommendations for hotels nearby within walking distance.', category: 'Logistics', replies: 8, views: 156, likes: 4, time: '1d ago' },
    { id: 'f2', author: 'Amine Mansouri', title: 'Looking for a co-founder (CTO role)', content: 'Working on a FinTech startup focused on micro-loans. DM me if interested!', category: 'Networking', replies: 3, views: 240, likes: 10, time: '3h ago' }
];

export const MOCK_GALLERY = [
    { id: 'g1', url: 'https://picsum.photos/seed/event1/400/300', caption: 'Main Keynote Session', author: 'Sarah J.' },
    { id: 'g2', url: 'https://picsum.photos/seed/event2/400/300', caption: 'Networking Lounge', author: 'Mike D.' },
    { id: 'g3', url: 'https://picsum.photos/seed/event3/400/300', caption: 'Startup Pitch Battle', author: 'Elena R.' },
    { id: 'g4', url: 'https://picsum.photos/seed/event4/400/300', caption: 'Innovation Lab Demo', author: 'Sarah J.' },
    { id: 'g5', url: 'https://picsum.photos/seed/event5/400/300', caption: 'Workshop on AI Ethics', author: 'David L.' },
    { id: 'g6', url: 'https://picsum.photos/seed/event6/400/300', caption: 'Evening Gala Dinner', author: 'Elena R.' }
];

export const MOCK_VIDEOS = [
    { id: 'v1', title: 'Day 1 Highlights', duration: '5:24', thumbnail: 'https://picsum.photos/seed/v1/400/225', views: '1,240', category: 'Highlights' },
    { id: 'v2', title: 'Interview with Karim Meziane', duration: '12:10', thumbnail: 'https://picsum.photos/seed/v2/400/225', views: '850', category: 'Interviews' },
    { id: 'v3', title: 'AI Strategy Panel', duration: '45:15', thumbnail: 'https://picsum.photos/seed/v3/400/225', views: '2,100', category: 'Keynotes' }
];

export const MOCK_DETAILS = {
    venue: "Palais de la Culture Moufdi Zakaria",
    location: "Plateau des Annassers, Kouba, Algiers",
    wifi: { ssid: "EventEvo_Guest", pass: "Summit2026" },
    logistics: [
        { title: 'Parking', content: 'Free parking available at the North Entrance across from the main gate.' },
        { title: 'Food & Beverage', content: 'Lunch served at the Rooftop Terrace from 12 PM. Coffee stations open all day.' },
        { title: 'First Aid', content: 'Medical point located next to the registration desk in the main lobby.' }
    ],
    safety: [
        { title: 'Emergency Exits', content: 'Please familiarize yourself with the exits marked in green in every hall.' },
        { title: 'Code of Conduct', content: 'We maintain a respectful environment for all tech enthusiasts.' },
        { title: 'Lost & Found', content: 'Items can be turned in or claimed at the Information Desk.' }
    ]
};
