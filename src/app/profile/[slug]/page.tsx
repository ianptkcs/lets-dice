import ProfileCard from '@/components/ProfileCard';
import ProfileTabs from '@/components/ProfileTabs';
import prisma from '@/lib/db';
import isUser from '@/lib/isUser';
import { notFound } from 'next/navigation';
import React from 'react';

// Adicione esta linha para forçar a renderização dinâmica
export const revalidate = 0;
// ou
// export const dynamic = 'force-dynamic';

const ProfilePage = async ({ params }: { params: { slug: string } }) => {
	const { slug } = params;
	const user = await prisma.user.findUnique({
		where: { slug },
	});
	if (!user) {
		return notFound();
	}
	const profileIsUser = await isUser(user);

	return (
		<div className='grid grid-cols-2 gap-10'>
			<ProfileCard
				user={user}
				isUser={profileIsUser}
			/>
			<ProfileTabs />
		</div>
	);
};

export default ProfilePage;
