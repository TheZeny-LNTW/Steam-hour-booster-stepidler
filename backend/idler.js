import SteamUser from 'steam-user';
import SteamTotp from 'steam-totp';

const user = new SteamUser();
let currentGames = [];
let loggedIn = false;

export function loginSteam() {
  const logOnOptions = {
    accountName: process.env.STEAM_LOGIN,
    password: process.env.STEAM_PASS,
  };
  if (process.env.SHARED_SECRET) {
    logOnOptions.twoFactorCode = SteamTotp.generateAuthCode(process.env.SHARED_SECRET);
  }

  user.logOn(logOnOptions);

  user.on('loggedOn', () => {
    loggedIn = true;
    console.log('✅ Logged IN');
    user.setPersona(SteamUser.EPersonaState.Online);
  });

  user.on('steamGuard', (domain, callback) => {
    console.log(`🔐 Steam Guard code needed. Domain: ${domain || 'mobile'}`);
    process.stdin.once('data', (data) => callback(data.toString().trim()));
  });

  user.on('error', (err) => {
    console.error('❌ Steam Error:', err.message);
  });
}

export function startIdling(games) {
  if (!loggedIn) return;
  currentGames = games.map(g => parseInt(g));
  user.gamesPlayed(currentGames);
}

export function stopIdling() {
  if (!loggedIn) return;
  currentGames = [];
  user.gamesPlayed([]);
}

export function getCurrentGames() {
  return currentGames;
}

export function getStatus() {
  return loggedIn ? 'Online' : 'Offline';
}
