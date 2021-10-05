$(document).ready(() => {
  $(".resetPassword").click((e) => {
    const id = e.target.id.split("-")[1];
    $.ajax({
      type: "post",
      url: "/admin/users/reset/password",
      data: {
        id,
      },
      success: (response) => {
        Swal.fire({
          icon: "success",
          title: "لینک بازیابی کلمه عبور به ایمیل کاربر ارسال شد.",
          showConfirmButton: false,
          timer: 3000,
        });
      },
      error: (err) => {
        Swal.fire({
          icon: "error",
          title:
            "مشکلی در ارسال ایمیل به کاربر بوجود آمده است. دوباره امتحان کنید.",
          showConfirmButton: false,
          timer: 3000,
        });
      },
    });
  });
});
