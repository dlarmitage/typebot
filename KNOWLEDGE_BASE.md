# Typebot Builder — Knowledge Base

> Comprehensive reference for the in-app AI help assistant.
> This document powers the context-aware assistant that helps users build, configure, publish, and analyze their typebots.

---

## What Is Typebot?

Typebot is a visual chatbot builder that lets you create conversational flows — called **typebots** — without writing code. You design a flow by dragging blocks onto a canvas, connecting them with edges, and configuring each block's behavior. The finished bot can be published as a standalone page, embedded on a website, or connected to WhatsApp.

This instance is self-hosted by **Care for the Kids**, a nonprofit organization, and is used to create interactive experiences for their programs.

---

## Core Concepts

### Typebot
A single chatbot project. Contains groups, blocks, edges, variables, events, theme, and settings. Each typebot has a unique ID and lives inside a workspace.

### Workspace
An organizational container for typebots. Workspaces have members with roles (Admin, Member, Guest) and a billing plan. You can have multiple workspaces.

### Groups
Visual containers on the canvas that hold one or more blocks. Groups are the building units of a flow — they appear as cards on the editor canvas. Each group has a title (auto-generated or custom) and can be repositioned by dragging.

### Blocks
The individual steps inside a group. There are four categories:
- **Bubbles** — Messages the bot sends (text, image, video, audio, embed)
- **Inputs** — Questions the bot asks the user (text, email, buttons, date, file upload, etc.)
- **Logic** — Flow control (conditions, redirects, jumps, scripts, A/B tests, webhooks)
- **Integrations** — External service connections (OpenAI, Google Sheets, HTTP requests, email, Zapier, etc.)

### Edges
Connections between groups that define the flow path. When a group finishes executing, the edge determines which group runs next.

### Variables
Named placeholders that store data during a conversation. Variables can be set from user input, API responses, scripts, or URL parameters. They can be referenced in any text field using `{{variableName}}` syntax.

### Events
Special triggers that start or modify a flow:
- **Start** — The entry point of every typebot
- **Command** — Triggered by a text command (useful for WhatsApp)
- **Reply** — Conditional triggers based on message content
- **Invalid** — Handles invalid user input

### Publishing
Making a typebot available to end users. Published bots get a public URL and can be embedded. Unpublished changes stay in draft until you click Publish.

---

## Pages & Features

### Sign In / Welcome (`/signin`, `/register`)

The unified welcome screen where users authenticate via **Magic Link**. There is no separate sign-up process — entering your email either signs you into an existing account or creates a new one automatically. After submitting your email, you'll receive a 6-digit code to enter on screen (or click the link in the email).

**Common questions:**
- "I didn't receive the email" — Check spam/junk folders. The email comes from noreply@ambient.technology. You can also try again after a minute.
- "The code expired" — Codes are valid for a limited time. Request a new one by re-entering your email.

---

### Dashboard (`/typebots`)

The home screen after signing in. Shows all your typebots and folders in the current workspace.

**What you can do:**
- **Create a new typebot** — Click "Start from scratch", "Start from a template", or "Import a file"
- **Organize with folders** — Create folders to group related typebots. Drag and drop typebots between folders.
- **Switch workspaces** — Use the workspace dropdown in the top-right to switch between workspaces
- **Access settings** — Click "Settings & Members" to manage workspace configuration, members, billing, and credentials

**Tips:**
- Drag typebots onto folders to organize them
- Right-click a typebot for quick actions (duplicate, delete, move)
- The workspace dropdown shows your current plan

---

### Folder View (`/typebots/folders/[id]`)

Shows the contents of a specific folder. Works just like the dashboard but scoped to one folder. Use the back arrow to navigate to the parent level.

---

### Create / Templates (`/typebots/create`)

Browse pre-built templates to kickstart your typebot, or start from a blank canvas. Templates cover common use cases like lead generation, customer support, surveys, and quizzes.

---

### Flow Editor (`/typebots/[typebotId]/edit`)

The core of the builder — a visual canvas where you design your bot's conversation flow.

**Layout:**
- **Left sidebar** — Block palette organized by category (Bubbles, Inputs, Logic, Events, Integrations). Drag blocks from here onto the canvas.
- **Center canvas** — Your flow diagram. Groups appear as cards; edges appear as connecting lines.
- **Right panel** — Preview drawer (test your bot live) and Variables drawer.
- **Top header** — Typebot name (click to rename), undo/redo, Help button, Test, Share, and Publish.

**How to build a flow:**
1. The canvas starts with a **Start** event block
2. Drag blocks from the left sidebar onto the canvas to create groups
3. Connect groups by dragging from one block's output to another group
4. Click any block to open its settings panel
5. Use the Preview (right panel) to test your flow at any time

**Block Categories:**

#### Bubbles (Bot Messages)
- **Text** — Rich text messages with formatting (bold, italic, links). Supports variable interpolation with `{{variableName}}`.
- **Image** — Display an image from URL or upload
- **Video** — Embed a video (YouTube, Vimeo, or direct URL)
- **Audio** — Play an audio file
- **Embed** — Embed custom HTML or an iframe

#### Inputs (User Responses)
- **Text** — Free-text input. Options: single-line or multi-line, placeholder text, button label
- **Number** — Numeric input with optional min/max/step
- **Email** — Email input with validation
- **URL** — URL input with validation
- **Phone** — Phone number input with country code support
- **Date** — Calendar date picker
- **Time** — Time picker
- **Buttons** — Multiple choice buttons. Each button can have a custom label and value.
- **Cards** — Rich card selection with images and descriptions
- **Picture Choice** — Image-based multiple choice in grid or list layout
- **Rating** — Star or numeric rating scale (1-10)
- **File** — File upload with type/size restrictions
- **Payment** — Stripe-powered payment collection

#### Logic (Flow Control)
- **Set Variable** — Create or update a variable with a static value, computed expression, or JavaScript code
- **Condition** — Branch the flow based on variable comparisons (if/else logic). Supports AND/OR conditions.
- **Redirect** — Send the user to a URL (can open in new tab)
- **Jump** — Jump to a different group in the flow
- **Typebot** — Link to and execute another typebot (nested flows)
- **Script** — Run custom JavaScript code
- **Wait** — Pause for a specified duration
- **A/B Test** — Split traffic between paths by percentage
- **Webhook** — Wait for an external webhook to arrive (via WebSocket)
- **Return** — End the current flow

#### Integrations (External Services)
- **OpenAI** — Chat completion (GPT), image generation, text-to-speech, speech-to-text
- **Google Sheets** — Read from or append to a spreadsheet
- **HTTP Request** — Make any REST API call (GET, POST, PUT, DELETE) with custom headers and body
- **Send Email** — Send an email via SMTP
- **Google Analytics** — Track events
- **Zapier** — Trigger Zapier automations
- **Make.com** — Trigger Make scenarios
- **Pabbly** — Trigger Pabbly workflows
- **Chatwoot** — CRM integration
- **Pixel** — Facebook Pixel tracking
- **Cal.com** — Calendar scheduling
- **QR Code** — Generate QR codes
- **And more** — Mistral, Anthropic, Deepseek, Groq, ElevenLabs, Dify.AI, ChatNode, Segment, Zendesk, etc.

**Tips:**
- Click a group title to rename it
- Double-click the canvas background to pan around
- Use Ctrl/Cmd + Z to undo, Ctrl/Cmd + Shift + Z to redo
- Right-click blocks or groups for context menu options (duplicate, delete)
- Variables are accessible everywhere — type `{{` in any text field to see available variables

---

### Theme (`/typebots/[typebotId]/theme`)

Customize the visual appearance of your published bot. The left panel has settings; the right panel shows a live preview.

**Sections:**
- **Templates** — Pre-built theme presets you can apply with one click
- **My Themes** — Save and reuse your own custom themes
- **Chat** — Customize chat bubble colors, border radius, text colors, avatar images
- **General** — Background (solid, gradient, or image), font family, progress bar visibility, branding toggle
- **Custom CSS** — Advanced: write raw CSS for pixel-perfect customization

**Tips:**
- Changes preview in real-time on the right side
- Save custom themes to reuse across typebots
- The font selector includes the full Google Fonts library
- You can upload a custom font file

---

### Settings (`/typebots/[typebotId]/settings`)

Configure bot behavior. Organized in expandable accordion sections:

- **General** — Remember user answers (conversation persistence across visits), input prefill from URL parameters, hide query params, close/restart behavior
- **Typing Emulation** — Simulate human-like typing delays for a more natural experience. Adjustable speed.
- **Security** — Password-protect your bot so only users with the password can access it
- **Metadata** — SEO and social sharing settings: page title, description, Open Graph image, favicon

---

### Share & Publish (`/typebots/[typebotId]/share`)

Manage how your bot is accessed and embedded.

**Public URL:**
- Every published bot gets a URL like `https://bot.ambient.technology/my-bot-name`
- Edit the public ID/slug to customize the URL
- Add a custom domain (e.g., `chat.yourdomain.com`)

**Embed Options:**
- **Standard** — Full-page embed via HTML snippet or React component
- **Popup** — Modal dialog that opens on trigger
- **Bubble** — Floating chat widget in corner of page
- **WordPress** — WordPress plugin
- **Other** — Wix, Notion, Google Tag Manager, iframe

**Link Preview:**
- Configure how the bot link appears when shared on social media
- Set title, description, and preview image (supports Unsplash library)

---

### Results (`/typebots/[typebotId]/results`)

View all user submissions (responses) in a table format. Only available after the bot has been published and has received responses.

**Features:**
- Sortable, filterable table of all submissions
- Time period filter (last 7 days, 30 days, etc.)
- Column visibility toggle — show/hide specific response fields
- Export results as CSV
- Bulk delete submissions
- Click any row to see detailed response with execution logs

---

### Analytics (`/typebots/[typebotId]/results/analytics`)

Visual performance metrics for your published bot.

**Metrics:**
- **Total starts** — How many people began the bot
- **Completion rate** — Percentage who finished
- **Drop-off analysis** — Which blocks cause people to leave
- **Flow visualization** — See how many users passed through each edge/connection

**Tips:**
- Use drop-off data to identify confusing or problematic blocks
- The flow diagram overlays show visitor counts on each path
- Filter by time period to track trends

---

### Workspace Settings (via "Settings & Members" button)

**Tabs:**

#### My Account
- Update your name and profile picture
- Change your email address
- Manage API tokens for programmatic access

#### Preferences
- Appearance: Light/dark mode
- Graph navigation style: Pan vs. drag
- Auto-generate group titles using AI

#### Workspace Settings
- Rename workspace
- Set workspace icon/image

#### Members
- View current members and their roles
- Invite new members by email
- Change member roles (Admin, Member, Guest)
- Remove members

#### Billing & Usage
- View current plan and usage
- Upgrade/downgrade plan
- Access Stripe billing portal for invoices and payment methods

#### Credentials
- Manage API keys and OAuth tokens for integrations
- Credentials can be scoped to you personally or shared workspace-wide
- Supported: OpenAI, Google Sheets, Stripe, SMTP email, WhatsApp, and more

---

### Onboarding (`/onboarding`)

First-time user setup flow. Collects your name, organization, and use case. Can be skipped. Redirects to the dashboard when complete.

---

### Duplicate (`/typebots/[typebotId]/duplicate`)

Copy a typebot to the same or a different workspace. Useful for creating variations or moving bots between teams.

---

## Embedding & Deployment

Typebots can be deployed in several ways:

1. **Standalone page** — Share the public URL directly. Users visit the page and interact with the bot.
2. **Standard embed** — Embed the bot as a full component on your website using a `<script>` tag or React component.
3. **Bubble widget** — A floating chat icon in the corner of your site. Clicking it opens the bot in a chat-like interface.
4. **Popup** — A modal dialog that appears based on triggers (page load, delay, click).
5. **WhatsApp** — Connect to WhatsApp Business for messaging-based interactions.

### Embed Code Example (Standard)
```html
<script type="module">
  import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0/dist/web.js'
  Typebot.initStandard({ typebot: 'your-typebot-id' })
</script>
<typebot-standard style="width: 100%; height: 600px;"></typebot-standard>
```

### Embed Code Example (Bubble)
```html
<script type="module">
  import Typebot from 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0/dist/web.js'
  Typebot.initBubble({ typebot: 'your-typebot-id' })
</script>
```

---

## Variables Deep Dive

Variables are central to building dynamic typebots.

**Setting variables:**
- Automatically from user input blocks (each input block can save to a variable)
- Using the "Set Variable" logic block
- From URL query parameters (prefill)
- From API/webhook responses
- From JavaScript code in Script blocks

**Using variables:**
- In any text field: `{{variableName}}`
- In conditions: compare variable values to branch the flow
- In API requests: use in URLs, headers, or body
- In redirects: build dynamic URLs

**Variable types:**
- Text (string)
- Number
- Boolean
- Lists/arrays (from multi-select inputs or API responses)

---

## Common Workflows

### Lead Generation Bot
1. Greet user with a text bubble
2. Ask for name (text input → save to `name` variable)
3. Ask for email (email input → save to `email` variable)
4. Ask qualifying question (buttons → save to `interest` variable)
5. Send data to CRM via HTTP request or Google Sheets
6. Thank the user with a personalized message using `{{name}}`

### Customer Support Bot
1. Present menu of common topics (buttons)
2. Use conditions to branch based on selection
3. Provide relevant information (text/image/video bubbles)
4. Offer "Talk to human" option via redirect or Chatwoot integration
5. Collect satisfaction rating at end

### Survey / Quiz
1. Ask series of questions using various input types
2. Use Set Variable with code to calculate scores
3. Use conditions to show different results based on score
4. Optionally send results to Google Sheets for analysis

### AI-Powered Conversation
1. Collect user's question (text input)
2. Pass to OpenAI block with system prompt
3. Display AI response in text bubble
4. Loop back for follow-up questions

---

## FAQ

### How do I publish my bot?
Click the red "Publish" button in the top-right corner of the editor. Your bot will be available at its public URL immediately.

### How do I unpublish?
Go to the Share page and click "Unpublish". The public URL will stop working.

### Can I undo changes?
Yes — use Ctrl/Cmd + Z in the editor. Changes are auto-saved.

### How do I test my bot?
Click "Test" in the header or use the Preview panel on the right side of the editor. This runs a live simulation of your bot.

### How do I add a team member?
Go to Settings & Members → Members tab → Enter their email and click Invite.

### How do I connect to external APIs?
Use the HTTP Request block. Configure the method, URL, headers, and body. Map response data to variables for use in the flow.

### How do I use AI in my bot?
Add an OpenAI block (or Anthropic, Mistral, etc.) from the Integrations section. Configure your API credentials in Workspace Settings → Credentials, then set up the model, system prompt, and user message in the block settings.

### Why is my bot not showing the latest changes?
You need to click "Publish" after making changes. The published version is separate from the editor draft.

### How do I export a typebot?
From the dashboard, right-click the typebot and select "Export". This downloads a JSON file you can import elsewhere.

### How do I duplicate a typebot?
Right-click the typebot on the dashboard → Duplicate. Or visit `/typebots/[id]/duplicate` to choose a destination workspace.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Ctrl/Cmd + Z | Undo |
| Ctrl/Cmd + Shift + Z | Redo |
| Delete / Backspace | Delete selected block or group |
| Escape | Deselect / close panel |

---

## Troubleshooting

### "An error occurred" toast
Check the browser console and server logs for details. Common causes:
- Missing or expired API credentials
- Database connection issues
- Invalid block configuration

### Bot not loading for visitors
- Ensure the bot is published (red Publish button)
- Check that the public URL or embed code is correct
- Verify the viewer app (`bot.ambient.technology`) is deployed and running

### Email/magic link not arriving
- Check spam/junk folder
- Verify SMTP settings in environment configuration
- The sender address is noreply@ambient.technology

### Integration block failing
- Check credentials are valid and not expired
- Open Results → click the submission → view Logs for detailed error messages
- For HTTP requests, verify the URL, method, and authentication
