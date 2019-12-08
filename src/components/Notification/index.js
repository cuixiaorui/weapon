import Notification from "./Notification.vue";
import Vue from "vue";

let notificationList = [];

export function notify(options = {}) {
  const container = createContainerAndAppendToView();
  const notification = createNotification(container);
  addToList(notification);
  updateProps(notification, options);
  updatePosition(notification);
  return notification;
}

function createContainerAndAppendToView() {
  const container = document.createElement("div");
  document.querySelector("body").appendChild(container);
  return container;
}

let countId = 0;
function createNotification(el) {
  const NotificationClass = Vue.extend(Notification);
  const notification = new NotificationClass({ el });
  notification.id = countId++;
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
    notification.onClose();
    deleteNotification(notification);
    updatePosition();
  }, duration);
}

function deleteNotification(notification) {
  const parent = notification.$el.parentNode;
  if (parent) {
    parent.removeChild(notification.$el);
  }
  removeById(notification.id);
  notification.$destroy();
}

function removeById(id) {
  notificationList = notificationList.filter(v => v.id !== id);
}

function addToList(notification) {
  notificationList.push(notification);
}

function setProp(notification, key, val) {
  notification[key] = val;
}

function updatePosition() {
  const interval = 25;
  const initTop = 50;
  const elementHeight = 50;

  notificationList.forEach((element, index) => {
    const top = initTop + (elementHeight + interval) * index;
    element.position.top = `${top}px`;
    element.position.right = `10px`;
  });
}

window.test = notify;
