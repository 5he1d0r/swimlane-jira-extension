# swimlane-jira-extension

show assignee in swimlane on active jira sprint

## Information

Currently showing the assigned user of the ticket at the end of the swimlane in the active sprint.
Only display the avatar if this is an tickt and someone is assigned.

Features like configuration panel, story points, worklog, ... are planed.

## Setup

**Step 1**  
Install an user script manager, like [tampermonkey](https://www.tampermonkey.net/), in your browser.

**Step 2**  
Go [here](https://openuserjs.org/scripts/5he1d0r/swimlane_jira_extension) and install the user script.

### Alternativ setup

If you are not allowed by any restrictions or simply don't want to install a js script engine plugin to your browser you can add the script by a bookmark.
In this bookmark you have prefix the script with `javascript:` but ***without*** the comments above.

**Be aware that this will not trigger automatic updates of the script.
If you want to be informed of any new versions make sure to follow this repository.**

![](/resources/make_sure_to_watch.png)

## Known issues

- the 'Move to done'-Button moves down a little bit

##

*The script is tested in [tampermonkey](https://www.tampermonkey.net/)*
