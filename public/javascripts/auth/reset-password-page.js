$(document).ready(() => {
  $("#resetBTN").click(() => {
    const password = $("#password").val();
    const repeat = $("#repeatPassword").val();
    const token = $("#tokenID").val();

    if (password !== repeat) {
      $("#alertDIV")
        .html(`<div class="alert alert-warning alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> مقدار کلمه عبور با مقدار تکرار کلمه عبور یکسان نمی باشد.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
      </div>`);
      return false;
    } else if (
      !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
    ) {
      $("#alertDIV")
        .html(`<div class="alert alert-warning alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> کلمه عبور باید شامل 6 کاراکتر و ترکیبی از اعداد، حروف کوچک و بزرگ باشد.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
        </div>`);
      return false;
    } else {
      const data = {
        token,
        password,
      };
      $.ajax({
        type: "put",
        url: "/auth/reset",
        data,
        success: function (response) {
          if (response.message === "Password changed successfully") {
            $("#alertDIV")
              .html(`<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>موفقیت آمیز</strong> <br> کلمه عبور با موفقیت تغییر کرد.
              <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
            </div>`);
            setTimeout(() => {
              window.location.href = "/auth/login";
            }, 3000);
          }
        },
        error: (err) => {
          if (err.responseJSON.message === "Token invalid") {
            $("#alertDIV")
              .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> توکن معتبر نمی باشد.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
              </div>`);
            setTimeout(() => {
              window.location.href = "/auth/reset";
            }, 3000);
          }
          if (err.responseJSON.message === "User not found") {
            $("#alertDIV")
              .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> نام کاربری معتبر نمی باشد.
                <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
              </div>`);
            setTimeout(() => {
              window.location.href = "/auth/reset";
            }, 3000);
          }
        },
      });
    }
  });
});
