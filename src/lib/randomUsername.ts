function randomUsername(kindeID: string) {
	const animals: string[] = [
		'Dog',
		'Cow',
		'Cat',
		'Horse',
		'Donkey',
		'Tiger',
		'Lion',
		'Panther',
		'Leopard',
		'Cheetah',
		'Bear',
		'Elephant',
		'PolarBear',
		'Turtle',
		'Tortoise',
		'Crocodile',
		'Rabbit',
		'Porcupine',
		'Hare',
		'Hen',
		'Pigeon',
		'Albatross',
		'Crow',
		'Fish',
		'Dolphin',
		'Frog',
		'Whale',
		'Alligator',
		'Eagle',
		'FlyingSquirrel',
		'Ostrich',
		'Fox',
		'Goat',
		'Jackal',
		'Emu',
		'Armadillo',
		'Eel',
		'Goose',
		'ArcticFox',
		'Wolf',
		'Beagle',
		'Gorilla',
		'Chimpanzee',
		'Monkey',
		'Beaver',
		'Orangutan',
		'Antelope',
		'Bat',
		'Badger',
		'Giraffe',
		'HermitCrab',
		'GiantPanda',
		'Hamster',
		'Cobra',
		'HammerheadShark',
		'Camel',
		'Hawk',
		'Deer',
		'Chameleon',
		'Hippopotamus',
		'Jaguar',
		'Chihuahua',
		'KingCobra',
		'Ibex',
		'Lizard',
		'Koala',
		'Kangaroo',
		'Iguana',
		'Llama',
		'Chinchillas',
		'Dodo',
		'Jellyfish',
		'Rhinoceros',
		'Hedgehog',
		'Zebra',
		'Possum',
		'Wombat',
		'Bison',
		'Bull',
		'Buffalo',
		'Sheep',
		'Meerkat',
		'Mouse',
		'Otter',
		'Sloth',
		'Owl',
		'Vulture',
		'Flamingo',
		'Racoon',
		'Mole',
		'Duck',
		'Swan',
		'Lynx',
		'Lizard',
		'Elk',
		'Boar',
		'Lemur',
		'Mule',
		'Baboon',
		'Mammoth',
		'BlueWhale',
		'Rat',
		'Snake',
		'Peacock',
	];

	const adjectives: string[] = [
		'Adorable',
		'Adventurous',
		'Agreeable',
		'Alert',
		'Alive',
		'Amused',
		'Attractive',
		'Average',
		'Beautiful',
		'Better',
		'Black',
		'Blue',
		'BlueEyed',
		'Blushing',
		'Brainy',
		'Brave',
		'Breakable',
		'Bright',
		'Busy',
		'Calm',
		'Careful',
		'Cautious',
		'Charming',
		'Cheerful',
		'Clean',
		'Clear',
		'Clever',
		'Cloudy',
		'Colorful',
		'Comfortable',
		'Cooperative',
		'Courageous',
		'Curious',
		'Cute',
		'Delightful',
		'Determined',
		'Different',
		'Distinct',
		'Eager',
		'Easy',
		'Elated',
		'Elegant',
		'Enchanting',
		'Encouraging',
		'Energetic',
		'Enthusiastic',
		'Excited',
		'Expensive',
		'Exuberant',
		'Fair',
		'Faithful',
		'Famous',
		'Fancy',
		'Fantastic',
		'Fine',
		'Friendly',
		'Funny',
		'Gentle',
		'Gifted',
		'Glamorous',
		'Gleaming',
		'Glorious',
		'Good',
		'Gorgeous',
		'Graceful',
		'Handsome',
		'Happy',
		'Healthy',
		'Helpful',
		'Hilarious',
		'Homely',
		'Important',
		'Inexpensive',
		'Innocent',
		'Inquisitive',
		'Jolly',
		'Joyous',
		'Kind',
		'Light',
		'Lively',
		'Long',
		'Lovely',
		'Lucky',
		'Magnificent',
		'Misty',
		'Modern',
		'Motionless',
		'Mushy',
		'Mysterious',
		'Nice',
		'Nutty',
		'Obedient',
		'OldFashioned',
		'Open',
		'Outrageous',
		'Outstanding',
		'Perfect',
		'Plain',
		'Pleasant',
		'Poised',
		'Powerful',
		'Precious',
		'Prickly',
		'Proud',
		'Quaint',
		'Real',
		'Relieved',
		'Rich',
		'Shiny',
		'Silly',
		'Sleepy',
		'Smiling',
		'Smoggy',
		'Sparkling',
		'Splendid',
		'Spotless',
		'Stormy',
		'Strange',
		'Successful',
		'Super',
		'Talented',
		'Tame',
		'Tasty',
		'Tender',
		'Thankful',
		'Thoughtful',
		'Tough',
		'Unusual',
		'Victorious',
		'Vivacious',
		'Wandering',
		'Wild',
		'Witty',
		'Zany',
		'Zealous',
		'WideEyed',
	];

	const randomAnimal = animals[Math.floor(Math.random() * animals.length)];
	const randomAdjective =
		adjectives[Math.floor(Math.random() * adjectives.length)];
	const randomIndex = Math.floor(Math.random() * (kindeID.length - 3));
	return `${randomAdjective}${randomAnimal}-${kindeID.slice(
		randomIndex,
		randomIndex + 3
	)}`;
}

export default randomUsername;
