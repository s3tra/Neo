import {
  SlashCommandBuilder,
  MessageFlags,
  PermissionsBitField,
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('unban')
  .setDescription('Unban a user from the server.')
  .addUserOption((option) =>
    option
      .setName('user')
      .setDescription('Enter the id of the user you wish to unban.')
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName('reason').setDescription('Provide a reason.')
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

  try {
    await interaction.guild.members.unban(
      user,
      reason ? reason : 'No reason provided.'
    );
  } catch (error) {
    console.error(
      'An error occurred while attempting to unban this user:',
      error
    );

    return interaction.reply({
      content:
        'An error occurred while attempting to unban this user. Please try again later.',
      flags: MessageFlags.Ephemeral,
    });
  }

  await interaction.reply({
    content: 'The user has been successfully unbanned.',
  });
};

export { data, execute };
