$(document).ready(() => {
  $(".activeUser").click((e) => {
    console.log(32323232);
    const id = e.target.id.split("-")[1];

    $.ajax({
      type: "patch",
      url: "/admin/users/update/status",
      data: {
        id,
        status: "active",
      },
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "کاربر فعال شد",
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
