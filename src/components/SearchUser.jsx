import { useContext, useEffect, useState } from "react";
import { useGitHubUser } from "../hooks/useGitHubUser";
import ThemeContext from "../context/ThemeContext";
import {
  Sun,
  Moon,
  MapPin,
  Link as LinkIcon,
  Twitter,
  Building2,
  Search
} from "lucide-react";

const LOCAL_STORAGE_KEY = "lastSearchedUser";

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const { userData, fetchGitHubUser, error, loading } = useGitHubUser();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [formError, setFormError] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    return `Joined ${date.toLocaleDateString("en-GB", options)}`;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY) || "octocat";
    setUsername("");
    fetchGitHubUser(storedUser);
  }, [fetchGitHubUser]);

  const handleSearch = () => {
    if (!username.trim()) {
      setFormError("Please enter a username");
      return;
    }
  
    setFormError(""); 
    fetchGitHubUser(username);
    localStorage.setItem(LOCAL_STORAGE_KEY, username);
    setUsername(""); 
  };
  

  return (
    <div className="max-w-xl mx-auto mt-10 px-4 text-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">devfinder</h1>
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 uppercase text-xs tracking-widest"
        >
          {theme === "light" ? (
            <>
              Dark <Moon size={18} />
            </>
          ) : (
            <>
              Light <Sun size={18} />
            </>
          )}
        </button>

        
      </div>

     
      <div className="flex items-center bg-white dark:bg-slate-800 shadow-md rounded-xl p-3">
        <Search className="text-gray-400 mr-2" />
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Search GitHub username…"
          className="flex-1 bg-transparent outline-none text-black dark:text-white"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-1 rounded-lg"
        >
          Search
        </button>
        
      </div>
      {formError && <p className="text-red-500 mt-2">{formError}</p>}


      {error && <p className="mt-4 text-red-500">{error}</p>}
      {loading && <p className="mt-4 text-blue-500">Loading...</p>}

     
      {userData && (
        <div className="mt-6 p-6 bg-white dark:bg-slate-800 rounded-xl shadow-md">
          <div className="flex gap-4 items-center">
            <img
              src={userData.avatar_url}
              alt="Avatar"
              className="w-20 h-20 rounded-full"
            />
            <div className="flex-1">
              <div className="flex justify-between flex-wrap items-start">
                <div>
                  <h2 className="text-xl font-bold">
                    {userData.name || userData.login}
                  </h2>
                  <a
                    href={userData.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400"
                  >
                    @{userData.login}
                  </a>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  {formatDate(userData.created_at)}
                </p>
              </div>
              <p className="mt-2">
                {userData.bio || "This profile has no bio"}
              </p>
            </div>
          </div>

       
          <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded-lg my-4 flex justify-around text-center w-3/4 m-auto">
            <div>
              <p className="text-xs">Repos</p>
              <p className="font-bold">{userData.public_repos}</p>
            </div>
            <div>
              <p className="text-xs">Followers</p>
              <p className="font-bold">{userData.followers}</p>
            </div>
            <div>
              <p className="text-xs">Following</p>
              <p className="font-bold">{userData.following}</p>
            </div>
          </div>

        
          <div className="text-sm space-y-2 flex flex-row gap-20 p-4 m-auto w-3/4">
            <div>
              <p className="flex items-center gap-2">
                <MapPin size={16} /> {userData.location || "Not Available"}
              </p>
              <p className="flex items-center gap-2">
                <LinkIcon size={16} />
                {userData.blog ? (
                  <a
                    href={
                      userData.blog.startsWith("http")
                        ? userData.blog
                        : `https://${userData.blog}`
                    }
                    className="text-blue-400"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {userData.blog}
                  </a>
                ) : (
                  "Not Available"
                )}
              </p>
            </div>
            <div>
              <p className="flex items-center gap-2">
                <Twitter size={16} />{" "}
                {userData.twitter_username || "Not Available"}
              </p>
              <p className="flex items-center gap-2">
                <Building2 size={16} /> {userData.company || "Not Available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
