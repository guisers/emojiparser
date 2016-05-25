# Emoji Parser :baby_chick:

## What's this?
A Google Chrome extension that allows you to input emojis using the universal shortcodes anywhere in your browser.

## What's supported?
Currently, this has been tested on Facebook chat, Whatsapp Web, Gmail (as well as Inbox), and common input boxes.

## What's changed?
### 1.0.1 (2016-05-25)
#### Added
* Support for flag emojis
* Created .gitignore

#### Changed
* Major refactor (mostly abstracting out functions)
* Bring in emoji data from a git-hosted JSON instead of hardcoded (https://github.com/iamcal/emoji-data)

### 1.0.0.1 (2016-03-04)
#### Fixed
* Change regex to allow digits and underscores, for emojis with codes such as `:dog2:` or `:baby_chick:`

### 1.0 (2016-03-03)
#### Added
* Initial version! Works in Facebook chat, Whatsapp Web, Gmail, Inbox, and standard input bars. Reference box appears in corner while typing to show first 10 shortcode matches to current input.
