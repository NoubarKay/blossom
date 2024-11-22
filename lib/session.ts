import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const keyHex =
  "bc7d6dba483e31c7bc5397726044cecf9416a115e78f3f021379e9d7c1ea4fb9bfaf158f09bf46b2414e1b2910ad49529982719029dd1168a7e6e915a5ff82614a870b32d78723f87bdc2698984edc540fcbdc7e7cf9e0fd4684b42964839e875f22ca36725dc955808035793e388bb6450a79cea6cf33018177837933213cf2e4dc81befb916a95fe95246b9fe90ab80db6ea0c479b74aa0c48710a09bf92db";

const key = new Uint8Array(Buffer.from(keyHex, "hex"));

const cookie = {
  name: "session",
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Secure only in production
    sameSite: "lax" as const, // Explicitly set to a valid value (as const ensures this is a valid type)
    path: "/",
  },
  duration: 26 * 60 * 60 * 1000, // 1 day
};

export async function encrypt(payload: { userId: string; expiresAt: Date }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: string | Uint8Array) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return null;
  }
}

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set(cookie.name, session, {
    ...cookie.options,
    expires: new Date(expiresAt), // Set the expiration time for the cookie
  });
}
