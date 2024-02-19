import { describe, expect, jest, it, test } from "@jest/globals"
import { qLayoutInjections, installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils';
import { QBtn, } from 'quasar'; // <= cherry pick only the components you actually use
import AutoGeneratedPage from '../../../../src/pages/AutoGenerate.vue'; // <= note the absence of `.vue` extension, here we are importing the JS/TS part of a Double File Component
installQuasarPlugin();
describe('AutoGenerated Page tests', () => {
  it('Auto generated page from JSON should contain all the UI Elements', async () => {
    const wrapper = mount(AutoGeneratedPage, {
      global: { provide: qLayoutInjections() },
    });
    expect(wrapper).toBeTruthy();
    const autoGenerate = wrapper.findComponent('[data-test="auto-generate"]');
    expect(autoGenerate.exists()).toBeTruthy();
    const btnToggle = autoGenerate.findComponent('[data-test="toggle-setting-0"]');
    expect(btnToggle.exists()).toBeTruthy();
    expect(btnToggle.vm.btnToggleModel).toEqual(false);
    await btnToggle.trigger('click');
    expect(btnToggle.vm.btnToggleModel).toEqual(true);
    const popUpEdit = autoGenerate.findComponent('[data-test="popup-edit-setting-1"]');
    expect(popUpEdit.exists()).toBeTruthy();
    expect(popUpEdit.props().hint).toEqual("Popup Edit box hint");
    const popUpEditNumber = autoGenerate.findComponent('[data-test="popup-edit-setting-2"]');
    expect(popUpEditNumber.exists()).toBeTruthy();
    expect(popUpEditNumber.props().hint).toEqual("Popup Edit box (Number) hint");
    expect(popUpEditNumber.props().dataType).toEqual("number");
    const dropDown = autoGenerate.findComponent('[data-test="dropdown-setting-3"]');
    expect(dropDown.exists()).toBeTruthy();
    expect(dropDown.vm.internalOptions.length).toEqual(3);
    const multidropDown = autoGenerate.findComponent('[data-test="multidropdown-setting-4"]');
    expect(multidropDown.exists()).toBeTruthy();
    expect(multidropDown.vm.internalOptions.length).toEqual(3);
  });
})