import {redirect} from "@sveltejs/kit";

export const load = async ({locals}) => {
  const user = locals.user;
  return {user};
};

export const actions = {
  logout: async ({cookies}) => {
    cookies.delete("AuthorizationToken");
    throw  redirect(302, "/user-auth");
  }
}
