import { create } from "zustand";
import { sendRequest, createRequestOptions } from "../services/api/v1/api.service"

export const useAgencyStore = create((set) => ({
	createAgency: async (user_id, newAgency) => {
		if (!newAgency.name || !newAgency.description || !newAgency.photo) {
			return { success: false, message: "Please fill in all fields." };
		}
		const options = createRequestOptions('POST', { user_id: user_id, agency: newAgency })
		const res = await sendRequest("agencies", options);

		if (!res.success) return { success: false, message: res.message };

		return { success: true, data: res.data };
	},
	getAgencies: async () => {
		const res = await sendRequest("agencies");
		set(res.data);
	},
	getAgencyByUserId: async (user_id) => {
		const options = createRequestOptions('POST', { user_id: user_id })
		const res = await sendRequest(`agencies/user`, options);

		if (!res.success) return { success: false, message: res.message };

		return { success: true, data: res.data.agency };
	},
	updateAgencyPhoto: async (uid, updatedAgencyPhoto) => {
		const options = createRequestOptions('PUT', updatedAgencyPhoto)
		const res = await sendRequest(`agencies/${uid}/photo`, options);

		if (!res.success) return { success: false, message: res.message };

		localStorage.setItem('agency', JSON.stringify(res.data.agency));
		set((state) => ({
			agency: res.data.agency
		}));

		return { success: true, data: res.data.agency };
	},
}));
