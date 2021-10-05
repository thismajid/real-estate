$(document).ready(() => {
  $(".deleteBTN").on("click", (e) => {
    const id = e.target.id.split("-")[1];
    if (confirm("آیا برای حذف این پیام مطمئنی ؟!")) {
      if (id) {
        $.ajax({
          type: "delete",
          url: "/admin/messages",
          data: { id },
          success: function (response) {
            Swal.fire({
              icon: "success",
              title: "پیام مورد نظر با موفقیت حذف شد.",
            });
            setTimeout(() => {
              location.reload();
            }, 3000);
          },
        });
      }
    } else {
      location.reload();
    }
  });
});
