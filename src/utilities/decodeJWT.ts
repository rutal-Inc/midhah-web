import { jwtDecode } from "jwt-decode";

export type JwtPayload = {
  id: number;
  name: string;
  email: string;
  displayPicture: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  exp: number;
  iat: number;
};

export default function parseJwt(token: string): JwtPayload | null {
  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp * 1000 < Date.now()) {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}
