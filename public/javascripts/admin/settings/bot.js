$(document).ready(() => {
  $("#botSettingsSubmit").on("click", () => {
    const telegramBotToken = $("#telegramBotToken").val();
    const channelID = $("#channelID").val();

    if (telegramBotToken || channelID) {
      $.ajax({
        type: "post",
        url: "/admin/settings/bot",
        data: {
          telegramBotToken,
          channelID,
        },
        success: function (response) {
          Swal.fire({
            icon: "success",
            title: "تنظیمات با موفقیت ویرایش شد.",
          });
          setTimeout(() => {
            window.location.href = "/admin/settings/bot";
          }, 3000);
        },
      });
    }
  });
});
