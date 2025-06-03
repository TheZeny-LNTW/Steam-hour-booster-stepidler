import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function Dashboard() {
  const [games, setGames] = useState([]);
  const [selected, setSelected] = useState([]);
  const [status, setStatus] = useState("Loading...");
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [profile, setProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const statusRes = await fetch("http://localhost:3001/api/status");
        const statusData = await statusRes.json();
        setStatus(statusData.status);
      } catch {
        setStatus("Offline");
      }

      try {
        const gamesRes = await fetch("http://localhost:3001/api/games");
        const gamesData = await gamesRes.json();
        setTimeout(() => setGames(gamesData), 300);
      } catch {
        toast.error("Failed to fetch games");
      }

      try {
        const profileRes = await fetch("http://localhost:3001/api/profile");
        const profileData = await profileRes.json();
        setProfile(profileData);
      } catch {
        toast.error("Failed to fetch profile");
      }
    };

    loadData();
  }, []);

  const toggleGame = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((g) => g !== id));
    } else {
      if (selected.length < 32) {
        setSelected([...selected, id]);
        toast.success("Game added to list", { duration: 1000 });
      } else {
        toast.error("Max 32 games at once");
      }
    }
  };

  const startIdling = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ games: selected }),
      });
      await res.json();
      toast.success("Idling started");
    } catch {
      toast.error("Error starting idling");
    } finally {
      setLoading(false);
    }
  };

  const stopIdling = async () => {
    setLoading(true);
    try {
      await fetch("http://localhost:3001/api/stop", { method: "POST" });
      toast.success("Idling stopped");
    } catch {
      toast.error("Error stopping idling");
    } finally {
      setLoading(false);
    }
  };

  const filteredGames = games.filter(game => 
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'online': return 'from-green-500 to-emerald-600';
      case 'loading...': return 'from-yellow-500 to-orange-600';
      default: return 'from-red-500 to-rose-600';
    }
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white' 
        : 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 text-white'
    }`}>
      <Toaster position="top-right" />
      
      <div className={`backdrop-blur-lg border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-black/50 border-gray-700/50' 
          : 'bg-gray-900/70 border-gray-600/50'
      }`}>
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl">💰</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent">
                $TEP IDLER
              </h1>
              <p className="text-sm opacity-60">Dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            {profile && (
              <div className="flex items-center gap-3 animate-fade-in">
                <img 
                  src={profile.avatar} 
                  alt="avatar" 
                  className="w-10 h-10 rounded-full border-2 border-white/20 shadow-lg transition-transform hover:scale-110" 
                />
                <span className="font-medium">{profile.name}</span>
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <div className={`px-4 py-2 rounded-full text-white text-sm font-semibold shadow-lg bg-gradient-to-r ${getStatusColor(status)} animate-pulse-slow`}>
                {status}
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Dark Mode</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={darkMode} 
                  onChange={(e) => setDarkMode(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-red-500 peer-checked:to-orange-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className={`rounded-2xl p-6 shadow-xl transition-all duration-300 ${
              darkMode 
                ? 'bg-black/40 backdrop-blur-lg border border-gray-700/50' 
                : 'bg-gray-900/60 backdrop-blur-lg border border-gray-600/50'
            }`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Game Library</h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-xl border transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-black/30 border-gray-700 text-white placeholder-gray-400' 
                        : 'bg-gray-800 border-gray-600 text-white placeholder-gray-300'
                    }`}
                  />
                  <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                {filteredGames.map((game, index) => (
                  <div
                    key={game.appid}
                    onClick={() => toggleGame(game.appid)}
                    className={`group cursor-pointer rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 transform ${
                      selected.includes(game.appid) 
                        ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-transparent' 
                        : ''
                    } ${
                      darkMode 
                        ? 'bg-black/30 backdrop-blur-sm hover:bg-black/50' 
                        : 'bg-gray-800/60 hover:bg-gray-700/60'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`
                    }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={`https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/capsule_184x69.jpg`}
                        alt={game.name}
                        className="w-full h-20 object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                      {selected.includes(game.appid) && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm mb-1 line-clamp-2">{game.name}</h3>
                      <p className="text-xs opacity-60">ID: {game.appid}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className={`rounded-2xl p-6 shadow-xl transition-all duration-300 ${
              darkMode 
                ? 'bg-black/40 backdrop-blur-lg border border-gray-700/50' 
                : 'bg-gray-900/60 backdrop-blur-lg border border-gray-600/50'
            }`}>
              <h3 className="text-xl font-bold mb-4">Selected Games</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Count:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-red-500">{selected.length}</span>
                    <span className="text-sm opacity-60">/ 32</span>
                  </div>
                </div>
                
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(selected.length / 32) * 100}%` }}
                  ></div>
                </div>
                
                <div className={`p-3 rounded-xl text-sm max-h-32 overflow-y-auto ${
                  darkMode ? 'bg-black/30' : 'bg-gray-800/60'
                }`}>
                  {selected.length > 0 ? selected.join(", ") : "No games selected"}
                </div>
              </div>
            </div>

            <div className={`rounded-2xl p-6 shadow-xl transition-all duration-300 ${
              darkMode 
                ? 'bg-black/40 backdrop-blur-lg border border-gray-700/50' 
                : 'bg-gray-900/60 backdrop-blur-lg border border-gray-600/50'
            }`}>
              <h3 className="text-xl font-bold mb-4">Controls</h3>
              <div className="space-y-3">
                <button
                  onClick={startIdling}
                  disabled={loading || selected.length === 0}
                  className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>▶️</span>
                      Start Idling
                    </>
                  )}
                </button>
                
                <button
                  onClick={stopIdling}
                  disabled={loading}
                  className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:from-red-600 hover:to-rose-700 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>⏹️</span>
                      Stop Idling
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className={`rounded-2xl p-6 shadow-xl transition-all duration-300 ${
              darkMode 
                ? 'bg-black/40 backdrop-blur-lg border border-gray-700/50' 
                : 'bg-gray-900/60 backdrop-blur-lg border border-gray-600/50'
            }`}>
              <h3 className="text-xl font-bold mb-4">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{games.length}</div>
                  <div className="text-sm opacity-60">Total Games</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">{selected.length}</div>
                  <div className="text-sm opacity-60">Selected</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}