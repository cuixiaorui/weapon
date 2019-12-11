import Notification from "./Notification.vue";
import Vue from "vue";

let notificationList = [];
const interval = 25;
const initTop = 50;

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
  notification.$on("close", onCloseHandler);
  notification.id = countId++;
  return notification;
}
function onCloseHandler(notification) {
  notification.onClose();
  deleteNotification(notification);
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
    if (isDeleted(notification)) return;
    notification.onClose();
    deleteNotification(notification);
    updatePosition();
  }, duration);
}

function isDeleted(notification) {
  return !notificationList.some(n => n.id === notification.id);
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

function getHeightByElement(element) {
  return element ? element.$el.offsetHeight : 0;
}

function updatePosition() {
  const createPositionInfo = (element, index) => {
    const height = getHeightByElement(element);
    const top = initTop + (height + interval) * index;
    const right = 10;
    return {
      top: `${top}px`,
      right: `${right}px`
    };
  };

  notificationList.forEach((element, index) => {
    const preElement = notificationList[index - 1];
    const positionInfo = createPositionInfo(preElement, index);
    element.position.top = positionInfo.top;
    element.position.right = positionInfo.right;
  });
}

window.test = notify;
