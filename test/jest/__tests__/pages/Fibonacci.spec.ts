import { describe, expect, jest, it, test } from "@jest/globals"
import { qLayoutInjections, installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import { QBtn, } from 'quasar'; // <= cherry pick only the components you actually use
import FibonacciPage from '../../../../src/pages/Fibonacci.vue'; // <= note the absence of `.vue` extension, here we are importing the JS/TS part of a Double File Component
installQuasarPlugin();
describe('FibonacciPage tests', () => {
  it('Invalid input should result in errors', async () => {
    const wrapper = mount(FibonacciPage, {
      global: { provide: qLayoutInjections() },
    });
    expect(wrapper).toBeTruthy();

    const input = await wrapper.find("[data-test='inputFibonacci']");
    expect(input.exists()).toBeTruthy();
    expect(input.element.disabled).toBe(false);
    await input.setValue("Hello");

    const button = await wrapper.findComponent("[data-test='btnFibonacci']");
    expect(button.exists()).toBeTruthy();
    expect(button.element.disabled).toBeTruthy();

    const result = await wrapper.get("#fibResult");
    expect(result.exists()).toBeTruthy();
    expect(result.element.value).toEqual('1');
  });
  it('Valid input should succeed', async () => {
    const wrapper = mount(FibonacciPage, {
      global: { provide: qLayoutInjections() },
    });
    expect(wrapper).toBeTruthy();

    const input = await wrapper.get("[data-test='inputFibonacci']");
    expect(input.exists()).toBeTruthy();
    expect(input.element.disabled).toBe(false);
    await input.setValue("20");

    const button = await wrapper.findComponent("[data-test='btnFibonacci']");
    expect(button.exists()).toBeTruthy();
    expect(button.element.disabled).toBe(false);
    await button.trigger('click');

    const result = await wrapper.get("[data-test='inputResult']");
    expect(result.exists()).toBeTruthy();
    expect(result.element.value).toEqual('6765');
  });
});