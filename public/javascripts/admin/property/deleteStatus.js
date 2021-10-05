$(document).ready(() => {
  $(".deleteStatus").click(async (e) => {
    const id = e.target.id.split("-")[1];
    $.ajax({
      type: "delete",
      url: "/admin/properties/status",
      data: {
        id,
      },
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "وضعیت مورد نظر با موفقیت حذف شد.",
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
