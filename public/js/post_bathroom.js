$(document).ready(function() {
  $("#add_bathroom").submit(function(e) {
    var formData = {
      "lat": $('#add_lat').val(),
      "lng": $('#add_lon').val(),
      "bname": $('#b_name').val(),
      "floor": $('#floor').val(),
      "reqs": $('#reqs').val(),
      "gender": $('#gender').val(),
      "stall_count": $('#stalls').val()
    }

    console.log(formData);

    $.ajax({
      type: "POST",
      url: "/add/bathroom",
      data: formData,
      success: function() {
        //$('#stage').html('<p>Done!</p>');
        window.location.href = "/";
      }
    });
    return false;
  });
});
