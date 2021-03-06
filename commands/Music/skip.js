// Skip command
module.exports = {
	name: 'skip',
	description: 'Skip a song! If a playlist is currently playing, you can provide a number after the skip command to skip that many songs.',
	execute(message) {
		// Get number after !skip command if it exists
		const args = message.content.split(" ");
		// Get queue
		const serverQueue = message.client.queue.get(message.guild.id);
		// Must be in voice channel to skip song
		if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!');
		// Unable to skip song
		if (!serverQueue) return message.channel.send('There is no song that I could skip!');

		// If number after !skip exists
        if(args.length > 1)
        {
			serverQueue.song_num = serverQueue.song_num + (args[1] - 1);
			serverQueue.connection.dispatcher.end();
		}
		
		else
		{
			// Skip song
			serverQueue.connection.dispatcher.end();
		}
	},
};