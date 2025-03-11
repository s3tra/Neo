import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { saveData } from 'storelite2';

const data = new SlashCommandBuilder()
  .setName('delmod')
  .setDescription('Removes a users moderator permissions.')
  .addUserOption((option) =>
    option
      .setName('user')
      .setDescription(
        'Select the user you wish to remove moderator permissions from.'
      )
      .setRequired(true)
  );

const execute = async (interaction, guildData) => {
  const user = interaction.options.getUser('user');

  if (user.bot)
    return interaction.reply({
      content:
        'This user cannot be removed due to their permissions or status.',
      flags: MessageFlags.Ephemeral,
    });

  try {
    const modUsers = guildData.modUsers;

    if (!modUsers.includes(user.id))
      return interaction.reply({
        content: 'This user is not a moderator.',
        flags: MessageFlags.Ephemeral,
      });

    modUsers.splice(modUsers.indexOf(user.id), 1);
    await saveData({
      _key: interaction.guild.id,
      modUsers: modUsers,
    });
  } catch (error) {
    console.error(
      'An error occurred while attempting to update the database:',
      error
    );

    return interaction.reply({
      content:
        'An error occurred while attempting to update the database. Please try again later.',
      flags: MessageFlags.Ephemeral,
    });
  }

  await interaction.reply({
    content: 'The user no longer has moderator permissions.',
  });
};

export { data, execute };
