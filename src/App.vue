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
            :contenteditable="currentEditingId === todo.id"
            @click="beginEditingText($event, todo.id)"
            ref="text"
            :data-id="todo.id"
            @keyup.enter="changeTextHandler(todo.id)"
          >
            {{todo.text}}
          </div>
          <button
            class="todo-item__confirm"
            @click="changeTextHandler(todo.id)"
            v-if="currentEditingId === todo.id"
          >
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                 x="0px" y="0px"
                 width="25px" height="25px" viewBox="0 0 352.62 352.62"
                 style="enable-background:new 0 0 352.62 352.62;"
                 xml:space="preserve">
              <g>
                <path d="M337.222,22.952c-15.912-8.568-33.66,7.956-44.064,17.748c-23.867,23.256-44.063,50.184-66.708,74.664
                  c-25.092,26.928-48.348,53.856-74.052,80.173c-14.688,14.688-30.6,30.6-40.392,48.96c-22.032-21.421-41.004-44.677-65.484-63.648
                  c-17.748-13.464-47.124-23.256-46.512,9.18c1.224,42.229,38.556,87.517,66.096,116.28c11.628,12.24,26.928,25.092,44.676,25.704
                  c21.42,1.224,43.452-24.48,56.304-38.556c22.645-24.48,41.005-52.021,61.812-77.112c26.928-33.048,54.468-65.485,80.784-99.145
                  C326.206,96.392,378.226,44.983,337.222,22.952z M26.937,187.581c-0.612,0-1.224,0-2.448,0.611
                  c-2.448-0.611-4.284-1.224-6.732-2.448l0,0C19.593,184.52,22.653,185.132,26.937,187.581z" fill="#00CE6B"/>
              </g>
            </svg>
          </button>
          <button
            v-else
            class="todo-item__delete"
            @click="deleteTodoHandler(todo.id)"
          >X
          </button>
        </li>
        <li
          v-if="!todos.length"
          class="todo-item--center"
        >You have no ToDo's
        </li>
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
    data() {
      return {
        newTodoText: '',
        currentEditingId: null
      }
    },
    computed: {
      todos() {
        return this.$store.getters.todos
      },
      newTodoTextEmpty() {
        return !this.newTodoText
      }
    },
    methods: {
      beginEditingText(e, id){
        this.currentEditingId = id
        setTimeout(()=>{
          e.target.focus()
        },0)
      },
      completeHandler(isComplete, id) {
        this.$store.commit('changeTodoState', {isComplete, id})
      },
      deleteTodoHandler(id) {
        this.$store.commit('removeTodo', {id})
      },
      addTodoHandler() {
        this.$store.commit('addTodo', {text: this.newTodoText})
        this.newTodoText = ''
        this.$refs.add.focus()
      },
      changeTextHandler(id) {
        this.currentEditingId = null
        
        const textDivs = this.$refs.text
        const textDiv = textDivs.find(text=>{return +text.dataset.id === id})
        console.log("textDiv == ",  textDiv)
        const text = textDiv.innerText
        this.$store.commit('changeTodoText', {text, id})
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
      text-shadow: 1px 1px 1px rgba(0, 0, 0, .4);
    }
    &-item{
      display: flex;
      align-items: center;
      font-size: 1.8rem;
      margin-left: 1rem;
      justify-content: space-between;
      min-height: 6rem;
      padding: 5px 0;
      border-top: solid 1px rgba(0,0,0,.1);
      &--center{
        @extend .todo-item;
        text-align: center;
        justify-content: center;
      }
      &__text{
        min-height: 5rem;
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0 1rem;
        text-align: left;
        flex-grow: 1;
        color: #444;
        min-width: 100px;
        &[contenteditable="true"]{
          cursor: text;
        }
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
      &__confirm{
        margin-right: 3rem;
        @extend .todo-item__delete;
        color: #00CE6B;
        font-size: 2rem;
        transition: transform .3s;
        &:hover{
          color: inherit;
          transform: scale(1.05);
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
        text-shadow: 1px 1px 1px rgba(0, 0, 0, .3);
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
  label{
    display: inline-flex;
  }
</style>
