import Notification from "../Notification.vue";
import { notify, __RewireAPI__ as Main } from "../index";
import { shallowMount, createWrapper } from "@vue/test-utils";

jest.useFakeTimers();

function clickCloseBtn(wrapper) {
  const btnSelector = ".wp-notification__close-button";
  wrapper.find(btnSelector).trigger("click");
}

describe("Notification", () => {
  beforeEach(() => {
    Main.__Rewire__("notificationList", []);
  });

  afterEach(() => {
    jest.runAllTimers();
  });

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
  });

  describe("notify()", () => {
    function wrapNotify(options = {}) {
      const notification = notify(options);
      return createWrapper(notification);
    }

    function checkIsExistInView() {
      const body = document.querySelector("body");
      return expect(body.querySelector(".wp-notification"));
    }

    it("调用后会把 notification 添加到 body 内", () => {
      notify();
      checkIsExistInView().toBeTruthy();
    });

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

    describe("onClose --> 关闭时的回调函数,关闭后应该调用回调函数", () => {
      describe("点击关闭按钮", () => {
        it("只会调用 onClose 一次", () => {
          const onClose = jest.fn();
          const wrapper = wrapNotify({ onClose });
          clickCloseBtn(wrapper);
          expect(onClose).toBeCalledTimes(1);
          // 组件销毁后
          jest.runAllTimers();
          expect(onClose).toBeCalledTimes(1);
        });

        it("组件应该被删除", () => {
          const wrapper = wrapNotify();
          clickCloseBtn(wrapper);
          checkIsExistInView().toBeFalsy();
        });
      });

      it("通过设置 duration 关闭时也会调用 onClose", () => {
        const onClose = jest.fn();
        wrapNotify({ onClose, duration: 1000 });
        jest.runAllTimers();
        expect(onClose).toBeCalledTimes(1);
      });
    });

    it("onClick --> 点击 Notification 时的回调函数,点击 Notification 应该触发回调函数", () => {
      const onClick = jest.fn();
      const wrapper = wrapNotify({ onClick });
      const selector = ".wp-notification";
      wrapper.find(selector).trigger("click");
      expect(onClick).toBeCalledTimes(1);
    });

    describe("duration	延迟关闭的时间", () => {
      function handleDuration(duration) {
        wrapNotify({ duration });
        checkIsExistInView().toBeTruthy();
        jest.runAllTimers();
      }

      it("大于 0 时，到时间自动关闭", () => {
        handleDuration(1000);
        checkIsExistInView().toBeFalsy();
      });

      it("等于 0 时，不会自动关闭", () => {
        handleDuration(0);
        checkIsExistInView().toBeTruthy();
      });
    });

    describe("显示的坐标", () => {
      const initPosition = () => {
        return {
          top: "50px",
          right: "10px"
        };
      };

      const expectEqualInitPosition = wrapper => {
        expect(wrapper.vm.position).toEqual(initPosition());
      };
      it("第一个显示的组件位置默认是 top: 50px, right:10px ", () => {
        const wrapper = wrapNotify();
        expectEqualInitPosition(wrapper);
      });

      it("同时显示两个组件时，第二个组件的位置是 -> 起始位置 + 第一个组件得高度 + 间隔", () => {
        const interval = Main.__get__("interval");
        const initTop = Main.__get__("initTop");
        const elementHeightList = [50, 70];
        let index = 0;
        Main.__Rewire__("getHeightByElement", element => {
          return element ? elementHeightList[index++] : 0;
        });

        wrapNotify();
        const wrapper2 = wrapNotify();
        const top = initTop + interval + elementHeightList[0];
        expect(wrapper2.vm.position).toEqual({
          top: `${top}px`,
          right: "10px"
        });
      });

      it("创建得组件都消失后，新创建的组件的位置应该是起始位置", () => {
        wrapNotify();
        jest.runAllTimers();
        const wrapper2 = wrapNotify();
        expectEqualInitPosition(wrapper2);
      });

      describe("创建两个组件，当第一个组件消失后，第二个组件得位置应该更新 -> 更新为第一个组件得位置", () => {
        it("通过点击关闭按钮消失", () => {
          const wrapper1 = wrapNotify();
          const wrapper2 = wrapNotify();
          clickCloseBtn(wrapper1);
          expectEqualInitPosition(wrapper2);
        });

        it("通过触发 settimeout 消失", () => {
          wrapNotify({ duration: 1000 });
          const wrapper2 = wrapNotify({ duration: 3000 });
          jest.advanceTimersByTime(2000);
          expectEqualInitPosition(wrapper2);
        });
      });
    });
  });
});
