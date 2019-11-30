import Button from "../Button.vue";
import { shallowMount } from "@vue/test-utils";
const classNamePrefix = "wp-button";
const expectExistClass = function(key, val, className) {
  const wrapper = shallowMount(Button, {
    propsData: {
      [key]: val
    }
  });

  expect(wrapper.classes(className)).toBe(true);
};

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
    describe("type 控制按钮得类型", () => {
      const expectType = expectExistClass.bind(null, "type");
      it("default", () => {
        const wrapper = shallowMount(Button, {});
        const className = `${classNamePrefix}--default`;
        expect(wrapper.classes(className)).toBe(true);
      });

      it("success", () => {
        expectType("success", `${classNamePrefix}--success`);
      });
      it("error", () => {
        expectType("error", `${classNamePrefix}--error`);
      });
    });

    describe("size 控制按钮得大小", () => {
      const expectSize = expectExistClass.bind(null, "size");
      it("mini 超小", () => {
        expectSize("mini", `${classNamePrefix}--mini`);
      });
      it("small 小", () => {
        expectSize("small", `${classNamePrefix}--small`);
      });
      it("medium 中等", () => {
        expectSize("medium", `${classNamePrefix}--medium`);
      });
    });

    it("控制显示是否为圆角", () => {
      expectExistClass("round", true, `is-round`);
    });

    describe("disabled 禁用", () => {
      it("开启禁用后，会有 is-disabled 类名存在", () => {
        expectExistClass("disabled", true, `is-disabled`);
      });

      it("点击不会 emit click 事件", () => {
        const wrapper = shallowMount(Button, {
          propsData: {
            disabled: true
          }
        });
        wrapper.trigger("click");
        expect(wrapper.emitted("click")).toBeFalsy();
      });
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
