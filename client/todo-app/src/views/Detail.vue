<template>
    <div>
        {{ todo }}
    </div>
</template>
<script>
export default {
    name: "Detail",
    data() {
        return{
            todo:{}
        }
    },
    async created() {
        try {
            const response = await fetch(`http://localhost:3001/api/todos/${this.$route.params.id}`);
            this.todo = await response.json()
        } catch {
            console.error('Failed');
        }
    }, 
    methods: {
        async deleteItem() {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                const response = await fetch(`http://localhost:3001/api/todos/${this.$route.params.id}`,{
                method: "DELETE",
                headers: myHeaders,
                });
                await response.redirected("http://localhost:3001/api/todos")

            } catch {
                console.error('Failed');
            }
        }
    }
    
}
</script>
<style>
    
</style>