$(document).ready(() => {
  $("#resetBTN").click(() => {
    const password = $("#password").val();
    const repeat = $("#repeatPassword").val();
    const id = $("#userID").val();

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
        id,
        password,
      };
      $.ajax({
        type: "put",
        url: "/users/reset/password",
        data,
        success: function (response) {
          window.location.href = "/auth/logout";
        },
      });
    }
  });
});
