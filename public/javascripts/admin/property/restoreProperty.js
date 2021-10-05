$(document).ready(() => {
  $(".restoreProperty").on("click", (e) => {
    if (confirm("آیا برای فعال کردن این ملک مطمئنی؟")) {
      const id = e.target.id.split("-")[1];

      $.ajax({
        type: "patch",
        url: "/admin/properties/restore",
        data: {
          id,
        },
        success: function (response) {
          window.location.href = "/admin/properties";
        },
      });
    }
  });
});
