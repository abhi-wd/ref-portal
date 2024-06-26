import { db } from "@/src/lib/db";

export const getTwoFactorTokenByEmail = async (email: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findFirst({
            where: { email: email.toLowerCase() }
        })

        return twoFactorToken;
    } catch {
        return null;
    }
}

export const getTwoFactorTokenByToken = async (token: string) => {
    try {
        const twoFactorToken = await db.twoFactorToken.findUnique({
            where: { token }
        })

        return twoFactorToken;
    } catch {
        return null;
    }
}