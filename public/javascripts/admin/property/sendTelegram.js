$(document).ready(() => {
  $(".sendTelegram").on("click", (e) => {
    e.preventDefault();
    const propertyID = e.target.id.split("-")[1];
    if (propertyID) {
      $.ajax({
        type: "post",
        url: "/admin/properties/send/telegram",
        data: {
          propertyID,
        },
        success: function (response) {
          Swal.fire({
            icon: "success",
            title: "اطلاعات ملک مورد نظر به کانال تلگرام ارسال شد.",
          });
          setTimeout(() => {
            location.reload();
          }, 3000);
        },
      });
    }
  });
});
