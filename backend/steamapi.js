import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAMID64;

// Loogss
console.log("✅ STEAM_API_KEY:", STEAM_API_KEY ? "[OK]" : "[MISSING]");
console.log("✅ STEAMID64:", STEAM_ID || "[MISSING]");

router.get("/profile", async (req, res) => {
  try {
    const response = await axios.get("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/", {
      params: {
        key: STEAM_API_KEY,
        steamids: STEAM_ID,
      },
    });

    const profile = response.data.response.players[0];
    res.json({
      name: profile.personaname,
      avatar: profile.avatarfull,
    });
  } catch (err) {
    console.error("❌ Error while downloading Profile:", err.message);
    res.status(500).json({ error: "could not fetch profile" });
  }
});

router.get("/games", async (req, res) => {
  try {
    const response = await axios.get("https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/", {
      params: {
        key: STEAM_API_KEY,
        steamid: STEAM_ID,
        include_appinfo: true,
        include_played_free_games: true,
      },
    });

    const games = response.data.response.games || [];

    // game logs
    console.log(`🎮 Fetched ${games.length} games`);

    res.json(games);
  } catch (err) {
    console.error("❌ Error while fetching games:", err.message);
    if (err.response) {
      console.error("➡️ API response:", err.response.data);
    }
    res.status(500).json({ error: "Could not fetch games" });
  }
});

export default router;
