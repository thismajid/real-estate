$(document).ready(() => {
  $(".deleteProperty").on("click", (e) => {
    if (confirm("آیا برای حذف کردن این ملک مطمئنی؟")) {
      const id = e.target.id.split("-")[1];

      $.ajax({
        type: "delete",
        url: "/admin/properties",
        data: {
          id,
        },
        success: function (response) {
          if (response.message === "Property deleted successfully") {
            Swal.fire({
              icon: "success",
              title: "ملک مورد نظر با موفقیت حذف شد.",
              showConfirmButton: false,
              timer: 3000,
            });
            setTimeout(() => {
              location.reload();
            }, 3000);
          }
        },
      });
    }
  });
});
