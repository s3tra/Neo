import { MessageFlags, PermissionsBitField } from 'discord.js';
import { getData } from 'storelite2';

const execute = async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
      return console.error(
        `No command matching ${interaction.commandName} was found.`
      );
    }

    let guildData = await getData(interaction.guild.id);
    if (!guildData) guildData = { _key: interaction.guild.id, modUsers: [] };
    if (!guildData.modUsers) guildData.modUsers = [];

    let modUsers = guildData.modUsers;

    if (
      !modUsers.includes(interaction.user.id) &&
      !interaction.member.permissions.has(
        PermissionsBitField.Flags.Administrator
      )
    )
      return interaction.reply({
        content: 'You do not have permission to run this command.',
        flags: MessageFlags.Ephemeral,
      });

    try {
      await command.execute(interaction, guildData);
    } catch (error) {
      await interaction.reply({
        content: 'An error occured while executing the command.',
        flags: MessageFlags.Ephemeral,
      });

      return console.error(
        `An error occured while executing ${interaction.commandName}: `,
        error
      );
    }
  }
};

export { execute };
