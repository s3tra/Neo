import { SlashCommandBuilder, MessageFlags } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('kick')
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
  // TODO: Permissions in interactionCreate.js

  const user = interaction.options.getUser('user');
  const reason = interaction.options.getString('reason');

  if (
    !interaction.me.permissions.has(PermissionsBitField.Flags.KickMembers, true)
  )
    return interaction.reply({
      content:
        'The bot does not have the required permissions to manage this user.',
      flags: MessageFlags.Ephemeral,
    });

  if (user.bot || !user.kickable)
    return interaction.reply({
      content: 'This user cannot be kicked due to their permissions or status.',
      flags: MessageFlags.Ephemeral,
    });

  try {
    await user.kick(reason ? reason : 'No reason provided.');
  } catch (error) {
    return interaction.reply({
      content:
        'An error occurred while attempting to kick this user. Please try again later.',
      flags: MessageFlags.Ephemeral,
    });
  }

  await interaction.reply({
    content: 'The user has been successfully kicked.',
  });
};

export { data, execute };
