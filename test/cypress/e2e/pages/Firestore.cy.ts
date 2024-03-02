import seedData from "../../../../data/todos.json";
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
        wrapper = cy.mount(FireStorePage, {
        global: { 
            provide: qLayoutInjections(),
            methods: {
                $q: {
                    notify: jest.fn()
                },
                getDocs: jest.fn()
            }
            },
            data() {
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