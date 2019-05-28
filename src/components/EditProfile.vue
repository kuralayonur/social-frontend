<template>
  <div>
    <div class="container margin-top">
      <hr>
      <div class="row">
        <!-- left column -->

        <!-- edit form column -->
        <div class="col-md-9 personal-info">
          <h3>Personal info</h3>

          <form class="form-horizontal" role="form">

            <div class="form-group">
              <label class="col-lg-3 control-label">Email:</label>
              <div class="col-lg-8">
                <input class="form-control" type="text" value="janesemail@gmail.com">
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-3 control-label">Password:</label>
              <div class="col-md-8">
                <input class="form-control" type="password" value="11111122333">
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-3 control-label">Confirm password:</label>
              <div class="col-md-8">
                <input class="form-control" type="password" value="11111122333">
              </div>
            </div>
            <div class="form-group">
              <label class="col-md-3 control-label"></label>
              <div class="col-md-8">
                <input type="button" class="btn btn-primary" value="Save Changes">
                <span></span>
                <input type="reset" class="btn btn-default" value="Cancel">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
export default {}
</script>

