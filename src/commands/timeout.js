import {
  SlashCommandBuilder,
  MessageFlags,
  PermissionsBitField,
} from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('timeout')
  .setDescription('Timeout a user.')
  .addUserOption((option) =>
    option
      .setName('user')
      .setDescription('Select the user you wish to timeout.')
      .setRequired(true)
  )
  .addStringOption((option) => {
    option
      .setName('length')
      .setDescription('The length of the timeout.')
      .addChoices(
        { name: '60s', value: 60_000 },
        { name: '5m', value: 300_000 },
        { name: '10m', value: 600_000 },
        { name: '1h', value: 3_600_000 }
      )
      .setRequired(true);
  });

const execute = async (interaction) => {
  // TODO: Permissions in interactionCreate.js

  const user = interaction.options.getUser('user');
  const reason = interaction.options.getString('reason');
  const length = interaction.options.getString('length');

  if (
    !interaction.me.permissions.has(
      PermissionsBitField.Flags.TimeoutMembers,
      true
    )
  )
    return interaction.reply({
      content:
        'The bot does not have the required permissions to manage this user.',
      flags: MessageFlags.Ephemeral,
    });

  if (user.bot)
    return interaction.reply({
      content: 'This user cannot be kicked due to their permissions or status.',
      flags: MessageFlags.Ephemeral,
    });

  try {
    await user.timeout(length, reason ? reason : 'No reason provided.');
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
