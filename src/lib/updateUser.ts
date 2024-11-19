'use server';

import { Gender } from '@prisma/client';
import prisma from './db';

const updateUser = async ({
	id,
	usernameInput,
	slugInput,
	updateAge,
	updateGender,
	bioInput,
	imageInput,
}: {
	id: string | undefined;
	usernameInput: string;
	slugInput: string;
	updateAge: number;
	updateGender: Gender | null;
	bioInput: string;
	imageInput: string;
}) => {
	return await prisma.user.update({
		where: {
			id: id,
		},
		data: {
			username: usernameInput,
			slug: slugInput,
			age: updateAge,
			gender: updateGender,
			bio: bioInput,
			image: imageInput,
		},
	});
};

export default updateUser;
