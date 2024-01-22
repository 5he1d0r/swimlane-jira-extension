// ==UserScript==
// @name         swimlane jira extension
// @namespace    https://openuserjs.org/users/5he1d0r
// @copyright    2023, 5he1d0r (https://openuserjs.org/users/5he1d0r)
// @version      0.2.1
// @license      MIT
// @author       5he1d0r
// @match        *://*/*RapidBoard.jspa?rapidView=*
// @grant        none
// @run-at       document-idle
// @updateURL    https://openuserjs.org/meta/5he1d0r/swimlane_jira_extension.meta.js
// @description  display the assignee on closed swimlane
// ==/UserScript==

// ==OpenUserJS==
// @author      5he1d0r
// ==/OpenUserJS==

// changelog
//
// 0.2.1 shorten response times
// * shorten the time in which the script checks if a refresh is necessary.
//
// 0.2.0 fix reload issue
// * checks every 2 seconds if there is missing a specific css-class
// * 5-second delay after the last update
// * not perfect response times on change
//
// 0.1 Initial release

class JiraSwimlaneExtensionConfig {
    configButton = () =>
        `
<div class="config config-button jira-swimlane-extension-config"
        style="
            margin-right: 10px;
            color: #0066ff;
        "
>
  <a id="jira-swimlane-extension-config-button"
          class="aui-button aui-button-primary applyChanges"
          style="color: #ddeeff"
          title="Open config for swimlane extension"
  >jira swimlane extension config</a>
</div>
`

    configOverlay = () =>
        `
<div id="jira-swimlane-extension-config-overlay"
        class="jira-dialog jira-dialog-core box-shadow jira-dialog-open popup-width-small jira-dialog-content-ready jira-swimlane-extension-config-overlay"
        style="width: 360px; margin-left: -181px; margin-top: -102.5px;"
        hidden
>
  <header class="jira-dialog-heading jira-dialog-core-heading">
    <h2>Jira swimlane extension</h2>
  </header>
  <footer class="jira-dialog-content jira-dialog-core-content">
    <div class="buttons-container form-footer">
      <div class="buttons">
        <a id="jira-swimlane-extension-config-overlay-close"
                class="cancel aui-button"
                resolved
        >Close</a>
      </div>
    </div>
  </footer>
</div>
`

    constructor() {
        this.addConfigButton();
        this.addConfigOverlay();
        this.initializeEventListener();
    }

    addConfigButton() {
        let header = window.document.getElementsByClassName("aui-header-secondary")[0].children[0];
        header.innerHTML = this.configButton() + header.innerHTML;
    }

    addConfigOverlay() {
        let body = window.document.getElementById("jira");
        body.innerHTML = body.innerHTML + this.configOverlay();
    }

    initializeEventListener() {
        document.querySelector("a[id=jira-swimlane-extension-config-button]").addEventListener('click', this.showOverlay());
        document.querySelector("a[id=jira-swimlane-extension-config-overlay-close]").addEventListener('click', this.hideOverlay());
    }

    showOverlay = () => function() {
        window.document.getElementById("jira-swimlane-extension-config-overlay").hidden = false;
    }

    hideOverlay = () => function() {
        window.document.getElementById("jira-swimlane-extension-config-overlay").hidden = true;
    }
}

// TODO: propper styling of the avatars
const avatar = (assignee) =>
    `
<span class="aui-avatar jira-swimlane-extension">
  <span class="aui-avatar-inner">
    <img src="${assignee.avatarUrls["48x48"]}"
         class="aui-avatar-img"
         title="Bearbeiter: ${assignee.displayName}"
         loading="lazy"
         alt="${assignee.name}"
    />
  </span>
</span>
`;

const displayAssignee = (element, json) => {
    let assignee = json.fields.assignee;
    if (assignee == null) return;
    let e = element.querySelector(".ghx-bandaid");
    e.innerHTML = e.innerHTML + avatar(assignee);
};

const loadTicketAndModifySwimlane = async (element) => {
    let ticket = element.getAttribute("data-issue-key");
    if (ticket == null) return;
    const response = await fetch(`${window.location.origin}/rest/api/latest/issue/${ticket}`);
    let json = await response.json();
    displayAssignee(element, json);
};

const performJiraExtension = () => {
    Array.prototype.forEach.call(
        window.document.getElementsByClassName("ghx-swimlane-header"),
        element => loadTicketAndModifySwimlane(element)
    );
};

const elementIsRemoved = async (selector) => {
    while (document.querySelector(selector) !== null) {
        await new Promise((r) => setTimeout(r, 1000));
    }
    return true;
};

const jiraExtension = async () => {
    new JiraSwimlaneExtensionConfig();
    while (true) {
        let isRemoved = await elementIsRemoved(".jira-swimlane-extension");
        if (isRemoved) performJiraExtension();
        await new Promise((r) => setTimeout(r, 1000));
    }
};

(function() {
    setTimeout(jiraExtension, 1000);
})();
