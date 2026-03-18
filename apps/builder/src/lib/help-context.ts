export interface PageContext {
  pageName: string;
  description: string;
  suggestedQuestions: string[];
}

const defaultContext: PageContext = {
  pageName: "Typebot Builder",
  description:
    "You are somewhere in the Typebot builder application. This is a visual chatbot builder for creating conversational flows.",
  suggestedQuestions: [
    "What is a typebot?",
    "How do I create a new bot?",
    "How do I publish my bot?",
  ],
};

const routeContextMap: { pattern: RegExp; context: PageContext }[] = [
  // ── Authentication ──
  {
    pattern: /^\/(signin|register)$/,
    context: {
      pageName: "Welcome / Sign In",
      description:
        "The authentication page where users sign in or create an account using Magic Link email. There is no separate sign-up — entering an email either signs in or creates a new account. After submitting, a 6-digit code is sent to the email.",
      suggestedQuestions: [
        "I didn't receive the sign-in email",
        "My code expired, what do I do?",
        "How does Magic Link authentication work?",
      ],
    },
  },

  // ── Onboarding ──
  {
    pattern: /^\/onboarding$/,
    context: {
      pageName: "Onboarding",
      description:
        "First-time user setup. Collects your name, organization, and how you plan to use Typebot. This can be skipped and you'll be redirected to the dashboard.",
      suggestedQuestions: [
        "Can I skip onboarding?",
        "What information do I need to provide?",
        "Where will I go after onboarding?",
      ],
    },
  },

  // ── Dashboard ──
  {
    pattern: /^\/typebots$/,
    context: {
      pageName: "Dashboard",
      description:
        "The main home screen showing all your typebots and folders in the current workspace. From here you can create new typebots, organize them into folders, switch workspaces, and access workspace settings.",
      suggestedQuestions: [
        "How do I create a new typebot?",
        "How do I organize my bots into folders?",
        "How do I switch workspaces?",
        "How do I invite team members?",
      ],
    },
  },

  // ── Create / Templates ──
  {
    pattern: /^\/typebots\/create$/,
    context: {
      pageName: "Create New Typebot",
      description:
        "Choose how to create a new typebot: start from scratch with a blank canvas, pick a pre-built template, or import a JSON file from another typebot instance.",
      suggestedQuestions: [
        "What templates are available?",
        "How do I import a typebot from a file?",
        "What's the best template for lead generation?",
      ],
    },
  },

  // ── Folder View ──
  {
    pattern: /^\/typebots\/folders\/[^/]+$/,
    context: {
      pageName: "Folder",
      description:
        "Viewing the contents of a specific folder. Shows all typebots inside this folder. You can drag typebots in and out, create new bots within the folder, or navigate back to the parent level.",
      suggestedQuestions: [
        "How do I move a typebot to a different folder?",
        "Can I create sub-folders?",
        "How do I rename this folder?",
      ],
    },
  },

  // ── Flow Editor ──
  {
    pattern: /^\/typebots\/[^/]+\/edit$/,
    context: {
      pageName: "Flow Editor",
      description:
        "The visual canvas for building your bot's conversation flow. The left sidebar has blocks you can drag onto the canvas (Bubbles, Inputs, Logic, Events, Integrations). The center is the flow diagram. The right panel has a live preview and variable management. Click any block to configure it.",
      suggestedQuestions: [
        "How do I add a new block to my flow?",
        "How do I connect two groups together?",
        "How do I use variables in my messages?",
        "What's the difference between Bubbles and Inputs?",
        "How do I test my bot?",
        "How do I add AI (like ChatGPT) to my bot?",
      ],
    },
  },

  // ── Theme ──
  {
    pattern: /^\/typebots\/[^/]+\/theme$/,
    context: {
      pageName: "Theme Customization",
      description:
        "Customize your bot's visual appearance. The left panel has theme settings (templates, chat bubble colors, fonts, background, avatar, branding, custom CSS). The right panel shows a live preview of your changes.",
      suggestedQuestions: [
        "How do I change the bot's colors?",
        "Can I use a custom font?",
        "How do I add my company logo as the bot avatar?",
        "How do I remove the Typebot branding?",
        "Can I add custom CSS?",
      ],
    },
  },

  // ── Settings ──
  {
    pattern: /^\/typebots\/[^/]+\/settings$/,
    context: {
      pageName: "Bot Settings",
      description:
        "Configure your bot's behavior. Sections include: General (remember answers, prefill inputs, close behavior), Typing Emulation (simulate human-like delays), Security (password protection), and Metadata (SEO title, description, social preview image).",
      suggestedQuestions: [
        "How do I make my bot remember returning users?",
        "How do I password-protect my bot?",
        "What does typing emulation do?",
        "How do I set the page title and description?",
      ],
    },
  },

  // ── Share & Publish ──
  {
    pattern: /^\/typebots\/[^/]+\/share$/,
    context: {
      pageName: "Share & Publish",
      description:
        "Manage your bot's public URL, custom domain, embed codes, and link preview metadata. You can get embed snippets for Standard (full-page), Popup (modal), or Bubble (floating chat) modes. Supports WordPress, React, HTML, iframe, and more.",
      suggestedQuestions: [
        "How do I get the embed code for my website?",
        "How do I set up a custom domain?",
        "What's the difference between Standard, Popup, and Bubble?",
        "How do I customize how my link looks when shared on social media?",
        "How do I embed on WordPress?",
      ],
    },
  },

  // ── Results / Submissions ──
  {
    pattern: /^\/typebots\/[^/]+\/results$/,
    context: {
      pageName: "Results & Submissions",
      description:
        "View all user responses to your bot in a table. Each row is one conversation. You can filter by time period, show/hide columns, export as CSV, and click any row for detailed logs. Only appears after the bot is published and has responses.",
      suggestedQuestions: [
        "How do I export my results?",
        "How do I filter results by date?",
        "Where can I see error logs for a submission?",
        "How do I delete old submissions?",
      ],
    },
  },

  // ── Analytics ──
  {
    pattern: /^\/typebots\/[^/]+\/results\/analytics$/,
    context: {
      pageName: "Analytics",
      description:
        "Visual performance metrics for your bot. Shows total starts, completion rate, drop-off points, and flow path visualization with visitor counts. Use this to identify where users are leaving and optimize your flow.",
      suggestedQuestions: [
        "What does the completion rate mean?",
        "How do I find where users are dropping off?",
        "How do I improve my bot's completion rate?",
        "Can I filter analytics by time period?",
      ],
    },
  },

  // ── Duplicate ──
  {
    pattern: /^\/typebots\/[^/]+\/duplicate$/,
    context: {
      pageName: "Duplicate Typebot",
      description:
        "Copy this typebot to the same or a different workspace. Useful for creating variations, backups, or sharing a bot template across teams.",
      suggestedQuestions: [
        "Can I duplicate to a different workspace?",
        "Will the duplicate keep my results?",
        "Will variables and integrations be preserved?",
      ],
    },
  },

  // ── Billing status pages ──
  {
    pattern: /^\/past-due$/,
    context: {
      pageName: "Payment Past Due",
      description:
        "Your workspace has an unpaid invoice. Access is limited until payment is resolved. Click the button to open the billing portal and update your payment method.",
      suggestedQuestions: [
        "How do I update my payment method?",
        "Why is my workspace blocked?",
        "How do I contact support about billing?",
      ],
    },
  },
  {
    pattern: /^\/suspended$/,
    context: {
      pageName: "Account Suspended",
      description:
        "This workspace has been suspended, usually due to a terms of service violation. Contact support for more information.",
      suggestedQuestions: [
        "Why was my account suspended?",
        "How do I contact support?",
        "Where can I read the terms of service?",
      ],
    },
  },
];

export const getPageContext = (pathname: string): PageContext => {
  for (const { pattern, context } of routeContextMap) {
    if (pattern.test(pathname)) return context;
  }
  return defaultContext;
};
