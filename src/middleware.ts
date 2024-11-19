import { withAuth } from '@kinde-oss/kinde-auth-nextjs/middleware';
export default withAuth(
	async function middleware(req: any) {
		console.log('look at me', req.kindeAuth);
	},
	{
		isReturnToCurrentPage: true,
		loginPage: '/login',
		// isAuthorized: ({ token }: { token: { permissions: string[] } }) => {
		// 	// The user will be considered authorized if they have the permission 'eat:chips'
		// 	return token.permissions.includes('eat:chips');
		// },
	}
);

export const config = {
	matcher: ['/admin'],
};
