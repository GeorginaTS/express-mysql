<template>
    <div class="flex flex-col items-center h-full">
    <div class=" border border-stone-800 w-[90%]" v-if="todo">
        <h1 class="text-ml bg-stone-300 p-2">User {{todo.iduser}}</h1>
        <h2 class="font-bold p-2 text-xl">{{todo.title}}</h2>
        <div class="flex justify-between p-4">
            <CategoryTag :id="todo.idcategory" />
            <StatusTag :id="todo.status" />
        </div>
        
        <p class="p-2 bg-stone-200 flex">{{todo.content}}</p>
        
        <p class="text-xs text-stone-600 flex justify-end p-1">{{todo.created}}</p>    
    </div>
    <!-- <div>
        <button @click="deleteTodo" class="bg-red-600 p-2 rounded m-2">Delete</button>
    </div> -->
    {{ todo }}
    </div>
</template>
<script>
import CategoryTag from "../components/CategoryTag.vue";
import StatusTag from "../components/StatusTag.vue";

export default {
    name: "Detail",
    data() {
        return{
            todo:{},
            id: this.$route.params.id
        }
    },
    components: {
        CategoryTag, StatusTag
    },
    async created() {
        try {
            const response = await fetch(`http://localhost:3001/api/todos/${this.id}`);
            const todo = await response.json()
            console.log("todo", todo[0])

            if (todo[0]) {
                this.todo = todo[0]
            } else {
                this.todo = {title: "ToDo dpon't exist", content:""}
            }
        
        } catch {
            console.error('Failed');
        }
    }, 
    methods: {
        async deleteTodo() {
            try {
                const response = await fetch(`http://localhost:3001/api/todos/${this.$route.params.id}`,{
                    method: "DELETE"
                });
                response.status(200).send({msg:"deleted", id:this.$route.params.id})
                //await response.redirect("http://localhost:5173/")

            } catch {
                console.error('Failed');
            }
        }
    }
    
}
</script>
<style>
    
</style>