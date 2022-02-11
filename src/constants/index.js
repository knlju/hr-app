export const ROLES = {
	user: "company_user",
	admin: "company_admin"
}

export const INPUT_TYPES = {
	text: "text",
	longtext: "longtext",
	image: "image",
	select: "select",
	email: "email",
	password: "password",
	userStatus: "userStatus"
}

export const SORT = [
	{
		id: "createdAt",
		attributes: {
			name: "Created at"
		}
	},
	{
		id: "updatedAt",
		attributes: {
			name: "Updated at"
		}
	},
	{
		id: "publishedAt",
		attributes: {
			name: "Published at"
		}
	},
]

export const ORDER = [
	{
		id: "asc",
		attributes: {
			name: "asc"
		}
	},
	{
		id: "desc",
		attributes: {
			name: "desc"
		}
	},
]
