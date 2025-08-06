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

      {/* Trending Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🔥 Trending Now
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The most popular and talked-about projects this week. Discover
              what's capturing everyone's attention.
            </p>
          </div>

          {/* Trending Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Trending Music */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">🎵 Music</h3>
                <span className="text-sm bg-white/20 px-2 py-1 rounded">
                  Trending
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop"
                    alt="Midnight Dreams"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Midnight Dreams</p>
                    <p className="text-xs text-purple-200">Alex Rivera</p>
                  </div>
                  <span className="text-xs">156 ❤️</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=60&h=60&fit=crop"
                    alt="Acoustic Memories"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Acoustic Memories</p>
                    <p className="text-xs text-purple-200">Jake Wilson</p>
                  </div>
                  <span className="text-xs">98 ❤️</span>
                </div>
              </div>
            </div>

            {/* Trending Art */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">🎨 Art</h3>
                <span className="text-sm bg-white/20 px-2 py-1 rounded">
                  Trending
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=60&h=60&fit=crop"
                    alt="The Last Sunset"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">The Last Sunset</p>
                    <p className="text-xs text-orange-200">Maria Gonzalez</p>
                  </div>
                  <span className="text-xs">203 ❤️</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1558655146-d09347e92766?w=60&h=60&fit=crop"
                    alt="Digital Dreams"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Digital Dreams</p>
                    <p className="text-xs text-orange-200">Emma Thompson</p>
                  </div>
                  <span className="text-xs">134 ❤️</span>
                </div>
              </div>
            </div>

            {/* Trending Photography */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">📸 Photography</h3>
                <span className="text-sm bg-white/20 px-2 py-1 rounded">
                  Trending
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop"
                    alt="Mountain Reflections"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Mountain Reflections</p>
                    <p className="text-xs text-blue-200">Lisa Park</p>
                  </div>
                  <span className="text-xs">245 ❤️</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=60&h=60&fit=crop"
                    alt="Urban Solitude"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Urban Solitude</p>
                    <p className="text-xs text-blue-200">Sarah Chen</p>
                  </div>
                  <span className="text-xs">89 ❤️</span>
                </div>
              </div>
            </div>

            {/* Trending Writing */}
            <div className="bg-gradient-to-br from-green-500 to-green-700 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">✍️ Writing</h3>
                <span className="text-sm bg-white/20 px-2 py-1 rounded">
                  Trending
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop"
                    alt="Whispers of the Wind"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Whispers of the Wind</p>
                    <p className="text-xs text-green-200">David Kim</p>
                  </div>
                  <span className="text-xs">67 ❤️</span>
                </div>
                <div className="flex items-center space-x-3">
                  <img
                    src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=60&h=60&fit=crop"
                    alt="The City That Never Sleeps"
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      The City That Never Sleeps
                    </p>
                    <p className="text-xs text-green-200">Michael Brown</p>
                  </div>
                  <span className="text-xs">112 ❤️</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Trending Project */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-6 lg:mb-0">
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">🏆</span>
                  <div>
                    <h3 className="text-2xl font-bold">Project of the Week</h3>
                    <p className="text-purple-200">Most popular this week</p>
                  </div>
                </div>
                <h4 className="text-3xl font-bold mb-4">
                  Mountain Reflections
                </h4>
                <p className="text-lg mb-6 text-purple-100">
                  A breathtaking series of landscape photographs capturing the
                  majestic beauty of mountain ranges at different times of day.
                  Each image tells a story of nature's grandeur and the passage
                  of time.
                </p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
                      alt="Lisa Park"
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium">Lisa Park</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <span className="mr-1">❤️</span>
                      245 likes
                    </span>
                    <span className="flex items-center">
                      <span className="mr-1">👁️</span>
                      1.2k views
                    </span>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 lg:pl-8">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
                  alt="Mountain Reflections"
                  className="w-full rounded-xl shadow-2xl"
                />
              </div>
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
