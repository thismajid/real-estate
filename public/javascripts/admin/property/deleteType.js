$(document).ready(() => {
  $(".deleteType").click(async (e) => {
    const id = e.target.id.split("-")[1];
    $.ajax({
      type: "delete",
      url: "/admin/properties/type",
      data: {
        id,
      },
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "نوع مورد نظر با موفقیت حذف شد.",
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
