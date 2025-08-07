import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Eye, Calendar, MapPin, LinkIcon, Edit } from "lucide-react"

const Profile = () => {
  const userProfile = {
  name: "Alex Chen",
  username: "@alexchen",
  avatar: "https://i.ytimg.com/vi/0_GbA_vgIIc/oardefault.jpg?sqp=-oaymwEYCJUDENAFSFqQAgHyq4qpAwcIARUAAIhC&rs=AOn4CLB2xbL1d-LijATH8sAeWuESk9XwGg",
  bio: "Digital artist and UI/UX designer passionate about creating meaningful experiences through visual storytelling.",
  location: "San Francisco, CA",
  website: "alexchen.design",
  joinDate: "March 2023",
  stats: {
    projects: 24,
    followers: 1250,
    following: 340,
    totalLikes: 5680,
    totalViews: 28400,
  },
}

const achievements = [
  {
    id: 1,
    title: "Weekly Champion",
    description: "Won weekly leaderboard",
    icon: "🏆",
    date: "Dec 2024",
    rarity: "gold",
  },
  {
    id: 2,
    title: "Monthly Legend",
    description: "Top 3 in monthly rankings",
    icon: "👑",
    date: "Nov 2024",
    rarity: "legendary",
  },
  {
    id: 3,
    title: "Trending Creator",
    description: "Featured on trending page",
    icon: "🔥",
    date: "Oct 2024",
    rarity: "rare",
  },
  {
    id: 4,
    title: "Community Favorite",
    description: "Most liked project of the week",
    icon: "❤️",
    date: "Sep 2024",
    rarity: "epic",
  },
  {
    id: 5,
    title: "Rising Star",
    description: "Gained 100+ followers in a week",
    icon: "⭐",
    date: "Aug 2024",
    rarity: "common",
  },
  { id: 6, title: "Perfectionist", description: "Uploaded 10 projects", icon: "💎", date: "Jul 2024", rarity: "rare" },
]

const userProjects = [
  {
    id: 1,
    title: "Digital Sunset",
    type: "Digital Art",
    image: "https://cdnb.artstation.com/p/assets/images/images/030/152/799/large/sai-kumar-nandagiri-sunset.jpg?1599756585",
    likes: 234,
    views: 1200,
    date: "2 days ago",
    tags: ["Digital Art", "Landscape", "Trending"],
  },
  {
    id: 2,
    title: "Minimalist Logo Design",
    type: "Design",
    image: "https://www.adobe.com/creativecloud/design/discover/media_17770be5de64c9b159b23a7da870ae0bd5bc0f400.jpeg?width=1200&format=pjpg&optimize=medium",
    likes: 189,
    views: 890,
    date: "1 week ago",
    tags: ["Logo", "Branding", "Minimalist"],
  },
  {
    id: 3,
    title: "Mobile App Interface",
    type: "UI/UX",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIL3z2ImAj3X_kUl6qoGLe7uNHtBe8j893ww&s",
    likes: 156,
    views: 670,
    date: "2 weeks ago",
    tags: ["Mobile", "UI/UX", "App Design"],
  },
  {
    id: 4,
    title: "Abstract Composition",
    type: "Digital Art",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcp7uqr3uYL8YRG56jex_2FKYB0Yr8LBg8_Q&s",
    likes: 203,
    views: 980,
    date: "3 weeks ago",
    tags: ["Abstract", "Digital Art", "Composition"],
  },
  {
    id: 5,
    title: "Brand Identity System",
    type: "Branding",
    image: "https://www.columnfivemedia.com/wp-content/uploads/2021/08/Brand-Identity-Assets-3.webp",
    likes: 167,
    views: 750,
    date: "1 month ago",
    tags: ["Branding", "Identity", "System"],
  },
  {
    id: 6,
    title: "Website Redesign",
    type: "Web Design",
    image: "https://cdn.dribbble.com/userupload/9202080/file/original-888ac1d85cb6013339f52d14f2617586.jpg?format=webp&resize=400x300&vertical=center",
    likes: 145,
    views: 620,
    date: "1 month ago",
    tags: ["Web Design", "Redesign", "UX"],
  },
]

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "legendary":
      return "bg-gradient-to-r from-purple-500 to-pink-500"
    case "epic":
      return "bg-gradient-to-r from-purple-400 to-blue-500"
    case "rare":
      return "bg-gradient-to-r from-blue-400 to-cyan-500"
    case "gold":
      return "bg-gradient-to-r from-yellow-400 to-orange-500"
    default:
      return "bg-gradient-to-r from-gray-400 to-gray-500"
  }
}

  return (
    <div>
      <div className="container mx-auto px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="h-32 w-32">
              <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl">{userProfile.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">{userProfile.name}</h1>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
              <p className="text-muted-foreground mb-2">{userProfile.username}</p>
              <p className="text-lg mb-4 max-w-2xl">{userProfile.bio}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LinkIcon className="h-4 w-4" />
                  <a href={userProfile.website} target="_blank" rel="noopener noreferrer">
                    {userProfile.website}
                  </a>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {userProfile.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 mt-6 md:px-16">
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-primary">{userProfile.stats.projects}</p>
              <p className="text-sm text-muted-foreground">Projects</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-primary">{userProfile.stats.followers.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl md:text-2xl font-bold text-primary">{userProfile.stats.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
            <div className="text-center hidden md:block">
              <p className="text-2xl font-bold text-primary">{userProfile.stats.totalLikes.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Likes</p>
            </div>
            <div className="text-center hidden md:block">
              <p className="text-2xl font-bold text-primary">{userProfile.stats.totalViews.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Views</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-background/50 text-foreground">{project.type}</Badge>
                  </div>
                  <CardContent>
                    <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span>{project.date}</span>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{project.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{project.views}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <Card key={achievement.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${getRarityColor(achievement.rarity)}`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {achievement.rarity}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{achievement.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile