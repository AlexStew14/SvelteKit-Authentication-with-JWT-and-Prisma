import {fail, redirect} from "@sveltejs/kit";
import {setAuthToken} from "../helpers.js";
import {createUser} from "../../../../prisma/user.js";

export const actions = {
  register:  async ({cookies, request}) => {
    const formData = Object.fromEntries(await request.formData());
    const {email, password} = formData;

    const {error, token} = await createUser(email, password);

    if (error) {
      console.log({error});
      return fail(500, {error});
    }

    setAuthToken({cookies, token});

    throw  redirect(302, "/user-auth");
  }
}