import Notification from "../Notification.vue";
import { notify } from "../index";
import { shallowMount } from "@vue/test-utils";

describe("Notification", () => {
  it("应该有类名为 wp-notification 得 div", () => {
    const wrapper = shallowMount(Notification);
    const result = wrapper.contains(".wp-notification");
    expect(result).toBe(true);
  });

  describe("props", () => {
    it("title - 可以通过 title 设置标题", () => {
      const wrapper = shallowMount(Notification, {
        propsData: {
          title: "test"
        }
      });

      const titleContainer = wrapper.find(".wp-notification__title");
      expect(titleContainer.text()).toBe("test");
    });

    it("message - 可以通过 message 设置说明文字", () => {
      const message = "这是一段说明文字";
      const wrapper = shallowMount(Notification, {
        propsData: {
          message
        }
      });

      const container = wrapper.find(".wp-notification__message");
      expect(container.text()).toBe(message);
    });

    it("showClose - 控制显示按钮", () => {
      // 默认显示按钮
      const wrapper = shallowMount(Notification);
      const btnSelector = ".wp-notification__close-button";
      expect(wrapper.contains(btnSelector)).toBe(true);
      wrapper.setProps({
        showClose: false
      });
      expect(wrapper.contains(btnSelector)).toBe(false);
    });

    it("点击关闭按钮后，应该调用传入的 onClose ", () => {
      const onClose = jest.fn();
      const btnSelector = ".wp-notification__close-button";
      const wrapper = shallowMount(Notification, {
        propsData: {
          onClose
        }
      });

      wrapper.find(btnSelector).trigger("click");
      expect(onClose).toBeCalledTimes(1);
    });
  });

  it("notify() 调用后会把 notification 添加到 body 内", () => {
    notify();
    const body = document.querySelector("body");
    expect(body.querySelector(".wp-notification")).toBeTruthy();
  });
});
