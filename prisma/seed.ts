import randomUsername from '../src/lib/randomUsername';
import { Gender, Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
	{
		username: 'Alice',
		kindeID: 'kp_17ae3fefcdf4496bb5c1b6ad822644d7',
		slug: randomUsername(
			'kp_17ae3fefcdf4496bb5c1b6ad822644d7'
		).toLowerCase(),
		age: 19,
		gender: Gender.FEMALE,
		bio: 'Architecture student that loves to draw and paint!',
		image: 'https://i.pinimg.com/736x/c3/29/54/c3295491d06ccf22773cfa4b2f145684.jpg',
	},
	{
		username: 'Bob',
		kindeID: 'kp_5582012180434123a38ccb8cd31981e0',
		slug: randomUsername(
			'kp_5582012180434123a38ccb8cd31981e0'
		).toLowerCase(),
		age: 19,
		gender: Gender.MALE,
		bio: 'Dev student that loves to code and play games!',
		image: 'https://i.pinimg.com/736x/bd/35/af/bd35af33f444796b7c4248f7e06f3ebc.jpg',
	},
	{
		username: 'Charlie',
		kindeID: 'kp_4ceb8671750a40908d5d57a884bc2001',
		slug: randomUsername(
			'kp_4ceb8671750a40908d5d57a884bc2001'
		).toLowerCase(),
	},
];

async function main() {
	console.log(`Start seeding ...`);

	for (const u of users) {
		const user = await prisma.user.create({
			data: u,
		});
		console.log(`Upserted user with kindeID: ${user.kindeID}`);
	}

	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
