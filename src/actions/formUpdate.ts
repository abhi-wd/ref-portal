"use server";


import { db } from "@/src/lib/db";
import { currentUser } from "@/src/lib/auth";
import { Status } from "@prisma/client";
import { getFormbyId } from "@/src/data/form";

interface formUpdateProps {
    referrerResponse: string | undefined
    status: Status
    id: string
}

// interface formDeleteProps {
//     id: string
// }


export const formUpdate = async (
    data: formUpdateProps
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const { referrerResponse, status, id } = data;

    const dbForm = await getFormbyId(id);

    if (!dbForm) {
        return { error: "Form does not exist" }
    }
    if (dbForm && dbForm.status !== Status.PENDING &&  dbForm.verifiedBy !== user.id) {
        return { error: "Form is already Accepted or Rejected by someone else, please refresh the page for the latest data." }
    }
    const updatedForm = await db.form.update({
        where: { id: id },
        data: {
            referrerResponse: referrerResponse,
            status: status,
            verifiedBy: user.id,
            verifiedAt: new Date()
        },
        include: {
            member: true
        }
    });


    return { success: "Settings Updated!", updatedForm }
}


export const formDelete = async (
    id: string
) => {
    const user = await currentUser();

    if (!user) {
        return { error: "Unauthorized" }
    }

    const dbForm = await getFormbyId(id);

    if (!dbForm) {
        return { error: "Form does not exist" }
    }

    const deletedForm = await db.form.delete({
        where: { id: id },
        include: {
            member: true
        }
    });

    return { success: "Deletion Success!", deletedForm }
}