<template>
  <div id="app">
    <div class="my-info">
      <ul>
        <li>Жлабницкий Александр Валерьевич</li>
        <li>063-611-20-90</li>
      </ul>
    </div>
    <div class="todo">
      <h3 class="todo__title">My ToDo's:</h3>
      <ul class="todo__list">
        <li
          class="todo-item"
          v-for="(todo, i) in todos" :key="i"
        >
          <label>
            <input
              type="checkbox"
              :value="todo.text"
              :checked="todo.isComplete"
              @change="completeHandler($event.target.checked, todo.id)"
            >
          </label>
          <div
            class="todo-item__text"
            :class="{
            'done' : todo.isComplete
          }"
          >
            {{todo.text}}
          </div>
          <button
            class="todo-item__delete"
            @click="deleteTodoHandler(todo.id)"
          >X</button>
        </li>
        <li
          v-if="!todos.length"
          class="todo-item--center"
        >You have no ToDo's</li>
      </ul>
      <div class="todo-add">
        <label for="add-todo"></label>
        <input
          ref="add"
          id="add-todo"
          type="text"
          class="todo-add__input"
          v-model="newTodoText"
        >
        <button
          class="todo-add__button"
          :disabled="newTodoTextEmpty"
          @click="addTodoHandler"
        >
          Add ToDo
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      newTodoText: ''
    }
  },
  computed: {
    todos(){
      return this.$store.getters.todos
    },
    newTodoTextEmpty(){
      return !this.newTodoText
    }
  },
  methods: {
    completeHandler(isComplete, id){
      this.$store.commit('changeTodoState', {isComplete, id})
    },
    deleteTodoHandler(id){
      this.$store.commit('removeTodo', {id})
    },
    addTodoHandler(){
      this.$store.commit('addTodo', {text: this.newTodoText})
      this.newTodoText = ''
      this.$refs.add.focus()
    }
  },
}
</script>
<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Red+Rose:wght@400;700&display=swap');
#app{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Red Rose', cursive;
}
  .todo{
    border-radius: 15px;
    background-color: dodgerblue;
    padding: 1.5rem;
    &__list{
      display: flex;
      flex-direction: column;
      max-width: 40vmax;
      min-width: 300px;
      padding: 1.5rem -0px;
    }
    &__title{
      text-align: center;
      user-select: none;
      margin-bottom: 1rem;
      font-size: 5rem;
      font-weight: 700;
      color: var(--gray-2e);
      text-shadow: 1px 1px 1px rgba(0,0,0,.4);
    }
    &-item{
      font-size: 1.8rem;
      margin-left: 1rem;
      justify-content: space-between;
      display: flex;
      align-items: center;
      &--center{
        @extend .todo-item;
        text-align: center;
        justify-content: center;
      }
      &__text{
        padding: 0 1rem;
        text-align: left;
        flex-grow: 1;
        &.done{
          text-decoration: line-through;
        }
      }
      &__delete{
        font-size: 3rem;
        color: #000000;
        padding: 5px;
        border-radius: 5px;
        transition: color .3s;
        &:hover{
          color: #ff0000;
        }
      }
    }
    &-add{
      justify-content: space-between;
      display: flex;
      &__input{
        max-width: 60%;
        min-width: 20rem;
        border-radius: 5px;
        padding: .5em 2rem;
      }
      &__button{
        padding: 1rem 2rem;
        border-radius: 8px;
        background-color: lightseagreen;
        transition: background-color .3s;
        font-weight: 800;
        font-size: 2rem;
        color: var(--gray-ff);
        text-shadow: 1px 1px 1px rgba(0,0,0,.3);
        &[disabled]{
          background-color: #8D8D8D;
          color: #FEBC5A;
        }
        &:hover:not([disabled]){
          background-color: orange;
        }
      }
    }
  }
  .my-info{
    position: fixed;
    font-size: 1.6rem;
    top: 2rem;
    left: 2rem;
    color: #666;
  }
</style>
