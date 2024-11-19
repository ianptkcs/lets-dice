import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Prisma } from '@prisma/client';

const isUser = async (user: Prisma.UserCreateInput) => {
	const { isAuthenticated, getUser } = getKindeServerSession();
	const isUserAuthenticated = await isAuthenticated();
	if (!isUserAuthenticated) return false;
	const { id: kindeID } = await getUser();
	return user.kindeID === kindeID;
};

export default isUser;
