import { create } from "zustand";
import { sendRequest, createRequestOptions } from "../services/api/v1/api.service"

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
    getModels: async () => {
		const res = await sendRequest("models");
		set(res.data);
	},
    getModelByUserId: async (user_id) => {
		const res = await fetch("/api/v1/models/user", {
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
	updateModelPhoto: async (uid, updatedModelPhoto) => {
		const res = await fetch(`/api/v1/models/${uid}/photo`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedModelPhoto),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		localStorage.setItem('model', JSON.stringify(data.data));
		set((state) => ({
			model: data.data
		}));

		return { success: true, message: data.message };
	},
}));
