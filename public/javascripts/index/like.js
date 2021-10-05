$(document).ready(() => {
  $(".submitLike").on("click", (e) => {
    const propertyID = e.target.id.split("-")[1];
    const userID = $("#userIDIndex").val();

    $.ajax({
      type: "post",
      url: "/like/submit",
      data: {
        propertyID,
        userID,
      },
      success: function (response) {
        location.reload();
      },
    });
  });

  $(".removeLike").on("click", (e) => {
    const propertyID = e.target.id.split("-")[1];
    const userID = $("#userIDIndex").val();

    $.ajax({
      type: "post",
      url: "/like/remove",
      data: {
        propertyID,
        userID,
      },
      success: function (response) {
        location.reload();
      },
    });
  });
});
