$(document).on("click", ".original-img", function() {
    let myImageSrc = $(this).data('src')
        // As pointed out in comments, 
        // it is unnecessary to have to manually call the modal.
    $('.modal-body').append(`<img src="${myImageSrc}" height="200">`)
    $('#originalDetails').modal('show');
});