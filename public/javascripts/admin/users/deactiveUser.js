$(document).ready(() => {
  $(".deactiveUser").click((e) => {
    console.log(121212);
    const id = e.target.id.split("-")[1];
    $.ajax({
      type: "patch",
      url: "/admin/users/update/status",
      data: {
        id,
        status: "deactive",
      },
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "کاربر غیر فعال شد",
          showConfirmButton: false,
          timer: 3000,
        });
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
    });
  });
});
