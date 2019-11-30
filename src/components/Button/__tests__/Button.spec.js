import Button from "../Button.vue";
import { shallowMount } from "@vue/test-utils";
const classNamePrefix = "wp-button";

describe("Button", () => {
  it("快照", () => {
    const wrapper = shallowMount(Button);
    expect(wrapper).toMatchSnapshot();
  });

  it("应该有类名为 wp-button 得 div", () => {
    const wrapper = shallowMount(Button);
    const result = wrapper.contains(".wp-button");
    expect(result).toBe(true);
  });

  it("可以插入文字", () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: "默认按钮"
      }
    });

    expect(wrapper.text()).toBe("默认按钮");
  });

  describe("props", () => {
    const expectExistClass = function(key, val) {
      const wrapper = shallowMount(Button, {
        propsData: {
          [key]: val
        }
      });

      const className = `${classNamePrefix}--${val}`;
      expect(wrapper.classes(className)).toBe(true);
    };
    describe("type 控制按钮得类型", () => {
      const expectType = expectExistClass.bind(null, "type");
      it("default", () => {
        const wrapper = shallowMount(Button, {});
        const className = `${classNamePrefix}--default`;
        expect(wrapper.classes(className)).toBe(true);
      });

      it("success", () => {
        expectType("success");
      });
      it("error", () => {
        expectType("error");
      });
    });

    describe("size 控制按钮得大小", () => {
      const expectSize = expectExistClass.bind(null, "size");
      it("mini 超小", () => {
        expectSize("mini");
      });
      it("small 小", () => {
        expectSize("small");
      });
      it("medium 中等", () => {
        expectSize("medium");
      });
    });

    it("控制显示是否为圆角", () => {
      const wrapper = shallowMount(Button, {
        propsData: {
          round: true
        }
      });

      const className = `is-round`;
      expect(wrapper.classes(className)).toBe(true);
    });
  });
  describe("events", () => {
    it("点击后应该 emit “click” 事件", () => {
      const wrapper = shallowMount(Button);
      wrapper.trigger("click");
      expect(wrapper.emitted("click")).toBeTruthy();
    });
  });
});
