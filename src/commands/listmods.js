import { SlashCommandBuilder, MessageFlags, EmbedBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('listmods')
  .setDescription('List the server moderators.');

const execute = async (interaction, guildData) => {
  const modUsers = guildData.modUsers;

  if (modUsers.length == 0)
    return interaction.reply({
      content:
        'There are no moderators in this server. Try running ``/addmod <user>``.',
      flags: MessageFlags.Ephemeral,
    });

  let description = '';
  for (let i = 0; i < modUsers.length; i++)
    description = description.concat(`- <@${modUsers[i]}>\n`);

  const embed = new EmbedBuilder()
    .setTitle('Server Moderators')
    .setDescription(description)
    .setColor('97BDEF')
    .setTimestamp();

  await interaction.reply({
    embeds: [embed],
  });
};

export { data, execute };
