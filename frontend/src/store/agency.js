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
}));
