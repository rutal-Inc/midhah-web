import toast from "react-hot-toast";

export const logoutUser = () => {
  localStorage.removeItem("token");
  toast.error("Unauthorized. Please log in.");
  globalThis.location.href = "/login";
};
