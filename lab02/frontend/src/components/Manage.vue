<template>
<xt-table
    :data = "result"
    type = "edit"
    @success = "handleSuccess"
    @delete ="handleDelete"
    ref = "data">
</xt-table>




</template>
<script>
import db from './firebaseConfig.js'
export default {
    name : 'ManageTab',
    data(){
        
        var result =[];        
        
        const collection = db.collection('product');
        collection.get().then(snapshot => {

            snapshot.forEach(doc => {

            
                result.push(doc.data());    
            

            });

        });
        return {
            result : result
        }
    },
    mounted() {
        
    },
    methods : {
        addDocument : function(){

        },
        deleteDocument : function(){

        },
        updateDocument : function(){

        },
        createTable : function(){

        },
        handleClick(row){
            console.log(row)
        },
        handleSuccess(row,callback){
            callback(true)
        },
        handleDelete(row,callback){
            callback(true)
        },
    }

    
}
</script>
<style scoped>
    
</style>