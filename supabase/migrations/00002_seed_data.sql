-- Seed Data for MoltbotCommunity
-- Run this AFTER creating your first admin user

-- First, create a system user for seeded content
-- You'll need to replace 'YOUR_USER_ID' with an actual user ID after signup
-- Or run this after creating your first account

-- Sample Guides
INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'guide',
  'Getting Started with Moltbot',
  'getting-started-with-moltbot',
  'Welcome to Moltbot! This comprehensive guide will walk you through everything you need to know to get started.

## What is Moltbot?

Moltbot is a powerful automation tool designed to help you manage your Discord server efficiently. With features like auto-moderation, custom commands, and more, Moltbot makes server management a breeze.

## Installation

1. Visit the official Moltbot website
2. Click "Add to Discord"
3. Select your server from the dropdown
4. Grant the necessary permissions
5. Complete the setup wizard

## Basic Configuration

After adding Moltbot to your server, you can configure it using the following commands:

- `/setup` - Run the initial setup wizard
- `/config` - Access the configuration panel
- `/help` - View all available commands

## Next Steps

Once you have Moltbot installed, check out our other guides to learn about:
- Setting up auto-moderation
- Creating custom commands
- Configuring welcome messages
- And much more!

Happy botting!',
  'Learn how to install and configure Moltbot for your Discord server with this comprehensive getting started guide.',
  156,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'guide',
  'Setting Up Auto-Moderation',
  'setting-up-auto-moderation',
  'Auto-moderation is one of Moltbot''s most powerful features. This guide will show you how to configure it effectively.

## Why Auto-Moderation?

Manual moderation can be exhausting. Auto-moderation helps you:
- Filter spam and inappropriate content automatically
- Warn or mute users who break rules
- Keep your server clean 24/7

## Configuration Steps

### Step 1: Access Moderation Settings
Use `/automod settings` to open the configuration panel.

### Step 2: Enable Filters
Choose which filters you want to activate:
- **Spam Filter**: Detects and removes spam messages
- **Link Filter**: Blocks unauthorized links
- **Word Filter**: Removes messages containing banned words
- **Caps Filter**: Limits excessive capitalization

### Step 3: Set Actions
Configure what happens when a rule is broken:
- Warn the user
- Delete the message
- Mute the user temporarily
- Kick or ban repeat offenders

### Step 4: Configure Exceptions
Set up roles or channels that bypass auto-moderation.

## Best Practices

- Start with lenient settings and adjust as needed
- Use warnings before harsh punishments
- Regularly review your filter lists
- Keep your moderators informed of the rules',
  'Configure Moltbot''s auto-moderation to keep your Discord server safe and spam-free.',
  89,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'guide',
  'Creating Custom Commands',
  'creating-custom-commands',
  'Custom commands allow you to create personalized responses for your server. Here''s how to set them up.

## What Are Custom Commands?

Custom commands are user-defined commands that trigger specific responses. They''re perfect for:
- Server rules and information
- Fun responses and memes
- Quick access to important links
- Role self-assignment

## Creating Your First Command

Use the following syntax:
```
/customcmd create [name] [response]
```

Example:
```
/customcmd create rules Please read our server rules at #rules
```

## Advanced Features

### Variables
Use variables to make dynamic responses:
- `{user}` - Mentions the user
- `{server}` - Server name
- `{membercount}` - Current member count

### Embed Responses
Create rich embed responses:
```
/customcmd create welcome --embed --title "Welcome!" --description "Hello {user}!"
```

### Permissions
Restrict commands to specific roles:
```
/customcmd create admin-only --role Admin "This is admin only!"
```

## Managing Commands

- `/customcmd list` - View all custom commands
- `/customcmd edit [name]` - Edit a command
- `/customcmd delete [name]` - Delete a command',
  'Learn how to create and manage custom commands to personalize your Moltbot experience.',
  124,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

-- Sample Fixes
INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'fix',
  'Bot Not Responding to Commands',
  'bot-not-responding-to-commands',
  'If Moltbot isn''t responding to your commands, follow these troubleshooting steps.

## Common Causes

1. **Bot is offline** - Check if Moltbot shows as online in your server
2. **Missing permissions** - Bot needs proper permissions to respond
3. **Wrong prefix** - Make sure you''re using the correct command prefix
4. **Channel restrictions** - Bot might be restricted from certain channels

## Solutions

### Check Bot Status
1. Look at the member list - is Moltbot showing as online?
2. Visit our status page to check for outages
3. Try kicking and re-adding the bot

### Verify Permissions
Ensure Moltbot has these permissions:
- Read Messages
- Send Messages
- Embed Links
- Use Slash Commands

### Reset Prefix
If you forgot your custom prefix:
1. Use @Moltbot prefix to check current prefix
2. Use @Moltbot prefix reset to restore default

### Channel Settings
Check if the bot is allowed in the channel:
1. Go to channel settings
2. Check permissions for Moltbot role
3. Ensure "Send Messages" is enabled

## Still Not Working?

If none of these solutions work:
1. Try removing and re-adding the bot
2. Contact support on our Discord server
3. Check the #announcements channel for known issues',
  'Troubleshoot and fix issues when Moltbot stops responding to commands in your Discord server.',
  234,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'fix',
  'Permission Errors When Using Commands',
  'permission-errors-when-using-commands',
  'Getting "Missing Permissions" errors? Here''s how to fix them.

## Understanding Permission Errors

Permission errors occur when:
- The bot lacks necessary Discord permissions
- Your role doesn''t have command access
- Channel-specific overrides are blocking the bot

## Fixing Bot Permissions

### Step 1: Check Bot Role Position
The bot''s role must be ABOVE the roles it needs to manage.

1. Go to Server Settings > Roles
2. Find the Moltbot role
3. Drag it above other roles (but below admin roles)

### Step 2: Grant Required Permissions
Go to the Moltbot role and enable:
- Manage Roles (for role commands)
- Manage Messages (for moderation)
- Kick/Ban Members (for moderation)
- Manage Channels (for channel commands)

### Step 3: Check Channel Overrides
Some channels might have permission overrides:

1. Right-click the channel
2. Edit Channel > Permissions
3. Check Moltbot''s permissions
4. Remove any denies (red X)

## Common Permission Issues

| Error | Required Permission |
|-------|-------------------|
| Cannot ban users | Ban Members |
| Cannot delete messages | Manage Messages |
| Cannot assign roles | Manage Roles |
| Cannot create channels | Manage Channels |

## Prevention Tips

- Use the built-in permission checker: `/diagnose permissions`
- Don''t manually edit bot role permissions
- Keep the bot role high in the hierarchy',
  'Resolve permission errors and ensure Moltbot has the correct Discord permissions to function properly.',
  167,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

-- Sample FAQs
INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'faq',
  'Is Moltbot free to use?',
  'is-moltbot-free-to-use',
  'Yes! Moltbot is completely free to use with all core features included. We offer a premium tier with additional features for power users, but the free version is fully functional for most servers.',
  'Learn about Moltbot pricing and features.',
  45,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'faq',
  'How do I invite Moltbot to my server?',
  'how-to-invite-moltbot',
  'To invite Moltbot to your Discord server:

1. Visit our website at moltbot.com
2. Click the "Add to Discord" button
3. Select your server from the dropdown menu
4. Review and accept the required permissions
5. Complete the CAPTCHA verification
6. Done! Moltbot is now in your server

You need "Manage Server" permission to add bots to a Discord server.',
  'Step-by-step instructions for adding Moltbot to your Discord server.',
  78,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'faq',
  'What permissions does Moltbot need?',
  'what-permissions-does-moltbot-need',
  'Moltbot requests the following permissions:

**Required:**
- Read Messages - To see commands
- Send Messages - To respond to commands
- Embed Links - For rich message formatting
- Use Slash Commands - For slash command support

**Optional (for full functionality):**
- Manage Messages - For moderation features
- Manage Roles - For role management
- Kick/Ban Members - For moderation
- Manage Channels - For channel management

You can customize permissions based on which features you plan to use.',
  'Understanding the permissions Moltbot needs to function properly.',
  56,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'faq',
  'How do I report a bug?',
  'how-to-report-a-bug',
  'Found a bug? Here''s how to report it:

1. **Join our Support Server** - Link available on our website
2. **Go to #bug-reports channel**
3. **Use the bug report template:**
   - Describe what happened
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if possible
4. **Wait for a response** - Our team reviews all reports

You can also report bugs through this community forum by asking a question with the "bug" tag.',
  'How to report bugs and issues with Moltbot.',
  34,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'faq',
  'Can I use Moltbot in multiple servers?',
  'can-i-use-moltbot-in-multiple-servers',
  'Absolutely! You can add Moltbot to as many Discord servers as you want. Each server has its own independent configuration, so settings in one server won''t affect another.

Premium features (if purchased) are tied to your Discord account, so they''ll work across all your servers.',
  'Using Moltbot across multiple Discord servers.',
  42,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

-- Sample ClawdBot content
INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'clawdbot',
  'Introduction to ClawdBot',
  'introduction-to-clawdbot',
  'ClawdBot is our AI-powered assistant that works alongside Moltbot to provide intelligent moderation and user support.

## What is ClawdBot?

ClawdBot uses advanced AI to:
- Answer user questions automatically
- Detect and handle complex moderation scenarios
- Provide personalized server recommendations
- Learn from your server''s culture and rules

## Key Features

### Smart Responses
ClawdBot can answer common questions about your server without moderator intervention.

### Context-Aware Moderation
Unlike rule-based systems, ClawdBot understands context and nuance in conversations.

### Learning Capabilities
The more ClawdBot interacts with your server, the better it becomes at helping your community.

## Getting Started

Enable ClawdBot in your server:
```
/clawdbot enable
```

Configure its behavior:
```
/clawdbot settings
```

Train it with your server''s FAQs:
```
/clawdbot train
```',
  'Learn about ClawdBot, our AI-powered assistant for intelligent moderation and user support.',
  98,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

-- Sample Questions
INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'question',
  'How do I set up welcome messages?',
  'how-do-i-set-up-welcome-messages',
  'I just added Moltbot to my server and I want to set up automatic welcome messages for new members. I''ve looked through the commands but I''m not sure which one to use.

Can someone explain how to:
1. Enable welcome messages
2. Customize the message content
3. Choose which channel they appear in
4. Add images or embeds to the message

Thanks in advance!',
  'Help needed setting up automatic welcome messages for new server members.',
  67,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

INSERT INTO public.posts (type, title, slug, content, excerpt, views, status, author_id)
SELECT
  'question',
  'Best practices for auto-moderation settings?',
  'best-practices-for-auto-moderation',
  'I''m setting up auto-moderation for my gaming community server (about 500 members). I want to prevent spam and toxicity but I don''t want to be too aggressive and annoy legitimate users.

What settings do you recommend for:
- Spam detection sensitivity
- Word filter configuration
- Warning thresholds before kicks/bans
- Link filtering (we want to allow some gaming-related links)

Would love to hear from others who have successfully set this up!',
  'Looking for recommendations on auto-moderation configuration for a medium-sized gaming community.',
  89,
  'published',
  id
FROM public.users WHERE role = 'admin' LIMIT 1;

-- Note: Run this after creating your first admin user
-- The queries above will automatically use the first admin user as the author
