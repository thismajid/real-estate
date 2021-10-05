$(document).ready(() => {
  $("input")
    .on("change paste keyup", function () {
      let option1 =
        $("#username").filter(function () {
          return $(this).val().trim().length > 0;
        }).length > 0;
      $("#email").prop("disabled", option1);
      let option2 =
        $("#email").filter(function () {
          return $(this).val().trim().length > 0;
        }).length > 0;
      $("#username").prop("disabled", option2);
    })
    .change();

  $("#resetRequestBTN").click(() => {
    $("#alertDIV").html(" ");
    const username = $("#username").val();
    const email = $("#email").val();
    let data;
    if (username || email) {
      if (email) {
        data = {
          email,
        };
      } else {
        data = {
          username,
        };
      }
      $.ajax({
        type: "post",
        url: "/auth/reset/request",
        data,
        success: function (response) {
          if (response.message === "Email sent to user") {
            $("#resetBody").html(
              `<div class="alert alert-success m-auto" role="alert">
              <p>لینک بازیابی کلمه عبور به آدرس ایمیل:</p>
              <br>
              <p class="mb-0 text-left">${response.email}</p>
              <br>
              <p>ارسال شد.</p>
            </div>`
            );
            setTimeout(() => {
              window.location.href = "/";
            }, 5000);
          }
        },
        error: (err) => {
          if (err.responseJSON.message === "User is not found") {
            $("#alertDIV")
              .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert" style="font-size: 14px"> <strong>خطا</strong><br> نام کاربری / آدرس ایمیل نادرست می باشد.
            <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
          </div>`);
          }
        },
      });
    }
  });
});
