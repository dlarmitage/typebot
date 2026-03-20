import { createAuth, option } from "@typebot.io/forge";

export const auth = createAuth({
  type: "encryptedCredentials",
  name: "Resend account",
  schema: option.object({
    apiKey: option.string.meta({
      layout: {
        label: "API Key",
        isRequired: true,
        inputType: "password",
        helperText: "You can create an API key at https://resend.com/api-keys",
        withVariableButton: false,
        isDebounceDisabled: true,
      },
    }),
  }),
});
