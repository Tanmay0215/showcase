import { useState } from "react";
import { Link } from "react-router-dom";
import leaderboardData from "../data/leaderboard.json";

interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  score: number;
  rank: number;
  projects: number;
  followers: number;
}

const mockWeeklyData: LeaderboardEntry[] = leaderboardData.weekly;
const mockMonthlyData: LeaderboardEntry[] = leaderboardData.monthly;

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<"weekly" | "monthly">("weekly");

  const data = activeTab === "weekly" ? mockWeeklyData : mockMonthlyData;
  const top3 = data.slice(0, 3);
  const next10 = data.slice(3, 13);

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-br from-yellow-500 to-yellow-700 text-white";
      case 2:
        return "bg-gradient-to-br from-gray-400 to-gray-600 text-white";
      case 3:
        return "bg-gradient-to-br from-orange-500 to-orange-700 text-white";
      default:
        return "bg-white text-gray-900";
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Leaderboard
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover the top developers and creators in our community.
              Showcase your projects and climb the ranks!
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <div className="bg-white rounded-full p-1 shadow-md border border-gray-200">
              <button
                onClick={() => setActiveTab("weekly")}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                  activeTab === "weekly"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setActiveTab("monthly")}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 ${
                  activeTab === "monthly"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Monthly
              </button>
            </div>
          </div>

          {/* Top 3 Winners */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Top 3 Winners
            </h2>
            <div className="flex justify-center">
              <div className="relative flex items-end space-x-4">
                {/* 2nd Place */}
                <div
                  className={`relative rounded-2xl p-4 shadow-lg transform transition-all duration-300 hover:scale-105 ${getRankColor(
                    top3[1].rank,
                  )}`}
                  style={{
                    width: "200px",
                    height: "280px",
                    marginBottom: "20px",
                  }}
                >
                  <div className="text-center h-full flex flex-col justify-center">
                    {/* Rank Badge */}
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 mb-3">
                      <span className="text-xl">
                        {getRankIcon(top3[1].rank)}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="mb-3">
                      <Link
                        to={`/u/${top3[1].name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <img
                          src={top3[1].avatar}
                          alt={top3[1].name}
                          className="w-16 h-16 rounded-full mx-auto border-3 border-white/40 shadow-md hover:scale-105 transition-transform duration-200"
                        />
                      </Link>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold mb-2">
                      <Link
                        to={`/u/${top3[1].name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="hover:text-white/90 transition-colors duration-200"
                      >
                        {top3[1].name}
                      </Link>
                    </h3>

                    {/* Score */}
                    <div className="text-2xl font-bold mb-2">
                      {top3[1].score.toLocaleString()}
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center space-x-3 text-xs">
                      <div>
                        <div className="font-semibold">{top3[1].projects}</div>
                        <div className="text-white/80">Projects</div>
                      </div>
                      <div>
                        <div className="font-semibold">{top3[1].followers}</div>
                        <div className="text-white/80">Followers</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 1st Place */}
                <div
                  className={`relative rounded-2xl p-6 shadow-xl transform transition-all duration-300 hover:scale-105 ${getRankColor(
                    top3[0].rank,
                  )}`}
                  style={{ width: "240px", height: "320px" }}
                >
                  <div className="text-center h-full flex flex-col justify-center">
                    {/* Rank Badge */}
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/30 mb-4">
                      <span className="text-2xl">
                        {getRankIcon(top3[0].rank)}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="mb-4">
                      <Link
                        to={`/u/${top3[0].name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <img
                          src={top3[0].avatar}
                          alt={top3[0].name}
                          className="w-20 h-20 rounded-full mx-auto border-4 border-white/40 shadow-lg hover:scale-105 transition-transform duration-200"
                        />
                      </Link>
                    </div>

                    {/* Name */}
                    <h3 className="text-xl font-bold mb-2">
                      <Link
                        to={`/u/${top3[0].name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="hover:text-white/90 transition-colors duration-200"
                      >
                        {top3[0].name}
                      </Link>
                    </h3>

                    {/* Score */}
                    <div className="text-3xl font-bold mb-3">
                      {top3[0].score.toLocaleString()}
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center space-x-4 text-sm">
                      <div>
                        <div className="font-semibold">{top3[0].projects}</div>
                        <div className="text-white/80">Projects</div>
                      </div>
                      <div>
                        <div className="font-semibold">{top3[0].followers}</div>
                        <div className="text-white/80">Followers</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3rd Place */}
                <div
                  className={`relative rounded-2xl p-4 shadow-lg transform transition-all duration-300 hover:scale-105 ${getRankColor(
                    top3[2].rank,
                  )}`}
                  style={{
                    width: "200px",
                    height: "280px",
                    marginBottom: "20px",
                  }}
                >
                  <div className="text-center h-full flex flex-col justify-center">
                    {/* Rank Badge */}
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 mb-3">
                      <span className="text-xl">
                        {getRankIcon(top3[2].rank)}
                      </span>
                    </div>

                    {/* Avatar */}
                    <div className="mb-3">
                      <Link
                        to={`/u/${top3[2].name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        <img
                          src={top3[2].avatar}
                          alt={top3[2].name}
                          className="w-16 h-16 rounded-full mx-auto border-3 border-white/40 shadow-md hover:scale-105 transition-transform duration-200"
                        />
                      </Link>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-bold mb-2">
                      <Link
                        to={`/u/${top3[2].name.toLowerCase().replace(/\s+/g, "-")}`}
                        className="hover:text-white/90 transition-colors duration-200"
                      >
                        {top3[2].name}
                      </Link>
                    </h3>

                    {/* Score */}
                    <div className="text-2xl font-bold mb-2">
                      {top3[2].score.toLocaleString()}
                    </div>

                    {/* Stats */}
                    <div className="flex justify-center space-x-3 text-xs">
                      <div>
                        <div className="font-semibold">{top3[2].projects}</div>
                        <div className="text-white/80">Projects</div>
                      </div>
                      <div>
                        <div className="font-semibold">{top3[2].followers}</div>
                        <div className="text-white/80">Followers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Next 10 */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Top Performers
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Rank
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Developer
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Projects
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                        Followers
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {next10.map((entry) => (
                      <tr
                        key={entry.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <span className="text-sm font-semibold text-gray-900">
                              #{entry.rank}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <Link
                              to={`/u/${entry.name.toLowerCase().replace(/\s+/g, "-")}`}
                              className="flex items-center hover:opacity-80 transition-opacity duration-200"
                            >
                              <img
                                src={entry.avatar}
                                alt={entry.name}
                                className="w-8 h-8 rounded-full mr-3"
                              />
                              <span className="font-medium text-gray-900">
                                {entry.name}
                              </span>
                            </Link>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-semibold text-blue-600 text-sm">
                            {entry.score.toLocaleString()}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-gray-600 text-sm">
                            {entry.projects}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-gray-600 text-sm">
                            {entry.followers}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
