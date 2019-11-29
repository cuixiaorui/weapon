import Button from "../Button.vue";
import { shallowMount } from "@vue/test-utils";
const classNamePrefix = "wp-button";
describe("Button", () => {
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
      const expectButtonType = function(type) {
        const wrapper = shallowMount(Button, {
          propsData: {
            type
          }
        });

        const className = `${classNamePrefix}--${type}`;
        expect(wrapper.classes(className)).toBe(true);
      };

      it("default", () => {
        const wrapper = shallowMount(Button, {});
        const className = `${classNamePrefix}--default`;
        expect(wrapper.classes(className)).toBe(true);
      });

      it("success", () => {
        expectButtonType("success");
      });
      it("error", () => {
        expectButtonType("error");
      });
    });
  });
});
