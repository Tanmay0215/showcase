import { useState } from "react";
import ProjectCard from "../components/projects/ProjectCard";

// Sample creative project data
const sampleProjects = [
  {
    id: "1",
    title: "Midnight Dreams",
    description:
      "An ambient electronic composition exploring themes of solitude and reflection. Created using analog synthesizers and digital processing.",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop",
    category: "music" as const,
    tags: ["ambient", "electronic", "synthwave", "atmospheric"],
    duration: "8:45",
    genre: "Ambient Electronic",
    embedUrl: "https://soundcloud.com/user/midnight-dreams",
    fileUrl: "https://example.com/midnight-dreams.mp3",
    author: {
      name: "Alex Rivera",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    },
    likes: 156,
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "Urban Solitude",
    description:
      "A series of street photography capturing the quiet moments of city life. Each image tells a story of human connection in urban spaces.",
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
    category: "photography" as const,
    tags: ["street", "urban", "black & white", "documentary"],
    location: "New York City",
    author: {
      name: "Sarah Chen",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    },
    likes: 89,
    createdAt: "2024-01-12T14:20:00Z",
  },
  {
    id: "3",
    title: "The Last Sunset",
    description:
      "A contemporary oil painting exploring the relationship between light and memory. Created using traditional techniques with modern sensibilities.",
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=200&fit=crop",
    category: "art" as const,
    tags: ["oil painting", "contemporary", "landscape", "impressionist"],
    medium: "Oil on Canvas",
    author: {
      name: "Maria Gonzalez",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    },
    likes: 203,
    createdAt: "2024-01-10T09:15:00Z",
  },
  {
    id: "4",
    title: "Whispers of the Wind",
    description:
      "A collection of haiku poems inspired by nature and the changing seasons. Each poem captures a moment of beauty and reflection.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
    category: "writing" as const,
    tags: ["haiku", "poetry", "nature", "seasons"],
    genre: "Poetry",
    fileUrl: "https://example.com/whispers-of-the-wind.pdf",
    author: {
      name: "David Kim",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    },
    likes: 67,
    createdAt: "2024-01-08T16:45:00Z",
  },
  {
    id: "5",
    title: "Digital Dreams",
    description:
      "A minimalist digital art series exploring the intersection of technology and human emotion. Created using custom algorithms and digital tools.",
    imageUrl:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop",
    category: "design" as const,
    tags: ["digital art", "minimalist", "algorithmic", "abstract"],
    medium: "Digital Art",
    author: {
      name: "Emma Thompson",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face",
    },
    likes: 134,
    createdAt: "2024-01-05T11:30:00Z",
  },
  {
    id: "6",
    title: "Acoustic Memories",
    description:
      "A folk-inspired acoustic song about childhood memories and growing up. Features fingerpicking guitar and heartfelt vocals.",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=200&fit=crop",
    category: "music" as const,
    tags: ["folk", "acoustic", "singer-songwriter", "nostalgic"],
    duration: "4:32",
    genre: "Folk",
    embedUrl: "https://spotify.com/track/acoustic-memories",
    fileUrl: "https://example.com/acoustic-memories.mp3",
    author: {
      name: "Jake Wilson",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    },
    likes: 98,
    createdAt: "2024-01-03T13:20:00Z",
  },
  {
    id: "7",
    title: "Mountain Reflections",
    description:
      "A series of landscape photographs capturing the majestic beauty of mountain ranges at different times of day.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
    category: "photography" as const,
    tags: ["landscape", "mountains", "nature", "reflections"],
    location: "Rocky Mountains",
    author: {
      name: "Lisa Park",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
    },
    likes: 245,
    createdAt: "2024-01-01T08:15:00Z",
  },
  {
    id: "8",
    title: "The City That Never Sleeps",
    description:
      "A short story exploring the lives of night workers in a bustling metropolis. A tale of connection and solitude in urban spaces.",
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
    category: "writing" as const,
    tags: ["short story", "urban", "drama", "contemporary"],
    genre: "Short Story",
    fileUrl: "https://example.com/city-that-never-sleeps.pdf",
    author: {
      name: "Michael Brown",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    },
    likes: 112,
    createdAt: "2023-12-28T15:30:00Z",
  },
];

const Home = () => {
  const [projects, setProjects] = useState(sampleProjects);

  const handleLike = (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, likes: project.likes + 1 }
          : project,
      ),
    );
  };

  const handleView = (projectId: string) => {
    // Navigate to project detail page
    console.log("Viewing project:", projectId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Discover Creative Works
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Explore music, art, photography, and writing from talented
              creators
            </p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors">
                Share Your Work
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Browse Categories
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            All
          </button>
          <button className="px-4 py-2 bg-purple-100 text-purple-800 rounded-lg hover:bg-purple-200 transition-colors">
            Music
          </button>
          <button className="px-4 py-2 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 transition-colors">
            Art
          </button>
          <button className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200 transition-colors">
            Photography
          </button>
          <button className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors">
            Writing
          </button>
          <button className="px-4 py-2 bg-pink-100 text-pink-800 rounded-lg hover:bg-pink-200 transition-colors">
            Design
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Featured Creative Works
          </h2>
          <p className="text-gray-600">
            Discover amazing music, art, photography, and writing from our
            community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onLike={handleLike}
              onView={handleView}
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors">
            Load More Works
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
