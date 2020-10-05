import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import modules from './modules'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production';
const initialState = () => ({
  currentId: 6,
  todos: [
    {
      id: 1,
      text: 'Подоить корову',
      isComplete: false,
    },
    {
      id: 2,
      text: 'Накосить сена',
      isComplete: false,
    },
    {
      id: 3,
      text: 'Выкопать картошку',
      isComplete: false,
    },
    {
      id: 4,
      text: 'Набить морду соседу',
      isComplete: false,
    },
    {
      id: 5,
      text: 'Посадить дерево',
      isComplete: false,
    },
    {
      id: 6,
      text: 'Выучить Vue',
      isComplete: true,
    },
  ]
})
const store = new Vuex.Store({
  state: initialState(),
  mutations: {
    RESET(state) {
      const newState = initialState()
      Object.keys(newState).forEach(key => {
        state[key] = newState[key]
      })
    },
    changeTodoState(s, p){
      const requiredTodo = this.getters.getTodoById(p.id)
      requiredTodo.isComplete = p.isComplete
    },
    removeTodo(s, p){
      s.todos = s.todos.filter(todo => todo.id !== p.id)
    },
    addTodo(s, p){
      s.todos.push({
        text: p.text,
        id: s.currentId + 1,
        isComplete: false
      })
      s.currentId++
    },
    changeTodoText(s, p){
      const requiredTodo = this.getters.getTodoById(p.id)
      requiredTodo.text = p.text
      console.log("s == ",  s)
    }
  },
  actions: {
  },
  getters: {
    todos: s => s.todos,
    getTodoById: s => id => s.todos.find(todo => todo.id === id)
  },
  modules,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
export default store
