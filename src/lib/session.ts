import * as jose from "jose";
import { cookies } from "next/headers";

const secret = jose.base64url.decode(process.env.JOSE_SESSION_KEY!);
const issuer = process.env.JOSE_ISSUER_KEY as string;
const audience = process.env.JOSE_AUDIENCE_KEY as string;
const expiresAt = "1 day";

export const encodeUserSession = async (userId: string) => {
  const jwt = await new jose.EncryptJWT({ userId: userId })
    .setProtectedHeader({ alg: "dir", enc: "A128CBC-HS256" })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expiresAt)
    .encrypt(secret);

  return jwt;
};

export const decodUserSession = async (jwt: string) => {
  try {
    const { payload } = await jose.jwtDecrypt(jwt, secret, {
      issuer: issuer,
      audience: audience,
    });

    const { userId } = payload;
    return userId;
  } catch (error) {
    if (error instanceof Error) {
      return false;
    }
  }
  return null;
};

export const setUserSession = async (userId: string) => {
  const newSession = await encodeUserSession(userId);
  cookies().set("tedflix.session-token", newSession);
  return newSession;
};

export const getUserSession = async () => {
  const cookieSessionValue = cookies().get("tedflix.session-token");
  if (!cookieSessionValue) {
    return null;
  }
  const extractedUserId = await decodUserSession(cookieSessionValue.value);
  if (!extractedUserId) {
    return null;
  }
  return extractedUserId;
};

export const verifySession = async (token: string) => {
  if (token) {
    const payload = await decodUserSession(token);
    return payload;
  }
  return null;
};

export const deleteSession = async () => {
  cookies().delete("tedflix.session-token");
};
