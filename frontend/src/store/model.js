import { create } from "zustand";

export const useModelStore = create((set) => ({
	createModel: async (user_id, newModel) => {
		if (!newModel.description || !newModel.photo) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/v1/models", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({user_id: user_id, model: newModel}),
		});
		const data = await res.json();
        
		if (!data.success) return { success: false, message: data.message };

		return { success: true, data: data.data };
	},
}));