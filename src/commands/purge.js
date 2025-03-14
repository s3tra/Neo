import { SlashCommandBuilder, MessageFlags } from 'discord.js';

const data = new SlashCommandBuilder()
  .setName('purge')
  .setDescription('Deletes the last x messages.')
  .addNumberOption((option) =>
    option
      .setName('amount')
      .setDescription('The amount of messages to delete.')
      .setMinValue(1)
      .setMaxValue(100)
      .setRequired(true)
  );

const execute = async (interaction) => {
  const amount = interaction.options.getNumber('amount');

  try {
    await interaction.channel.bulkDelete(amount);

    await interaction.reply({
      content: `Successfully deleted \`${amount}\` messages.`,
    });
  } catch (error) {
    console.error(
      'An error occured while attempting to delete the messages:',
      error
    );

    return interaction.reply({
      content: 'An error occured while attempting to delete the messages.',
      flags: MessageFlags.Ephemeral,
    });
  }
};

export { data, execute };
