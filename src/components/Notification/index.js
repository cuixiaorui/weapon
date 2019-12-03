import Notification from "./Notification.vue";
import Vue from "vue";
export function notify() {
  const NotificationClass = Vue.extend(Notification);
  const container = document.createElement("div");
  document.querySelector("body").appendChild(container);
  return new NotificationClass({
    el: container
  });
}

window.test = notify;
