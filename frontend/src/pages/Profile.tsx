import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, MapPin, LinkIcon, Calendar } from "lucide-react";

const Profile = () => {
  const userProfile = {
    name: "John Doe",
    username: "@johndoe",
    bio: "Web developer and tech enthusiast.",
    location: "San Francisco, CA",
    website: "https://johndoe.com",
    joinDate: "January 2020",
    avatar: "/placeholder.svg"
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
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
                  <span>{userProfile.website}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {userProfile.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;