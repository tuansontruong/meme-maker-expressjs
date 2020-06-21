$(document).on("click", ".original-img", function() {
    let myImageSrc = $(this).data('src')
        // As pointed out in comments, 
        // it is unnecessary to have to manually call the modal.
    $('.modal-body').html(`
    <div class="row" style="align-items:center">
    
    
    <form action="/uploadMeme" method="post">
    <div class="col">
    <img src="${myImageSrc}" height="300">
    </div>
    <div class="col">
  <div class="form-group">
    <input type="text" class="form-control" id="header" name="header" aria-describedby="emailHelp" placeholder="Header">
  </div>
  <div class="form-group">
    <input type="text" class="form-control" id="footer" name="footer" placeholder="Footer">
  </div>
  <input type="hidden" name="imgSrc" value=${myImageSrc}>
  <button type="submit" class="btn btn-primary">Submit</button>
  </div>
</form>

    
</div>`)
    $('#originalDetails').modal('show');
});