import Notification from "../Notification.vue";
import { notify } from "../index";
import { shallowMount, createWrapper } from "@vue/test-utils";

jest.useFakeTimers();

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

  describe("notify()", () => {
    it("调用后会把 notification 添加到 body 内", () => {
      notify();
      const body = document.querySelector("body");
      expect(body.querySelector(".wp-notification")).toBeTruthy();
    });

    function wrapNotify(options) {
      const notification = notify(options);
      return createWrapper(notification);
    }

    it("设置 title ", () => {
      const wrapper = wrapNotify({ title: "test" });
      const titleContainer = wrapper.find(".wp-notification__title");
      expect(titleContainer.text()).toBe("test");
    });

    it("设置 message ", () => {
      const message = "this is a message";
      const wrapper = wrapNotify({ message });
      const titleContainer = wrapper.find(".wp-notification__message");
      expect(titleContainer.text()).toBe(message);
    });

    it("设置 showClose", () => {
      const wrapper = wrapNotify({ showClose: false });
      const btnSelector = ".wp-notification__close-button";
      expect(wrapper.contains(btnSelector)).toBe(false);
    });

    it("onClose --> 关闭时的回调函数,关闭后应该调用回调函数", () => {
      const onClose = jest.fn();
      const wrapper = wrapNotify({ onClose });
      const btnSelector = ".wp-notification__close-button";
      wrapper.find(btnSelector).trigger("click");
      expect(onClose).toBeCalledTimes(1);
    });

    it("onClick --> 点击 Notification 时的回调函数,点击 Notification 应该触发回调函数", () => {
      const onClick = jest.fn();
      const wrapper = wrapNotify({ onClick });
      const selector = ".wp-notification";
      wrapper.find(selector).trigger("click");
      expect(onClick).toBeCalledTimes(1);
    });

    describe("duration	显示时间", () => {
      it("should 大于 0 时，到时间自动关闭", () => {
        const duration = 1000;
        wrapNotify({ duration });
        const body = document.querySelector("body");
        expect(body.querySelector(".wp-notification")).toBeTruthy();
        jest.advanceTimersByTime(duration);
        expect(body.querySelector(".wp-notification")).toBeFalsy();
      });
    });
  });
});
