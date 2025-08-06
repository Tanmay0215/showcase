import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import type { Project } from "../types/Project";
import projectsData from "../data/projects.json";

// Use data from JSON file
const mockProjects: Project[] = projectsData.projects;

const categories = [
  { id: "all", name: "All Projects", icon: "📁" },
  { id: "web-development", name: "Web Development", icon: "🌐" },
  { id: "mobile-development", name: "Mobile Development", icon: "📱" },
  { id: "artificial-intelligence", name: "AI & Machine Learning", icon: "🤖" },
  { id: "data-science", name: "Data Science", icon: "📊" },
  { id: "blockchain", name: "Blockchain", icon: "⛓️" },
  { id: "game-development", name: "Game Development", icon: "🎮" },
];

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [sortBy, setSortBy] = useState<"newest" | "popular" | "name">("newest");

  // Filter projects based on category and search term
  const filteredProjects = mockProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesCategory && matchesSearch;
  });

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "popular":
        return b.likes - a.likes;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Update URL when category changes
  useEffect(() => {
    if (selectedCategory !== "all") {
      setSearchParams({ category: selectedCategory });
    } else {
      setSearchParams({});
    }
  }, [selectedCategory, setSearchParams]);

  // Update selected category when URL changes
  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    } else {
      setSelectedCategory("all");
    }
  }, [searchParams]);

  const getCategoryName = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.name || categoryId;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedCategory === "all"
              ? "All Projects"
              : getCategoryName(selectedCategory)}
          </h1>
          <p className="text-gray-600">
            Discover amazing projects from talented developers
            {selectedCategory !== "all" &&
              ` in ${getCategoryName(selectedCategory).toLowerCase()}`}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Sort */}
            <div className="lg:w-48">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "newest" | "popular" | "name")
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {sortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-black/70 text-white text-xs rounded">
                      {getCategoryName(project.category)}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Author */}
                  <div className="flex items-center mb-3">
                    <img
                      src={project.author.avatar}
                      alt={project.author.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                    <span className="text-sm text-gray-600">
                      {project.author.name}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    <Link
                      to={`/projects/${project.id}`}
                      className="hover:text-blue-600 transition-colors duration-200"
                    >
                      {project.name}
                    </Link>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <span className="mr-1">❤️</span>
                        {project.likes}
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">👁️</span>
                        {project.views}
                      </span>
                    </div>
                    <span className="text-xs">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* No Projects Found */
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No projects found
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm
                ? `No projects match "${searchTerm}"`
                : `No projects in ${getCategoryName(selectedCategory).toLowerCase()}`}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              View All Projects
            </button>
          </div>
        )}

        {/* Results Count */}
        {sortedProjects.length > 0 && (
          <div className="mt-8 text-center text-gray-600">
            Showing {sortedProjects.length} of {mockProjects.length} projects
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
