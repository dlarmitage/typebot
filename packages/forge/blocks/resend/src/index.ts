import { createBlock } from "@typebot.io/forge";
import { sendEmail } from "./actions/sendEmail";
import { auth } from "./auth";
import { ResendLogo } from "./logo";

export const resendBlock = createBlock({
  id: "resend",
  name: "Resend",
  tags: ["email", "notification", "send"],
  LightLogo: ResendLogo,
  auth,
  actions: [sendEmail],
});
