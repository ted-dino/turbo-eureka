import * as jose from "jose";
import { cookies } from "next/headers";

const secret = jose.base64url.decode(process.env.JOSE_SESSION_KEY!);
const issuer = process.env.JOSE_ISSUER_KEY as string;
const audience = process.env.JOSE_AUDIENCE_KEY as string;
const expiresAt = "1 day";

export const encodeUserSession = async (email: string) => {
  const jwt = await new jose.EncryptJWT({ email: email })
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

    const { email } = payload;
    return email;
  } catch (error) {
    if (error instanceof Error) {
      return { message: "Session expired. Please log in again." };
    }
  }
  return null;
};

export const setUserSession = async (email: string) => {
  const newSession = await encodeUserSession(email);
  cookies().set("tedflix.session-token", newSession);
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
  const jwtToken = cookies().get("tedflix.session-token");
  if (jwtToken) {
    const payload = await decodUserSession(jwtToken.value);
    return payload;
  }
  return null;
};

export const deleteSession = async () => {
  cookies().delete("tedflix.session-token");
};
