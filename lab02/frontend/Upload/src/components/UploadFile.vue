<template>
  <div id="body-form">
    <div class="form-group">
      <label for="form-image">Choose product's imgage</label>
      <input type="file" class="form-control-file" id="image">
    </div>
    <div class="form-group">
      <label for="form-category">Category</label>
      <select class="form-control" id="category">
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>
    <div class="form-group">
      <label for="form-name">Name</label>
      <input type="text" class="form-control" id="name" placeholder="Enter product's name">
    </div>
    <div class="form-group">
      <label for="form-price">Price</label>
      <input type="text" class="form-control" id="price" placeholder="Enter product's price">
    </div>
    <div class="form-group">
      <label for="form-description">Description</label>
      <textarea class="form-control" id="description" placeholder="Enter product's price" row="3"></textarea>
    </div>
    <div class="error-form">
      <label id="checkform"></label>
    </div>
    <button class="btn btn-primary" id="submitForm">Submit</button>
  </div>
</template>
<script>
export default {
  name: 'UploadTab',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
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

</style>
