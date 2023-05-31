// ==UserScript==
// @name         Jira Assignee on 
// @namespace    https://openuserjs.org/users/5he1d0r
// @copyright    2023, 5he1d0r (https://openuserjs.org/users/5he1d0r)
// @version      0.1
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

// TODO: propper styling of the avatars
const avatar = (assignee) =>
`
<span class="aui-avatar">
  <span class="aui-avatar-inner">
    <img src="${assignee.avatarUrls["48x48"]}"
         class="aui-avatar-img"
         title="Bearbeiter: ${assignee.displayName}"
         loading="lazy"
         alt="${assignee.name}"
     />
  </span>
</span>
`

const displayAssignee = (element, json) => {
    let assignee = json.fields.assignee
    if(assignee == null) return;
    let e = element.getElementsByClassName("ghx-bandaid")[0];
    e.innerHTML = e.innerHTML + avatar(assignee);
}

const loadTicketAndModifySwimlane = async (element) => {
    let ticket = element.getAttribute("data-issue-key");
    if(ticket == null) return;
    const response = await fetch(`${window.location.origin}/rest/api/latest/issue/${ticket}`);
    let json = await response.json();
    displayAssignee(element, json);
}

const performJiraExtension = () => {
    let y = window.document.getElementsByClassName("ghx-swimlane-header");
    Array.prototype.forEach.call(y, element => {
        loadTicketAndModifySwimlane(element);
    });
};

(function() {
    setTimeout(performJiraExtension, 5000);
})();
