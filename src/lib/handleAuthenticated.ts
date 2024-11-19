import prisma from '@/lib/db';
import randomUsername from '@/lib/randomUsername';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Prisma } from '@prisma/client';

export default async function handleAuthenticated() {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isUserAuthenticated = await isAuthenticated();
	let user: Prisma.UserCreateInput | null = null;
	if (isUserAuthenticated) {
		const { id: kindeID } = await getUser();
		user = await prisma.user.findUnique({
			where: {
				kindeID: kindeID,
			},
		});
		if (!user) {
			const username = randomUsername(kindeID);
			user = await prisma.user.create({
				data: {
					kindeID: kindeID,
					username: username,
					slug: username.toLowerCase(),
				},
			});
		}
	}
	return user;
}
