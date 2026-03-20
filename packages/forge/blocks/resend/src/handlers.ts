import { createActionHandler } from "@typebot.io/forge";
import { parseUnknownError } from "@typebot.io/lib/parseUnknownError";
import { Resend } from "resend";
import { sendEmail } from "./actions/sendEmail";

export default [
  createActionHandler(sendEmail, {
    server: async ({ credentials, options, logs, variables }) => {
      if (!credentials.apiKey) {
        logs.add("No Resend API key provided");
        return;
      }

      if (!options.from || !options.to || !options.subject) {
        logs.add("Missing required fields: from, to, and subject are required");
        return;
      }

      const resend = new Resend(credentials.apiKey);

      try {
        const { data, error } = await resend.emails.send({
          from: options.from,
          to: options.to,
          subject: options.subject,
          html: options.body ?? "",
          replyTo: options.replyTo ?? undefined,
          cc: options.cc ?? undefined,
          bcc: options.bcc ?? undefined,
        });

        if (error) {
          logs.add(`Resend error: ${error.message}`);
          options.responseMapping?.forEach((mapping) => {
            if (!mapping.variableId) return;
            if (mapping.item === "Status")
              variables.set([{ id: mapping.variableId, value: "failed" }]);
          });
          return;
        }

        options.responseMapping?.forEach((mapping) => {
          if (!mapping.variableId) return;
          if ((mapping.item ?? "Email ID") === "Email ID")
            variables.set([{ id: mapping.variableId, value: data?.id }]);
          if (mapping.item === "Status")
            variables.set([{ id: mapping.variableId, value: "sent" }]);
        });
      } catch (error) {
        const parsedError = await parseUnknownError({
          err: error,
          context: "While sending email with Resend",
        });
        logs.add(parsedError);
      }
    },
  }),
];
