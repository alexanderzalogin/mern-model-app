import { create } from "zustand";

export const useUserStore = create((set) => ({
	users: [],
	setUsers: (users) => set({ users }),
	createUser: async (newUser) => {
		if (!newUser.name || !newUser.type || !newUser.email || !newUser.image) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/v1/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUser),
		});
		const data = await res.json();
		set((state) => ({ users: [...state.users, data.data] }));
		return { success: true, message: "User created successfully" };
	},
	fetchUsers: async () => {
		const res = await fetch("/api/v1/users");
		const data = await res.json();
		set({ users: data.data });
	},
	deleteUser: async (uid) => {
		const res = await fetch(`/api/v1/users/${uid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ users: state.users.filter((user) => user._id !== uid) }));
		return { success: true, message: data.message };
	},
	updateUser: async (uid, updatedUser) => {
		const res = await fetch(`/api/v1/users/${uid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedUser),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			users: state.users.map((user) => (user._id === uid ? data.data : user)),
		}));

		return { success: true, message: data.message };
	},
	loginUser: async (email, password) => {
		const res = await fetch(`/api/v1/users/login`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ email, password })
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		return { success: true, data: data };
	},
	signupUser: async (email, password, confirmPassword, type, image, name) => {
		const res = await fetch(`/api/v1/users/signup`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ email, password, confirmPassword, type, image, name })
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		return { success: true, data: data.message };
	},
	getUser: async (token) => {
		const res = await fetch(`/api/v1/users/user`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"x-token": token,
			},
		});

		const data = await res.json();
		if (!data.success) return { success: false, message: "Failed to fetch user" };

		return { success: true, data: data };
	},
	logoutUser: async (token) => {
		const res = await fetch(`/api/v1/users/login`, {
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify({ email, password })
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		return { success: true, data: data };
	},
	updateUserPhoto: async (uid, updatedUserPhoto) => {
		const res = await fetch(`/api/v1/users/${uid}/photo`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedUserPhoto),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		localStorage.setItem('currentUser', JSON.stringify(data.data));
		set((state) => ({
			user: data.data
		}));

		return { success: true, message: data.message };
	},
}));
