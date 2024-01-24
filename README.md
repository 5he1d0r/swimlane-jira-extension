# swimlane-jira-extension

show assignee in swimlane on active jira sprint

## Information

Currently showing the assigned user of the ticket at the end of the swimlane in the active sprint.
Only display the avatar if this is a ticket and someone is assigned.

Features like configuration panel, story points, worklog, ... are planed.

## Setup

**Step 1**  
Install a user script manager, like [tampermonkey](https://www.tampermonkey.net/), in your browser.

**Step 2**  
Go [here](https://openuserjs.org/scripts/5he1d0r/swimlane_jira_extension) and install the user script.

### Alternativ setup

If you are not allowed to or simply don't want to install a js script engine plugin to your browser you can add the script by a bookmark.
In this bookmark you have prefix the script with `javascript:` but ***without*** the comments above.

**Be aware that this will not trigger automatic updates of the script.
If you want to be informed of any new versions make sure to hit the subscribe button and activate the... oh wrong platform just follow.**

![](/resources/make_sure_to_watch.png)

## Usage

Everything works out of the box for now.

Nothing to do. 
Except there is a button with whom to open the config overlay next to the search.

![](/resources/config_button.png)

Sadly there are no configs.
Jet.
But they are coming.
Like winter.

## Known issues

- the 'Move to done'-Button moves down a bit
- the background is still clickable and the jira shortcuts work
  - might be related

##

*The script is tested in [tampermonkey](https://www.tampermonkey.net/)*
