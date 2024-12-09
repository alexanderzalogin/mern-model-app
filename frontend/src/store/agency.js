import { create } from "zustand";

export const useAgencyStore = create((set) => ({
	createAgency: async (user_id, newAgency) => {
		if (!newAgency.name || !newAgency.description || !newAgency.photo) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/v1/agencies", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({user_id: user_id, agency: newAgency}),
		});
		const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

		return { success: true, data: data.data };
	},
    getAgencies: async () => {
		const res = await fetch("/api/v1/agencies");
		const data = await res.json();
        console.log(data.data)
		set({ agencies: data.data });
	},
    getAgencyByUserId: async (user_id) => {
		const res = await fetch("/api/v1/agencies/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({user_id: user_id}),
		});
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };
		
		return { success: true, data: data.data };
	},
	updateAgencyPhoto: async (uid, updatedAgencyPhoto) => {
		const res = await fetch(`/api/v1/agencies/${uid}/photo`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedAgencyPhoto),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		localStorage.setItem('agency', JSON.stringify(data.data));
		set((state) => ({
			agency: data.data
		}));

		return { success: true, message: data.message };
	},
}));
