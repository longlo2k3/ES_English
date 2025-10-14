import { getCookie } from "cookies-next";

export const getToken = (state: any) => getCookie("token");

export const getOrganizationCode = (state: any) =>
  getCookie("organizationCode");
