import api from "../api";

class LiftService {
  // Create a new lift entry
  static async createLift(liftData) {
    const { data } = await api.post("/api/lifts/", liftData);
    return data;
  }

  // Get all lifts for current user
  static async getLifts() {
    const { data } = await api.get("/api/lifts/");
    return data;
  }

  // Update a lift entry
  static async updateLift(liftId, updates) {
    const { data } = await api.patch(`/api/lifts/${liftId}/`, updates);
    return data;
  }

  // Delete a lift entry
  static async deleteLift(liftId) {
    const { data } = await api.delete(`/api/lifts/delete/${liftId}/`);
    return data;
  }

  // Get lifts filtered by type and/or date range
  static async getFilteredLifts(
    liftType = null,
    startDate = null,
    endDate = null
  ) {
    let url = "/api/lifts/?";
    if (liftType) url += `lift_type=${liftType}&`;
    if (startDate) url += `start_date=${startDate}&`;
    if (endDate) url += `end_date=${endDate}`;

    const { data } = await api.get(url);
    return data;
  }
}

export default LiftService;
