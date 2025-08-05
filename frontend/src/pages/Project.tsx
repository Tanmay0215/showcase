import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: "music" | "art" | "photography" | "writing" | "design" | "other";
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  createdAt: string;
  duration?: string;
  medium?: string;
  location?: string;
  genre?: string;
  fileUrl?: string;
  embedUrl?: string;
}

// Sample project data (in a real app, this would come from an API)
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Midnight Dreams",
    description:
      "An ambient electronic composition exploring themes of solitude and reflection. Created using analog synthesizers and digital processing. This piece was inspired by late-night walks through the city, where the world seems to slow down and thoughts become more introspective. The composition features layered synthesizer textures, subtle percussion, and atmospheric soundscapes that create a meditative listening experience.",
    imageUrl:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop",
    category: "music" as const,
    tags: [
      "ambient",
      "electronic",
      "synthwave",
      "atmospheric",
      "meditation",
      "introspective",
    ],
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
      "A series of street photography capturing the quiet moments of city life. Each image tells a story of human connection in urban spaces. This collection explores the paradox of being alone in a crowd, finding beauty in the everyday moments that often go unnoticed. The black and white aesthetic emphasizes the emotional depth and timeless quality of these urban scenes.",
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
    category: "photography" as const,
    tags: [
      "street",
      "urban",
      "black & white",
      "documentary",
      "city life",
      "human connection",
    ],
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
      "A contemporary oil painting exploring the relationship between light and memory. Created using traditional techniques with modern sensibilities. This piece captures the fleeting moment when day transitions to night, symbolizing the passage of time and the beauty of impermanence. The warm colors and dynamic brushwork create a sense of movement and emotion.",
    imageUrl:
      "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=200&fit=crop",
    category: "art" as const,
    tags: [
      "oil painting",
      "contemporary",
      "landscape",
      "impressionist",
      "sunset",
      "memory",
    ],
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
      "A collection of haiku poems inspired by nature and the changing seasons. Each poem captures a moment of beauty and reflection. This anthology explores the connection between human emotion and the natural world, finding profound meaning in simple observations. The minimalist form of haiku perfectly captures the essence of each seasonal moment.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
    category: "writing" as const,
    tags: ["haiku", "poetry", "nature", "seasons", "minimalist", "reflection"],
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
      "A minimalist digital art series exploring the intersection of technology and human emotion. Created using custom algorithms and digital tools. This collection examines how digital technology shapes our perception of reality and emotion, using abstract forms and algorithmic patterns to represent the complexity of human consciousness in the digital age.",
    imageUrl:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=200&fit=crop",
    category: "design" as const,
    tags: [
      "digital art",
      "minimalist",
      "algorithmic",
      "abstract",
      "technology",
      "emotion",
    ],
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
      "A folk-inspired acoustic song about childhood memories and growing up. Features fingerpicking guitar and heartfelt vocals. This song explores the bittersweet nature of nostalgia, capturing the innocence of youth while acknowledging the wisdom that comes with age. The simple arrangement allows the emotional depth of the lyrics to shine through.",
    imageUrl:
      "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=200&fit=crop",
    category: "music" as const,
    tags: [
      "folk",
      "acoustic",
      "singer-songwriter",
      "nostalgic",
      "childhood",
      "memories",
    ],
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
      "A series of landscape photographs capturing the majestic beauty of mountain ranges at different times of day. This collection explores the ever-changing relationship between light and landscape, showing how the same mountains can appear completely different depending on the time of day and weather conditions. Each image tells a story of nature's grandeur and the photographer's connection to the wilderness.",
    imageUrl:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=200&fit=crop",
    category: "photography" as const,
    tags: [
      "landscape",
      "mountains",
      "nature",
      "reflections",
      "wilderness",
      "light",
    ],
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
      "A short story exploring the lives of night workers in a bustling metropolis. A tale of connection and solitude in urban spaces. This narrative follows several characters who work the night shift in different parts of the city, showing how their paths intersect and how they find meaning in the quiet hours when most people are asleep. The story examines themes of loneliness, community, and the hidden life of cities after dark.",
    imageUrl:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=200&fit=crop",
    category: "writing" as const,
    tags: [
      "short story",
      "urban",
      "drama",
      "contemporary",
      "night life",
      "human connection",
    ],
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

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    // Find the project by ID
    const foundProject = sampleProjects.find((p) => p.id === id);
    if (foundProject) {
      setProject(foundProject);
      setLikes(foundProject.likes);
    }
  }, [id]);

  const handleLike = () => {
    if (project) {
      const newLikes = isLiked ? likes - 1 : likes + 1;
      setLikes(newLikes);
      setIsLiked(!isLiked);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "music":
        return "bg-purple-100 text-purple-800";
      case "art":
        return "bg-orange-100 text-orange-800";
      case "photography":
        return "bg-blue-100 text-blue-800";
      case "writing":
        return "bg-green-100 text-green-800";
      case "design":
        return "bg-pink-100 text-pink-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "music":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.369 4.369 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
          </svg>
        );
      case "art":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg>
        );
      case "photography":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "writing":
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </button>
            <Link to="/" className="text-xl font-bold text-gray-900">
              Creative Showcase
            </Link>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Project Header */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="relative h-96">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x400/667eea/ffffff?text=Creative+Work";
                }}
              />

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}
                >
                  {getCategoryIcon(project.category)}
                  <span className="ml-2 capitalize">{project.category}</span>
                </span>
              </div>

              {/* Like Button */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                    isLiked
                      ? "bg-red-500 text-white"
                      : "bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{likes}</span>
                </button>
              </div>

              {/* Play Button for Music */}
              {project.category === "music" && project.embedUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-colors"
                    onClick={() => window.open(project.embedUrl, "_blank")}
                  >
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <div className="p-8">
              {/* Title and Author */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h1>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={project.author.avatar}
                        alt={project.author.name}
                        className="w-10 h-10 rounded-full"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://via.placeholder.com/40x40/667eea/ffffff?text=U";
                        }}
                      />
                      <div>
                        <p className="font-medium text-gray-900">
                          {project.author.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(project.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {project.fileUrl && (
                    <a
                      href={project.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Download</span>
                    </a>
                  )}
                  {project.embedUrl && (
                    <a
                      href={project.embedUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span>
                        {project.category === "music" ? "Listen" : "View"}
                      </span>
                    </a>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  {project.duration && (
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">Duration:</span>
                      <span className="ml-2">{project.duration}</span>
                    </div>
                  )}
                  {project.medium && (
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      <span className="font-medium">Medium:</span>
                      <span className="ml-2">{project.medium}</span>
                    </div>
                  )}
                  {project.location && (
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium">Location:</span>
                      <span className="ml-2">{project.location}</span>
                    </div>
                  )}
                  {project.genre && (
                    <div className="flex items-center text-gray-600">
                      <svg
                        className="w-5 h-5 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                      </svg>
                      <span className="font-medium">Genre:</span>
                      <span className="ml-2">{project.genre}</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">
                  About this work
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          </div>

          {/* Related Projects */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              More from {project.author.name}
            </h2>
            <p className="text-gray-600">
              Discover more creative works from this artist.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;
