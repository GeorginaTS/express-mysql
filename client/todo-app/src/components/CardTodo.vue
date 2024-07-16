<template>
    <div>
        <h3 class="font-bold">{{ todo.title }} -
            <CategoryTag :id="todo.idcategory" />
          </h3>
          <p>{{ todo.content }}</p>
          <p class="text-xs">User: {{ todo.iduser }}</p>

          <StatusTag :id="todo.status" /> 
    </div>
</template>
<script>
import CategoryTag from "./CategoryTag.vue";
import StatusTag from "./StatusTag.vue";
export default {
    name:"CardTodo",
    props: ["todo"],
    components: { CategoryTag, StatusTag },
    data() {
        return {

        }
    }
    
}
</script>
<style>
    
</style>