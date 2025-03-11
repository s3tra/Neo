import {
  SlashCommandBuilder,
  MessageFlags,
  PermissionsBitField,
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('ban')
  .setDescription('Removes a user from the server.')
  .addUserOption((option) =>
    option
      .setName('user')
      .setDescription('Select the user you wish to remove from the server.')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName('reason')
      .setDescription('Provide a reason for the removal of the user.')
  );

const execute = async (interaction) => {
  const user = interaction.options.getUser('user');
  const reason = interaction.options.getString('reason');

  if (
    !interaction.appPermissions.has(PermissionsBitField.Flags.BanMembers, true)
  )
    return interaction.reply({
      content:
        'The bot does not have the required permissions to manage this user.',
      flags: MessageFlags.Ephemeral,
    });

  if (user.bot || !user.kickable)
    return interaction.reply({
      content: 'This user cannot be banned due to their permissions or status.',
      flags: MessageFlags.Ephemeral,
    });

  try {
    await user.ban(reason ? reason : 'No reason provided.');
  } catch (error) {
    console.error(
      'An error occurred while attempting to ban this user:',
      error
    );

    return interaction.reply({
      content:
        'An error occurred while attempting to ban this user. Please try again later.',
      flags: MessageFlags.Ephemeral,
    });
  }

  await interaction.reply({
    content: 'The user has been successfully banned.',
  });
};

export { data, execute };
