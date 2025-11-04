"use client";

import { Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";

const { Link } = Typography;

function ForgetPassword() {
  const { t } = useTranslation();
  return <Link>{t("auth.forgetPassword.link")}</Link>;
}

export default ForgetPassword;
