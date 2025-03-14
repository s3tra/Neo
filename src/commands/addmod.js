import { SlashCommandBuilder, MessageFlags } from 'discord.js';
import { saveData, validate } from 'storelite2';

const data = new SlashCommandBuilder()
  .setName('addmod')
  .setDescription('Gives a user moderator permissions.')
  .addUserOption((option) =>
    option
      .setName('user')
      .setDescription('Select the user you wish to give moderator permissions.')
      .setRequired(true)
  );

const execute = async (interaction, guildData) => {
  const user = interaction.options.getUser('user');

  if (user.bot)
    return interaction.reply({
      content: 'This user cannot be added due to their permissions or status.',
      flags: MessageFlags.Ephemeral,
    });

  try {
    const modUsers = guildData.modUsers;

    if (modUsers.includes(user.id))
      return interaction.reply({
        content: 'This user is already a moderator.',
        flags: MessageFlags.Ephemeral,
      });

    modUsers.push(user.id);

    const newData = {
      _key: interaction.guild.id,
      modUsers: modUsers,
    };

    if (validate(newData)) await saveData(newData);
    else
      return interaction.reply({
        content: 'Invalid save data.',
        flags: MessageFlags.Ephemeral,
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
    content: 'The user has been given moderator permissions.',
  });
};

export { data, execute };
