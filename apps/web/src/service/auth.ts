import api from "@midhah/utils/axios";

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    console.error("Logout error:", error);
    return null;
  }
};
