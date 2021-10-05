$(document).ready(() => {
  $(".deleteFacility").click(async (e) => {
    const id = e.target.id.split("-")[1];
    $.ajax({
      type: "delete",
      url: "/admin/properties/facility",
      data: {
        id,
      },
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "امکان مورد نظر با موفقیت حذف شد.",
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
