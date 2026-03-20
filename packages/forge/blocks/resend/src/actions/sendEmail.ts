import { createAction, option } from "@typebot.io/forge";
import { isDefined } from "@typebot.io/lib/utils";
import { auth } from "../auth";

export const sendEmail = createAction({
  auth,
  name: "Send email",
  options: option.object({
    from: option.string.meta({
      layout: {
        label: "From",
        placeholder: "Your App <noreply@yourdomain.com>",
        isRequired: true,
        helperText:
          "Must be an email address on a verified domain in your Resend account.",
      },
    }),
    to: option.string.meta({
      layout: {
        label: "To",
        isRequired: true,
      },
    }),
    subject: option.string.meta({
      layout: {
        label: "Subject",
        isRequired: true,
      },
    }),
    body: option.string.meta({
      layout: {
        label: "Body",
        inputType: "textarea",
        helperText: "Supports HTML content.",
      },
    }),
    replyTo: option.string.meta({
      layout: {
        label: "Reply to",
        accordion: "Advanced configuration",
        placeholder: "reply@yourdomain.com",
      },
    }),
    cc: option.string.meta({
      layout: {
        label: "CC",
        accordion: "Advanced configuration",
      },
    }),
    bcc: option.string.meta({
      layout: {
        label: "BCC",
        accordion: "Advanced configuration",
      },
    }),
    responseMapping: option.saveResponseArray(["Email ID", "Status"]).meta({
      layout: {
        accordion: "Save response",
      },
    }),
  }),
  getSetVariableIds: (options) =>
    options.responseMapping?.map((r) => r.variableId).filter(isDefined) ?? [],
});
