$(document).ready(() => {
  $("#loginBTN").click(() => {
    console.log("32323232323232323232");
    const username = $("#username").val();
    const password = $("#password").val();
    const checkBox = document.getElementById("rememberMe");
    const rememberMe = checkBox.checked ? true : false;

    if (username && password) {
      $.ajax({
        type: "post",
        url: "/auth/login",
        data: {
          username,
          password,
          rememberMe,
        },
        success: function (response) {
          if (response.message === "Login successfully") {
            Swal.fire({
              icon: "success",
              title: "شما با موفقیت وارد شدید",
            });
            setTimeout(() => {
              window.location.href = "/";
            }, 3000);
          }
        },
        error: function (err) {
          console.log(err);
          if (err.responseJSON.message === "User not found") {
            $("#alertDIV")
              .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> نام کاربری نامعتبر می باشد.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
        </div>`);
          }
          if (err.responseJSON.message === "Password is not match") {
            $("#alertDIV")
              .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br>کلمه عبور نامعتبر می باشد.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
        </div>`);
          }
        },
      });
    }
  });
});
