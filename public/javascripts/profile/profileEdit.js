$(document).ready(() => {
  $("#profileEditBTN").click(() => {
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const username = $("#username").val();
    const email = $("#email").val();
    const mobileNumber = $("#mobileNumber").val();
    const data = {
      firstName,
      lastName,
      username,
      email,
      mobileNumber,
    };

    if (!mobileNumber.match(/^(\+98|0098|0)?9\d{9}$/)) {
      $("#alertDIV")
        .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> شماره موبایل وارد شده معتبر نمی باشد.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
    </div>`);
    } else {
      $.ajax({
        type: "put",
        url: "/users/profile",
        data: data,
        success: function (response) {
          if (response.message === "User information is not changed") {
            location.reload();
          } else if (
            response.message === "User information updated successfully"
          ) {
            window.location.href = "/auth/logout";
          }
        },
        error: function (err) {
          if (err.responseJSON.message.includes("Duplicate field value")) {
            $("#alertDIV")
              .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> شماره موبایل درخواستی، قبلا ثبت شده است.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
            </div>`);
          }
        },
      });
    }
  });
});
