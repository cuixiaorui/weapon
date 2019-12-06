import Notification from "./Notification.vue";
import Vue from "vue";

export function notify(options = {}) {
  const container = createContainerAndAppendToView();
  const notification = createNotification(container);
  updateProps(notification, options);
  return notification;
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
  const props = [
    "title",
    "message",
    "showClose",
    "onClose",
    "onClick",
    "duration"
  ];
  props.forEach(key => {
    const hasKey = key in options;
    if (hasKey) {
      setProp(notification, key, options[key]);
    }
  });

  setDuration(notification.duration, notification);
}

function setDuration(duration, notification) {
  if (duration === 0) return;
  setTimeout(() => {
    deleteNotification(notification);
  }, duration);
}

function deleteNotification(notification) {
  const parent = notification.$el.parentNode;
  if (parent) {
    parent.removeChild(notification.$el);
  }
  notification.$destroy();
}

function setProp(notification, key, val) {
  notification[key] = val;
}

window.test = notify;
