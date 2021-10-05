$(document).ready(() => {
  $("#registerBTN").click(() => {
    const firstName = $("#firstName").val();
    const lastName = $("#lastName").val();
    const username = $("#username").val();
    const email = $("#email").val();
    const mobileNumber = $("#mobileNumber").val();
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    if (firstName.length < 3 || firstName.length > 20) {
      $("#alertDIV")
        .html(`<div class="alert alert-warning alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> نام باید بین 3 تا 20 کاراکتر باشد.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
    </div>`);
      return false;
    }
    if (lastName.length < 3 || lastName.length > 20) {
      $("#alertDIV")
        .html(`<div class="alert alert-warning alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> نام خانوادگی باید بین 3 تا 20 کاراکتر باشد.
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
      </div>`);
      return false;
    }
    if (username.length < 4 || username.length > 20) {
      $("#alertDIV")
        .html(`<div class="alert alert-warning alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> نام کاربری باید بین 4 تا 20 کاراکتر باشد.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
    </div>`);
      return false;
    }

    if (!mobileNumber.match(/^(\+98|0098|0)?9\d{9}$/)) {
      $("#alertDIV")
        .html(`<div class="alert alert-warning alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> شماره موبایل صحیح نمی باشد.
      <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
    </div>`);
      return false;
    }
    if (password !== confirmPassword) {
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
      $("#alertDIV").html(" ");
      //   const url = "http://localhost:3000/auth/register";
      $.ajax({
        type: "post",
        url: "/auth/register",
        data: {
          firstName,
          lastName,
          username,
          email,
          mobileNumber,
          password,
        },
        success: function (response) {
          Swal.fire({
            icon: "success",
            title: "ثبت نام شما با موفقیت انجام شد",
          });
          setTimeout(() => {
            window.location.href = "/auth/login";
          }, 3000);
        },
        error: function (err) {
          if (err.responseJSON.message === "duplicate username") {
            $("#alertDIV")
              .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br> نام کاربری درخواستی شما قابل انتخاب نمی باشد.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
        </div>`);
          }
          if (err.responseJSON.message === "duplicate email") {
            $("#alertDIV")
              .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br>آدرس ایمیل درخواستی شما قابل انتخاب نمی باشد.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
        </div>`);
          }
          if (err.responseJSON.message === "duplicate mobile number") {
            $("#alertDIV")
              .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>خطا</strong> <br>شماره موبایل درخواستی شما قابل انتخاب نمی باشد.
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"> <span aria-hidden="true">&times;</span> </button>
        </div>`);
          }
        },
      });
    }
  });
});
