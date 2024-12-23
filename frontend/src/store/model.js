import { create } from "zustand";
import { sendRequest, createRequestOptions } from "../services/api/v1/api.service"

export const useModelStore = create((set) => ({
	createModel: async (user_id, newModel) => {
		if (!newModel.description || !newModel.photo) {
			return { success: false, message: "Please fill in all fields." };
		}
		const options = createRequestOptions('POST', { user_id: user_id, model: newModel })
		const res = await sendRequest("models", options);

		if (!res.success) return { success: false, message: res.message };

		return { success: true, data: res.data };

	},
	getModels: async () => {
		const res = await sendRequest("models");
		set(res.data);
	},
	getModelByUserId: async (user_id) => {
		const options = createRequestOptions('POST', { user_id: user_id })
		const res = await sendRequest(`models/user`, options);

		if (!res.success) return { success: false, message: res.message };

		return { success: true, data: res.data.model };
	},
	updateModelPhoto: async (uid, updatedModelPhoto) => {
		const options = createRequestOptions('PUT', updatedModelPhoto)
		const res = await sendRequest(`models/${uid}/photo`, options);

		if (!res.success) return { success: false, message: res.message };

		localStorage.setItem('model', JSON.stringify(res.data.model));
		set((state) => ({
			model: res.data.model
		}));

		return { success: true, data: res.data.model };
	},
}));
