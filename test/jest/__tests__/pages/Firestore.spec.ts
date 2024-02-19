import { describe, expect, jest, it, test } from "@jest/globals"
import seedData from "../../../../data/todos.json";
import { qLayoutInjections, installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount, shallowMount } from '@vue/test-utils';
import { QBtn, } from 'quasar'; // <= cherry pick only the components you actually use
import FireStorePage from '../../../../src/pages/FireStore.vue'; // <= note the absence of `.vue` extension, here we are importing the JS/TS part of a Double File Component
installQuasarPlugin();
describe.skip('Firestore page tests', () => {
    let wrapper = null;
    let todos = [], todoTitles = new Set();
    beforeEach(() => {
        seedData.forEach(async (todo) => {
            if (!todoTitles.has(todo.title)) {
                // Contents of first document
                todos.push(todo);
                todoTitles.add(todo.title);
            }
        });
        wrapper = mount(FireStorePage, {
            global: {
                provide: qLayoutInjections(),
                methods: {
                    $q: {
                        notify: jest.fn()
                    },
                    getDocs: jest.fn()
                }
            },
            data () {
                return {
                    loading: true,
                    todos: todos,
                    todoTitles: todoTitles
                };
            }
        });
    });
    it('Page mounted and data initialzied successfully', async () => {
        expect(wrapper).toBeTruthy();
    });
});