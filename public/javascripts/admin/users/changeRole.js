$(document).ready(() => {
  $(".changeRole").click(async (e) => {
    const id = e.target.id.split("-")[1];
    await $.ajax({
      type: "post",
      url: "/admin/users",
      data: {
        id,
      },
      success: function (response) {
        console.log(response.user);
        let role;
        if (response.user.role === "user") {
          role = `<select class="form-control" id="role">
            <option selected>کاربر</option>
            <option>مدیر</option>
            <option>نویسنده</option>
          </select>`;
        } else if (response.user.role === "writer") {
          role = `<select class="form-control" id="role">
            <option selected>نویسنده</option>
            <option>کاربر</option>
            <option>مدیر</option>
          </select>`;
        } else {
          role = `<select class="form-control" id="role">
            <option selected>مدیر</option>
            <option>کاربر</option>
            <option>نویسنده</option>
          </select>`;
        }
        $("#changeRoleBodyModal")
          .html(`<form action="/admin/user/update/role" method="post">
          <input type="text" class="d-none" id="userID" value="${response.user._id}">
        <div class="form-group">
        <label for="firstName">نام: </label>
        <input type="text" class="form-control" name="firstName" id="firstName" aria-describedby="emailHelp" value="${response.user.firstName}" disabled>
      </div>
      <div class="form-group">
        <label for="lastName">نام خانوادگی: </label>
        <input type="text" class="form-control" name="lastName" id="lastName" value="${response.user.lastName}" disabled>
      </div>
      <div class="form-group">
      <label for="username">نام کاربری: </label>
      <input type="text" class="form-control" name="username" id="username" value="${response.user.username}" disabled>
    </div>
    <div class="form-group">
    <label for="email">آدرس ایمیل: </label>
    <input type="email" class="form-control" name="email" id="email" value="${response.user.email}" disabled>
  </div>
  <div class="form-group">
  <label for="mobileNumber">شماره موبایل: </label>
  <input type="text" class="form-control" name="mobileNumber" id="mobileNumber" value="${response.user.mobileNumber}" disabled>
</div>
<div class="form-group">
<label for="role">نقش: </label>
${role}
</div></form>`);
      },
    });
  });

  $("#submitBTN").on("click", () => {
    const id = $("#userID").val();
    let role = $("#role").val();

    if (role === "مدیر") {
      role = "admin";
    } else if (role === "کاربر") {
      role = "user";
    } else {
      role = "writer";
    }

    const data = {
      id,
      role,
    };

    $.ajax({
      type: "patch",
      url: "/admin/users/update/role",
      data,
      success: function (response) {
        if (response.message === `User's role updated successfully`) {
          location.reload();
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  });
});
