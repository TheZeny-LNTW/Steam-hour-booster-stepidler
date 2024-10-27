Here's a more organized and formatted version for your project’s `README.md` file:

---

# Project Name 🎮

A tool to automate game management and configuration on both local machines and VPS servers. Supports idling games on Steam.

---

## Installation and Usage Instructions 📋

### Local Setup

1. **Unzip the Files**
   - Unzip the downloaded files to your desired location.

2. **Install Node.js**
   - Download and install Node.js from [nodejs.org](https://nodejs.org/en/download/).

3. **Install Dependencies**
   - Open PowerShell in the project folder by pressing `CTRL + Right Mouse Button`, then select "Open PowerShell window here."
   - Run the following command to install necessary packages:
     ```bash
     npm i
     ```

4. **Configure Settings**
   - Open `config.json` with a text editor (like Notepad).
   - Set up your credentials:
     - **LOGIN**: Your Steam account login
     - **PASS**: Your Steam account password
     - **GAME**: Add the game IDs of the games you want to idle. For example, **730** is the ID for Counter-Strike: Global Offensive ([Steam link](https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/)).

5. **Start the Application**
   - Run the app by typing:
     ```bash
     node index.js
     ```

---

### VPS Hosting (Ubuntu)

1. **Unzip the Files**
   - Unzip the files on your local machine.

2. **Install Node.js and npm on VPS**
   - Run the following commands in your VPS terminal:
     ```bash
     sudo apt install nodejs
     sudo apt install npm
     ```

3. **Configure Settings**
   - Open `config.json` and add:
     - **LOGIN**: Your Steam account login
     - **PASS**: Your Steam account password
     - **GAME**: The game IDs you want to idle, like **730** for CS:GO.

4. **Upload Files to VPS**
   - Use FileZilla or a similar program to transfer all project files to your VPS server.

5. **Install Dependencies**
   - In the terminal, navigate to the project directory:
     ```bash
     cd /path/to/project-directory
     ```
   - Run the following to install required packages:
     ```bash
     npm i
     ```

6. **Run the Application**
   - Start the app by typing:
     ```bash
     node index.js
     ```

7. **Optional: Keep the Application Running After Closing Terminal**
   - If the app stops running when you close your terminal, install `screen`:
     ```bash
     sudo apt install screen
     ```
   - Navigate to the project folder and run:
     ```bash
     screen node index.js
     ```

   - Now, the app will continue to run even after you log out.

---

### Configuration Details

- **LOGIN** = Your Steam account login
- **PASS** = Your Steam account password
- **GAME** = Game IDs you want to idle (e.g., `730` for CS:GO)

To find a game ID, visit the [Steam Store](https://store.steampowered.com/) and locate the ID in the URL (e.g., for CS:GO, the URL is `https://store.steampowered.com/app/730/CounterStrike_Global_Offensive/`, so the ID is `730`).

---

## Support

- **Discord**: [Legendntw](https://discord.gg/legendntw)
- **Contact**: Zenith666. on Discord
