import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('serverinfo')
  .setDescription('Display information about the server.');

const execute = async (interaction) => {
  const guild = interaction.guild;

  const embed = new EmbedBuilder()
    .setTitle('Server Information')
    .setFields([
      { name: 'Name', value: guild.name, inline: true },
      { name: 'Owner', value: `<@${guild.ownerId}>`, inline: true },
      {
        name: 'Members',
        value: `${guild.memberCount.toLocaleString()}/${guild.maximumMembers.toLocaleString()}`,
        inline: true,
      },
      { name: 'Bans', value: guild.bans.cache.size.toString(), inline: true },
      {
        name: 'Emojis',
        value: guild.emojis.cache.size.toString(),
        inline: true,
      },
      {
        name: 'Stickers',
        value: guild.stickers.cache.size.toString(),
        inline: true,
      },
    ])
    .setThumbnail(guild.iconURL())
    .setColor('97BDEF')
    .setTimestamp();

  await interaction.reply({
    embeds: [embed],
  });
};

export { data, execute };
