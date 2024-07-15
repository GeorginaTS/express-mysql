<template>
    <h2 class="text-xl font-bold">Todos List</h2>
    <ul class="flex flex-wrap gap-2">
        
        <li v-for="item in todos" :key="todos.id" class="border border-gray-800 rounded p-2">
            <RouterLink :to="'/'+item.id">
          <h3>{{item.title}}</h3>
          <p>{{item.content}}</p>
          <h4>{{item.iduser}}</h4>
        </RouterLink>
        </li>
      </ul>
</template>
<script>
export default {
    name:"Home",
    data() {
        return {
            todos:[]
        }
    },
    async mounted() {
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