require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB connection function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Asset Model
const AssetSchema = new mongoose.Schema({
  assetType: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, {
  timestamps: true
});

const Asset = mongoose.model('Asset', AssetSchema);

// Complete assets data
const assetsData = [
  {
    assetType: 'footerIcons',
    data: [
      {
        name: "LinkedIn",
        component: "FaLinkedin",
        link: "https://www.linkedin.com/in/puvanesh-p-2387a0355/",
      },
      {
        name: "GitHub",
        component: "FaGithub",
        link: "https://github.com/Puvanesh-007",
      },
      {
        name: "Instagram",
        component: "FaInstagram",
        link: "https://www.instagram.com/__puvanesh__/",
      }
    ]
  },
  {
    assetType: 'navElements',
    data: ["About", "Education", "Skills", "Projects", "Contact"]
  },
  {
    assetType: 'logoConfig',
    data: {
      textLogo: "Portfolio",
      imgLogo: null,
      showImageLogo: false
    }
  },
  {
    assetType: 'aboutPage',
    data: {
      authorProfile: "https://via.placeholder.com/400x400",
      authorDescription: "Passionate Computer Science Engineering student with a strong foundation in programming, algorithms, and web development. Enthusiastic about problem-solving, AI, and full-stack development. Eager to apply technical skills to real-world projects and contribute to innovative solutions. Effective English communication, leadership development, hardworking. Proficient in C, Python, and Java programming languages. Skilled in MS Word, PowerPoint, Excel. Experienced in web and app development: HTML, CSS, JavaScript, PHP, Kotlin. Familiar with version control using Git and GitHub.",
      getInTouchUrl: "mailto:maheshp1729@gmail.com",
      authorName: "Puvanesh P",
      profileImgTagLine: "CSE Student",
      authorContactMail: "maheshp1729@gmail.com",
      authorContactNumber: "+91 9342217137"
    }
  },
  {
    assetType: 'educationPage',
    data: [
      {
        degreeType: "Class X and XII",
        graduationYear: "2020",
        institution: "Kamala Niketan Montessori School (CBSE)",
        institutionUrl: "https://kamalaniketan.com/"
      },
      {
        degreeType: "B.E Computer science and Engineering",
        graduationYear: "Pursuing",
        institution: "Anna University Regional Campus, Coimbatore",
        institutionUrl: "http://www.aurcc.ac.in/amenity/hostel/index.php"
      }
    ]
  },
  {
  assetType: 'skillsPage',
  data: [
    { name: "JavaScript", component: "FaJs" },
    { name: "React", component: "FaReact" },
    { name: "Node.js", component: "FaNodeJs" },
    { name: "Express", component: "SiExpress" },
    { name: "Python", component: "FaPython" },
    { name: "MongoDB", component: "SiMongodb" },
    { name: "Git", component: "FaGitAlt" },
    { name: "GitHub", component: "FaGithub" },
    { name: "Java", component: "FaJava" },
    { name: "Kotlin", component: "TbBrandKotlin" },
    { name: "HTML5", component: "FaHtml5" },
    { name: "CSS3", component: "FaCss3Alt" },
    { name: "XML", component: "BsFiletypeXml" },
    { name: "Tailwind", component: "RiTailwindCssFill" }
  ]
}
,
  {
    assetType: 'projectsPage',
    data: [
      {
        projectName: "My-Portfolio",
        projectDescription: "A personal portfolio website built with React.js and Vite to showcase my projects, skills, and education. Features a responsive design and interactive UI components.",
        projectURL: "https://github.com/Puvanesh-007/my-portfolio",
        githubRepository: "https://github.com/Puvanesh-007/my-portfolio",
        tags: ["React", "Node.js", "MongoDB", "Express"],
        date: "29 May 2025"
      },
      {
        projectName: "Android Application - Podcast App",
        projectDescription: "A mobile app to stream, download, and manage podcasts with a user-friendly interface and offline support.",
        projectURL: "https://github.com/Nithish2005333/PodcastPlus-NM2024TMID05887",
        githubRepository: "https://github.com/Nithish2005333/PodcastPlus-NM2024TMID05887",
        tags: ["Java/Kotlin", "Android Studio", "SQLite", "Firebase"],
        date: "15 May 2024"
      },
      {
        projectName: "Blockchain Based Quiz Application",
        projectDescription: "A decentralized quiz application leveraging blockchain technology for secure and transparent quiz management.",
        projectURL: "https://github.com/Puvanesh-007/blockchain-quiz-app",
        githubRepository: "https://github.com/Puvanesh-007/blockchain-quiz-app",
        tags: ["Truffle", "Solidity", "HTML", "JavaScript"],
        date: "29 Dec 2024"
      }
    ]
  },
  {
    assetType: 'certificatesPage',
    data: [
      {
        img: "https://www.oracle.com/a/ocom/img/social-og-ou-1200x628.png", // Certificate image URL
        title: "Certification of recognation",
        description: "Recognized for outstanding performance and completion of Oracle University training.",
        issuedBy: "Oracle University.",
        credentialURL: "https://drive.google.com/file/d/1EUEyzYy0XEYPCURzn1lk3Y9zwZEbDbhb/view",
      },
      {
        img: "https://www.oracle.com/a/ocom/img/social-og-ou-1200x628.png",
        title: "Oracle Cloud Infrastructure Foundations Associate",
        description: "Achieved foundational knowledge in Oracle Cloud Infrastructure services and solutions.",
        issuedBy: "Oracle University.",
        credentialURL: "https://drive.google.com/file/d/1EUEyzYy0XEYPCURzn1lk3Y9zwZEbDbhb/view",
      },
      {
        img: "https://www.oracle.com/a/ocom/img/social-og-ou-1200x628.png",
        title: "Oracle Cloud Infrastructure Architect Associate",
        description: "Certified in designing and implementing Oracle Cloud Infrastructure solutions.",
        issuedBy: "Oracle University.",
        credentialURL: "https://drive.google.com/file/d/1EUEyzYy0XEYPCURzn1lk3Y9zwZEbDbhb/view",
      },
      {
        img: "https://cdn.tracxn.com/images/seo/social/companies/infispark-overview-1712225402612.webp",
        title: "Digital Productivity training",
        description: "Completed training on digital productivity tools and best practices for efficient workflow.",
        issuedBy: "Infispark Foundation partnership with Microsoft.",
        credentialURL: "https://drive.google.com/file/d/1EbqG5mz8ZDYyLqUoDkUp5LMXbDMHLErM/view",
      },
      {
        img: "https://www.crn.com/news/cloud/media_11d1b6da05f659d9b43d4dd6582cbe7d9820ad189.jpeg?width=750&format=jpeg&optimize=medium",
        title: "A.I. Fluency training",
        description: "Gained foundational knowledge in artificial intelligence concepts and applications.",
        issuedBy: "Infispark Foundation partnership with Microsoft.",
        credentialURL: "https://drive.google.com/drive/folders/1ENIGsc_WUHVHoJy_2pf0M528_FYIYdgI",
      },
      {
        img: "https://www.crn.com/news/cloud/media_11d1b6da05f659d9b43d4dd6582cbe7d9820ad189.jpeg?width=750&format=jpeg&optimize=medium",
        title: "A.I. Fluency training",
        description: "Gained foundational knowledge in artificial intelligence concepts and applications.",
        issuedBy: "Infispark Foundation partnership with Microsoft.",
        credentialURL: "https://drive.google.com/drive/folders/1ENIGsc_WUHVHoJy_2pf0M528_FYIYdgI",
      },
      {
        img: "https://upload.wikimedia.org/wikipedia/en/1/17/Coimbatore_Institute_of_Technology_logo.png",
        title: "Certification of Participation in Workshop",
        description: "Participated in a technical workshop to enhance practical skills and industry knowledge.",
        issuedBy: "Coimbatore Institution of Technology.",
        credentialURL: "https://drive.google.com/drive/folders/1ENIGsc_WUHVHoJy_2pf0M528_FYIYdgI",
      },
      {
        img: "https://www.oracle.com/a/ocom/img/social-og-ou-1200x628.png",
        title: "Oracle Cloud Infrastructure Foundations Associate",
        description: "Achieved foundational knowledge in Oracle Cloud Infrastructure services and solutions.",
        issuedBy: "Oracle University.",
        credentialURL: "https://drive.google.com/file/d/1EUEyzYy0XEYPCURzn1lk3Y9zwZEbDbhb/view",
      },
      {
        img: "https://s3.ap-south-1.amazonaws.com/townscript-production/images/7c82bade-629d-42bc-be38-27a33a6d04de.jpg",
        title: "Certificate of Internship",
        description: "Completed an internship program, gaining practical experience and industry exposure.",
        issuedBy: "SkyPark iTech.",
        credentialURL: "https://drive.google.com/file/d/1FTyMCQvorByPGlZvBERVB7vUOcun878O/view",
      },
      {
        img: "https://www.oracle.com/a/ocom/img/social-og-ou-1200x628.png",
        title: "Oracle Cloud Infrastructure Architect Associate",
        description: "Certified in designing and implementing Oracle Cloud Infrastructure solutions.",
        issuedBy: "Oracle University.",
        credentialURL: "https://drive.google.com/file/d/1EUEyzYy0XEYPCURzn1lk3Y9zwZEbDbhb/view",
      },
      {
        img: "https://elearning.titanleap.org/pluginfile.php/1/theme_boost/toplogo/1717415731/LeAP%20logo_1.jpg",
        title: "Employment Skill Development Training Programme",
        description: "Successfully completed training focused on enhancing employment and professional skills.",
        issuedBy: "Titan Leap",
        credentialURL: "https://drive.google.com/file/d/1FSzwtJLatSFOmjlf2Q7upjs_JbpvtUlD/view",
      },
      {
        img: "https://embed-ssl.wistia.com/deliveries/b0b947281e81d27448615d4a053411a2.jpg?image_crop_resized=640x360",
        title: "MongoDB Training Certificate",
        description: "Completed training in MongoDB, gaining skills in NoSQL database design, CRUD operations, and data modeling.",
        issuedBy: "MongoDB University.",
        credentialURL: "https://drive.google.com/file/d/1EtIliZKhoht8vcv3YJ-So616Ktsq-x0A/view",
      },
    ]
  },
  {
    assetType: 'servicesPage',
    data: [
      {
        title: "Web Development",
        description: "Custom web applications built with modern technologies like React, Node.js, and cloud platforms.",
        icon: "<i class='fab fa-react'></i>",
        features: ["Responsive Design", "SEO Optimization", "Performance Tuning", "Cross-browser Compatibility"]
      },
      {
        title: "Mobile App Development",
        description: "Native and cross-platform mobile applications for iOS and Android using React Native and Flutter.",
        icon: "<i class='fab fa-react'></i>",
        features: ["Cross-platform Development", "Native Performance", "App Store Deployment", "Push Notifications"]
      },
      {
        title: "Cloud Solutions",
        description: "Scalable cloud infrastructure and deployment solutions using AWS, Google Cloud, and Azure.",
        icon: "<i class='fab fa-react'></i>",
        features: ["Auto Scaling", "Load Balancing", "Database Management", "Security Implementation"]
      },
      {
        title: "API Development",
        description: "RESTful and GraphQL APIs with proper documentation, authentication, and rate limiting.",
        icon: "<i class='fab fa-react'></i>",
        features: ["RESTful APIs", "GraphQL", "API Documentation", "Authentication & Authorization"]
      }
    ]
  }
];

const seedDB = async () => {
  try {
    await connectDB();
    
    console.log('Connected to database...');
    
    // Clear existing data
    await Asset.deleteMany({});
    console.log('Cleared existing assets...');
    
    // Insert new data
    await Asset.insertMany(assetsData);
    console.log('Database seeded successfully with all assets!');
    
    // Log what was inserted
    console.log(`Inserted ${assetsData.length} asset types:`);
    assetsData.forEach(asset => {
      console.log(`- ${asset.assetType}: ${Array.isArray(asset.data) ? asset.data.length + ' items' : 'object data'}`);
    });
    
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDB();