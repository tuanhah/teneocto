<template>
  <div id="body-form">
    <form id="product-form" class="my-form d-flex flex-column justify-content-center">
					<div class="my-form-component">
						<label class="my-label" for="">Image</label>
						<input type="file" id="form-image" class="my-form-input form-control"/>
					</div>
					<div class="my-form-component ">
						<label class="my-label" for="">Name</label>
						<input type="text" id="form-name" class="my-form-input form-control" v-model="productName"/>
					</div>
					<div class="my-form-component ">
						<label class="my-label" for="">Description</label>
						<input type="text" id="form-description" class="my-form-input form-control" v-model="productDescription"/>
					</div>
					<div class="my-form-component ">
						<label class="my-label" for="">Price</label>
						<input type="text" id="form-price" class="my-form-input form-control" v-model="productPrice"/>
					</div>
					<div class="my-form-component ">
						<label class="my-label" for="">Category</label>
						
						<select id="form-category" class="my-form-input form-control" v-model="productCategory">
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
						</select>
					</div>
          
					<div class="submit-button-area d-flex justify-content-center">
						<button id="submit-button" type="button" class="btn btn-primary" @click="addDocument">Submit</button>
					</div>
				</form>
</div>
</template>
<script>
import {db,storage} from './firebaseConfig.js'
var storageRef = storage.ref();

export default {
  name: 'UploadTab',
  data() {
    return {
				
			productName: "",
			productPrice: "",
			productDescription: "",
			productCategory: "",
			productImage: null
		}
  },
  methods: {
    base64(file, callback){
        var coolFile = {};
        function readerOnload(e){
          var base64 = btoa(e.target.result);
          coolFile.base64 = base64;
          callback(coolFile)
        };
      
        var reader = new FileReader();
        reader.onload = readerOnload;
        // alert(file.name);
        var file = file[0].files[0];
        coolFile.filetype = file.type;
        coolFile.size = file.size;
        coolFile.filename = file.name;
        reader.readAsBinaryString(file);
    },
    addDocument(){
      let size = 0;
      db.collection('product').get().then(snap => {
        size = snap.size ;// will return the collection size
        let img="";
        let obj = document.getElementById("form-image").value;
        this.base64( obj, function(data){
          img = data.base64;
          db.collection('product').doc(size.toString()).set({
            name: this.productName,
				    description: this.productDescription,
				    price: this.productPrice,
				    category: this.productCategory,
            image : img
          }).then(function() {
            console.log("Document successfully written!");
          })
          .catch(function(error) {
            console.error("Error writing document: ", error);
          });

        })
      })  
    },
    
    

  },
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#body-form {
  height: 50% !important;
  width: 40% !important;
}

.error-form {
  color: red;
}
.submit-button-area{
  margin-top : 10px!important;
}
</style>
