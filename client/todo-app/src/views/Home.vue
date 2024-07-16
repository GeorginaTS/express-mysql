<template>
  <div>
    <h2 class="text-xl font-bold">Todos List</h2>
    <ul class="flex flex-wrap gap-2">    
        <li v-for="item in todos" :key="todos.id" class="border border-gray-800 rounded p-2">
            <RouterLink :to="'/'+item.id">
          <h3 class="font-bold">{{item.title}} - <CategoryTag :id="item.idcategory" /></h3>
          <p>{{item.content}}</p>
          <p class="text-xs">User: {{item.iduser}}</p>
    
          <StatusTag :id="item.status" />
        </RouterLink>
        </li>
      </ul>
  </div>
  <hr class="bg-stone-900 m-4 w-full ">
  <div class="flex justify-center">
 <AddTodoForm />
  </div>
</template>
<script>
import AddTodoForm from "../components/AddTodoForm.vue";
import CategoryTag from "../components/CategoryTag.vue";
import StatusTag from "../components/StatusTag.vue";

export default {
    name:"Home",
    components: {AddTodoForm, CategoryTag, StatusTag},
    data() {
        return {
            todos:[]
        }
    },
    watch: {
      todos(value){
        console.log(value)
      }
    },
    async created() {
      try {
        const response = await fetch("http://localhost:3001/api/todos")
        const data = await response.json()
        this.todos = data
      }
      catch(error) {
        console.log(error)
      }
    }
  }
    
</script>
<style>
    
</style>