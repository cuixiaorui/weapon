import Notification from "./Notification.vue";
import Vue from "vue";
export function notify(options = {}) {
  const container = document.createElement("div");
  document.querySelector("body").appendChild(container);
  return createNotification(container, options);
}

function createNotification(el, options) {
  const NotificationClass = Vue.extend(Notification);
  const notification = new NotificationClass({ el });

  if (options.title) {
    notification.title = options.title;
  }

  return notification;
}

window.test = notify;
