import Notification from "./Notification.vue";
import Vue from "vue";

export function notify(options = {}) {
  const container = createContainerAndAppendToView();
  const notification = createNotification(container);
  updateProps(notification, mergeOptions(options));
  return notification;
}

function mergeOptions(options) {
  return Object.assign({}, createDefaultOptions(), options);
}

function createDefaultOptions() {
  return {
    showClose: true
  };
}

function createContainerAndAppendToView() {
  const container = document.createElement("div");
  document.querySelector("body").appendChild(container);
  return container;
}

function createNotification(el) {
  const NotificationClass = Vue.extend(Notification);
  const notification = new NotificationClass({ el });
  return notification;
}

function updateProps(notification, options) {
  setProp(notification, "title", options.title);
  setProp(notification, "message", options.message);
  setProp(notification, "showClose", options.showClose);
  setProp(notification, "onClose", options.onClose);
}

function setProp(notification, key, val) {
  notification[key] = val;
}

window.test = notify;
