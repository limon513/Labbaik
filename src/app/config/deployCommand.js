import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "./index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const commands = [];
const commandsPath = path.join(__dirname, "..", "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const { data } = await import(path.join(commandsPath, file));
  commands.push(data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(config.discord_token);

try {
  console.log("Started refreshing application (/) commands.");

  await rest.put(
    Routes.applicationGuildCommands(config.application_id, config.guild_id),
    { body: commands }
  );

  console.log("Successfully reloaded application (/) commands.");
} catch (error) {
  console.error(error);
}
